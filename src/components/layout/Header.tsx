'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { cn } from '@/utils/Helpers';
import { Button } from '../ui/Button';
import { Container } from './Container';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: '文档', href: '/docs' },
    { name: '示例', href: '/examples' },
    { name: '博客', href: '/blog' },
    { name: '关于', href: '/about' },
  ];

  return (
    <header className="w-full bg-background-main border-b border-border-default/20">
      <Container>
        <div className="flex items-center justify-between py-4 lg:py-6">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center no-underline">
              <img 
                src="/assets/images/neurora-logo-red.svg" 
                alt="Neurora" 
                className="h-8 w-auto"
              />
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
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="secondary" size="md">
              登录
            </Button>
            <Button variant="primary" size="md">
              免费体验
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
              <Button variant="secondary" size="md" className="w-full">
                登录
              </Button>
              <Button variant="primary" size="md" className="w-full">
                免费体验
              </Button>
            </div>
          </nav>
        </div>
      </Container>
    </header>
  );
};

export { Header };
