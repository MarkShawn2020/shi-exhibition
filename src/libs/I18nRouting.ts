import { defineRouting } from 'next-intl/routing';
import { AppConfig, detectUserLocale } from '@/utils/AppConfig';

export const routing = defineRouting({
  locales: AppConfig.locales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
  // Use next-intl's built-in locale detection, which will use our defaultLocale
  // and handle Accept-Language header parsing automatically
  localeDetection: true,
});

// Custom locale detection that prioritizes Chinese detection
export const getPreferredLocale = (request: Request): string => {
  const acceptLanguage = request.headers.get('accept-language');
  return detectUserLocale(acceptLanguage);
};
