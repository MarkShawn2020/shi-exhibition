import Link from 'next/link';
import React from 'react';
import { useTranslations } from 'next-intl';
import { Container } from './Container';

const Footer = () => {
  const t = useTranslations('Footer');
  const footerLinks = {
    navigation: [
      { name: t('links.navigation.home'), href: '/' },
      { name: t('links.navigation.work'), href: '/portfolio' },
      { name: t('links.navigation.about'), href: '/about' },
      { name: t('links.navigation.process'), href: '/process' },
      { name: t('links.navigation.contact'), href: '/contact' },
    ],
    projects: [
      { name: t('links.projects.peer_schools'), href: '/portfolio' },
      { name: t('links.projects.jingshan'), href: '/portfolio/jingshan' },
      { name: t('links.projects.yuanling'), href: '/portfolio/yuanling' },
      { name: t('links.projects.longsheng'), href: '/portfolio/longsheng' },
    ],
    connect: [
      { name: t('links.connect.email'), href: 'mailto:contact@shiyiyuan.com' },
      { name: t('links.connect.linkedin'), href: 'https://linkedin.com/in/shiyiyuan' },
      { name: t('links.connect.riba'), href: 'https://riba.com/profile/shiyiyuan' },
      { name: t('links.connect.peer'), href: 'https://peer.org.cn' },
    ],
  };

  return (
    <footer className="u-theme-dark">
      <Container>
        <div className="py-16 lg:py-24">
          <div className="u-grid-desktop gap-8 lg:gap-16">
            {/* Logo and Description */}
            <div className="lg:col-span-4">
              <Link href="/" className="flex items-center space-x-2 no-underline mb-4" style={{ color: 'white' }}>
                <div className="h-10 w-10 bg-gradient-to-br from-amber-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  石
                </div>
                <span className="text-2xl font-bold">石藝苑</span>
              </Link>
              <p className="u-paragraph-m text-gray-300 mb-6">
                圍繞社區參與和在地文化展開的建築實踐
              </p>
              <div className="flex space-x-4">
                <a href="mailto:contact@shiyiyuan.com" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Email</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
                <a href="https://linkedin.com/in/shiyiyuan" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://peer.org.cn" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">PEER</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Links */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {t('navigation_title')}
              </h3>
              <ul className="space-y-3">
                {footerLinks.navigation.map(link => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-300 hover:text-white transition-colors no-underline">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {t('projects_title')}
              </h3>
              <ul className="space-y-3">
                {footerLinks.projects.map(link => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-300 hover:text-white transition-colors no-underline">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {t('connect_title')}
              </h3>
              <ul className="space-y-3">
                {footerLinks.connect.map(link => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-300 hover:text-white transition-colors no-underline">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {t('newsletter_title')}
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                {t('newsletter_description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder={t('email_placeholder')}
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button type="button" className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90 transition-opacity whitespace-nowrap">
                  {t('subscribe_button')}
                </button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2025 石藝苑. {t('rights_reserved')}
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors no-underline">
                  {t('links.legal.terms')}
                </Link>
                <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors no-underline">
                  {t('links.legal.privacy')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export { Footer };
