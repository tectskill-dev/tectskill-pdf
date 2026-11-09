'use client';

/**
 * TectSkill PDF — Architect tools
 *
 * The architect tools (revision compare, measure to scale, sheet set, …) are
 * self-contained HTML apps in /public/arch-tools. They run fully offline:
 * pdf.js, pdf-lib, jszip, pako, jspdf and the IBM Plex Sans Thai font are
 * bundled locally. This component embeds one of them and lets it save files
 * through the app (native Save dialog in the desktop app).
 */

import { useEffect, useRef, useState } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { withBasePath } from '@/lib/utils/path';
import { isTauri, saveBlobFile } from '@/lib/tauri-bridge';

export type ArchToolFile =
  | 'revision-compare'
  | 'measure-scale'
  | 'sheet-set'
  | 'batch-stamp'
  | 'markup'
  | 'compress'
  | 'print-scale';

export interface ArchToolFrameProps {
  file: ArchToolFile;
  title: string;
}

declare global {
  interface Window {
    __tectskillSaveFile?: (filename: string, blob: Blob) => Promise<boolean>;
  }
}

async function saveFromTool(filename: string, blob: Blob): Promise<boolean> {
  if (isTauri()) {
    return saveBlobFile(blob, filename);
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
  return true;
}

export function ArchToolFrame({ file, title }: ArchToolFrameProps) {
  const t = useTranslations('common.archTools');
  const [fullscreen, setFullscreen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.__tectskillSaveFile = saveFromTool;
    return () => {
      if (window.__tectskillSaveFile === saveFromTool) delete window.__tectskillSaveFile;
    };
  }, []);

  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFullscreen(false);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [fullscreen]);

  const src = withBasePath(`/arch-tools/${file}.html`);

  return (
    <div
      ref={wrapRef}
      className={
        fullscreen
          ? 'fixed inset-0 z-[60] flex flex-col bg-[hsl(var(--color-background))]'
          : 'relative flex flex-col rounded-[var(--radius-lg)] border border-[hsl(var(--color-border))] overflow-hidden bg-[hsl(var(--color-card))]'
      }
      style={fullscreen ? { paddingTop: 'env(safe-area-inset-top, 0px)' } : undefined}
    >
      <div className="flex items-center justify-end gap-2 px-3 py-1.5 border-b border-[hsl(var(--color-border))] bg-[hsl(var(--color-muted))]">
        <button
          type="button"
          onClick={() => setFullscreen((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-sm text-[hsl(var(--color-foreground))] hover:bg-[hsl(var(--color-background))]"
          aria-pressed={fullscreen}
        >
          {fullscreen ? <Minimize2 className="h-4 w-4" aria-hidden /> : <Maximize2 className="h-4 w-4" aria-hidden />}
          <span>{fullscreen ? t('exitFullscreen') : t('fullscreen')}</span>
        </button>
      </div>
      <iframe
        src={src}
        title={title}
        className="block w-full border-0"
        style={{ height: fullscreen ? '100%' : 'min(88vh, 960px)', minHeight: 560, flex: fullscreen ? 1 : undefined }}
        allow="clipboard-write; fullscreen"
      />
    </div>
  );
}

export default ArchToolFrame;
