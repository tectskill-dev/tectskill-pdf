# TectSkill PDF

ชุดเครื่องมือ PDF ภาษาไทย ทำงานบนเบราว์เซอร์ทั้งหมด ไฟล์ไม่ถูกอัปโหลดขึ้นเซิร์ฟเวอร์
พัฒนาต่อยอดจาก [PDFCraft](https://github.com/PDFCraftTool/pdfcraft) (AGPL-3.0)

## สิ่งที่ต่างจากต้นฉบับ

- ภาษาไทยเป็นค่าเริ่มต้น (`/th`) แปลหน้าเว็บครบ และชื่อเครื่องมือทั้ง 132 ตัวเป็นภาษาไทย
- **แก้การแสดงผลภาษาไทยใน PDF ที่สร้างขึ้น** (ลายน้ำ หัว-ท้ายกระดาษ เลขหน้า ตราประทับ
  Text to PDF กรอกฟอร์ม OCR และ Edit PDF)
  - ฟอนต์มาตรฐานของ PDF ไม่มีอักษรไทย → สลับไปใช้ Sarabun ที่ฝังมากับแอปอัตโนมัติ
  - วรรณยุกต์/สระลอยผิดที่ → วาดตามตำแหน่ง OpenType (GPOS) จริงของฟอนต์
  - ข้อความไทยยาวไม่ตัดบรรทัด → ตัดคำด้วย `Intl.Segmenter('th')`
  - โค้ดหลักอยู่ที่ `src/lib/pdf/thai/thai-text.ts` (ติดตั้งครั้งเดียวใน `loadPdfLib()`)
- ฟอนต์ UI ภาษาไทย Sarabun (ฝังในแอป ใช้ได้ออฟไลน์) และปรับระยะบรรทัดไม่ให้สระบนถูกตัด
- เปลี่ยนแบรนด์เป็น TectSkill PDF

## ติดตั้งและรัน (ต้องมี Node.js 20+)

```bash
npm install
npm run dev        # เปิด http://localhost:3000 → เข้า /th อัตโนมัติ
npm run build      # สร้างเว็บแบบ static ไว้ในโฟลเดอร์ out/
npm test           # รันชุดทดสอบ
```

> `npm run build` ต้องต่ออินเทอร์เน็ต เพราะฟอนต์ Inter / JetBrains Mono โหลดจาก Google Fonts ตอน build

นำโฟลเดอร์ `out/` ไปวางบนโฮสต์ static ใดก็ได้ (Netlify, Vercel, Cloudflare Pages, Hostinger)

## ก่อนเผยแพร่ ต้องแก้ค่าเหล่านี้

| ไฟล์ | ค่า | หมายเหตุ |
|---|---|---|
| `src/config/site.ts` | `url: 'https://tool.tectskill.com'` | ตั้งค่าแล้ว ถ้าวางไว้ใต้โฟลเดอร์ย่อย เช่น `/pdf` ให้ build ด้วย `NEXT_PUBLIC_BASE_PATH=/pdf` |
| `src/config/site.ts`, Header, Footer, Contact | `github.com/tectskill-dev/tectskill-pdf` | **ต้องสร้าง repo สาธารณะจริง** (AGPL) |
| `src/lib/updater.ts` | `GITHUB_REPO` | repo ที่ใช้ตรวจอัปเดตแอปเดสก์ท็อป |
| หน้าติดต่อ | `tectskill@gmail.com` | ตั้งค่าแล้ว (ฟอร์มเปิดแอปอีเมลของผู้ใช้) |

## เงื่อนไขสัญญาอนุญาต (AGPL-3.0)

- ต้องคงไฟล์ `LICENSE` และเครดิต PDFCraft ไว้ (อยู่ใน Footer, หน้า About และ `NOTICE.md`)
- ถ้าเปิดให้คนใช้งานผ่านเว็บ ต้องเปิดซอร์สโค้ดของเวอร์ชันนี้ให้ผู้ใช้เข้าถึงได้
- ฟอนต์ Sarabun ใช้สัญญา SIL OFL 1.1 (`public/fonts/Sarabun-OFL.txt`)

## ส่วนที่ยังเป็นภาษาอังกฤษ

- วิธีใช้งาน / ตัวอย่างการใช้งาน / FAQ ในหน้ารายละเอียดของแต่ละเครื่องมือ
  (`src/config/tool-content/th.ts` ดึงจาก `en.ts` ไว้ก่อน)
- ข้อความที่เขียนตายตัวในโค้ดของ PDF Studio และตัวแก้ไขเวิร์กโฟลว์
  (ต้นฉบับเขียนเป็น `locale === 'zh' ? จีน : อังกฤษ` ไว้ราว 800 จุด)
