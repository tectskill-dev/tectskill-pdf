/**
 * Thai tool content (TectSkill PDF)
 *
 * ชื่อเครื่องมือ คำอธิบายสั้น และคำอธิบายหลักเป็นภาษาไทย
 * ส่วน howToUse / useCases / faq ยังใช้ภาษาอังกฤษจาก en.ts (รอแปลในรอบถัดไป)
 */

import type { ToolContent } from '@/types/tool';
import { toolContentEn } from './en';

const thaiText: Record<string, { title: string; metaDescription: string }> = {
  "pdf-multi-tool": {
    "title": "เครื่องมือ PDF อเนกประสงค์",
    "metaDescription": "แก้ไข PDF ครบในที่เดียว: รวม แยก จัดเรียง ลบ หมุน และดึงหน้า ได้ในเครื่องมือเดียว"
  },
  "merge-pdf": {
    "title": "รวมไฟล์เป็น PDF",
    "metaDescription": "รวม PDF รูปภาพ (JPG/PNG) เอกสาร Office (Word/Excel/PPT) และข้อความเป็น PDF ไฟล์เดียว เรียงลำดับด้วยการลากวาง"
  },
  "rotate-custom": {
    "title": "หมุนตามมุมที่กำหนด",
    "metaDescription": "หมุนหน้า PDF ได้ทุกมุม ปรับละเอียดเพื่อแก้เอกสารสแกนที่เอียง"
  },
  "grid-combine": {
    "title": "รวม PDF แบบตาราง",
    "metaDescription": "รวมหลาย PDF ลงหน้าเดียวแบบตาราง 2, 4, 6, 9 หรือมากกว่า พร้อมเส้นขอบและระยะห่าง"
  },
  "split-pdf": {
    "title": "แยก PDF",
    "metaDescription": "แยกไฟล์ PDF เป็นหลายไฟล์ ดึงหน้าที่ต้องการหรือแบ่งตามช่วงหน้า"
  },
  "compress-pdf": {
    "title": "บีบอัด PDF",
    "metaDescription": "ลดขนาดไฟล์ PDF โดยคงคุณภาพ เหมาะสำหรับส่งอีเมลหรืออัปโหลด"
  },
  "edit-pdf": {
    "title": "แก้ไข PDF",
    "metaDescription": "แก้ข้อความและรูปภาพใน PDF ได้โดยตรง คลิกย่อหน้าเพื่อแก้ แทนที่รูป และค้นหา-แทนที่ทั้งเอกสาร รองรับภาษาไทย"
  },
  "jpg-to-pdf": {
    "title": "JPG เป็น PDF",
    "metaDescription": "แปลงรูป JPG เป็น PDF รวมหลายรูปเป็นไฟล์เดียว"
  },
  "sign-pdf": {
    "title": "ลงลายเซ็น PDF",
    "metaDescription": "ใส่ลายเซ็นอิเล็กทรอนิกส์ใน PDF วาด พิมพ์ หรืออัปโหลดลายเซ็นของคุณ"
  },
  "crop-pdf": {
    "title": "ครอป PDF",
    "metaDescription": "ตัดขอบหน้า PDF ลบส่วนที่ไม่ต้องการได้อย่างแม่นยำ"
  },
  "extract-pages": {
    "title": "ดึงหน้า PDF",
    "metaDescription": "ดึงหน้าที่ต้องการออกจาก PDF แล้วบันทึกเป็นไฟล์ใหม่"
  },
  "organize-pdf": {
    "title": "จัดเรียงหน้า PDF",
    "metaDescription": "เรียงลำดับ ทำสำเนา และลบหน้า PDF ด้วยการลากวาง"
  },
  "delete-pages": {
    "title": "ลบหน้า PDF",
    "metaDescription": "ลบหน้าที่ไม่ต้องการออกจาก PDF ได้ง่าย ๆ"
  },
  "bookmark": {
    "title": "แก้ไขบุ๊กมาร์ก",
    "metaDescription": "เพิ่ม แก้ไข และจัดการบุ๊กมาร์ก PDF สร้างโครงสร้างนำทางให้เอกสาร"
  },
  "table-of-contents": {
    "title": "สร้างสารบัญ",
    "metaDescription": "สร้างสารบัญให้ PDF จากบุ๊กมาร์ก คลิกเพื่อไปยังหน้านั้นได้"
  },
  "page-numbers": {
    "title": "ใส่เลขหน้า",
    "metaDescription": "ใส่เลขหน้าใน PDF กำหนดตำแหน่ง รูปแบบ และเลขเริ่มต้นได้"
  },
  "add-watermark": {
    "title": "ใส่ลายน้ำ",
    "metaDescription": "ใส่ลายน้ำข้อความ (รองรับภาษาไทย) หรือรูปภาพใน PDF เพื่อป้องกันและแสดงแบรนด์"
  },
  "header-footer": {
    "title": "หัวและท้ายกระดาษ",
    "metaDescription": "ใส่หัวกระดาษและท้ายกระดาษใน PDF พร้อมเลขหน้า วันที่ และข้อความภาษาไทย"
  },
  "invert-colors": {
    "title": "กลับสี",
    "metaDescription": "กลับสี PDF สำหรับอ่านในโหมดมืด"
  },
  "background-color": {
    "title": "สีพื้นหลัง",
    "metaDescription": "เปลี่ยนหรือใส่สีพื้นหลังให้หน้า PDF"
  },
  "text-color": {
    "title": "เปลี่ยนสีข้อความ",
    "metaDescription": "เปลี่ยนสีข้อความทั้งหมดใน PDF"
  },
  "add-stamps": {
    "title": "ใส่ตราประทับ",
    "metaDescription": "ใส่ตราประทับใน PDF ใช้ตราสำเร็จรูปหรือรูปของคุณเอง สำหรับอนุมัติ ตรวจแบบ และอื่น ๆ"
  },
  "remove-annotations": {
    "title": "ลบคำอธิบายประกอบ",
    "metaDescription": "ลบความเห็น ไฮไลต์ และเครื่องหมายต่าง ๆ ออกจาก PDF"
  },
  "form-filler": {
    "title": "กรอกฟอร์ม PDF",
    "metaDescription": "กรอกฟอร์ม PDF ออนไลน์ได้โดยไม่ต้องพิมพ์ออกมา รองรับภาษาไทย"
  },
  "form-creator": {
    "title": "สร้างฟอร์ม PDF",
    "metaDescription": "สร้างฟอร์ม PDF ที่กรอกได้ เพิ่มช่องข้อความ ช่องติ๊ก และดรอปดาวน์"
  },
  "remove-blank-pages": {
    "title": "ลบหน้าว่าง",
    "metaDescription": "ตรวจหาและลบหน้าว่างใน PDF อัตโนมัติ"
  },
  "image-to-pdf": {
    "title": "รูปภาพเป็น PDF",
    "metaDescription": "แปลงรูปภาพทุกแบบเป็น PDF รองรับ JPG, PNG, WebP, BMP, TIFF, SVG และ HEIC"
  },
  "png-to-pdf": {
    "title": "PNG เป็น PDF",
    "metaDescription": "แปลงรูป PNG เป็น PDF คงพื้นโปร่งใสและรวมหลายไฟล์ได้"
  },
  "webp-to-pdf": {
    "title": "WebP เป็น PDF",
    "metaDescription": "แปลงรูป WebP เป็น PDF โดยคงคุณภาพ"
  },
  "svg-to-pdf": {
    "title": "SVG เป็น PDF",
    "metaDescription": "แปลงภาพเวกเตอร์ SVG เป็น PDF คงความคมชัดทุกขนาด"
  },
  "bmp-to-pdf": {
    "title": "BMP เป็น PDF",
    "metaDescription": "แปลงรูป BMP เป็น PDF โดยคงคุณภาพ"
  },
  "psd-to-pdf": {
    "title": "PSD เป็น PDF",
    "metaDescription": "แปลงไฟล์ Photoshop (PSD) เป็น PDF รองรับหลายไฟล์และคงคุณภาพภาพ"
  },
  "heic-to-pdf": {
    "title": "HEIC เป็น PDF",
    "metaDescription": "แปลงรูป HEIC จาก iPhone เป็น PDF ได้ง่าย ๆ"
  },
  "tiff-to-pdf": {
    "title": "TIFF เป็น PDF",
    "metaDescription": "แปลงรูป TIFF เป็น PDF รองรับ TIFF หลายหน้าและคุณภาพสูง"
  },
  "txt-to-pdf": {
    "title": "ข้อความเป็น PDF",
    "metaDescription": "แปลงไฟล์ข้อความเป็น PDF กำหนดฟอนต์ ขอบ และเลย์เอาต์ได้ รองรับภาษาไทยพร้อมตัดคำอัตโนมัติ"
  },
  "json-to-pdf": {
    "title": "JSON เป็น PDF",
    "metaDescription": "แปลงไฟล์ JSON เป็น PDF ที่จัดรูปแบบอ่านง่าย"
  },
  "word-to-pdf": {
    "title": "Word เป็น PDF",
    "metaDescription": "แปลงเอกสาร Word (DOCX) เป็น PDF คงรูปแบบและเลย์เอาต์"
  },
  "excel-to-pdf": {
    "title": "Excel เป็น PDF",
    "metaDescription": "แปลงสเปรดชีต Excel (XLSX) เป็น PDF คงตารางและข้อมูล"
  },
  "pptx-to-pdf": {
    "title": "PowerPoint เป็น PDF",
    "metaDescription": "แปลงงานนำเสนอ PowerPoint (PPTX) เป็น PDF เพื่อแชร์ได้ง่าย"
  },
  "xps-to-pdf": {
    "title": "XPS เป็น PDF",
    "metaDescription": "แปลงเอกสาร XPS เป็น PDF คงเลย์เอาต์และกราฟิก"
  },
  "rtf-to-pdf": {
    "title": "RTF เป็น PDF",
    "metaDescription": "แปลงไฟล์ RTF เป็น PDF คงรูปแบบข้อความ"
  },
  "epub-to-pdf": {
    "title": "EPUB เป็น PDF",
    "metaDescription": "แปลง e-book EPUB เป็น PDF คงรูปแบบ รูปภาพ และโครงสร้างบท"
  },
  "mobi-to-pdf": {
    "title": "MOBI เป็น PDF",
    "metaDescription": "แปลง e-book MOBI (Kindle) เป็น PDF คุณภาพสูง"
  },
  "djvu-to-pdf": {
    "title": "DJVU เป็น PDF",
    "metaDescription": "แปลงไฟล์ DJVU เป็น PDF เหมาะกับเอกสารสแกนและหนังสือ"
  },
  "fb2-to-pdf": {
    "title": "FB2 เป็น PDF",
    "metaDescription": "แปลง e-book FictionBook (FB2) เป็น PDF รองรับหลายไฟล์"
  },
  "pdf-to-jpg": {
    "title": "PDF เป็น JPG",
    "metaDescription": "แปลงหน้า PDF เป็นรูป JPG คุณภาพสูง กำหนดความละเอียดได้"
  },
  "pdf-to-png": {
    "title": "PDF เป็น PNG",
    "metaDescription": "แปลงหน้า PDF เป็นรูป PNG คุณภาพไม่สูญเสีย รองรับพื้นโปร่งใส"
  },
  "pdf-to-webp": {
    "title": "PDF เป็น WebP",
    "metaDescription": "แปลงหน้า PDF เป็นรูป WebP บีบอัดได้ดีเยี่ยม"
  },
  "pdf-to-bmp": {
    "title": "PDF เป็น BMP",
    "metaDescription": "แปลงหน้า PDF เป็นรูป BMP ใช้ได้กับทุกโปรแกรม"
  },
  "pdf-to-tiff": {
    "title": "PDF เป็น TIFF",
    "metaDescription": "แปลง PDF เป็นรูป TIFF คุณภาพระดับมืออาชีพ รองรับหลายหน้า"
  },
  "pdf-to-cbz": {
    "title": "PDF เป็น CBZ",
    "metaDescription": "แปลง PDF เป็นไฟล์การ์ตูน CBZ ความละเอียดสูง พร้อมข้อมูลเมตาสำหรับโปรแกรมอ่านการ์ตูน"
  },
  "pdf-to-svg": {
    "title": "PDF เป็น SVG",
    "metaDescription": "แปลงหน้า PDF เป็นภาพเวกเตอร์ SVG ขยายได้ไม่แตก ส่งออกทีละหน้าได้"
  },
  "pdf-to-greyscale": {
    "title": "PDF เป็นขาวดำ",
    "metaDescription": "แปลง PDF สีเป็นขาวดำ ลดขนาดไฟล์และเตรียมพิมพ์ขาวดำ"
  },
  "pdf-to-json": {
    "title": "PDF เป็น JSON",
    "metaDescription": "ดึงเนื้อหา PDF เป็น JSON ได้ข้อมูลแบบมีโครงสร้าง"
  },
  "pdf-to-pptx": {
    "title": "PDF เป็น PowerPoint",
    "metaDescription": "แปลง PDF เป็นงานนำเสนอ PowerPoint แต่ละหน้าเป็นสไลด์คุณภาพสูง"
  },
  "pdf-to-excel": {
    "title": "PDF เป็น Excel",
    "metaDescription": "แปลง PDF เป็น Excel ดึงตารางเป็นไฟล์ XLSX"
  },
  "ocr-pdf": {
    "title": "OCR PDF",
    "metaDescription": "ทำให้ PDF สแกนค้นหาข้อความได้ ดึงข้อความจากภาพและเอกสารสแกน รองรับภาษาไทย"
  },
  "alternate-merge": {
    "title": "รวมแบบสลับหน้า",
    "metaDescription": "รวม PDF โดยสลับหน้ากัน เหมาะกับการรวมสแกนหน้า-หลัง"
  },
  "add-attachments": {
    "title": "เพิ่มไฟล์แนบ",
    "metaDescription": "ฝังไฟล์ทุกประเภทลงใน PDF"
  },
  "extract-attachments": {
    "title": "ดึงไฟล์แนบ",
    "metaDescription": "ดึงไฟล์ที่ฝังอยู่ใน PDF ออกมาทั้งหมด"
  },
  "extract-images": {
    "title": "ดึงรูปภาพจาก PDF",
    "metaDescription": "ดึงรูปภาพทั้งหมดใน PDF ดาวน์โหลดทีละรูปหรือเป็น ZIP กรองรูปเล็กออกอัตโนมัติ"
  },
  "edit-attachments": {
    "title": "แก้ไขไฟล์แนบ",
    "metaDescription": "ดู เปลี่ยนชื่อ และลบไฟล์แนบใน PDF"
  },
  "divide-pages": {
    "title": "แบ่งหน้า",
    "metaDescription": "แบ่งหน้า PDF เป็นหลายส่วนตามแนวนอนหรือแนวตั้ง"
  },
  "add-blank-page": {
    "title": "เพิ่มหน้าว่าง",
    "metaDescription": "แทรกหน้าว่างใน PDF ตำแหน่งใดก็ได้"
  },
  "reverse-pages": {
    "title": "กลับลำดับหน้า",
    "metaDescription": "กลับลำดับหน้า PDF จากหน้าสุดท้ายไปหน้าแรก"
  },
  "rotate-pdf": {
    "title": "หมุน PDF",
    "metaDescription": "หมุนหน้า PDF 90, 180 หรือ 270 องศา"
  },
  "overlay-pdf": {
    "title": "ซ้อน PDF",
    "metaDescription": "ซ้อนหน้าจาก PDF หนึ่งทับหรือรองใต้อีก PDF เหมาะกับตราประทับ หัวจดหมาย และกรอบแบบ"
  },
  "timestamp-pdf": {
    "title": "ประทับเวลา PDF",
    "metaDescription": "ใส่ตราประทับเวลาที่เชื่อถือได้ตามมาตรฐาน RFC 3161 เพื่อพิสูจน์ว่าเอกสารมีอยู่ ณ เวลานั้น"
  },
  "add-page-labels": {
    "title": "ใส่ป้ายหน้า",
    "metaDescription": "กำหนดป้ายหน้าเอง รองรับเลขโรมัน คำนำหน้า และช่วงหน้าที่ซับซ้อน"
  },
  "n-up-pdf": {
    "title": "N-Up PDF",
    "metaDescription": "พิมพ์หลายหน้าต่อแผ่น สร้างแบบ 2, 4 หรือกำหนดเอง"
  },
  "combine-single-page": {
    "title": "รวมเป็นหน้าเดียว",
    "metaDescription": "ต่อหน้า PDF เป็นหน้าเดียวยาวต่อเนื่อง"
  },
  "view-metadata": {
    "title": "ดูข้อมูลเมตา",
    "metaDescription": "ดูคุณสมบัติเอกสาร PDF เช่น ผู้เขียน ชื่อเรื่อง และวันที่"
  },
  "edit-metadata": {
    "title": "แก้ไขข้อมูลเมตา",
    "metaDescription": "แก้ไขชื่อเรื่อง ผู้เขียน เรื่อง และคำสำคัญของ PDF"
  },
  "pdf-to-zip": {
    "title": "รวม PDF เป็น ZIP",
    "metaDescription": "แพ็ก PDF หลายไฟล์เป็น ZIP ไฟล์เดียว"
  },
  "compare-pdfs": {
    "title": "เปรียบเทียบ PDF",
    "metaDescription": "เปรียบเทียบ PDF สองไฟล์ ไฮไลต์จุดที่ต่างกันระหว่างเวอร์ชัน"
  },
  "posterize-pdf": {
    "title": "แบ่ง PDF เป็นโปสเตอร์",
    "metaDescription": "แบ่งหน้า PDF ใหญ่เป็นชิ้นที่พิมพ์ได้ แล้วนำมาต่อเป็นโปสเตอร์"
  },
  "fix-page-size": {
    "title": "ปรับขนาดหน้า",
    "metaDescription": "ปรับทุกหน้าใน PDF ให้เป็นขนาดเดียวกัน"
  },
  "linearize-pdf": {
    "title": "Linearize PDF",
    "metaDescription": "ปรับ PDF ให้เปิดบนเว็บได้เร็ว โหลดทีละส่วน"
  },
  "page-dimensions": {
    "title": "ขนาดหน้า PDF",
    "metaDescription": "วิเคราะห์และดูขนาดของทุกหน้าในเอกสาร"
  },
  "remove-restrictions": {
    "title": "ปลดข้อจำกัด PDF",
    "metaDescription": "ปลดข้อจำกัดการพิมพ์ คัดลอก และแก้ไข PDF"
  },
  "repair-pdf": {
    "title": "ซ่อมแซม PDF",
    "metaDescription": "ซ่อมไฟล์ PDF ที่เสียหาย กู้คืนเอกสาร"
  },
  "encrypt-pdf": {
    "title": "เข้ารหัส PDF",
    "metaDescription": "ใส่รหัสผ่านและกำหนดสิทธิ์การใช้ไฟล์ PDF"
  },
  "sanitize-pdf": {
    "title": "ทำความสะอาด PDF",
    "metaDescription": "ลบข้อมูลแฝง ข้อมูลเมตา สคริปต์ และข้อมูลสำคัญออกจาก PDF"
  },
  "find-and-redact": {
    "title": "ค้นหาและปกปิด",
    "metaDescription": "ค้นหาและปกปิดข้อความทุกหน้าใน PDF เช่น เลขบัญชี ชื่อ และข้อมูลสำคัญ"
  },
  "redact-pdf": {
    "title": "ปกปิดข้อมูล PDF",
    "metaDescription": "ปิดทึบ ทำโมเสก หรือเบลอข้อมูลสำคัญใน PDF แบบถาวร พร้อมลบข้อมูลเมตา"
  },
  "decrypt-pdf": {
    "title": "ปลดล็อก PDF",
    "metaDescription": "ลบรหัสผ่านออกจาก PDF ที่ล็อกไว้"
  },
  "flatten-pdf": {
    "title": "Flatten PDF",
    "metaDescription": "ทำให้ฟอร์มและคำอธิบายประกอบติดถาวร แก้ไขไม่ได้"
  },
  "remove-metadata": {
    "title": "ลบข้อมูลเมตา",
    "metaDescription": "ลบข้อมูลผู้เขียน วันที่ และคุณสมบัติเอกสารออกจาก PDF"
  },
  "change-permissions": {
    "title": "เปลี่ยนสิทธิ์ PDF",
    "metaDescription": "กำหนดสิทธิ์การพิมพ์ คัดลอก และแก้ไข PDF"
  },
  "pdf-to-docx": {
    "title": "PDF เป็น Word",
    "metaDescription": "แปลง PDF เป็นเอกสาร Word (DOCX) ที่แก้ไขได้ คงรูปแบบและเลย์เอาต์"
  },
  "pdf-to-markdown": {
    "title": "PDF เป็น Markdown",
    "metaDescription": "แปลง PDF เป็น Markdown คงหัวข้อและรายการ"
  },
  "deskew-pdf": {
    "title": "แก้หน้าเอียง",
    "metaDescription": "ปรับหน้า PDF ที่สแกนเอียงให้ตรงอัตโนมัติ ตรวจจับมุมได้แม่นยำ"
  },
  "pdf-booklet": {
    "title": "สร้างรูปเล่ม PDF",
    "metaDescription": "จัดหน้า PDF เป็นรูปเล่มสำหรับพิมพ์และเย็บมุงหลังคา มีหลายรูปแบบตาราง"
  },
  "rasterize-pdf": {
    "title": "แปลง PDF เป็นภาพ",
    "metaDescription": "แปลงหน้า PDF เป็นภาพคุณภาพสูง ส่งออกเป็น PNG, JPEG หรือ WebP กำหนด DPI ได้"
  },
  "markdown-to-pdf": {
    "title": "Markdown เป็น PDF",
    "metaDescription": "แปลงไฟล์ Markdown เป็น PDF สวยงาม รองรับ GitHub Flavored Markdown และไฮไลต์โค้ด"
  },
  "email-to-pdf": {
    "title": "อีเมลเป็น PDF",
    "metaDescription": "แปลงไฟล์อีเมล (.eml, .msg) เป็น PDF คงรูปแบบ รูปภาพ ลิงก์ และฝังไฟล์แนบ"
  },
  "cbz-to-pdf": {
    "title": "CBZ เป็น PDF",
    "metaDescription": "แปลงไฟล์การ์ตูน CBZ เป็น PDF คงลำดับและคุณภาพภาพ"
  },
  "pdf-to-pdfa": {
    "title": "PDF เป็น PDF/A",
    "metaDescription": "แปลง PDF เป็น PDF/A สำหรับเก็บเอกสารระยะยาวตามมาตรฐาน ISO"
  },
  "font-to-outline": {
    "title": "แปลงฟอนต์เป็นเส้น",
    "metaDescription": "ตัดการพึ่งพาฟอนต์โดยแปลงหน้าเป็นภาพคุณภาพสูง เปิดได้เหมือนกันทุกเครื่อง"
  },
  "extract-tables": {
    "title": "ดึงตารางจาก PDF",
    "metaDescription": "ตรวจหาและดึงตารางจาก PDF ส่งออกเป็น JSON, Markdown หรือ CSV"
  },
  "ocg-manager": {
    "title": "จัดการเลเยอร์ PDF (OCG)",
    "metaDescription": "ดู เปิด/ปิด เพิ่ม ลบ และเปลี่ยนชื่อเลเยอร์ใน PDF เหมาะกับแบบก่อสร้างที่มีหลายเลเยอร์"
  },
  "pdf-reader": {
    "title": "อ่าน PDF",
    "metaDescription": "อ่าน PDF บนเบราว์เซอร์ฟรี ดู เลื่อน ซูม หมุน และพิมพ์เอกสาร"
  },
  "digital-sign-pdf": {
    "title": "ลายเซ็นดิจิทัล",
    "metaDescription": "ลงลายเซ็นดิจิทัล X.509 ใน PDF ด้วยใบรับรอง PFX, P12 หรือ PEM"
  },
  "validate-signature": {
    "title": "ตรวจสอบลายเซ็น",
    "metaDescription": "ตรวจลายเซ็นดิจิทัลใน PDF ความถูกต้องของใบรับรอง ผู้ลงนาม และความสมบูรณ์ของเอกสาร"
  },
  "ai-pdf-reflower": {
    "title": "จัดเลย์เอาต์ PDF ใหม่ด้วย AI",
    "metaDescription": "จัดหน้า PDF ใหม่ให้อ่านบนมือถือได้สบาย ส่งออกเป็น Markdown และ EPUB"
  },
  "citation-linker": {
    "title": "เชื่อมลิงก์อ้างอิง",
    "metaDescription": "สแกนเลขอ้างอิงใน PDF แล้วทำเป็นลิงก์ DOI หรือลิงก์กระโดดไปหน้าที่คลิกได้"
  },
  "vector-extractor": {
    "title": "ดึงเวกเตอร์จาก PDF",
    "metaDescription": "แปลง PDF เป็น SVG คุณภาพสูง เลือก เปลี่ยนสี และส่งออกแผนภูมิ โลโก้ และกราฟิกเวกเตอร์"
  },
  "deep-sanitize": {
    "title": "ล้างข้อมูลเมตาเชิงลึก",
    "metaDescription": "ลบข้อมูลผู้เขียน ประวัติการแก้ไข เลเยอร์ซ่อน และวัตถุตกค้างใน PDF เพื่อความเป็นส่วนตัวสูงสุด"
  },
  "booklet-folding-simulator": {
    "title": "จำลองการพับรูปเล่ม 3 มิติ",
    "metaDescription": "จัดหน้า PDF ลงแผ่นพิมพ์สำหรับพับ พร้อมภาพจำลองการพับ 3 มิติและการเย็บมุงหลังคา"
  },
  "pdf-to-slide": {
    "title": "PDF เป็นสไลด์",
    "metaDescription": "วิเคราะห์โครงเรื่อง PDF ดึงแผนภูมิเวกเตอร์ แล้วสร้างเป็นสไลด์ PPTX ที่แก้ไขได้"
  },
  "form-logic-designer": {
    "title": "ออกแบบตรรกะฟอร์ม",
    "metaDescription": "ออกแบบเงื่อนไขของฟอร์มด้วยการต่อโหนด แล้วใส่สคริปต์ AcroJS ลงใน PDF"
  },
  "eink-optimizer": {
    "title": "ปรับ PDF สำหรับ e-Ink",
    "metaDescription": "ปรับ PDF ให้อ่านบนจอ e-Ink ด้วยการล้างพื้นหลัง แปลงขาวดำ และทำตัวอักษรหนา"
  },
  "cert-cryptor": {
    "title": "เข้ารหัสและลงนามด้วยใบรับรอง",
    "metaDescription": "ป้องกัน PDF ด้วยการเข้ารหัสแบบใบรับรอง พร้อมตราครั่ง 3 มิติและลายเซ็น PKCS#7"
  },
  "passport-id-composer": {
    "title": "จัดบัตรสองด้านลง A4",
    "metaDescription": "จัดด้านหน้าและด้านหลังของบัตรประชาชนหรือพาสปอร์ตลงกระดาษ A4 หน้าเดียว พร้อมลายน้ำกันสำเนา"
  },
  "annotation-exporter": {
    "title": "ส่งออกคำอธิบายประกอบ",
    "metaDescription": "ดึงความเห็น โน้ต ไฮไลต์ และขีดเส้นใต้จาก PDF จัดเป็นสมุดโน้ต Markdown/JSON ตามบท"
  },
  "batch-watermark-remover": {
    "title": "ลบลายน้ำหลายไฟล์",
    "metaDescription": "ลบข้อความลายน้ำและรูปภาพลายน้ำออกจาก PDF โดยไม่ทำให้เลย์เอาต์เสีย"
  },
  "smart-data-redactor": {
    "title": "ปกปิดข้อมูลส่วนบุคคล",
    "metaDescription": "ตรวจหาเบอร์โทร อีเมล และเลขบัตรอัตโนมัติ ปิดทึบ และลบข้อความเดิมจริง"
  },
  "bookmarks-auto-generator": {
    "title": "สร้างบุ๊กมาร์กอัตโนมัติ",
    "metaDescription": "วิเคราะห์ลำดับหัวข้อและรูปแบบ (เช่น บทที่) เพื่อสร้างบุ๊กมาร์กใน PDF"
  },
  "batch-barcode-injector": {
    "title": "ใส่บาร์โค้ดหลายหน้า",
    "metaDescription": "สร้าง QR/Code128 แล้ววางลงหลายหน้า PDF อย่างแม่นยำพร้อมเส้นช่วยจัดแนว"
  },
  "signature-ink-optimizer": {
    "title": "ดึงลายเซ็นและตราประทับ",
    "metaDescription": "ดึงลายเซ็นและตราประทับสีแดงจากรูปถ่าย ลบเงากระดาษ และส่งออกเป็น PNG พื้นใส"
  },
  "dead-link-debugger": {
    "title": "แก้ลิงก์เสีย",
    "metaDescription": "สแกนลิงก์ทั้งหมดใน PDF ตรวจว่าเข้าถึงได้ และเปลี่ยนเส้นทางลิงก์"
  },
  "interactive-toc-generator": {
    "title": "สร้างสารบัญแบบคลิกได้",
    "metaDescription": "สร้างหน้าสารบัญสวยงาม แทรกไว้หน้าเนื้อหา และเชื่อมลิงก์ไป-กลับภายในเอกสาร"
  },
  "global-invoice-parser": {
    "title": "แปลงสกุลเงินใบแจ้งหนี้",
    "metaDescription": "ดึงยอดเงินจากใบแจ้งหนี้ต่างประเทศ คำนวณ และประทับตารางอัตราแลกเปลี่ยน"
  },
  "pdf-deskew-aligner": {
    "title": "แก้หน้าสแกนเอียงอัตโนมัติ",
    "metaDescription": "ตรวจและแก้การหมุนหรือการเอียงของหน้า PDF ที่ถ่ายจากมือถือหรือสแกน"
  },
  "pdf-two-column-reflower": {
    "title": "จัดบทความสองคอลัมน์ใหม่",
    "metaDescription": "แปลงบทความ IEEE/ACM แบบสองคอลัมน์เป็นคอลัมน์เดียว อ่านบนมือถือและ e-Reader ได้สบาย"
  },
  "pdf-page-resizer-uniform": {
    "title": "ปรับหน้า PDF ให้ขนาดเดียวกัน",
    "metaDescription": "ปรับ PDF ที่มีหลายขนาด (A4, A3, Letter) ให้เป็นขนาดเดียวกัน จัดกึ่งกลางพร้อมเว้นขอบ"
  },
  "handwriting-ink-contrast-booster": {
    "title": "เพิ่มความชัดลายมือ",
    "metaDescription": "ดึงลายเซ็นหมึกน้ำเงินหรือดำจากรูปถ่าย ลบคราบกระดาษเหลือง และเพิ่มความชัดของหมึก"
  },
  "pdf-spine-bookbinder": {
    "title": "คำนวณความหนาสันหนังสือ",
    "metaDescription": "คำนวณความหนาสันจากจำนวนหน้าและแกรมกระดาษ และสร้างแบบปกพร้อมเส้นพับสำหรับพิมพ์"
  },
  "pdf-signature-anchor-helper": {
    "title": "ตัวช่วยตำแหน่งลงนาม",
    "metaDescription": "หาตำแหน่งลงนามในสัญญาอัตโนมัติ พร้อมป้ายนำทางให้ลงนามได้รวดเร็ว"
  },
  "pdf-lossless-slicer": {
    "title": "ตัดแบบไม่เสียคุณภาพ",
    "metaDescription": "ตัดบางส่วนของแบบ CAD แผนที่ หรือแผนภูมิขนาดใหญ่ใน PDF โดยคงความละเอียดเวกเตอร์และลดขนาดไฟล์"
  },
  "pdf-scratchpad-canvas": {
    "title": "เพิ่มพื้นที่จดโน้ต",
    "metaDescription": "ต่อพื้นที่ตาราง บรรทัด หรือแบบ Cornell ข้างหน้า PDF สำหรับจดโน้ตและทดเลข"
  },
  "photo-tiling-prepress": {
    "title": "จัดรูปติดบัตรสำหรับพิมพ์",
    "metaDescription": "ครอปและจัดเรียงรูปติดบัตร/พาสปอร์ตลงกระดาษโฟโต้ 5\" หรือ 6\" พร้อมเส้นตัดที่แม่นยำ"
  }
};

export const toolContentTh: Record<string, ToolContent> = Object.fromEntries(
  Object.entries(toolContentEn).map(([id, en]) => {
    const th = thaiText[id];
    if (!th) return [id, en];
    return [
      id,
      {
        ...en,
        title: th.title,
        metaDescription: th.metaDescription,
        keywords: [th.title, ...en.keywords],
        description: `<p>${th.metaDescription}</p><p>ประมวลผลทั้งหมดในเบราว์เซอร์ของคุณ ไฟล์ไม่ถูกอัปโหลดไปยังเซิร์ฟเวอร์ใด ๆ ปลอดภัยและเป็นส่วนตัว</p>`,
      },
    ];
  })
);
