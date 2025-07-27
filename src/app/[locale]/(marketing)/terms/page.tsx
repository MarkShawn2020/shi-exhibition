import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import React from 'react';
import { LegalPage } from '@/components/legal/LegalPage';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'TermsOfService' });

  return {
    title: (t as any)('meta_title'),
    description: (t as any)('meta_description'),
  };
}

export default async function TermsPage({ params }: Props) {
  const t = await getTranslations({ locale: params.locale, namespace: 'TermsOfService' });

  const sections = [
    {
      title: (t as any)('sections.acceptance.title'),
      content: t('sections.acceptance.content'),
    },
    {
      title: (t as any)('sections.description.title'),
      content: t('sections.description.content'),
    },
    {
      title: (t as any)('sections.user_accounts.title'),
      content: t('sections.user_accounts.content'),
    },
    {
      title: (t as any)('sections.user_content.title'),
      content: t('sections.user_content.content'),
    },
    {
      title: (t as any)('sections.intellectual_property.title'),
      content: t('sections.intellectual_property.content'),
    },
    {
      title: (t as any)('sections.ai_usage.title'),
      content: t('sections.ai_usage.content'),
    },
    {
      title: (t as any)('sections.termination.title'),
      content: t('sections.termination.content'),
    },
    {
      title: (t as any)('sections.disclaimers.title'),
      content: t('sections.disclaimers.content'),
    },
    {
      title: (t as any)('sections.governing_law.title'),
      content: t('sections.governing_law.content'),
    },
    {
      title: (t as any)('sections.contact.title'),
      content: t('sections.contact.content'),
    },
  ];

  return (
    <LegalPage
      title={t('title')}
      sections={sections}
      effectiveDate="January 1, 2025"
      lastUpdated="January 1, 2025"
    />
  );
}
