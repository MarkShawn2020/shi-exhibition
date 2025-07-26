import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardIcon } from '@/components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';

type IIndexProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IIndexProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function Index(props: IIndexProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  
  const t = await getTranslations('HomePage');

  const principles = [
    {
      icon: '🤝',
      title: t('principles.community.title'),
      description: t('principles.community.description'),
    },
    {
      icon: '🏛️',
      title: t('principles.culture.title'),
      description: t('principles.culture.description'),
    },
    {
      icon: '📚',
      title: t('principles.education.title'),
      description: t('principles.education.description'),
    },
    {
      icon: '🤝',
      title: t('principles.collaboration.title'),
      description: t('principles.collaboration.description'),
    },
    {
      icon: '🌱',
      title: t('principles.sustainability.title'),
      description: t('principles.sustainability.description'),
    },
    {
      icon: '📖',
      title: t('principles.storytelling.title'),
      description: t('principles.storytelling.description'),
    },
  ];

  const featuredProjects = [
    {
      id: 'jingshan',
      title: t('projects.jingshan.title'),
      description: t('projects.jingshan.description'),
      image: '/assets/images/projects/jingshan-hero.jpg',
      location: '湖北京山',
    },
    {
      id: 'yuanling', 
      title: t('projects.yuanling.title'),
      description: t('projects.yuanling.description'),
      image: '/assets/images/projects/yuanling-hero.jpg',
      location: '湖南沅陵',
    },
    {
      id: 'longsheng',
      title: t('projects.longsheng.title'),
      description: t('projects.longsheng.description'),
      image: '/assets/images/projects/longsheng-hero.jpg',
      location: '廣西龍勝',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-16 lg:py-24">
        <Container>
          <div className="u-grid-desktop gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <h1 className="u-display-xl mb-6 text-gray-900">
                {t('hero_title')}
              </h1>
              <p className="u-paragraph-l mb-8 text-gray-600">
                {t('hero_description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" size="lg">
                  {t('view_work')}
                </Button>
                <Button variant="secondary" size="lg">
                  {t('learn_more')}
                </Button>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-amber-50 to-blue-50 rounded-2xl overflow-hidden">
                  {/* Placeholder for video/carousel of PEER spaces with student interactions */}
                  <div className="h-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-blue-100">
                    <div className="text-center p-8">
                      <div className="text-6xl mb-4">🏛️</div>
                      <p className="text-xl font-medium text-gray-800">{t('hero_card_title')}</p>
                      <p className="text-sm mt-2 text-gray-600">{t('hero_card_subtitle')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Philosophy Section */}
      <section className="w-full py-16 lg:py-24 bg-amber-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="u-display-m mb-4 text-gray-900">{t('philosophy_title')}</h2>
            <p className="u-paragraph-l text-gray-600 max-w-3xl mx-auto">
              {t('philosophy_description')}
            </p>
          </div>

          <div className="u-grid-desktop gap-8">
            {principles.map(principle => (
              <div key={principle.title} className="lg:col-span-4">
                <Card>
                  <CardIcon>
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      {principle.icon}
                    </div>
                  </CardIcon>
                  <CardContent>
                    <CardHeader>
                      <h3 className="u-display-s mb-2 text-gray-900">{principle.title}</h3>
                    </CardHeader>
                    <p className="u-paragraph-m text-gray-600">
                      {principle.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Projects Section */}
      <section className="w-full py-16 lg:py-24">
        <Container>
          <div className="text-center mb-12">
            <h2 className="u-display-m mb-4 text-gray-900">{t('featured_projects_title')}</h2>
            <p className="u-paragraph-l text-gray-600">
              {t('featured_projects_description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map(project => (
              <div key={project.id} className="group cursor-pointer">
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-video bg-gradient-to-br from-amber-100 to-blue-100 rounded-t-2xl overflow-hidden">
                    {/* Placeholder for project images */}
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🏫</div>
                        <p className="text-sm text-gray-600">{project.location}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 lg:py-24 bg-blue-900 text-white">
        <Container>
          <div className="text-center">
            <h2 className="u-display-m mb-6">{t('cta_title')}</h2>
            <p className="u-paragraph-l text-blue-100 mb-8 max-w-2xl mx-auto">
              {t('cta_description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                {t('contact_me')}
              </Button>
              <Button variant="secondary" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-900">
                {t('explore_projects')}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
