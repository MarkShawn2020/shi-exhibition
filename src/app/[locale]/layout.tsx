import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Fira_Code, Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { PostHogProvider } from '@/components/analytics/PostHogProvider';
import { DemoBadge } from '@/components/DemoBadge';
import { ToastProvider } from '@/components/providers/ToastProvider';
import { routing } from '@/libs/I18nRouting';
import '@/styles/global.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

// Base metadata configuration - specific metadata will be generated per locale
export const generateMetadata = async (props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> => {
  const { locale } = await props.params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://shiyiyuan.com';
  
  // Locale-specific metadata
  const metadataByLocale = {
    zh: {
      title: {
        default: '石藝苑建築師 - 鄉村教育建築實踐',
        template: '%s | 石藝苑',
      },
      description: '石藝苑建築師作品集，專注於鄉村教育建築設計，通過社區參與和在地文化展開建築實踐，探索空間的敘事性與社會影響力。',
      keywords: ['建築師', '鄉村教育', 'PEER', '社區參與', '在地文化', '侗族建築', '石藝苑'],
      ogLocale: 'zh_CN',
      ogTitle: '石藝苑建築師 - 鄉村教育建築實踐',
      ogDescription: '石藝苑建築師作品集，專注於鄉村教育建築設計，通過社區參與和在地文化展開建築實踐。',
      twitterTitle: '石藝苑建築師 - 鄉村教育建築實踐',
      twitterDescription: '石藝苑建築師作品集，專注於鄉村教育建築設計。',
      ogImageAlt: '石藝苑建築師',
    },
    en: {
      title: {
        default: 'Shi Yiyuan Architect - Rural Education Architecture Practice',
        template: '%s | Shi Yiyuan',
      },
      description: 'Shi Yiyuan Architect portfolio, focusing on rural education architecture design through community engagement and local cultural integration.',
      keywords: ['architect', 'rural education', 'PEER', 'community engagement', 'local culture', 'Dong architecture', 'Shi Yiyuan'],
      ogLocale: 'en_US',
      ogTitle: 'Shi Yiyuan Architect - Rural Education Architecture Practice',
      ogDescription: 'Shi Yiyuan Architect portfolio, focusing on rural education architecture design through community engagement and local cultural integration.',
      twitterTitle: 'Shi Yiyuan Architect - Rural Education Architecture Practice',
      twitterDescription: 'Shi Yiyuan Architect portfolio, focusing on rural education architecture design.',
      ogImageAlt: 'Shi Yiyuan Architect',
    },
  };

  const currentMetadata = metadataByLocale[locale as keyof typeof metadataByLocale] || metadataByLocale.en;

  return {
    title: currentMetadata.title,
    description: currentMetadata.description,
    keywords: currentMetadata.keywords,
    authors: [{ name: '石藝苑' }],
    creator: '石藝苑',
    publisher: '石藝苑',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'zh-CN': `${baseUrl}/zh`,
        'en-US': `${baseUrl}/en`,
        'x-default': `${baseUrl}/en`,
      },
    },
    openGraph: {
      type: 'website',
      locale: currentMetadata.ogLocale,
      alternateLocale: locale === 'zh' ? 'en_US' : 'zh_CN',
      url: `/${locale}`,
      title: currentMetadata.ogTitle,
      description: currentMetadata.ogDescription,
      siteName: '石藝苑建築師',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: currentMetadata.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@shiyiyuan_arch',
      creator: '@shiyiyuan_arch',
      title: currentMetadata.twitterTitle,
      description: currentMetadata.twitterDescription,
      images: ['/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
      yahoo: process.env.YAHOO_SITE_VERIFICATION,
    },
    icons: [
      {
        rel: 'apple-touch-icon',
        url: '/apple-touch-icon.png',
        sizes: '180x180',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon-16x16.png',
      },
      {
        rel: 'icon',
        url: '/favicon.ico',
      },
      {
        rel: 'icon',
        type: 'image/svg+xml',
        url: '/favicon.svg',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '/icon-192x192.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        url: '/icon-512x512.png',
      },
    ],
    manifest: '/manifest.json',
  };
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${inter.variable} ${firaCode.variable}`}>
      <body className="font-sans antialiased">
        <NextIntlClientProvider>
          <PostHogProvider>
            <ToastProvider>
              {props.children}
            </ToastProvider>
          </PostHogProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
