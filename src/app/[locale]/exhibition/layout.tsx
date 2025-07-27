import { setRequestLocale } from 'next-intl/server';

export default async function ExhibitionLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="h-screen w-full overflow-hidden">
      {props.children}
    </div>
  );
}
