'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/utils/Helpers';
import { Button } from '../ui/Button';
import { Container } from './Container';
import { LocaleSwitcher } from '../LocaleSwitcher';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('Header');

  const navigation = [
    { name: t('work'), href: '/portfolio' },
    { name: t('about'), href: '/about' },
    { name: t('process'), href: '/process' },
    { name: t('contact'), href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background-main border-b border-border-default/20 backdrop-blur-sm">
      <Container>
        <div className="flex items-center justify-between py-4 lg:py-6">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 no-underline text-gray-900">
              <div className="h-8 w-8 bg-gradient-to-br from-amber-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                石
              </div>
              <span className="text-xl font-bold">石藝苑</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className="text-text-main hover:text-primary transition-colors no-underline"
              >
                {item.name}
              </Link>
            ))}
            <div className="pl-4 border-l border-border-default/20">
              <LocaleSwitcher />
            </div>
          </nav>

          {/* Desktop Actions - Contact Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="primary" size="md">
              {t('contact')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-text-main hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen
                ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  )
                : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'lg:hidden transition-all duration-300 overflow-hidden',
            isMenuOpen ? 'max-h-96 pb-6' : 'max-h-0',
          )}
        >
          <nav className="flex flex-col space-y-4">
            <div className="flex justify-end py-2">
              <LocaleSwitcher />
            </div>
            {navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className="text-text-main hover:text-primary transition-colors py-2 no-underline"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-3 pt-4 border-t border-border-default/20">
              <Button variant="primary" size="md" className="w-full">
                {t('contact')}
              </Button>
            </div>
          </nav>
        </div>
      </Container>
    </header>
  );
};

export { Header };
