import React from 'react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PricingPageContent } from '@/components/pricing/PricingPageContent';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'Pricing' });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function PricingPage({ params: _params }: Props) {
  return <PricingPageContent />;
}