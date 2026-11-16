import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PART_ONE_PRACTICALS, PART_TWO_QUESTIONS, PracticalItem } from './data/practicalsData';
import { HomeView } from './components/HomeView';
import { Navbar } from './components/Navbar';
import { PracticalDetailView } from './components/PracticalDetailView';
import { ActiveView, Sidebar } from './components/Sidebar';

function filterItems(items: PracticalItem[], query: string): PracticalItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;

  return items.filter((item) => {
    const inHeader =
      item.number.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.question.toLowerCase().includes(q) ||
      item.keywords.some((kw) => kw.toLowerCase().includes(q));

    const inPrograms = item.programs.some(
      (prog) =>
        prog.filename.toLowerCase().includes(q) ||
        (prog.subTitle && prog.subTitle.toLowerCase().includes(q))
    );

    return inHeader || inPrograms;
  });
}

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>({ kind: 'home' });
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem('ai-codebook-theme') === 'dark';
  });

  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      window.localStorage.setItem('ai-codebook-theme', 'dark');
    } else {
      root.classList.remove('dark');
      window.localStorage.setItem('ai-codebook-theme', 'light');
    }
  }, [isDark]);

  const filteredPart1 = useMemo(
    () => filterItems(PART_ONE_PRACTICALS, searchQuery),
    [searchQuery]
  );
  const filteredPart2 = useMemo(
    () => filterItems(PART_TWO_QUESTIONS, searchQuery),
    [searchQuery]
  );

  const handleSelectHome = () => {
    setActiveView({ kind: 'home' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectItem = (part: 'PART_01' | 'PART_02', number: string) => {
    setActiveView({ kind: 'item', part, number });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedContext = useMemo(() => {
    if (activeView.kind !== 'item') return null;
    const list = activeView.part === 'PART_01' ? PART_ONE_PRACTICALS : PART_TWO_QUESTIONS;
    const idx = list.findIndex((i) => i.number === activeView.number);
    if (idx === -1) return null;
    return {
      part: activeView.part,
      item: list[idx],
      prevItem: idx > 0 ? list[idx - 1] : undefined,
      nextItem: idx < list.length - 1 ? list[idx + 1] : undefined,
    };
  }, [activeView]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F8] dark:bg-[#0F1115] text-[#181B20] dark:text-slate-100">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        onSelectHome={handleSelectHome}
      />

      <div className="flex-1 flex">
        <Sidebar
          activeView={activeView}
          part1Items={filteredPart1}
          part2Items={filteredPart2}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectHome={handleSelectHome}
          onSelectItem={handleSelectItem}
          isOpenMobile={isSidebarOpen}
          onCloseMobile={() => setIsSidebarOpen(false)}
        />

        <main ref={mainRef} className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="max-w-4xl mx-auto">
            {activeView.kind === 'home' || !selectedContext ? (
              <HomeView
                part1Items={filteredPart1}
                part2Items={filteredPart2}
                searchQuery={searchQuery}
                onSelectItem={handleSelectItem}
              />
            ) : (
              <PracticalDetailView
                part={selectedContext.part}
                item={selectedContext.item}
                prevItem={selectedContext.prevItem}
                nextItem={selectedContext.nextItem}
                onSelectHome={handleSelectHome}
                onSelectItem={handleSelectItem}
              />
            )}
          </div>
        </main>
      </div>

      <footer className="w-full px-4 sm:px-6 py-4 text-center">
        <p className="text-[11px] sm:text-xs font-medium tracking-normal text-slate-500 dark:text-slate-400">
          I SEE YOU CHEATING...
        </p>
      </footer>
    </div>
  );
}
