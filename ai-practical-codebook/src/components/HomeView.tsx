import React, { useState } from 'react';
import { Check, ChevronRight, Download, FolderArchive } from 'lucide-react';
import { PracticalItem } from '../data/practicalsData';
import {
  downloadAllCodesZip,
  downloadPartOneZip,
  downloadPartTwoZip,
} from '../utils/downloadCodes';

interface HomeViewProps {
  part1Items: PracticalItem[];
  part2Items: PracticalItem[];
  searchQuery: string;
  onSelectItem: (part: 'PART_01' | 'PART_02', number: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  part1Items,
  part2Items,
  searchQuery,
  onSelectItem,
}) => {
  const [busyTarget, setBusyTarget] = useState<'all' | 'part1' | 'part2' | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleDownloadAll = async () => {
    setBusyTarget('all');
    try {
      const res = await downloadAllCodesZip();
      setStatusMessage(
        `Downloaded AI_Practical_Codebook_All_Codes.zip (${res.part1Count} Part 01 files, ${res.part2Count} Part 02 files; ${res.skippedCount} unimplemented placeholder skipped).`
      );
    } catch {
      setStatusMessage('Failed to generate AI_Practical_Codebook_All_Codes.zip.');
    } finally {
      setBusyTarget(null);
    }
  };

  const handleDownloadPart1 = async () => {
    setBusyTarget('part1');
    try {
      const res = await downloadPartOneZip();
      setStatusMessage(
        `Downloaded AI_Laboratory_Practicals.zip (${res.addedCount} Python files from Practicals 01–09; Practical 10 Mini-Project skipped as content is to be added).`
      );
    } catch {
      setStatusMessage('Failed to generate AI_Laboratory_Practicals.zip.');
    } finally {
      setBusyTarget(null);
    }
  };

  const handleDownloadPart2 = async () => {
    setBusyTarget('part2');
    try {
      const res = await downloadPartTwoZip();
      setStatusMessage(
        `Downloaded AI_Examination_Questions.zip (${res.addedCount} Python files across Questions 01–16).`
      );
    } catch {
      setStatusMessage('Failed to generate AI_Examination_Questions.zip.');
    } finally {
      setBusyTarget(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Introduction Card */}
      <section className="bg-white dark:bg-[#161920] border border-slate-200 dark:border-[#262B35] rounded-lg shadow-sm p-6 sm:p-8">
        <p className="text-xs font-mono font-semibold text-[#2C4A6E] dark:text-[#7DA4D0]">
          Practical Programs. Questions. Solutions.
        </p>
        <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-[#181B20] dark:text-white tracking-tight [text-wrap:balance]">
          AI Practical Codebook
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
          An independent programming reference organized into two clear sections. Select any
          laboratory practical or examination question from the sidebar or from the lists below to
          read the complete question, inspect the Python filename and source code, and verify the
          sample input and output.
        </p>
        {searchQuery.trim() !== '' && (
          <p className="mt-4 text-xs font-mono text-[#2C4A6E] dark:text-[#7DA4D0] tabular-nums">
            Filtered by &ldquo;{searchQuery}&rdquo; — {part1Items.length} match
            {part1Items.length === 1 ? '' : 'es'} in Part 01 · {part2Items.length} match
            {part2Items.length === 1 ? '' : 'es'} in Part 02
          </p>
        )}
      </section>

      {/* Download Codes (.ZIP) Section */}
      <section className="bg-white dark:bg-[#161920] border border-slate-200 dark:border-[#262B35] rounded-lg shadow-sm p-6">
        <div className="flex items-start gap-3">
          <FolderArchive
            className="w-5 h-5 text-[#2C4A6E] dark:text-[#7DA4D0] shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div>
            <h2 className="text-lg font-bold text-[#2C4A6E] dark:text-[#7DA4D0]">
              Download Python Codes (.ZIP)
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Download verified Python source files organized by section, or download individual{' '}
              <code className="font-mono text-xs">.py</code> files directly inside each practical
              page.
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleDownloadAll}
            disabled={busyTarget !== null}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-[#2C4A6E] hover:bg-[#223B58] disabled:opacity-60 text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7DA4D0]"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            <span>
              {busyTarget === 'all' ? 'Preparing ZIP...' : 'Download All Codes (.ZIP)'}
            </span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPart1}
            disabled={busyTarget !== null}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-[#F4F6F8] dark:bg-[#1E232D] hover:bg-slate-200 dark:hover:bg-[#272D39] disabled:opacity-60 text-[#181B20] dark:text-slate-100 border border-slate-300 dark:border-[#323843] text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C4A6E]"
          >
            <Download className="w-4 h-4 text-[#2C4A6E] dark:text-[#7DA4D0]" aria-hidden="true" />
            <span>
              {busyTarget === 'part1'
                ? 'Preparing Part 01...'
                : 'Download Part 01 Codes (.ZIP)'}
            </span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPart2}
            disabled={busyTarget !== null}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-[#F4F6F8] dark:bg-[#1E232D] hover:bg-slate-200 dark:hover:bg-[#272D39] disabled:opacity-60 text-[#181B20] dark:text-slate-100 border border-slate-300 dark:border-[#323843] text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2C4A6E]"
          >
            <Download className="w-4 h-4 text-[#2C4A6E] dark:text-[#7DA4D0]" aria-hidden="true" />
            <span>
              {busyTarget === 'part2'
                ? 'Preparing Part 02...'
                : 'Download Part 02 Codes (.ZIP)'}
            </span>
          </button>
        </div>

        {statusMessage && (
          <p
            role="status"
            className="mt-4 inline-flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-300 font-medium"
          >
            <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{statusMessage}</span>
          </p>
        )}
      </section>

      {/* PART 01 — Laboratory Practicals (10 Questions) */}
      <section className="bg-white dark:bg-[#161920] border border-slate-200 dark:border-[#262B35] rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 dark:border-[#262B35] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs font-mono font-semibold text-[#2C4A6E] dark:text-[#7DA4D0] tabular-nums">
              PART 01 · 10 LABORATORY PRACTICALS
            </p>
            <h2 className="mt-1 text-xl font-bold text-[#2C4A6E] dark:text-[#7DA4D0]">
              PART 01 — LABORATORY PRACTICALS
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Complete laboratory practicals covering search, constraint satisfaction, planning, and rule-based systems.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDownloadPart1}
            disabled={busyTarget !== null}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-[#F4F6F8] dark:bg-[#1E232D] hover:bg-slate-200 dark:hover:bg-[#272D39] text-xs font-medium text-[#181B20] dark:text-slate-100 border border-slate-300 dark:border-[#323843] transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-center"
          >
            <Download className="w-3.5 h-3.5 text-[#2C4A6E] dark:text-[#7DA4D0]" aria-hidden="true" />
            <span>Download Part 01 Codes (.ZIP)</span>
          </button>
        </div>

        {part1Items.length === 0 ? (
          <div className="p-6 text-sm text-slate-500 dark:text-slate-400">
            No laboratory practicals in Part 01 match &ldquo;{searchQuery}&rdquo;.
          </div>
        ) : (
          <ul className="divide-y divide-slate-200 dark:divide-[#262B35]">
            {part1Items.map((item) => (
              <li key={`home-p1-${item.number}`}>
                <button
                  type="button"
                  onClick={() => onSelectItem('PART_01', item.number)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-[#F4F6F8] dark:hover:bg-[#1E232D]/60 transition-colors cursor-pointer"
                >
                  <div className="min-w-0">
                    <p className="text-sm sm:text-base font-semibold text-[#181B20] dark:text-slate-100">
                      <span className="font-mono text-xs sm:text-sm text-[#2C4A6E] dark:text-[#7DA4D0] tabular-nums mr-2">
                        Practical {item.number}
                      </span>
                      <span aria-hidden="true" className="text-slate-400 mr-2">
                        —
                      </span>
                      <span>{item.title}</span>
                    </p>
                    <p className="mt-1 text-xs font-mono text-slate-500 dark:text-slate-400 truncate">
                      {item.isPlaceholder
                        ? 'Content to be added'
                        : item.programs.map((p) => p.filename).join(' · ')}
                    </p>
                  </div>
                  <ChevronRight
                    className="w-4 h-4 text-slate-400 shrink-0"
                    aria-hidden="true"
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* PART 02 — Practical Examination Question Bank (16 Questions) */}
      <section className="bg-white dark:bg-[#161920] border border-slate-200 dark:border-[#262B35] rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 dark:border-[#262B35] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs font-mono font-semibold text-[#2C4A6E] dark:text-[#7DA4D0] tabular-nums">
              PART 02 · 16 EXAMINATION QUESTIONS
            </p>
            <h2 className="mt-1 text-xl font-bold text-[#2C4A6E] dark:text-[#7DA4D0]">
              PART 02 — PRACTICAL EXAMINATION QUESTION BANK
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Complete examination programming problems with verified Python programs and sample runs.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDownloadPart2}
            disabled={busyTarget !== null}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-[#F4F6F8] dark:bg-[#1E232D] hover:bg-slate-200 dark:hover:bg-[#272D39] text-xs font-medium text-[#181B20] dark:text-slate-100 border border-slate-300 dark:border-[#323843] transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start sm:self-center"
          >
            <Download className="w-3.5 h-3.5 text-[#2C4A6E] dark:text-[#7DA4D0]" aria-hidden="true" />
            <span>Download Part 02 Codes (.ZIP)</span>
          </button>
        </div>

        {part2Items.length === 0 ? (
          <div className="p-6 text-sm text-slate-500 dark:text-slate-400">
            No examination questions in Part 02 match &ldquo;{searchQuery}&rdquo;.
          </div>
        ) : (
          <ul className="divide-y divide-slate-200 dark:divide-[#262B35]">
            {part2Items.map((item) => (
              <li key={`home-p2-${item.number}`}>
                <button
                  type="button"
                  onClick={() => onSelectItem('PART_02', item.number)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-[#F4F6F8] dark:hover:bg-[#1E232D]/60 transition-colors cursor-pointer"
                >
                  <div className="min-w-0">
                    <p className="text-sm sm:text-base font-semibold text-[#181B20] dark:text-slate-100">
                      <span className="font-mono text-xs sm:text-sm text-[#2C4A6E] dark:text-[#7DA4D0] tabular-nums mr-2">
                        Question {item.number}
                      </span>
                      <span aria-hidden="true" className="text-slate-400 mr-2">
                        —
                      </span>
                      <span>{item.title}</span>
                    </p>
                    <p className="mt-1 text-xs font-mono text-slate-500 dark:text-slate-400 truncate">
                      {item.programs.map((p) => p.filename).join(' · ')}
                    </p>
                  </div>
                  <ChevronRight
                    className="w-4 h-4 text-slate-400 shrink-0"
                    aria-hidden="true"
                  />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};
