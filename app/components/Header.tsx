
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ToggleTheme';
import { Menu, X } from 'lucide-react';
import Logo from '../../public/images/Logo.jpg';

interface HeaderProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

export default function Header({ theme, onThemeToggle }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Theme-based Tailwind classes
  const headerBg = theme === 'dark' ? 'bg-neutral-900' : 'bg-gray-100';
  const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';
  const borderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const logoBorder = theme === 'dark' ? 'border-2 border-gray-500' : 'border-2 border-transparent';

  // Navigation items
  const navItems = ['Home', 'Sweets', 'Savouries', 'Podi', 'About', 'Contact'];

  // Function to check if a link is active
  const isActive = (path: string) => {
    if (path === '/') return pathname === path;
    return pathname.startsWith(path);
  };

  return (
    <header className={`fixed top-0 z-50 w-full ${headerBg} shadow-md transition-colors duration-300`}>
      <div className="relative right-3 container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <div className="flex items-center lg:hidden">
          <button
            className=" border border-gray-400 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            )}
          </button>
        </div>

        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <Image
            src={Logo}
            width={58}
            height={48}
            alt="Raghavendra Sweets Logo"
            className={`rounded-full object-cover ${logoBorder} transition-all duration-300`}
            priority
          />
         
          <Link
  href="/"
  className={`relative right-[6px] text-[15px] sm:text-xl md:text-2xl font-bold tracking-tight ${textColor} hover:text-blue-600 transition-colors duration-200 whitespace-nowrap`}
>
  <span className='flex flex-col'>
    <span className='mt-1 sm:mt-[3px] font-cinzel'>Sri Raghavendra</span>
    <span className='text-[14.5px] sm:text-[18px] relative bottom-1 sm:bottom-1 font-cinzel'>Savoury & Sweet Home</span>
  </span>
</Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
            const active = isActive(path);
            
            return (
              <Link
                key={item}
                href={path}
                className={`relative text-md font-semibold ${textColor} hover:text-blue-600 transition-colors duration-200 group font-sans ${
                  active ? 'text-blue-600' : ''
                }`}
              >
                {item}
                <span className={`absolute bottom-[-2px] left-0 h-[2px] bg-blue-600 transition-all duration-300 ease-out ${
                  active ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            );
          })}
        </nav>

        {/* Theme Toggle */}
        <div className="flex items-center">
          <ThemeToggle theme={theme} onThemeToggle={onThemeToggle} />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden ${headerBg} ${borderColor} border-t transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col items-center py-6 gap-4">
          {navItems.map((item) => {
            const path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
            const active = isActive(path);
            
            return (
              <Link
                key={item}
                href={path}
                className={`text-base font-semibold ${
                  active ? 'text-blue-600' : textColor
                } hover:text-blue-600 transition-colors duration-200 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 w-full text-center font-sans`}
                onClick={toggleMenu}
              >
                {item}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}