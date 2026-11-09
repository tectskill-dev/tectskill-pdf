/**
 * TectSkill PDF — content for the architect tools (category "architect").
 * Kept in its own file so the per-locale tool-content files stay in sync with upstream PDFCraft.
 */

import type { ToolContent } from '@/types/tool';

export const architectToolContentEn: Record<string, ToolContent> = {
  "revision-compare": {
    "title": "Revision Compare",
    "metaDescription": "Overlay two drawing revisions, highlight what changed in red and blue, add revision clouds and export an A3 PDF report. Runs locally.",
    "keywords": [
      "revision compare",
      "architect",
      "construction drawings",
      "pdf"
    ],
    "description": "<p>Got Rev. B from the engineer and do not know what changed? Overlay both sheets: removed lines turn red, added lines turn blue, and every change is wrapped in a numbered revision cloud.</p><p>Everything runs on your device and works offline in the desktop app. Your drawings are never uploaded.</p>",
    "howToUse": [
      {
        "step": 1,
        "title": "Choose files",
        "description": "Choose the old and new drawing (pick the page for multi-page sets)"
      },
      {
        "step": 2,
        "title": "Set up",
        "description": "Click Compare and step through each change"
      },
      {
        "step": 3,
        "title": "Export",
        "description": "Export the PDF report for review or meetings"
      }
    ],
    "useCases": [
      {
        "title": "Check engineer revisions",
        "description": "See exactly what changed in a new structural or MEP revision",
        "icon": "file-check"
      },
      {
        "title": "Review contractor drawings",
        "description": "Compare shop drawings against construction drawings",
        "icon": "eye"
      },
      {
        "title": "Meeting report",
        "description": "Attach a PDF report with a zoomed view of every change",
        "icon": "users"
      }
    ],
    "faq": [
      {
        "question": "The two drawings do not line up",
        "answer": "Use Auto align, or nudge the new drawing by pixels"
      },
      {
        "question": "Tiny offsets count as changes",
        "answer": "Raise the tolerance to 2–3 pixels"
      },
      {
        "question": "Are my files uploaded?",
        "answer": "No. Everything is processed on your device, in the web and desktop versions"
      }
    ]
  },
  "measure-pdf-scale": {
    "title": "Measure PDF to Scale",
    "metaDescription": "Measure distances, running lengths and areas on PDF drawings at true scale, snap to wall corners and export CSV for quantity take-off.",
    "keywords": [
      "measure pdf to scale",
      "architect",
      "construction drawings",
      "pdf"
    ],
    "description": "<p>No more printing drawings to measure with a scale ruler. Set the drawing scale or calibrate from a known dimension, then click to measure. Snaps to endpoints, corners and intersections.</p><p>Everything runs on your device and works offline in the desktop app. Your drawings are never uploaded.</p>",
    "howToUse": [
      {
        "step": 1,
        "title": "Choose files",
        "description": "Open the PDF and choose the scale, or calibrate from a known dimension"
      },
      {
        "step": 2,
        "title": "Set up",
        "description": "Pick distance, running length or area and click on the drawing"
      },
      {
        "step": 3,
        "title": "Export",
        "description": "Name the items and export as CSV"
      }
    ],
    "useCases": [
      {
        "title": "Quick quantity take-off",
        "description": "Measure wall lengths, drains and room areas for cost estimates",
        "icon": "ruler"
      },
      {
        "title": "Check missing dimensions",
        "description": "Measure distances that are not dimensioned on the drawing",
        "icon": "calculator"
      },
      {
        "title": "Hand off as a table",
        "description": "Export CSV and continue the BOQ in Excel",
        "icon": "file-text"
      }
    ],
    "faq": [
      {
        "question": "Measurements do not match the dimensions",
        "answer": "The PDF may have been scaled on export; calibrate from a known dimension"
      },
      {
        "question": "Snapping does not work",
        "answer": "Scanned drawings have no vector lines; zoom in and click manually"
      },
      {
        "question": "Do I lose my items when I close it?",
        "answer": "No. Reopen the same file on the same device and they come back"
      }
    ]
  },
  "sheet-set-builder": {
    "title": "Sheet Set Builder",
    "metaDescription": "Combine drawing PDFs into one sheet set sorted by discipline and sheet number, with a clickable sheet index and bookmarks.",
    "keywords": [
      "sheet set builder",
      "architect",
      "construction drawings",
      "pdf"
    ],
    "description": "<p>Prepare permit or tender sets without sorting files and typing an index by hand. Sheet numbers are read from file names, sorted by discipline, and a clickable sheet index is generated.</p><p>Everything runs on your device and works offline in the desktop app. Your drawings are never uploaded.</p>",
    "howToUse": [
      {
        "step": 1,
        "title": "Choose files",
        "description": "Name files like \"A-101 Ground Floor Plan.pdf\" and drop them all in"
      },
      {
        "step": 2,
        "title": "Set up",
        "description": "Check numbers and titles, then sort by discipline and sheet number"
      },
      {
        "step": 3,
        "title": "Export",
        "description": "Enter the project name and status, then build the sheet set PDF"
      }
    ],
    "useCases": [
      {
        "title": "Permit submission set",
        "description": "One file with all disciplines and an ordered sheet index",
        "icon": "book"
      },
      {
        "title": "Contractor issue",
        "description": "One file with bookmarks per discipline",
        "icon": "file-check"
      },
      {
        "title": "Completeness check",
        "description": "Warns about duplicate sheet numbers before issue",
        "icon": "send"
      }
    ],
    "faq": [
      {
        "question": "Which discipline codes work?",
        "answer": "G, A, ID, L, S, EE, ME, SN, FP and similar"
      },
      {
        "question": "Sheet numbers from AutoCAD are not detected",
        "answer": "SHX fonts often have no text; name files by sheet number"
      }
    ]
  },
  "stamp-drawings": {
    "title": "Stamp Drawings",
    "metaDescription": "Stamp status, revision block, signature or watermark on every sheet of your PDF drawings at once, sized for A1 to A4.",
    "keywords": [
      "stamp drawings",
      "architect",
      "construction drawings",
      "pdf"
    ],
    "description": "<p>No need to open sheets one by one. Choose the text, color and position once and every sheet in every file is stamped, scaled to the paper size from A1 to A4.</p><p>Everything runs on your device and works offline in the desktop app. Your drawings are never uploaded.</p>",
    "howToUse": [
      {
        "step": 1,
        "title": "Choose files",
        "description": "Drop your drawing files (several at once)"
      },
      {
        "step": 2,
        "title": "Set up",
        "description": "Set up the stamp and check the live preview"
      },
      {
        "step": 3,
        "title": "Export",
        "description": "Click Stamp and save"
      }
    ],
    "useCases": [
      {
        "title": "Construction issue",
        "description": "Stamp \"For Construction\" with revision and signature on every sheet",
        "icon": "check-circle"
      },
      {
        "title": "Permit drawings",
        "description": "Add status stamps and signature boxes",
        "icon": "file-text"
      },
      {
        "title": "Prevent misuse",
        "description": "Watermark unapproved drawings \"Not for Construction\"",
        "icon": "shield"
      }
    ],
    "faq": [
      {
        "question": "Can I remove the stamp later?",
        "answer": "No, it is burned into the output; your original file is not changed"
      },
      {
        "question": "Will the stamp be rotated on rotated pages?",
        "answer": "No, it is kept upright on every page"
      }
    ]
  },
  "markup-drawings": {
    "title": "Markup Drawings",
    "metaDescription": "Review PDF drawings with revision clouds, arrows and numbered comments; export the marked-up PDF and a comment log.",
    "keywords": [
      "markup drawings",
      "architect",
      "construction drawings",
      "pdf"
    ],
    "description": "<p>Review drawings without expensive software: cloud what needs fixing, log comments, track what is resolved, and export both the marked-up drawing and the comment table.</p><p>Everything runs on your device and works offline in the desktop app. Your drawings are never uploaded.</p>",
    "howToUse": [
      {
        "step": 1,
        "title": "Choose files",
        "description": "Open the PDF drawing and enter the reviewer name"
      },
      {
        "step": 2,
        "title": "Set up",
        "description": "Draw with the tools above the drawing and write comments in the list"
      },
      {
        "step": 3,
        "title": "Export",
        "description": "Export the marked-up PDF or the comment table"
      }
    ],
    "useCases": [
      {
        "title": "Internal design review",
        "description": "Cloud issues with numbered comments",
        "icon": "eye"
      },
      {
        "title": "Share with the team",
        "description": "Export a PDF with sticky notes readable in Acrobat",
        "icon": "users"
      },
      {
        "title": "Track fixes",
        "description": "Mark items resolved and export the log as CSV",
        "icon": "file-check"
      }
    ],
    "faq": [
      {
        "question": "Do I lose markups when I close it?",
        "answer": "No. Reopen the same file on the same device and they come back"
      },
      {
        "question": "Can I edit the markup in Acrobat?",
        "answer": "Only the sticky notes; edit here and export again"
      }
    ]
  },
  "compress-drawings": {
    "title": "Compress Drawings",
    "metaDescription": "Shrink PDF drawings without touching vector lines: only renders, photos and leftover data are reduced. Ideal for email and LINE.",
    "keywords": [
      "compress drawings",
      "architect",
      "construction drawings",
      "pdf"
    ],
    "description": "<p>Generic compressors often rasterize whole pages and blur linework. This tool only reduces perspective renders, photos and leftover data, so lines stay crisp.</p><p>Everything runs on your device and works offline in the desktop app. Your drawings are never uploaded.</p>",
    "howToUse": [
      {
        "step": 1,
        "title": "Choose files",
        "description": "Drop your drawing files (several at once)"
      },
      {
        "step": 2,
        "title": "Set up",
        "description": "Choose a compression level for how you will use it"
      },
      {
        "step": 3,
        "title": "Export",
        "description": "Click Compress and save"
      }
    ],
    "useCases": [
      {
        "title": "Send by email or LINE",
        "description": "Fit size limits while keeping linework sharp",
        "icon": "send"
      },
      {
        "title": "Drawings with renders",
        "description": "Reduce perspective images and photos",
        "icon": "archive"
      },
      {
        "title": "Project archive",
        "description": "Remove leftover data from repeated saves",
        "icon": "printer"
      }
    ],
    "faq": [
      {
        "question": "Why do some files shrink only a little?",
        "answer": "Pure linework has no images to reduce; expect about 5–15%"
      },
      {
        "question": "My drawing contains scanned linework",
        "answer": "Turn off \"convert uncompressed images to JPEG\""
      }
    ]
  },
  "print-to-scale": {
    "title": "Print to Scale",
    "metaDescription": "Scale A1 drawings down to A3 with the new scale noted and a bar scale added, or tile 1:1 across smaller sheets.",
    "keywords": [
      "print to scale",
      "architect",
      "construction drawings",
      "pdf"
    ],
    "description": "<p>Printing A1 on A3 changes the scale and people measure wrong. This tool computes the new scale, rounds to a standard scale, adds a bar scale and notes the new scale on the sheet edge.</p><p>Everything runs on your device and works offline in the desktop app. Your drawings are never uploaded.</p>",
    "howToUse": [
      {
        "step": 1,
        "title": "Choose files",
        "description": "Drop your drawing file"
      },
      {
        "step": 2,
        "title": "Set up",
        "description": "Pick the target paper and the original drawing scale"
      },
      {
        "step": 3,
        "title": "Export",
        "description": "Create the print file and print at actual size (100%)"
      }
    ],
    "useCases": [
      {
        "title": "A1 to A3 site sets",
        "description": "Carry a smaller set with the correct new scale",
        "icon": "printer"
      },
      {
        "title": "Bar scale",
        "description": "Stays correct even if reduced again",
        "icon": "ruler"
      },
      {
        "title": "1:1 on small printers",
        "description": "Tile across sheets with sheet codes and join lines",
        "icon": "copy"
      }
    ],
    "faq": [
      {
        "question": "The printed scale is wrong",
        "answer": "Print at \"Actual size / 100%\", not \"Fit to page\""
      },
      {
        "question": "What scale is A1 on A3?",
        "answer": "Exactly 50%, e.g. 1:100 becomes 1:200"
      }
    ]
  }
};

export const architectToolContentTh: Record<string, ToolContent> = {
  "revision-compare": {
    "title": "เทียบแบบ",
    "metaDescription": "วางแบบเก่าและแบบใหม่ซ้อนกัน เห็นจุดที่แก้เป็นสีแดง-น้ำเงิน พร้อมเมฆแก้ไขและรายงาน PDF ใช้ฟรี ไฟล์ไม่ออกจากเครื่อง",
    "keywords": [
      "เทียบแบบ",
      "สถาปนิก",
      "แบบก่อสร้าง",
      "PDF"
    ],
    "description": "<p>ได้แบบ Rev.B จากวิศวกรหรือผู้รับเหมาแล้วไม่รู้ว่าแก้ตรงไหน เครื่องมือนี้วางแบบสองฉบับซ้อนกัน เส้นที่ถูกลบแสดงเป็นสีแดง เส้นที่เพิ่มแสดงเป็นสีน้ำเงิน และครอบทุกจุดที่เปลี่ยนด้วยเมฆแก้ไขพร้อมเลขกำกับ</p><ul><li>ซ้อนสีแบบเก่าและแบบใหม่ หรือสลับดูทีละฉบับ</li><li>หาจุดที่เปลี่ยนอัตโนมัติ แยกเป็น ลบออก เพิ่มเข้า และแก้ไข</li><li>จัดตำแหน่งอัตโนมัติเมื่อแบบสองฉบับวางไม่ตรงกัน</li><li>ส่งออกรายงาน PDF ขนาด A3 พร้อมภาพขยายทุกจุดและช่องหมายเหตุ</li></ul><p>ประมวลผลทั้งหมดในเครื่องของคุณ ใช้งานแบบออฟไลน์ได้ในโปรแกรมที่ติดตั้ง ไฟล์แบบไม่ถูกอัปโหลดไปที่ใด</p>",
    "howToUse": [
      {
        "step": 1,
        "title": "เลือกไฟล์",
        "description": "เลือกไฟล์แบบเก่าและแบบใหม่ ถ้าเป็นชุดแบบหลายหน้า เลือกหน้าที่ต้องการเทียบ"
      },
      {
        "step": 2,
        "title": "ตั้งค่า",
        "description": "กด “เปรียบเทียบ” แล้วไล่ดูทีละจุดด้วยปุ่มถัดไป"
      },
      {
        "step": 3,
        "title": "ส่งออก",
        "description": "กด “ส่งออกรายงาน PDF” เพื่อใช้ตรวจหรือแนบในที่ประชุม"
      }
    ],
    "useCases": [
      {
        "title": "ตรวจแบบแก้ไขจากวิศวกร",
        "description": "รู้ทันทีว่าแบบโครงสร้างหรืองานระบบ Rev. ใหม่แก้ตรงไหน ก่อนส่งต่อให้ผู้รับเหมา",
        "icon": "file-check"
      },
      {
        "title": "ตรวจแบบจากผู้รับเหมา",
        "description": "เทียบ shop drawing กับแบบก่อสร้าง หาจุดที่ถูกเปลี่ยนโดยไม่แจ้ง",
        "icon": "eye"
      },
      {
        "title": "ประกอบการประชุม",
        "description": "แนบรายงาน PDF พร้อมภาพขยายทุกจุดที่เปลี่ยน ใช้คุยในที่ประชุมได้เลย",
        "icon": "users"
      }
    ],
    "faq": [
      {
        "question": "แบบสองฉบับวางไม่ตรงกัน ทำอย่างไร",
        "answer": "กด “จัดตำแหน่งอัตโนมัติ” หรือเลื่อนแบบใหม่เองเป็นพิกเซล"
      },
      {
        "question": "ทำไมเส้นเหลื่อมนิดเดียวก็ถูกนับว่าแก้",
        "answer": "เพิ่มค่า “ความคลาดเคลื่อนที่ยอมรับ” เป็น 2–3 พิกเซล"
      },
      {
        "question": "ไฟล์ถูกอัปโหลดไปที่ไหนไหม",
        "answer": "ไม่ ทุกอย่างประมวลผลในเครื่องของคุณ ทั้งเวอร์ชันเว็บและโปรแกรมที่ติดตั้ง"
      }
    ]
  },
  "measure-pdf-scale": {
    "title": "วัดตามสเกล",
    "metaDescription": "วัดระยะ ความยาวรวม และพื้นที่จากแบบ PDF ตามสเกลจริง สแนปเข้ามุมผนัง ส่งออกเป็น CSV ใช้ถอดปริมาณเบื้องต้นได้ ฟรี",
    "keywords": [
      "วัดตามสเกล",
      "สถาปนิก",
      "แบบก่อสร้าง",
      "PDF"
    ],
    "description": "<p>ไม่ต้องพิมพ์แบบออกมาวัดด้วยไม้สเกลอีกต่อไป ตั้งมาตราส่วนตามแบบหรือปรับเทียบจากเส้นบอกระยะ แล้วคลิกวัดบนหน้าจอได้ทันที ระบบสแนปเข้าปลายเส้น มุมผนัง และจุดตัดในแบบให้อัตโนมัติ</p><ul><li>วัดระยะ ความยาวรวม เช่น ผนังหรือรางระบายน้ำ และพื้นที่พร้อมเส้นรอบรูป</li><li>ตั้งมาตราส่วนตามแบบ หรือปรับเทียบจากเส้นบอกระยะที่รู้ค่า</li><li>สแนปเข้าปลายเส้น จุดตัด จุดกึ่งกลาง และล็อกแนวฉาก</li><li>ตั้งชื่อรายการ ดูยอดรวม และส่งออก CSV เปิดใน Excel ได้</li></ul><p>ประมวลผลทั้งหมดในเครื่องของคุณ ใช้งานแบบออฟไลน์ได้ในโปรแกรมที่ติดตั้ง ไฟล์แบบไม่ถูกอัปโหลดไปที่ใด</p>",
    "howToUse": [
      {
        "step": 1,
        "title": "เลือกไฟล์",
        "description": "เปิดแบบ PDF และเลือกมาตราส่วน หรือกด “ปรับเทียบจากระยะในแบบ”"
      },
      {
        "step": 2,
        "title": "ตั้งค่า",
        "description": "เลือกเครื่องมือ ระยะ ความยาวรวม หรือพื้นที่ แล้วคลิกบนแบบ"
      },
      {
        "step": 3,
        "title": "ส่งออก",
        "description": "ตั้งชื่อรายการ แล้วส่งออกเป็น CSV"
      }
    ],
    "useCases": [
      {
        "title": "ถอดปริมาณเบื้องต้น",
        "description": "วัดความยาวผนัง รางระบายน้ำ และพื้นที่ห้องเพื่อประมาณราคา",
        "icon": "ruler"
      },
      {
        "title": "ตรวจขนาดในแบบ",
        "description": "เช็กระยะที่ไม่มีเส้นบอกขนาด โดยไม่ต้องพิมพ์แบบออกมา",
        "icon": "calculator"
      },
      {
        "title": "ส่งต่อเป็นตาราง",
        "description": "ส่งออก CSV เปิดใน Excel ทำ BOQ ต่อได้ทันที",
        "icon": "file-text"
      }
    ],
    "faq": [
      {
        "question": "วัดแล้วค่าไม่ตรงกับเส้นบอกระยะ",
        "answer": "PDF อาจถูกย่อตอน export ให้ใช้ “ปรับเทียบจากระยะในแบบ”"
      },
      {
        "question": "ทำไมสแนปไม่ได้",
        "answer": "แบบที่เป็นภาพสแกนไม่มีเส้นเวกเตอร์ ให้ซูมเข้าแล้วคลิกเอง"
      },
      {
        "question": "ปิดหน้าไปแล้ว รายการหายไหม",
        "answer": "ไม่หาย เปิดไฟล์เดิมบนเครื่องเดิมจะกลับมาครบ"
      }
    ]
  },
  "sheet-set-builder": {
    "title": "รวมชุดแบบ",
    "metaDescription": "รวม PDF หลายไฟล์เป็นชุดแบบเดียว เรียงตามหมวดและเลขที่แบบ สร้างสารบัญที่คลิกได้และ bookmark อัตโนมัติ ใช้ฟรี",
    "keywords": [
      "รวมชุดแบบ",
      "สถาปนิก",
      "แบบก่อสร้าง",
      "PDF"
    ],
    "description": "<p>เตรียมชุดแบบยื่นขออนุญาตหรือส่งผู้รับเหมา โดยไม่ต้องเรียงไฟล์และพิมพ์สารบัญเอง ระบบอ่านเลขที่แบบจากชื่อไฟล์ เรียงตามหมวด สถาปัตยกรรม โครงสร้าง ไฟฟ้า สุขาภิบาล และสร้างหน้าสารบัญที่คลิกไปยังแต่ละแผ่นได้</p><ul><li>อ่านเลขที่และชื่อแบบจากชื่อไฟล์ และจาก title block</li><li>เรียงตามหมวดและเลขที่แบบ พร้อมเตือนเลขที่ซ้ำ</li><li>สร้างหน้าสารบัญที่คลิกได้ และ bookmark แยกตามหมวด</li></ul><p>ประมวลผลทั้งหมดในเครื่องของคุณ ใช้งานแบบออฟไลน์ได้ในโปรแกรมที่ติดตั้ง ไฟล์แบบไม่ถูกอัปโหลดไปที่ใด</p>",
    "howToUse": [
      {
        "step": 1,
        "title": "เลือกไฟล์",
        "description": "ตั้งชื่อไฟล์แบบ เช่น “A-101 แปลนพื้นชั้น 1.pdf” แล้วลากมาวางพร้อมกันทั้งหมด"
      },
      {
        "step": 2,
        "title": "ตั้งค่า",
        "description": "ตรวจเลขที่และชื่อแบบในรายการ แล้วกด “เรียงตามหมวดและเลขที่แบบ”"
      },
      {
        "step": 3,
        "title": "ส่งออก",
        "description": "กรอกชื่อโครงการและสถานะแบบ แล้วกด “สร้างชุดแบบ PDF”"
      }
    ],
    "useCases": [
      {
        "title": "ชุดแบบยื่นขออนุญาต",
        "description": "รวมแบบทุกหมวดเป็นไฟล์เดียว พร้อมหน้าสารบัญเรียงตามเลขที่แบบ",
        "icon": "book"
      },
      {
        "title": "ส่งแบบให้ผู้รับเหมา",
        "description": "ส่งไฟล์เดียวที่มี bookmark แยกหมวด เปิดหาแผ่นที่ต้องการได้เร็ว",
        "icon": "file-check"
      },
      {
        "title": "ตรวจความครบถ้วน",
        "description": "เตือนเลขที่แบบซ้ำ ก่อนส่งชุดแบบออกไป",
        "icon": "send"
      }
    ],
    "faq": [
      {
        "question": "ใช้รหัสหมวดอะไรได้บ้าง",
        "answer": "G, A, ID, L, S, EE, ME, SN, FP และรหัสใกล้เคียง"
      },
      {
        "question": "ไฟล์จาก AutoCAD อ่านเลขที่ไม่ได้",
        "answer": "ฟอนต์ SHX มักไม่มีข้อความให้อ่าน ให้ตั้งชื่อไฟล์ตามเลขที่แบบ"
      }
    ]
  },
  "stamp-drawings": {
    "title": "ประทับตราแบบ",
    "metaDescription": "ประทับตราสถานะ แบบขออนุญาต แบบก่อสร้าง ห้ามใช้ก่อสร้าง ช่อง Rev และลงนาม หรือลายน้ำ ลงทุกแผ่นพร้อมกัน ฟรี",
    "keywords": [
      "ประทับตราแบบ",
      "สถาปนิก",
      "แบบก่อสร้าง",
      "PDF"
    ],
    "description": "<p>ไม่ต้องเปิดไฟล์ทีละแผ่นเพื่อใส่ตรา เลือกข้อความ สี และตำแหน่งครั้งเดียว ระบบประทับให้ทุกแผ่นและทุกไฟล์ ปรับขนาดตามกระดาษ A1 ถึง A4 ให้อัตโนมัติ</p><ul><li>ตราสถานะสำเร็จรูปทั้งไทยและอังกฤษ หรือพิมพ์เอง</li><li>ช่องข้อมูล ชื่อสำนักงาน แก้ไขครั้งที่ วันที่ ผู้ตรวจ พร้อมภาพลายเซ็น</li><li>ลายน้ำแนวทแยง และเลือกช่วงหน้าที่จะประทับได้</li></ul><p>ประมวลผลทั้งหมดในเครื่องของคุณ ใช้งานแบบออฟไลน์ได้ในโปรแกรมที่ติดตั้ง ไฟล์แบบไม่ถูกอัปโหลดไปที่ใด</p>",
    "howToUse": [
      {
        "step": 1,
        "title": "เลือกไฟล์",
        "description": "ลากไฟล์แบบมาวาง เลือกได้หลายไฟล์"
      },
      {
        "step": 2,
        "title": "ตั้งค่า",
        "description": "ตั้งค่าตราทางซ้าย ดูผลในตัวอย่างทันที"
      },
      {
        "step": 3,
        "title": "ส่งออก",
        "description": "กด “ประทับตราและบันทึก”"
      }
    ],
    "useCases": [
      {
        "title": "แบบก่อสร้าง",
        "description": "ประทับ \"แบบก่อสร้าง\" พร้อมเลข Rev. และลายเซ็นทุกแผ่นในคลิกเดียว",
        "icon": "check-circle"
      },
      {
        "title": "แบบขออนุญาต",
        "description": "ใส่ตราสถานะและช่องลงนามผู้ออกแบบลงทุกแผ่น",
        "icon": "file-text"
      },
      {
        "title": "ป้องกันการนำไปใช้ผิด",
        "description": "ใส่ลายน้ำ \"ห้ามใช้ก่อสร้าง\" บนแบบที่ยังไม่อนุมัติ",
        "icon": "shield"
      }
    ],
    "faq": [
      {
        "question": "ลบตราออกภายหลังได้ไหม",
        "answer": "ไม่ได้ ตราถูกฝังในแบบ ไฟล์ต้นฉบับของคุณไม่ถูกแก้ไข"
      },
      {
        "question": "หน้าที่หมุนแนวอยู่ ตราจะเอียงไหม",
        "answer": "ไม่ ระบบปรับให้ตั้งตรงทุกหน้า"
      }
    ]
  },
  "markup-drawings": {
    "title": "ตรวจแบบ",
    "metaDescription": "วาดเมฆแก้ไข ลูกศรชี้ และข้อความบนแบบ PDF ทุกจุดมีเลขกำกับ ส่งออกแบบพร้อม markup และตารางความเห็นเป็น Excel ฟรี",
    "keywords": [
      "ตรวจแบบ",
      "สถาปนิก",
      "แบบก่อสร้าง",
      "PDF"
    ],
    "description": "<p>ตรวจแบบได้ครบโดยไม่ต้องใช้โปรแกรมราคาแพง วาดเมฆรอบจุดที่ต้องแก้ เขียนความเห็นในรายการ ติดตามว่าแก้แล้วหรือยัง และส่งออกได้ทั้งแบบพร้อม markup และตารางความเห็น</p><ul><li>เมฆแก้ไข ลูกศรชี้ และข้อความ พร้อมเลขกำกับทุกจุด</li><li>รายการความเห็นพร้อมชื่อผู้ตรวจ วันที่ และสถานะ “แก้แล้ว”</li><li>ส่งออก PDF พร้อม sticky note ที่เปิดอ่านใน Acrobat ได้ และตาราง CSV</li></ul><p>ประมวลผลทั้งหมดในเครื่องของคุณ ใช้งานแบบออฟไลน์ได้ในโปรแกรมที่ติดตั้ง ไฟล์แบบไม่ถูกอัปโหลดไปที่ใด</p>",
    "howToUse": [
      {
        "step": 1,
        "title": "เลือกไฟล์",
        "description": "เปิดแบบ PDF และกรอกชื่อผู้ตรวจ"
      },
      {
        "step": 2,
        "title": "ตั้งค่า",
        "description": "เลือกเครื่องมือด้านบนแบบแล้ววาด เขียนความเห็นในรายการทางซ้าย"
      },
      {
        "step": 3,
        "title": "ส่งออก",
        "description": "ส่งออกแบบพร้อม markup หรือตารางความเห็น"
      }
    ],
    "useCases": [
      {
        "title": "ตรวจแบบภายในสำนักงาน",
        "description": "วงเมฆจุดที่ต้องแก้ พร้อมเลขกำกับและความเห็น",
        "icon": "eye"
      },
      {
        "title": "ส่งความเห็นให้ทีม",
        "description": "ส่งออก PDF ที่มี sticky note เปิดอ่านใน Acrobat ได้",
        "icon": "users"
      },
      {
        "title": "ติดตามการแก้ไข",
        "description": "ทำเครื่องหมาย \"แก้แล้ว\" และส่งออกตารางความเห็นเป็น CSV",
        "icon": "file-check"
      }
    ],
    "faq": [
      {
        "question": "ปิดหน้าไปแล้ว markup หายไหม",
        "answer": "ไม่หาย เปิดไฟล์เดิมบนเครื่องเดิมจะกลับมาครบ"
      },
      {
        "question": "แก้ markup ใน Acrobat ต่อได้ไหม",
        "answer": "แก้ได้เฉพาะ sticky note ให้กลับมาแก้ในเครื่องมือนี้แล้วส่งออกใหม่"
      }
    ]
  },
  "compress-drawings": {
    "title": "บีบอัดแบบ",
    "metaDescription": "บีบอัดไฟล์แบบ PDF โดยไม่แตะเส้นเวกเตอร์ ลดเฉพาะภาพ render และข้อมูลส่วนเกิน เหมาะส่งอีเมลและ LINE ใช้ฟรี",
    "keywords": [
      "บีบอัดแบบ",
      "สถาปนิก",
      "แบบก่อสร้าง",
      "PDF"
    ],
    "description": "<p>เครื่องมือบีบอัดทั่วไปมักแปลงทั้งหน้าเป็นภาพ ทำให้เส้นแบบและตัวหนังสือเบลอ เครื่องมือนี้ลดเฉพาะภาพ perspective ภาพถ่าย และข้อมูลส่วนเกิน เส้นแบบจึงคมเท่าเดิมทุกจุด</p><ul><li>บีบอัด 4 ระดับ ตั้งแต่พิมพ์คุณภาพสูงถึงส่ง LINE</li><li>บีบอัดหลายไฟล์พร้อมกัน แสดงขนาดก่อนและหลัง</li><li>ลบเศษข้อมูลจากการบันทึกทับหลายครั้ง</li></ul><p>ประมวลผลทั้งหมดในเครื่องของคุณ ใช้งานแบบออฟไลน์ได้ในโปรแกรมที่ติดตั้ง ไฟล์แบบไม่ถูกอัปโหลดไปที่ใด</p>",
    "howToUse": [
      {
        "step": 1,
        "title": "เลือกไฟล์",
        "description": "ลากไฟล์แบบมาวาง เลือกได้หลายไฟล์"
      },
      {
        "step": 2,
        "title": "ตั้งค่า",
        "description": "เลือกระดับการบีบอัดตามการใช้งาน"
      },
      {
        "step": 3,
        "title": "ส่งออก",
        "description": "กด “บีบอัดและบันทึก”"
      }
    ],
    "useCases": [
      {
        "title": "ส่งแบบทางอีเมลและ LINE",
        "description": "ลดขนาดไฟล์ให้ส่งได้ โดยเส้นแบบยังคมเท่าเดิม",
        "icon": "send"
      },
      {
        "title": "แบบที่มีภาพ perspective",
        "description": "ลดขนาดภาพ render และภาพถ่ายในแบบ",
        "icon": "archive"
      },
      {
        "title": "เก็บเอกสารโครงการ",
        "description": "ลบเศษข้อมูลจากการบันทึกทับหลายครั้ง ประหยัดพื้นที่",
        "icon": "printer"
      }
    ],
    "faq": [
      {
        "question": "ทำไมบางไฟล์ลดได้น้อย",
        "answer": "แบบที่เป็นเส้นล้วนไม่มีภาพให้ลด มักลดได้ 5–15%"
      },
      {
        "question": "แบบมีภาพสแกนลายเส้น",
        "answer": "ปิดตัวเลือก “แปลงภาพที่ไม่บีบอัดเป็น JPEG”"
      }
    ]
  },
  "print-to-scale": {
    "title": "พิมพ์ย่อตามสเกล",
    "metaDescription": "ย่อแบบ PDF ลงกระดาษเล็ก คำนวณมาตราส่วนใหม่และเพิ่ม bar scale อัตโนมัติ หรือแบ่งพิมพ์ 1:1 หลายแผ่นเพื่อต่อกัน ฟรี",
    "keywords": [
      "พิมพ์ย่อตามสเกล",
      "สถาปนิก",
      "แบบก่อสร้าง",
      "PDF"
    ],
    "description": "<p>พิมพ์แบบ A1 ลง A3 แล้วสเกลเปลี่ยน คนอ่านแบบมักวัดผิด เครื่องมือนี้คำนวณมาตราส่วนใหม่ ปัดเป็นสเกลมาตรฐานที่วัดด้วยไม้สเกลได้ เพิ่ม bar scale และระบุมาตราส่วนใหม่ที่ขอบกระดาษให้อัตโนมัติ</p><ul><li>ย่อหรือขยายลงกระดาษ A0 ถึง A4 พร้อมตารางมาตราส่วนใหม่ทุกแผ่น</li><li>bar scale ที่ถูกต้องเสมอแม้ถูกย่อซ้ำ</li><li>แบ่งพิมพ์ 1:1 ลงกระดาษเล็กหลายแผ่น พร้อมรหัสแผ่นและแนวต่อ</li></ul><p>ประมวลผลทั้งหมดในเครื่องของคุณ ใช้งานแบบออฟไลน์ได้ในโปรแกรมที่ติดตั้ง ไฟล์แบบไม่ถูกอัปโหลดไปที่ใด</p>",
    "howToUse": [
      {
        "step": 1,
        "title": "เลือกไฟล์",
        "description": "ลากไฟล์แบบมาวาง"
      },
      {
        "step": 2,
        "title": "ตั้งค่า",
        "description": "เลือกกระดาษปลายทางและมาตราส่วนเดิมของแบบ"
      },
      {
        "step": 3,
        "title": "ส่งออก",
        "description": "กด “สร้างไฟล์สำหรับพิมพ์” แล้วสั่งพิมพ์ที่ขนาดจริง 100%"
      }
    ],
    "useCases": [
      {
        "title": "ย่อ A1 ลง A3",
        "description": "พิมพ์ชุดแบบขนาดเล็กพกไปหน้างาน พร้อมมาตราส่วนใหม่ที่ถูกต้อง",
        "icon": "printer"
      },
      {
        "title": "ใส่ bar scale",
        "description": "วัดจากกระดาษได้เสมอแม้ถูกย่อซ้ำ",
        "icon": "ruler"
      },
      {
        "title": "พิมพ์ 1:1 ด้วยเครื่องพิมพ์ A4/A3",
        "description": "แบ่งพิมพ์หลายแผ่นพร้อมรหัสแผ่นและแนวต่อ",
        "icon": "copy"
      }
    ],
    "faq": [
      {
        "question": "พิมพ์ออกมาแล้วสเกลไม่ตรง",
        "answer": "ตอนสั่งพิมพ์ต้องเลือก “ขนาดจริง 100%” ห้ามเลือก “พอดีกระดาษ”"
      },
      {
        "question": "A1 เป็น A3 ได้สเกลเท่าไร",
        "answer": "50% พอดี เช่น 1:100 เป็น 1:200"
      }
    ]
  }
};

/** Architect tool content for a locale (Thai or English fallback). */
export function getArchitectToolContent(locale: string, toolId: string): ToolContent | undefined {
  if (locale === 'th') return architectToolContentTh[toolId];
  return architectToolContentEn[toolId];
}
