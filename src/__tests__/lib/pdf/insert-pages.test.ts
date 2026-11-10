import { describe, it, expect } from 'vitest';
import { PDFDocument } from 'pdf-lib';
import { insertPages, parsePageSelection } from '@/lib/pdf/processors/insert-pages';

// Each page gets a unique width so we can read back the page order
async function makePdf(widths: number[], name: string): Promise<File> {
  const doc = await PDFDocument.create();
  widths.forEach((w) => doc.addPage([w, 800]));
  const bytes = await doc.save();
  const file = new File([new Uint8Array(bytes)], name, { type: 'application/pdf' });
  // jsdom's File has no arrayBuffer(); browsers do
  Object.defineProperty(file, 'arrayBuffer', { value: async () => bytes.buffer });
  return file;
}

async function widthsOf(blob: Blob): Promise<number[]> {
  const buf = await new Promise<ArrayBuffer>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(blob);
  });
  const doc = await PDFDocument.load(buf);
  return doc.getPages().map((p) => Math.round(p.getWidth()));
}

describe('parsePageSelection', () => {
  it('parses lists, ranges, reversed ranges and blanks', () => {
    expect(parsePageSelection('', 3)).toEqual([0, 1, 2]);
    expect(parsePageSelection('1-3, 5', 5)).toEqual([0, 1, 2, 4]);
    expect(parsePageSelection('3-1', 3)).toEqual([2, 1, 0]);
    expect(parsePageSelection('0', 3)).toBeNull();
    expect(parsePageSelection('4', 3)).toBeNull();
    expect(parsePageSelection('a-b', 3)).toBeNull();
  });
});

describe('insertPages', () => {
  it('inserts selected pages after page N', async () => {
    const main = await makePdf([101, 102, 103], 'main.pdf');
    const extra = await makePdf([201, 202, 203], 'extra.pdf');
    const out = await insertPages(main, extra, { mode: 'insert', position: 1, sourcePages: '3, 1' });
    expect(out.success).toBe(true);
    expect(await widthsOf(out.result as Blob)).toEqual([101, 203, 201, 102, 103]);
  });

  it('inserts at the beginning and the end', async () => {
    const main = await makePdf([101, 102], 'main.pdf');
    const extra = await makePdf([201], 'extra.pdf');
    const start = await insertPages(main, extra, { mode: 'insert', position: 0 });
    expect(await widthsOf(start.result as Blob)).toEqual([201, 101, 102]);
    const end = await insertPages(main, extra, { mode: 'insert', position: 2 });
    expect(await widthsOf(end.result as Blob)).toEqual([101, 102, 201]);
  });

  it('replaces a page range with the new pages', async () => {
    const main = await makePdf([101, 102, 103, 104, 105], 'set.pdf');
    const rev = await makePdf([302, 303], 'rev-b.pdf');
    const out = await insertPages(main, rev, { mode: 'replace', replaceFrom: 2, replaceTo: 3 });
    expect(out.success).toBe(true);
    expect(await widthsOf(out.result as Blob)).toEqual([101, 302, 303, 104, 105]);
    expect(out.filename).toBe('set_replaced.pdf');
  });

  it('rejects invalid ranges', async () => {
    const main = await makePdf([101, 102], 'main.pdf');
    const extra = await makePdf([201], 'extra.pdf');
    expect((await insertPages(main, extra, { mode: 'insert', position: 5 })).success).toBe(false);
    expect((await insertPages(main, extra, { mode: 'replace', replaceFrom: 2, replaceTo: 3 })).success).toBe(false);
    expect((await insertPages(main, extra, { mode: 'insert', position: 0, sourcePages: '2' })).success).toBe(false);
  });
});
