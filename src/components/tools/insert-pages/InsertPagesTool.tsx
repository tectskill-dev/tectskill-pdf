'use client';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { FileUploader } from '../FileUploader';
import { ProcessingProgress, ProcessingStatus } from '../ProcessingProgress';
import { DownloadButton } from '../DownloadButton';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { insertPages, parsePageSelection, type InsertPagesMode } from '@/lib/pdf/processors/insert-pages';
import { configurePdfjsWorker } from '@/lib/pdf/loader';

/**
 * InsertPagesTool (TectSkill PDF)
 * Insert pages from another PDF at any position, or replace a page range
 * (e.g. swap revised sheets into a drawing set).
 */

type PositionChoice = 'start' | 'end' | 'after';

const inputBase =
  'px-3 py-2 rounded-[var(--radius-md)] border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--color-primary))]';
const inputClass = `w-full ${inputBase}`;
const numberClass = `w-24 ${inputBase}`;

async function countPages(file: File): Promise<number> {
  const pdfjsLib = await import('pdfjs-dist');
  configurePdfjsWorker(pdfjsLib);
  const pdf = await pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
  const n = pdf.numPages;
  await pdf.destroy();
  return n;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function InsertPagesTool({ className = '' }: { className?: string }) {
  const t = useTranslations('common');
  const tt = useTranslations('tools.insertPages');

  const [mainFile, setMainFile] = useState<File | null>(null);
  const [mainPages, setMainPages] = useState(0);
  const [insertFile, setInsertFile] = useState<File | null>(null);
  const [insertPagesCount, setInsertPagesCount] = useState(0);

  const [mode, setMode] = useState<InsertPagesMode>('insert');
  const [positionChoice, setPositionChoice] = useState<PositionChoice>('end');
  const [afterPage, setAfterPage] = useState(1);
  const [replaceFrom, setReplaceFrom] = useState(1);
  const [replaceTo, setReplaceTo] = useState(1);
  const [sourcePages, setSourcePages] = useState('');

  const [status, setStatus] = useState<ProcessingStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');
  const [result, setResult] = useState<Blob | null>(null);
  const [resultName, setResultName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const cancelledRef = useRef(false);

  const resetResult = () => {
    setResult(null);
    setStatus('idle');
    setProgress(0);
  };

  const loadMain = useCallback(async (files: File[]) => {
    const f = files[0];
    if (!f) return;
    setError(null);
    setResult(null);
    try {
      const n = await countPages(f);
      setMainFile(f);
      setMainPages(n);
      setAfterPage(Math.min(1, n));
      setReplaceFrom(1);
      setReplaceTo(1);
    } catch {
      setError(tt('loadError'));
    }
  }, [tt]);

  const loadInsert = useCallback(async (files: File[]) => {
    const f = files[0];
    if (!f) return;
    setError(null);
    setResult(null);
    try {
      const n = await countPages(f);
      setInsertFile(f);
      setInsertPagesCount(n);
      setSourcePages('');
    } catch {
      setError(tt('loadError'));
    }
  }, [tt]);

  const position =
    positionChoice === 'start' ? 0 : positionChoice === 'end' ? mainPages : Math.max(0, Math.min(afterPage, mainPages));

  const selected = useMemo(
    () => (insertPagesCount > 0 ? parsePageSelection(sourcePages, insertPagesCount) : null),
    [sourcePages, insertPagesCount]
  );

  const replaceValid = replaceFrom >= 1 && replaceTo >= replaceFrom && replaceTo <= mainPages;

  // Human-readable outline of the result
  const summary = useMemo(() => {
    if (!mainFile || !insertFile || !selected) return null;
    const n = selected.length;
    const parts: string[] = [];
    const range = (a: number, b: number) => (a === b ? `${a}` : `${a}–${b}`);
    if (mode === 'insert') {
      if (position > 0) parts.push(tt('summaryMain', { pages: range(1, position) }));
      parts.push(tt('summaryInserted', { count: n }));
      if (position < mainPages) parts.push(tt('summaryMain', { pages: range(position + 1, mainPages) }));
      return { parts, total: mainPages + n };
    }
    if (!replaceValid) return null;
    if (replaceFrom > 1) parts.push(tt('summaryMain', { pages: range(1, replaceFrom - 1) }));
    parts.push(tt('summaryInserted', { count: n }));
    if (replaceTo < mainPages) parts.push(tt('summaryMain', { pages: range(replaceTo + 1, mainPages) }));
    return { parts, total: mainPages - (replaceTo - replaceFrom + 1) + n };
  }, [mainFile, insertFile, selected, mode, position, mainPages, replaceFrom, replaceTo, replaceValid, tt]);

  const isProcessing = status === 'processing';
  const canProcess =
    !!mainFile && !!insertFile && !!selected && !isProcessing && (mode === 'insert' || replaceValid) &&
    (summary?.total ?? 0) > 0;

  const handleProcess = useCallback(async () => {
    if (!mainFile || !insertFile) return;
    cancelledRef.current = false;
    setStatus('processing');
    setProgress(0);
    setError(null);
    setResult(null);
    const output = await insertPages(
      mainFile,
      insertFile,
      { mode, position, replaceFrom, replaceTo, sourcePages },
      (p, m) => {
        if (!cancelledRef.current) {
          setProgress(p);
          setProgressMessage(m || '');
        }
      }
    );
    if (cancelledRef.current) {
      setStatus('idle');
      return;
    }
    if (output.success && output.result) {
      setResult(output.result as Blob);
      setResultName(output.filename || 'inserted.pdf');
      setStatus('complete');
    } else {
      setError(output.error?.message || tt('processError'));
      setStatus('error');
    }
  }, [mainFile, insertFile, mode, position, replaceFrom, replaceTo, sourcePages, tt]);

  const fileCard = (file: File, pages: number, onRemove: () => void, accent: string) => (
    <Card variant="outlined">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-xs font-bold text-white ${accent}`}>
            PDF
          </span>
          <div className="min-w-0">
            <p className="font-medium text-[hsl(var(--color-foreground))] truncate">{file.name}</p>
            <p className="text-sm text-[hsl(var(--color-muted-foreground))]">
              {formatSize(file.size)} • {tt('pageCount', { count: pages })}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onRemove} disabled={isProcessing}>
          {t('buttons.remove')}
        </Button>
      </div>
    </Card>
  );

  const modeButton = (value: InsertPagesMode, label: string, hint: string) => (
    <button
      type="button"
      onClick={() => {
        setMode(value);
        resetResult();
      }}
      aria-pressed={mode === value}
      className={`flex-1 rounded-[var(--radius-md)] border px-4 py-3 text-left transition-colors ${
        mode === value
          ? 'border-[hsl(var(--color-primary))] bg-[hsl(var(--color-primary)/0.08)]'
          : 'border-[hsl(var(--color-border))] hover:bg-[hsl(var(--color-muted))]'
      }`}
    >
      <span className="block font-medium text-[hsl(var(--color-foreground))]">{label}</span>
      <span className="block text-sm text-[hsl(var(--color-muted-foreground))]">{hint}</span>
    </button>
  );

  return (
    <div className={`space-y-6 ${className}`.trim()}>
      {/* 1. Main document */}
      <section className="space-y-2">
        <h3 className="text-base font-semibold text-[hsl(var(--color-foreground))]">{tt('mainTitle')}</h3>
        {mainFile ? (
          fileCard(mainFile, mainPages, () => { setMainFile(null); setMainPages(0); resetResult(); }, 'bg-blue-600')
        ) : (
          <FileUploader
            accept={['application/pdf', '.pdf']}
            multiple={false}
            maxFiles={1}
            onFilesSelected={loadMain}
            onError={setError}
            label={tt('mainUploadLabel')}
            description={tt('mainUploadDescription')}
          />
        )}
      </section>

      {/* 2. File to insert */}
      <section className="space-y-2">
        <h3 className="text-base font-semibold text-[hsl(var(--color-foreground))]">{tt('insertTitle')}</h3>
        {insertFile ? (
          fileCard(insertFile, insertPagesCount, () => { setInsertFile(null); setInsertPagesCount(0); resetResult(); }, 'bg-emerald-600')
        ) : (
          <FileUploader
            accept={['application/pdf', '.pdf']}
            multiple={false}
            maxFiles={1}
            onFilesSelected={loadInsert}
            onError={setError}
            label={tt('insertUploadLabel')}
            description={tt('insertUploadDescription')}
          />
        )}
      </section>

      {error && (
        <div className="p-4 rounded-[var(--radius-md)] bg-red-50 border border-red-200 text-red-700" role="alert">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* 3. Options */}
      {mainFile && insertFile && (
        <Card variant="outlined" size="lg">
          <h3 className="text-lg font-medium text-[hsl(var(--color-foreground))] mb-4">{tt('optionsTitle')}</h3>
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row gap-3">
              {modeButton('insert', tt('modeInsert'), tt('modeInsertHint'))}
              {modeButton('replace', tt('modeReplace'), tt('modeReplaceHint'))}
            </div>

            {mode === 'insert' ? (
              <fieldset className="space-y-2">
                <legend className="block text-sm font-medium text-[hsl(var(--color-foreground))] mb-1">{tt('positionLabel')}</legend>
                {(['start', 'end', 'after'] as PositionChoice[]).map((choice) => (
                  <label key={choice} className="flex items-center gap-2 text-sm text-[hsl(var(--color-foreground))]">
                    <input
                      type="radio"
                      name="insert-position"
                      checked={positionChoice === choice}
                      onChange={() => { setPositionChoice(choice); resetResult(); }}
                    />
                    {choice === 'start' && tt('positionStart')}
                    {choice === 'end' && tt('positionEnd')}
                    {choice === 'after' && (
                      <span className="flex items-center gap-2">
                        {tt('positionAfter')}
                        <input
                          type="number"
                          min={1}
                          max={mainPages}
                          value={afterPage}
                          onFocus={() => setPositionChoice('after')}
                          onChange={(e) => { setAfterPage(parseInt(e.target.value) || 1); setPositionChoice('after'); resetResult(); }}
                          className={`${numberClass} py-1`}
                          aria-label={tt('positionAfter')}
                        />
                        <span className="text-[hsl(var(--color-muted-foreground))]">/ {mainPages}</span>
                      </span>
                    )}
                  </label>
                ))}
              </fieldset>
            ) : (
              <div>
                <span className="block text-sm font-medium text-[hsl(var(--color-foreground))] mb-1">{tt('replaceLabel')}</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number" min={1} max={mainPages} value={replaceFrom}
                    onChange={(e) => { setReplaceFrom(parseInt(e.target.value) || 1); resetResult(); }}
                    className={numberClass} aria-label={tt('replaceFrom')}
                  />
                  <span className="text-[hsl(var(--color-muted-foreground))]">{tt('to')}</span>
                  <input
                    type="number" min={1} max={mainPages} value={replaceTo}
                    onChange={(e) => { setReplaceTo(parseInt(e.target.value) || 1); resetResult(); }}
                    className={numberClass} aria-label={tt('replaceTo')}
                  />
                  <span className="text-[hsl(var(--color-muted-foreground))]">/ {mainPages}</span>
                </div>
                {!replaceValid && (
                  <p className="mt-1 text-sm text-red-600">{tt('replaceInvalid', { total: mainPages })}</p>
                )}
                <p className="mt-1 text-sm text-[hsl(var(--color-muted-foreground))]">{tt('replaceHint')}</p>
              </div>
            )}

            <div>
              <label htmlFor="insert-source-pages" className="block text-sm font-medium text-[hsl(var(--color-foreground))] mb-1">
                {tt('sourcePagesLabel')}
              </label>
              <input
                id="insert-source-pages"
                type="text"
                value={sourcePages}
                placeholder={tt('sourcePagesPlaceholder')}
                onChange={(e) => { setSourcePages(e.target.value); resetResult(); }}
                className={inputClass}
              />
              <p className={`mt-1 text-sm ${selected ? 'text-[hsl(var(--color-muted-foreground))]' : 'text-red-600'}`}>
                {selected
                  ? tt('sourcePagesHint', { count: selected.length, total: insertPagesCount })
                  : tt('sourcePagesInvalid', { total: insertPagesCount })}
              </p>
            </div>

            {summary && (
              <div className="rounded-[var(--radius-md)] bg-[hsl(var(--color-muted))] p-3 text-sm text-[hsl(var(--color-foreground))]">
                <p className="font-medium mb-1">{tt('summaryTitle', { total: summary.total })}</p>
                <p>{summary.parts.join(' → ')}</p>
              </div>
            )}
          </div>
        </Card>
      )}

      {isProcessing && (
        <ProcessingProgress
          progress={progress}
          status={status}
          message={progressMessage}
          onCancel={() => { cancelledRef.current = true; setStatus('idle'); }}
          showPercentage
        />
      )}

      {mainFile && insertFile && (
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary" size="lg" onClick={handleProcess} disabled={!canProcess} loading={isProcessing}>
            {isProcessing ? t('status.processing') : mode === 'insert' ? tt('insertButton') : tt('replaceButton')}
          </Button>
          {result && (
            <DownloadButton file={result} filename={resultName} variant="secondary" size="lg" showFileSize />
          )}
        </div>
      )}

      {status === 'complete' && result && (
        <div className="p-4 rounded-[var(--radius-md)] bg-green-50 border border-green-200 text-green-700" role="status">
          <p className="text-sm font-medium">{tt('successMessage')}</p>
        </div>
      )}
    </div>
  );
}

export default InsertPagesTool;
