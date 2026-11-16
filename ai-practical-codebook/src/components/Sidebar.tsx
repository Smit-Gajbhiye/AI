import React from 'react';
import { BookOpen, Home, Search, X } from 'lucide-react';
import { PracticalItem } from '../data/practicalsData';

export type ActiveView =
  | { kind: 'home' }
  | { kind: 'item'; part: 'PART_01' | 'PART_02'; number: string };

interface SidebarProps {
  activeView: ActiveView;
  part1Items: PracticalItem[];
  part2Items: PracticalItem[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSelectHome: () => void;
  onSelectItem: (part: 'PART_01' | 'PART_02', number: string) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  part1Items,
  part2Items,
  searchQuery,
  onSearchChange,
  onSelectHome,
  onSelectItem,
  isOpenMobile,
  onCloseMobile,
}) => {
  const isHomeActive = activeView.kind === 'home';

  const sidebarContent = (
    <div className="h-full flex flex-col bg-white dark:bg-[#161920] border-r border-slate-200 dark:border-[#262B35]">
      {/* Sidebar Header */}
      <div className="px-4 py-4 border-b border-slate-200 dark:border-[#262B35]">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-md bg-[#181B20] dark:bg-[#2C4A6E] text-white flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-[#181B20] dark:text-white truncate">
                AI Practical Codebook
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                Practical Programs. Questions. Solutions.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Close sidebar"
            className="lg:hidden inline-flex items-center justify-center w-8 h-8 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Compact Sidebar Search Field */}
        <div className="mt-3 relative">
          <Search
            className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Filter practicals..."
            aria-label="Filter practicals in sidebar"
            className="w-full h-9 pl-8 pr-7 rounded-md bg-[#F4F6F8] dark:bg-[#0F1115] text-xs text-[#181B20] dark:text-slate-100 placeholder:text-slate-400 border border-slate-200 dark:border-[#262B35] focus:outline-none focus:ring-2 focus:ring-[#2C4A6E] dark:focus:ring-[#7DA4D0]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Clear filter"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-5 h-5 inline-flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Navigation List */}
      <nav
        aria-label="Practical Codebook Navigation"
        className="flex-1 overflow-y-auto px-3 py-4 space-y-6"
      >
        {/* Home */}
        <div>
          <button
            type="button"
            onClick={() => {
              onSelectHome();
              onCloseMobile();
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors cursor-pointer ${
              isHomeActive
                ? 'bg-[#EEF3F8] dark:bg-[#2C4A6E]/25 text-[#2C4A6E] dark:text-[#7DA4D0] font-semibold'
                : 'text-slate-700 dark:text-slate-300 hover:bg-[#F4F6F8] dark:hover:bg-[#1E232D]'
            }`}
          >
            <Home className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Home</span>
          </button>
        </div>

        {/* PART 01 — Laboratory Practicals */}
        <div>
          <p className="px-3 mb-2 text-xs font-semibold text-[#2C4A6E] dark:text-[#7DA4D0] tracking-tight">
            PART 01 — Laboratory Practicals
          </p>
          {part1Items.length === 0 ? (
            <p className="px-3 py-1.5 text-xs text-slate-400">No matches in Part 01</p>
          ) : (
            <ul className="space-y-0.5">
              {part1Items.map((item) => {
                const isActive =
                  activeView.kind === 'item' &&
                  activeView.part === 'PART_01' &&
                  activeView.number === item.number;
                return (
                  <li key={`side-p1-${item.number}`}>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectItem('PART_01', item.number);
                        onCloseMobile();
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-xs sm:text-[13px] leading-snug flex items-start gap-2 transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#EEF3F8] dark:bg-[#2C4A6E]/25 text-[#2C4A6E] dark:text-[#7DA4D0] font-semibold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-[#F4F6F8] dark:hover:bg-[#1E232D]'
                      }`}
                    >
                      <span className="font-mono text-[11px] tabular-nums shrink-0 mt-0.5 text-slate-500 dark:text-slate-400">
                        {item.number}
                      </span>
                      <span className="line-clamp-2">{item.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* PART 02 — Examination Questions */}
        <div>
          <p className="px-3 mb-2 text-xs font-semibold text-[#2C4A6E] dark:text-[#7DA4D0] tracking-tight">
            PART 02 — Examination Questions
          </p>
          {part2Items.length === 0 ? (
            <p className="px-3 py-1.5 text-xs text-slate-400">No matches in Part 02</p>
          ) : (
            <ul className="space-y-0.5">
              {part2Items.map((item) => {
                const isActive =
                  activeView.kind === 'item' &&
                  activeView.part === 'PART_02' &&
                  activeView.number === item.number;
                return (
                  <li key={`side-p2-${item.number}`}>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectItem('PART_02', item.number);
                        onCloseMobile();
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-xs sm:text-[13px] leading-snug flex items-start gap-2 transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#EEF3F8] dark:bg-[#2C4A6E]/25 text-[#2C4A6E] dark:text-[#7DA4D0] font-semibold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-[#F4F6F8] dark:hover:bg-[#1E232D]'
                      }`}
                    >
                      <span className="font-mono text-[11px] tabular-nums shrink-0 mt-0.5 text-slate-500 dark:text-slate-400">
                        {item.number}
                      </span>
                      <span className="line-clamp-2">{item.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block lg:w-72 xl:w-80 shrink-0 sticky top-14 h-[calc(100vh-3.5rem)]">
        {sidebarContent}
      </aside>

      {/* Mobile Collapsible Drawer */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-[#0F1115]/60"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <aside className="relative z-10 w-80 max-w-[85vw] h-full shadow-xl">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};
