import React from 'react';
import { Menu, Moon, Search, Sun, X } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onSelectHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  isDark,
  onToggleTheme,
  isSidebarOpen,
  onToggleSidebar,
  onSelectHome,
}) => {
  return (
    <header className="sticky top-0 z-40 h-14 w-full bg-[#181B20] dark:bg-[#111317] text-white border-b border-[#2A2F38]">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left: Mobile Sidebar Toggle + Website Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onToggleSidebar}
            aria-label={isSidebarOpen ? 'Close navigation sidebar' : 'Open navigation sidebar'}
            aria-expanded={isSidebarOpen}
            className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-md text-slate-300 hover:text-white hover:bg-[#22262E] transition-colors cursor-pointer shrink-0"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            type="button"
            onClick={onSelectHome}
            className="text-left text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-[#9BBBE0] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7DA4D0] rounded"
          >
            AI Practical Codebook
          </button>
        </div>

        {/* Center/Right: Compact Search + Theme Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <div className="relative hidden sm:block w-56 md:w-72">
            <Search
              className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search practicals or questions..."
              aria-label="Search practicals or questions"
              className="w-full h-9 pl-9 pr-8 rounded-md bg-[#22262E] text-sm text-white placeholder:text-slate-400 border border-[#323843] focus:outline-none focus:ring-2 focus:ring-[#7DA4D0]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-6 h-6 inline-flex items-center justify-center text-slate-400 hover:text-white rounded cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md border border-[#323843] bg-[#22262E] text-xs font-medium text-slate-100 hover:bg-[#2B303A] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7DA4D0]"
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-amber-300" aria-hidden="true" />
                <span className="hidden md:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-[#9BBBE0]" aria-hidden="true" />
                <span className="hidden md:inline">Dark</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
