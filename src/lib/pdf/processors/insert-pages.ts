/**
 * Insert / Replace Pages Processor (TectSkill PDF)
 *
 * Inserts pages from a second PDF into a base PDF at a chosen position, or
 * replaces a range of pages in the base PDF with pages from the second PDF
 * (e.g. swap revised drawing sheets into a drawing set).
 *
 * The base document is modified in place, so its forms, links, bookmarks and
 * metadata are kept. Pages copied from the second PDF keep their own content,
 * annotations and links.
 */

import type { ProcessInput, ProcessOutput, ProgressCallback } from '@/types/pdf';
import { PDFErrorCode } from '@/types/pdf';
import { BasePDFProcessor } from '../processor';
import { loadPdfLib } from '../loader';

export type InsertPagesMode = 'insert' | 'replace';

export interface InsertPagesOptions {
  /** 'insert' adds pages; 'replace' removes a range and puts the new pages there */
  mode: InsertPagesMode;
  /** insert mode: number of base pages before the inserted pages (0 = beginning, N = end) */
  position: number;
  /** replace mode: first base page to replace (1-based, inclusive) */
  replaceFrom: number;
  /** replace mode: last base page to replace (1-based, inclusive) */
  replaceTo: number;
  /** pages to take from the second PDF, e.g. "1-3, 5". Empty = all pages */
  sourcePages: string;
}

const DEFAULT_OPTIONS: InsertPagesOptions = {
  mode: 'insert',
  position: 0,
  replaceFrom: 1,
  replaceTo: 1,
  sourcePages: '',
};

/**
 * Parse a page selection like "1-3, 5, 8-6" into 0-based indices, in the
 * order written. Ranges may run backwards. Returns null when invalid.
 */
export function parsePageSelection(selection: string, totalPages: number): number[] | null {
  const text = selection.trim();
  if (!text) return Array.from({ length: totalPages }, (_, i) => i);

  const result: number[] = [];
  for (const rawPart of text.split(/[,;]+/)) {
    const part = rawPart.trim();
    if (!part) continue;
    const range = part.match(/^(\d+)\s*[-–]\s*(\d+)$/);
    if (range) {
      const a = parseInt(range[1], 10);
      const b = parseInt(range[2], 10);
      if (a < 1 || b < 1 || a > totalPages || b > totalPages) return null;
      const step = a <= b ? 1 : -1;
      for (let p = a; p !== b + step; p += step) result.push(p - 1);
      continue;
    }
    if (/^\d+$/.test(part)) {
      const p = parseInt(part, 10);
      if (p < 1 || p > totalPages) return null;
      result.push(p - 1);
      continue;
    }
    return null;
  }
  return result.length > 0 ? result : null;
}

export class InsertPagesPDFProcessor extends BasePDFProcessor {
  async process(input: ProcessInput, onProgress?: ProgressCallback): Promise<ProcessOutput> {
    this.reset();
    this.onProgress = onProgress;

    const { files, options } = input;
    const opts: InsertPagesOptions = {
      ...DEFAULT_OPTIONS,
      ...(options as Partial<InsertPagesOptions>),
    };

    if (files.length !== 2) {
      return this.createErrorOutput(
        PDFErrorCode.INVALID_OPTIONS,
        'Two PDF files are required: the main document and the file to insert.',
        `Received ${files.length} file(s).`
      );
    }

    try {
      this.updateProgress(5, 'Loading PDF library...');
      const pdfLib = await loadPdfLib();

      this.updateProgress(15, 'Loading main document...');
      let baseDoc;
      let sourceDoc;
      try {
        baseDoc = await pdfLib.PDFDocument.load(await files[0].arrayBuffer(), { ignoreEncryption: true });
        this.updateProgress(30, 'Loading file to insert...');
        sourceDoc = await pdfLib.PDFDocument.load(await files[1].arrayBuffer(), { ignoreEncryption: true });
      } catch (error) {
        if (error instanceof Error && error.message.toLowerCase().includes('encrypt')) {
          return this.createErrorOutput(
            PDFErrorCode.PDF_ENCRYPTED,
            'One of the PDF files is encrypted.',
            'Please unlock it first.'
          );
        }
        throw error;
      }

      if (this.checkCancelled()) {
        return this.createErrorOutput(PDFErrorCode.PROCESSING_CANCELLED, 'Processing was cancelled.');
      }

      const baseCount = baseDoc.getPageCount();
      const sourceCount = sourceDoc.getPageCount();

      const indices = parsePageSelection(opts.sourcePages, sourceCount);
      if (!indices) {
        return this.createErrorOutput(
          PDFErrorCode.INVALID_PAGE_RANGE,
          `Invalid pages for the file to insert. Use numbers between 1 and ${sourceCount}, e.g. 1-3, 5.`,
          `Received: ${opts.sourcePages}`
        );
      }

      let insertAt: number;
      let removed = 0;
      if (opts.mode === 'replace') {
        const from = Math.floor(opts.replaceFrom);
        const to = Math.floor(opts.replaceTo);
        if (from < 1 || to < from || to > baseCount) {
          return this.createErrorOutput(
            PDFErrorCode.INVALID_PAGE_RANGE,
            `Pages to replace must be between 1 and ${baseCount}.`,
            `Received: ${opts.replaceFrom}-${opts.replaceTo}`
          );
        }
        removed = to - from + 1;
        if (removed >= baseCount && indices.length === 0) {
          return this.createErrorOutput(PDFErrorCode.INVALID_OPTIONS, 'The result would have no pages.');
        }
        insertAt = from - 1;
      } else {
        insertAt = Math.floor(opts.position);
        if (insertAt < 0 || insertAt > baseCount) {
          return this.createErrorOutput(
            PDFErrorCode.INVALID_PAGE_RANGE,
            `Position must be between 0 and ${baseCount}.`,
            `Received: ${opts.position}`
          );
        }
      }

      this.updateProgress(50, `Copying ${indices.length} page(s)...`);
      const copied = await baseDoc.copyPages(sourceDoc, indices);

      if (this.checkCancelled()) {
        return this.createErrorOutput(PDFErrorCode.PROCESSING_CANCELLED, 'Processing was cancelled.');
      }

      if (opts.mode === 'replace') {
        this.updateProgress(65, `Removing ${removed} page(s)...`);
        for (let i = 0; i < removed; i++) {
          baseDoc.removePage(insertAt);
        }
      }

      this.updateProgress(75, 'Inserting pages...');
      copied.forEach((page, i) => {
        baseDoc.insertPage(insertAt + i, page);
      });

      this.updateProgress(90, 'Saving PDF...');
      const bytes = await baseDoc.save({ useObjectStreams: true });
      const blob = new Blob([new Uint8Array(bytes)], { type: 'application/pdf' });

      this.updateProgress(100, 'Complete!');

      const base = files[0].name.replace(/\.pdf$/i, '');
      const suffix = opts.mode === 'replace' ? '_replaced' : '_inserted';
      return this.createSuccessOutput(blob, `${base}${suffix}.pdf`, {
        mode: opts.mode,
        originalPageCount: baseCount,
        insertedPageCount: copied.length,
        removedPageCount: removed,
        newPageCount: baseCount - removed + copied.length,
        insertPosition: insertAt,
      });
    } catch (error) {
      return this.createErrorOutput(
        PDFErrorCode.PROCESSING_FAILED,
        'Failed to insert pages.',
        error instanceof Error ? error.message : 'Unknown error'
      );
    }
  }

  protected getAcceptedTypes(): string[] {
    return ['application/pdf'];
  }
}

export function createInsertPagesProcessor(): InsertPagesPDFProcessor {
  return new InsertPagesPDFProcessor();
}

/** Insert or replace pages (convenience function). */
export async function insertPages(
  mainFile: File,
  insertFile: File,
  options: Partial<InsertPagesOptions>,
  onProgress?: ProgressCallback
): Promise<ProcessOutput> {
  return createInsertPagesProcessor().process(
    { files: [mainFile, insertFile], options: options as Record<string, unknown> },
    onProgress
  );
}
