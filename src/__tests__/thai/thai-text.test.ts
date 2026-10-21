import { describe, it, expect } from 'vitest';
import * as pdfLib from 'pdf-lib';
import fs from 'fs';
import { installThaiSupport, preloadThaiSupport, wrapThaiText, embedThaiFont } from '@/lib/pdf/thai/thai-text';

describe('Thai text support', () => {
  it('draws Thai with standard fonts, custom fonts, rotation and wrapping', async () => {
    installThaiSupport(pdfLib);
    await preloadThaiSupport();
    const doc = await pdfLib.PDFDocument.create();
    const page = doc.addPage([595, 842]);
    const helv = await doc.embedFont(pdfLib.StandardFonts.Helvetica);
    const helvB = await doc.embedFont(pdfLib.StandardFonts.HelveticaBold);
    const thai = await embedThaiFont(doc);

    const sample = 'ปั้นน้ำเป็นตัว ญาติ ฐาน ที่นี่ ฝั่งฟั่น ปี่ ป่ั Hello 123';
    expect(helv.widthOfTextAtSize(sample, 20)).toBeGreaterThan(100);
    page.drawText('Helvetica fallback: ' + sample, { x: 30, y: 790, size: 18, font: helv });
    page.drawText('ตัวหนา: ' + sample, { x: 30, y: 760, size: 18, font: helvB });
    page.drawText('Sarabun: ' + sample, { x: 30, y: 730, size: 18, font: thai, color: pdfLib.rgb(0.8, 0, 0) });
    page.drawText('ลายน้ำ ห้ามเผยแพร่ ปั้น', {
      x: 150, y: 350, size: 48, font: helvB, opacity: 0.3, rotate: pdfLib.degrees(-30),
      color: pdfLib.rgb(0.2, 0.2, 0.8),
    });
    page.drawText(
      'ระบบนี้ช่วยให้สถาปนิกจัดการเอกสารแบบก่อสร้างได้ง่ายขึ้น โดยรองรับการตัดคำภาษาไทยอัตโนมัติเมื่อข้อความยาวเกินความกว้างของกรอบที่กำหนดไว้ และยังคงตำแหน่งวรรณยุกต์ให้ถูกต้อง',
      { x: 30, y: 650, size: 16, font: thai, maxWidth: 300, lineHeight: 24 }
    );
    const bytes = await doc.save();
    fs.writeFileSync('/tmp/thai-test.pdf', bytes);
    expect(bytes.length).toBeGreaterThan(1000);
  });

  it('wraps Thai text by words', () => {
    const lines = wrapThaiText('สวัสดีครับยินดีต้อนรับสู่ระบบ', 40, (t) => t.length * 4);
    expect(lines.length).toBeGreaterThan(1);
    expect(lines.join('')).toBe('สวัสดีครับยินดีต้อนรับสู่ระบบ');
  });
});
