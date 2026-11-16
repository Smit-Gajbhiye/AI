import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Copy, Download, FileCode2 } from 'lucide-react';
import { PracticalItem, ProgramEntry } from '../data/practicalsData';
import { downloadSinglePythonFile } from '../utils/downloadCodes';
import { highlightPythonLines } from '../utils/highlightPython';

interface PracticalDetailViewProps {
  part: 'PART_01' | 'PART_02';
  item: PracticalItem;
  prevItem?: PracticalItem;
  nextItem?: PracticalItem;
  onSelectHome: () => void;
  onSelectItem: (part: 'PART_01' | 'PART_02', number: string) => void;
}

const SudokuPuzzleGrid: React.FC<{ grid: number[][] }> = ({ grid }) => {
  return (
    <div className="pt-2">
      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
        Original Puzzle (9×9 Sudoku Grid)
      </p>
      <div className="inline-block overflow-x-auto">
        <table
          aria-label="Original 9x9 Sudoku Puzzle"
          className="border-collapse border-2 border-[#181B20] dark:border-slate-400 font-mono text-xs sm:text-sm tabular-nums bg-white dark:bg-[#111317]"
        >
          <tbody>
            {grid.map((row, rIdx) => (
              <tr key={`sr-${rIdx}`}>
                {row.map((cell, cIdx) => {
                  const thickRight = (cIdx + 1) % 3 === 0 && cIdx < 8;
                  const thickBottom = (rIdx + 1) % 3 === 0 && rIdx < 8;
                  return (
                    <td
                      key={`sc-${rIdx}-${cIdx}`}
                      className={`w-7 h-7 sm:w-8 sm:h-8 text-center align-middle border border-slate-300 dark:border-[#2E3440] ${
                        thickRight ? 'border-r-2 border-r-[#181B20] dark:border-r-slate-400' : ''
                      } ${
                        thickBottom ? 'border-b-2 border-b-[#181B20] dark:border-b-slate-400' : ''
                      } ${
                        cell !== 0
                          ? 'font-bold text-[#181B20] dark:text-white bg-[#F4F6F8] dark:bg-[#1B2029]'
                          : 'text-slate-400 dark:text-slate-600'
                      }`}
                    >
                      {cell !== 0 ? cell : ''}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ProgramSection: React.FC<{ program: ProgramEntry; showSubTitle: boolean }> = ({
  program,
  showSubTitle,
}) => {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleCopy = async () => {
    const textToCopy = program.code;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
    }
    window.setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    downloadSinglePythonFile(program.filename, program.code);
    setDownloaded(true);
    window.setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <section className="bg-white dark:bg-[#161920] border border-slate-200 dark:border-[#262B35] rounded-lg shadow-sm p-5 sm:p-6 space-y-5">
      {showSubTitle && program.subTitle && (
        <h3 className="text-base font-semibold text-[#2C4A6E] dark:text-[#7DA4D0] pb-2 border-b border-slate-200 dark:border-[#262B35]">
          {program.subTitle}
        </h3>
      )}

      {/* 3. Python Filename */}
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="font-semibold text-[#181B20] dark:text-slate-200">Filename:</span>
        <code className="font-mono text-xs sm:text-sm text-[#2C4A6E] dark:text-[#7DA4D0] bg-[#F4F6F8] dark:bg-[#1E232D] px-2.5 py-1 rounded border border-slate-200 dark:border-[#323843]">
          {program.filename}
        </code>
      </div>

      {program.note && (
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{program.note}</p>
      )}

      {/* 4. Complete Python Program + Copy Code & Download Python (.py) buttons */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 bg-[#181B20] text-slate-200 px-4 py-2.5 rounded-t-md border border-b-0 border-[#2A2F38]">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 min-w-0">
            <FileCode2 className="w-4 h-4 text-[#7DA4D0] shrink-0" aria-hidden="true" />
            <span className="truncate">Python Code — {program.filename}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded bg-[#22262E] text-slate-100 hover:bg-[#2B303A] border border-[#323843] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7DA4D0]"
            >
              {downloaded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" aria-hidden="true" />
                  <span>Downloaded</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-[#9BBBE0]" aria-hidden="true" />
                  <span>Download Python (.py)</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded bg-[#2C4A6E] text-white hover:bg-[#223B58] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7DA4D0]"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" aria-hidden="true" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-[#111317] text-slate-100 rounded-b-md border border-[#2A2F38] overflow-x-auto code-scroll">
          <pre className="p-4 sm:p-5 text-xs sm:text-[13.5px] font-mono">
            <code className="table w-full">{highlightPythonLines(program.code)}</code>
          </pre>
        </div>
      </div>

      {/* 5. Sample Input */}
      <div>
        <h4 className="text-sm font-semibold text-[#2C4A6E] dark:text-[#7DA4D0] mb-2">
          Sample Input
        </h4>
        <pre className="bg-[#F4F6F8] dark:bg-[#0F1115] border border-slate-200 dark:border-[#262B35] rounded-md p-3.5 text-xs sm:text-[13px] font-mono text-[#181B20] dark:text-slate-200 whitespace-pre-wrap overflow-x-auto">
          {program.sampleInput}
        </pre>
      </div>

      {/* 6. Sample Output */}
      <div>
        <h4 className="text-sm font-semibold text-[#2C4A6E] dark:text-[#7DA4D0] mb-2">
          Sample Output
        </h4>
        <pre className="bg-[#F4F6F8] dark:bg-[#0F1115] border border-slate-200 dark:border-[#262B35] rounded-md p-3.5 text-xs sm:text-[13px] font-mono text-[#181B20] dark:text-slate-200 whitespace-pre overflow-x-auto code-scroll">
          {program.sampleOutput}
        </pre>
      </div>
    </section>
  );
};

export const PracticalDetailView: React.FC<PracticalDetailViewProps> = ({
  part,
  item,
  prevItem,
  nextItem,
  onSelectHome,
  onSelectItem,
}) => {
  const partTitle =
    part === 'PART_01'
      ? 'PART 01 — Laboratory Practicals'
      : 'PART 02 — Practical Examination Question Bank';
  const prefix = part === 'PART_01' ? 'Practical' : 'Question';

  return (
    <div className="space-y-6">
      {/* Breadcrumb / Back to Home */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
        <button
          type="button"
          onClick={onSelectHome}
          className="inline-flex items-center gap-1.5 font-medium text-[#2C4A6E] dark:text-[#7DA4D0] hover:underline underline-offset-4 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Home</span>
        </button>
        <span className="font-mono">{partTitle}</span>
      </div>

      {/* 1. Practical Number and Title + 2. Complete Practical Question */}
      <section className="bg-white dark:bg-[#161920] border border-slate-200 dark:border-[#262B35] rounded-lg shadow-sm p-5 sm:p-6 space-y-4">
        <div>
          <p className="text-xs font-mono font-semibold text-[#2C4A6E] dark:text-[#7DA4D0] tabular-nums">
            {prefix.toUpperCase()} {item.number}
          </p>
          <h1 className="mt-1 text-xl sm:text-2xl font-bold text-[#2C4A6E] dark:text-[#7DA4D0] tracking-tight [text-wrap:balance]">
            {prefix} {item.number} — {item.title}
          </h1>
        </div>

        <div className="pt-3 border-t border-slate-200 dark:border-[#262B35]">
          <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
            Practical Question
          </h2>
          <p className="text-sm sm:text-base text-[#181B20] dark:text-slate-200 leading-relaxed whitespace-pre-line">
            {item.question}
          </p>
        </div>

        {item.sudokuPuzzle && <SudokuPuzzleGrid grid={item.sudokuPuzzle} />}

        {item.matrix && (
          <div className="pt-2">
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              {item.matrix.caption}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full max-w-md border-collapse text-xs sm:text-sm font-mono tabular-nums border border-slate-200 dark:border-[#323843]">
                <thead>
                  <tr className="bg-[#F4F6F8] dark:bg-[#1E232D] text-[#181B20] dark:text-slate-100">
                    <th className="border border-slate-200 dark:border-[#323843] px-3 py-1.5 text-left font-semibold">
                      City
                    </th>
                    {item.matrix.headers.map((h) => (
                      <th
                        key={h}
                        className="border border-slate-200 dark:border-[#323843] px-3 py-1.5 text-center font-semibold"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {item.matrix.rows.map((row) => (
                    <tr key={row.label} className="bg-white dark:bg-[#161920]">
                      <th className="border border-slate-200 dark:border-[#323843] px-3 py-1.5 text-left font-semibold bg-[#F4F6F8] dark:bg-[#1E232D]/60 text-[#181B20] dark:text-slate-200">
                        {row.label}
                      </th>
                      {row.values.map((val, idx) => (
                        <td
                          key={idx}
                          className="border border-slate-200 dark:border-[#323843] px-3 py-1.5 text-center text-slate-700 dark:text-slate-300"
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* Programs or Placeholder */}
      {item.isPlaceholder ? (
        <section className="bg-white dark:bg-[#161920] border border-slate-200 dark:border-[#262B35] rounded-lg shadow-sm p-6">
          <h2 className="text-base font-semibold text-[#2C4A6E] dark:text-[#7DA4D0]">
            Content to be added
          </h2>
          <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
            {item.placeholderMessage}
          </p>
        </section>
      ) : (
        <div className="space-y-6">
          {item.programs.map((program) => (
            <ProgramSection
              key={program.id}
              program={program}
              showSubTitle={item.programs.length > 1}
            />
          ))}
        </div>
      )}

      {/* Previous / Next Navigation within the same Part */}
      <nav
        aria-label="Practical Navigation"
        className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2"
      >
        {prevItem ? (
          <button
            type="button"
            onClick={() => onSelectItem(part, prevItem.number)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white dark:bg-[#161920] border border-slate-200 dark:border-[#262B35] text-sm font-medium text-[#181B20] dark:text-slate-200 hover:border-[#2C4A6E] dark:hover:border-[#7DA4D0] transition-colors cursor-pointer text-left"
          >
            <ArrowLeft className="w-4 h-4 shrink-0 text-[#2C4A6E] dark:text-[#7DA4D0]" />
            <span className="truncate">
              {prefix} {prevItem.number}: {prevItem.title}
            </span>
          </button>
        ) : (
          <div />
        )}

        {nextItem && (
          <button
            type="button"
            onClick={() => onSelectItem(part, nextItem.number)}
            className="inline-flex items-center justify-end gap-2 px-4 py-2.5 rounded-lg bg-white dark:bg-[#161920] border border-slate-200 dark:border-[#262B35] text-sm font-medium text-[#181B20] dark:text-slate-200 hover:border-[#2C4A6E] dark:hover:border-[#7DA4D0] transition-colors cursor-pointer text-right"
          >
            <span className="truncate">
              {prefix} {nextItem.number}: {nextItem.title}
            </span>
            <ArrowRight className="w-4 h-4 shrink-0 text-[#2C4A6E] dark:text-[#7DA4D0]" />
          </button>
        )}
      </nav>
    </div>
  );
};
