import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import React from 'react';
import { LegalPage } from '@/components/legal/LegalPage';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'PrivacyPolicy' });

  return {
    title: (t as any)('meta_title'),
    description: (t as any)('meta_description'),
  };
}

export default async function PrivacyPage({ params }: Props) {
  const t = await getTranslations({ locale: params.locale, namespace: 'PrivacyPolicy' });

  const sections = [
    {
      title: (t as any)('sections.introduction.title'),
      content: t('sections.introduction.content'),
    },
    {
      title: (t as any)('sections.information_collected.title'),
      content: t('sections.information_collected.content'),
    },
    {
      title: (t as any)('sections.how_we_use.title'),
      content: t('sections.how_we_use.content'),
    },
    {
      title: (t as any)('sections.information_sharing.title'),
      content: t('sections.information_sharing.content'),
    },
    {
      title: (t as any)('sections.data_retention.title'),
      content: t('sections.data_retention.content'),
    },
    {
      title: (t as any)('sections.security.title'),
      content: t('sections.security.content'),
    },
    {
      title: (t as any)('sections.ai_processing.title'),
      content: t('sections.ai_processing.content'),
    },
    {
      title: (t as any)('sections.third_party.title'),
      content: t('sections.third_party.content'),
    },
    {
      title: (t as any)('sections.your_rights.title'),
      content: t('sections.your_rights.content'),
    },
    {
      title: (t as any)('sections.international_transfers.title'),
      content: t('sections.international_transfers.content'),
    },
    {
      title: (t as any)('sections.changes.title'),
      content: t('sections.changes.content'),
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
