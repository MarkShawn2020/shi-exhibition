import { setRequestLocale } from 'next-intl/server';
import { ExhibitionClient } from './ExhibitionClient';

type IExhibitionProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IExhibitionProps) {
  const { locale: _locale } = await props.params;

  return {
    title: '3D展廳 - 石藝苑建築師',
    description: '沉浸式3D展廳體驗，探索石藝苑的鄉村教育建築作品',
  };
}

export default async function Exhibition(props: IExhibitionProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <ExhibitionClient />;
};
