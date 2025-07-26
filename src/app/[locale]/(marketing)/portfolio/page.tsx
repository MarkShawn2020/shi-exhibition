import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

type IPortfolioProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IPortfolioProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Portfolio',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function Portfolio(props: IPortfolioProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'Portfolio',
  });

  const projects = [
    {
      id: 'jingshan',
      title: '京山第一中學PEER空間',
      location: '湖北省京山市',
      year: '2022',
      area: '120㎡',
      description: '為高中生打造的多功能學習空間，融合了現代教育理念和地方文化特色。',
      coordinates: { x: 45, y: 35 },
    },
    {
      id: 'yuanling',
      title: '沅陵第六中學PEER空間',
      location: '湖南省沅陵縣',
      year: '2023',
      area: '95㎡',
      description: '通過空間改造為學生提供更好的學習環境，強化了師生互動和協作學習。',
      coordinates: { x: 42, y: 45 },
    },
    {
      id: 'longsheng',
      title: '龍勝中學PEER空間',
      location: '廣西龍勝縣',
      year: '2023',
      area: '180㎡',
      description: '融入侗族鼓樓建築元素，展示了傳統文化與現代教育的完美融合。',
      coordinates: { x: 38, y: 55 },
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-16 lg:py-24">
        <Container>
          <div className="text-center mb-12">
            <h1 className="u-display-xl mb-6 text-gray-900">建築作品</h1>
            <p className="u-paragraph-l text-gray-600 max-w-3xl mx-auto">
              {t('presentation')}
            </p>
          </div>
        </Container>
      </section>

      {/* Map Section */}
      <section className="w-full py-16 lg:py-24 bg-amber-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="u-display-m mb-4 text-gray-900">{t('map_title')}</h2>
            <p className="u-paragraph-l text-gray-600">
              {t('projects_by_region')}
            </p>
          </div>

          {/* Interactive Map Placeholder */}
          <div className="relative bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-8 h-96 max-w-4xl mx-auto">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-xl font-medium text-gray-800">中國地圖</p>
                <p className="text-sm mt-2 text-gray-600">PEER合作學校分佈</p>
              </div>
            </div>
            
            {/* Project Markers */}
            {projects.map(project => (
              <div
                key={project.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{ left: `${project.coordinates.x}%`, top: `${project.coordinates.y}%` }}
              >
                <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg group-hover:scale-125 transition-transform">
                </div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-lg shadow-lg p-3 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{project.title}</div>
                  <div className="text-xs text-gray-600">{project.location}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Projects Grid */}
      <section className="w-full py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <Link key={project.id} href={`/portfolio/${project.id}`} className="group no-underline">
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-video bg-gradient-to-br from-amber-100 to-blue-100 rounded-t-lg overflow-hidden">
                    {/* Placeholder for project images */}
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🏫</div>
                        <p className="text-sm text-gray-600">{project.location}</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <CardHeader className="p-0 mb-3">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                    </CardHeader>
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                      <span>{project.year}</span>
                      <span>{project.area}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};
