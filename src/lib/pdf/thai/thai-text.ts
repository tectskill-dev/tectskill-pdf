/**
 * TectSkill PDF — Thai text support for pdf-lib
 *
 * ปัญหาที่แก้ (Problems this module fixes):
 *
 * 1. ฟอนต์มาตรฐานของ PDF (Helvetica / Times / Courier) ใช้ WinAnsi encoding
 *    ซึ่งไม่มีอักษรไทย ทำให้ pdf-lib โยน error "WinAnsi cannot encode ..."
 *    ทุกครั้งที่เครื่องมือ (ลายน้ำ, หัว-ท้ายกระดาษ, เลขหน้า, ตราประทับ ฯลฯ)
 *    พยายามเขียนข้อความภาษาไทยลงใน PDF
 *    → เราสลับไปใช้ฟอนต์ Sarabun (OFL) ที่ฝังไว้ในเครื่องโดยอัตโนมัติ
 *
 * 2. pdf-lib ใช้ fontkit จัดรูปตัวอักษร (GSUB) แต่ "ทิ้ง" ค่าการจัดตำแหน่ง
 *    GPOS (xOffset / yOffset) ไป ทำให้วรรณยุกต์/สระบนลอยผิดที่
 *    เช่น ไม้โทบน ป ฝ ฟ ชนหางพยัญชนะ หรือวรรณยุกต์ซ้อนทับสระบน
 *    → เราวาดข้อความเองทีละกลุ่ม glyph โดยใช้ตำแหน่งจาก fontkit.layout()
 *
 * 3. การตัดบรรทัดของ pdf-lib อาศัยช่องว่าง แต่ภาษาไทยไม่เว้นวรรคระหว่างคำ
 *    → ใช้ Intl.Segmenter('th') ตัดคำ
 *
 * ทั้งหมดถูกติดตั้งครั้งเดียวผ่าน installThaiSupport() ใน loadPdfLib()
 * จึงครอบคลุมทุกเครื่องมือที่เรียก page.drawText() โดยไม่ต้องแก้ทีละไฟล์
 */

import { withBasePath } from '@/lib/utils/path';

type PDFLibModule = typeof import('pdf-lib');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

/** Thai + Lao Unicode blocks (complex scripts that need mark positioning) */
const COMPLEX_SCRIPT_REGEX = /[\u0E00-\u0EFF]/;
const THAI_REGEX = /[\u0E00-\u0E7F]/;

export function containsThai(text: string | null | undefined): boolean {
  return !!text && THAI_REGEX.test(text);
}

function needsShaping(text: string): boolean {
  return COMPLEX_SCRIPT_REGEX.test(text);
}

// ---------------------------------------------------------------------------
// Font loading
// ---------------------------------------------------------------------------

export const THAI_FONT_FILES = {
  regular: '/fonts/Sarabun-Regular.ttf',
  bold: '/fonts/Sarabun-Bold.ttf',
} as const;

const fontBytesCache: { regular?: Uint8Array; bold?: Uint8Array } = {};
let fontkitModule: Any = null;

async function readFontFile(path: string): Promise<Uint8Array | null> {
  if (typeof window !== 'undefined' && typeof fetch !== 'undefined') {
    try {
      const res = await fetch(withBasePath(path));
      if (res.ok) return new Uint8Array(await res.arrayBuffer());
    } catch {
      // fall through (e.g. tests / Node)
    }
  }
  try {
    const isNode = typeof process !== 'undefined' && !!process.versions?.node;
    if (isNode && (typeof window === 'undefined' || !!process.env.VITEST)) {
      const fs = await import('fs');
      const nodePath = await import('path');
      const local = nodePath.resolve(process.cwd(), 'public' + path);
      if (fs.existsSync(local)) return new Uint8Array(fs.readFileSync(local));
    }
  } catch {
    // ignore — Thai support is best-effort
  }
  return null;
}

/** Load (and cache) the bundled Thai font bytes. */
export async function getThaiFontBytes(bold = false): Promise<Uint8Array | null> {
  const key = bold ? 'bold' : 'regular';
  if (!fontBytesCache[key]) {
    const bytes = await readFontFile(THAI_FONT_FILES[key]);
    if (bytes) fontBytesCache[key] = bytes;
  }
  return fontBytesCache[key] ?? null;
}

async function getFontkit(): Promise<Any> {
  if (!fontkitModule) {
    const mod: Any = await import('@pdf-lib/fontkit');
    fontkitModule = mod.default || mod;
  }
  return fontkitModule;
}

/** Preload fontkit + Thai fonts so that the synchronous fallback can work. */
export async function preloadThaiSupport(): Promise<void> {
  await Promise.all([getFontkit(), getThaiFontBytes(false), getThaiFontBytes(true)]);
}

/**
 * Embed the Thai font into a document explicitly (async, public helper).
 * Use this in processors that know up-front they will draw Thai text.
 */
export async function embedThaiFont(pdfDoc: Any, bold = false): Promise<Any> {
  const fontkit = await getFontkit();
  pdfDoc.registerFontkit(fontkit);
  const bytes = await getThaiFontBytes(bold);
  if (!bytes) throw new Error('Thai font (Sarabun) could not be loaded');
  return pdfDoc.embedFont(bytes, { subset: false });
}

// Per-document cache of synchronously-created Thai fonts
const syncFontCache = new WeakMap<object, { regular?: Any; bold?: Any }>();

/**
 * Create (synchronously) a Thai PDFFont for a document.
 * Requires preloadThaiSupport() to have finished.
 */
function getThaiFontSync(pdfLib: PDFLibModule, doc: Any, bold: boolean): Any | null {
  const key = bold ? 'bold' : 'regular';
  let entry = syncFontCache.get(doc);
  if (!entry) {
    entry = {};
    syncFontCache.set(doc, entry);
  }
  if (entry[key]) return entry[key];

  const bytes = fontBytesCache[key] ?? fontBytesCache.regular;
  if (!bytes || !fontkitModule) return null;

  try {
    const fkFont = fontkitModule.create(bytes);
    const L: Any = pdfLib;
    const embedder = new L.CustomFontEmbedder(fkFont, bytes, undefined, undefined);
    const ref = doc.context.nextRef();
    const pdfFont = L.PDFFont.of(ref, doc, embedder);
    doc.fonts.push(pdfFont);
    entry[key] = pdfFont;
    return pdfFont;
  } catch (err) {
    console.warn('[TectSkill PDF] Could not create Thai font:', err);
    return null;
  }
}

function isStandardFont(font: Any): boolean {
  return !!font && !!font.embedder && !font.embedder.font?.layout;
}

function isBoldName(font: Any): boolean {
  const name: string = font?.name || font?.embedder?.fontName || '';
  return /bold/i.test(name);
}

/** Pick the font that can actually render `text`. */
function resolveFontForText(pdfLib: PDFLibModule, font: Any, text: string): Any {
  if (font && isStandardFont(font) && containsThai(text)) {
    const thai = getThaiFontSync(pdfLib, font.doc, isBoldName(font));
    if (thai) return thai;
  }
  return font;
}

// ---------------------------------------------------------------------------
// Shaping + drawing
// ---------------------------------------------------------------------------

interface GlyphRun {
  /** pen position of the run in font units (relative to line start) */
  x: number;
  y: number;
  hex: string;
}

function toHex4(n: number): string {
  return n.toString(16).padStart(4, '0').toUpperCase();
}

/**
 * Shape a single line with fontkit and split it into runs. A new run starts
 * whenever a glyph has a GPOS offset or a non-default advance, so every
 * glyph ends up exactly where the font's OpenType rules want it.
 */
function shapeLine(pdfFont: Any, text: string): { runs: GlyphRun[]; advance: number } {
  const embedder = pdfFont.embedder;
  const fkFont = embedder.font;
  const layout = fkFont.layout(text, embedder.fontFeatures);
  const isSubset = !!embedder.subset;

  // Make sure subset embedders know about every glyph (and get subset ids)
  if (isSubset) embedder.encodeText(text);

  const glyphId = (g: Any): number =>
    isSubset ? embedder.glyphIdMap.get(g.id) ?? embedder.subset.includeGlyph(g) : g.id;

  const runs: GlyphRun[] = [];
  let penX = 0;
  let penY = 0;
  let current: GlyphRun | null = null;
  let expectedX = 0;

  for (let i = 0; i < layout.glyphs.length; i++) {
    const g: Any = layout.glyphs[i];
    const pos = layout.positions[i];
    const gx = penX + pos.xOffset;
    const gy = penY + pos.yOffset;
    const natural = g.advanceWidth;
    const offsetFree = pos.xOffset === 0 && pos.yOffset === 0;
    const prev: GlyphRun | null = current;
    const canAppend =
      prev !== null && offsetFree && gy === prev.y && Math.abs(gx - expectedX) < 0.01;

    if (canAppend && prev !== null) {
      prev.hex += toHex4(glyphId(g));
    } else {
      current = { x: gx, y: gy, hex: toHex4(glyphId(g)) };
      runs.push(current);
    }
    // PDF viewers advance by the glyph's hmtx width after showing it
    expectedX = gx + natural;
    // A glyph shown with an offset breaks the chain for the next glyph
    if (!offsetFree || pos.xAdvance !== natural) expectedX = Number.NaN;

    penX += pos.xAdvance;
    penY += pos.yAdvance;
  }

  return { runs, advance: penX };
}

/** Measure a line using the shaped advances (includes kerning). */
export function measureShaped(pdfFont: Any, text: string, size: number): number {
  const fkFont = pdfFont?.embedder?.font;
  if (!fkFont?.layout) return pdfFont.widthOfTextAtSize(text, size);
  const { advance } = shapeLine(pdfFont, text);
  return (advance * size) / fkFont.unitsPerEm;
}

// ---------------------------------------------------------------------------
// Thai-aware line breaking
// ---------------------------------------------------------------------------

type Segmenter = { segment(input: string): Iterable<{ segment: string }> };

function getSegmenter(granularity: 'word' | 'grapheme'): Segmenter | null {
  const IntlAny = Intl as Any;
  if (typeof IntlAny.Segmenter !== 'function') return null;
  try {
    return new IntlAny.Segmenter('th', { granularity });
  } catch {
    return null;
  }
}

/**
 * Split text into wrap-able tokens. Spaces are kept inside tokens so that
 * joining the tokens with '' gives back the original text.
 */
export function tokenizeForWrap(text: string): string[] {
  const seg = getSegmenter('word');
  if (seg) return Array.from(seg.segment(text), (s) => s.segment);
  // Fallback: split on spaces, keep them
  return text.split(/(\s+)/).filter(Boolean);
}

function splitGraphemes(text: string): string[] {
  const seg = getSegmenter('grapheme');
  if (seg) return Array.from(seg.segment(text), (s) => s.segment);
  // Fallback: keep Thai combining marks with their base
  return text.match(/[\s\S][\u0E31\u0E34-\u0E3A\u0E47-\u0E4E]*/g) || [text];
}

/**
 * Wrap text to `maxWidth` using Thai word segmentation.
 * `measure` returns the width of a string in points.
 */
export function wrapThaiText(
  text: string,
  maxWidth: number,
  measure: (t: string) => number
): string[] {
  const out: string[] = [];
  for (const paragraph of text.split(/\r?\n/)) {
    if (paragraph === '') {
      out.push('');
      continue;
    }
    let line = '';
    for (const token of tokenizeForWrap(paragraph)) {
      if (measure(line + token) <= maxWidth) {
        line += token;
        continue;
      }
      if (line.trim() !== '') {
        out.push(line.trimEnd());
        line = token.trimStart();
      } else {
        line = token;
      }
      // A single token wider than the line → break between grapheme clusters
      if (measure(line) > maxWidth) {
        let part = '';
        for (const g of splitGraphemes(line)) {
          if (part && measure(part + g) > maxWidth) {
            out.push(part);
            part = g;
          } else {
            part += g;
          }
        }
        line = part;
      }
    }
    out.push(line.trimEnd());
  }
  return out;
}

// ---------------------------------------------------------------------------
// Patch installation
// ---------------------------------------------------------------------------

let installed = false;

/**
 * Patch pdf-lib so every tool gets correct Thai output:
 *  - PDFPage.drawText: font fallback + GPOS-correct shaping + Thai wrapping
 *  - PDFFont.widthOfTextAtSize: font fallback + shaped measurement
 */
export function installThaiSupport(pdfLib: PDFLibModule): void {
  if (installed) return;
  installed = true;

  const L: Any = pdfLib;
  const PageProto = L.PDFPage.prototype;
  const FontProto = L.PDFFont.prototype;
  const originalDrawText = PageProto.drawText;
  const originalWidth = FontProto.widthOfTextAtSize;

  FontProto.widthOfTextAtSize = function (this: Any, text: string, size: number) {
    if (containsThai(text)) {
      const f = resolveFontForText(pdfLib, this, text);
      if (f?.embedder?.font?.layout) return measureShaped(f, text, size);
    }
    return originalWidth.call(this, text, size);
  };

  PageProto.drawText = function (this: Any, text: string, options: Any = {}) {
    if (typeof text !== 'string' || !needsShaping(text)) {
      return originalDrawText.call(this, text, options);
    }

    const requestedFont = options.font ?? this.getFont?.()[0];
    if (!requestedFont) return originalDrawText.call(this, text, options);

    const font = resolveFontForText(pdfLib, requestedFont, text);
    if (!font?.embedder?.font?.layout) {
      // Could not get a shaping-capable font; let pdf-lib try (may throw)
      return originalDrawText.call(this, text, options);
    }

    try {
      drawShapedText(pdfLib, this, text, { ...options, font });
    } catch (err) {
      console.warn('[TectSkill PDF] Shaped Thai drawing failed, falling back:', err);
      originalDrawText.call(this, text, { ...options, font });
    }
  };
}

/** Low-level shaped draw. Mirrors pdf-lib's drawText behaviour & options. */
function drawShapedText(pdfLib: PDFLibModule, page: Any, text: string, options: Any): void {
  const L: Any = pdfLib;
  const { oldFont, newFont, newFontKey } = page.setOrEmbedFont(options.font);
  const size: number = options.size || page.fontSize;
  const lineHeight: number = options.lineHeight ?? page.lineHeight ?? size * 1.2;
  const unitsPerEm: number = newFont.embedder.font.unitsPerEm;
  const scale = size / unitsPerEm;

  const clean = text.replace(/\t/g, '    ');
  const lines =
    options.maxWidth === undefined
      ? clean.split(/\r\n|\r|\n/)
      : wrapThaiText(clean, options.maxWidth, (t) => measureShaped(newFont, t, size));

  const gsKey = page.maybeEmbedGraphicsState({
    opacity: options.opacity,
    blendMode: options.blendMode,
  });

  const zero = L.degrees(0);
  const ops: Any[] = [
    L.pushGraphicsState(),
    gsKey && L.setGraphicsState(gsKey),
    L.beginText(),
    L.setFillingColor(options.color ?? page.fontColor),
    L.setFontAndSize(newFontKey, size),
    L.rotateAndSkewTextRadiansAndTranslate(
      L.toRadians(options.rotate ?? zero),
      L.toRadians(options.xSkew ?? zero),
      L.toRadians(options.ySkew ?? zero),
      options.x ?? page.x,
      options.y ?? page.y
    ),
  ].filter(Boolean);

  // Td moves relative to the start of the current text line, so we track it
  let curX = 0;
  let curY = 0;
  lines.forEach((line, lineIdx) => {
    if (!line) return;
    const baseY = -lineIdx * lineHeight;
    const { runs } = shapeLine(newFont, line);
    for (const run of runs) {
      const tx = run.x * scale;
      const ty = baseY + run.y * scale;
      ops.push(L.moveText(tx - curX, ty - curY));
      curX = tx;
      curY = ty;
      ops.push(L.showText(L.PDFHexString.of(run.hex)));
    }
  });

  ops.push(L.endText(), L.popGraphicsState());
  page.getContentStream().push(...ops);

  if (options.font) {
    if (oldFont) page.setFont(oldFont);
    else page.resetFont();
  }
}
