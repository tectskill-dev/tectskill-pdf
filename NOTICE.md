# NOTICE

**TectSkill PDF** is a modified version of **PDFCraft**
(https://github.com/PDFCraftTool/pdfcraft), licensed under the
GNU Affero General Public License v3.0 (see `LICENSE`).

Modifications by TectSkill (2026):
- Thai (`th`) locale, set as the default language
- Thai text rendering fixes for PDF output (font fallback, OpenType mark
  positioning, Thai word wrapping) — `src/lib/pdf/thai/thai-text.ts`
- Thai UI typography (Sarabun font, line-height adjustments)
- Rebranding to "TectSkill PDF"

Bundled fonts: **Sarabun** © The Sarabun Project Authors
(https://github.com/cadsondemak/Sarabun), SIL Open Font License 1.1
(`public/fonts/Sarabun-OFL.txt`).

Under AGPL-3.0 §13, if you run this software as a network service, you must
offer its complete corresponding source code to its users.

## Architect tools (`public/arch-tools/`)

The seven architect tools (revision compare, measure to scale, sheet set
builder, stamp drawings, markup, compress drawings, print to scale) are by
TectSkill. They bundle these third-party components locally:

- PDF.js 3.11.174 — Apache License 2.0 (Mozilla)
- pdf-lib 1.17.1 — MIT License
- JSZip 3.10.1 — MIT License (dual MIT/GPLv3)
- pako 2.1.0 — MIT License
- jsPDF 2.5.1 — MIT License
- IBM Plex Sans Thai — SIL Open Font License 1.1 (`public/arch-tools/fonts/IBMPlexSansThai-OFL.txt`)
