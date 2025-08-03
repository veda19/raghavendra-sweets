'use client';

import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

export default function ThemeToggle({ theme, onThemeToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onThemeToggle}
      className="cursor-pointer relative left-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors border-2 border-gray-500"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun size={24} className="text-yellow-400 " />
      ) : (
        <Moon size={24} className="text-gray-600 dark:text-gray-300" />
      )}
    </button>
  );
}