import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { routing } from '@/libs/I18nRouting';
import { Container } from '@/components/layout/Container';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { notFound } from 'next/navigation';

const projects = {
  jingshan: {
    name: '京山第一中學PEER空間',
    location: '湖北省京山市',
    year: '2022',
    area: '120㎡',
    cost: '35萬元',
    architect: '石藝苑',
    collaborators: 'PEER毅恆摯友',
    students: '20名高中學生',
    story: '京山第一中學的學生需要一個可以進行多元化學習和交流的空間。通過深入了解學校文化和學生需求，我們與師生共同設計了這個空間，將傳統教室轉化為現代化的學習環境。',
    concept: '設計理念以「開放」和「連接」為核心，通過彈性家具配置和可移動隔斷創造多功能空間。空間中的每一個元素都經過精心考慮，既滿足功能需求，又體現了地方教育特色。',
    impact: '項目完成後，學生的學習積極性明顯提高，空間利用率得到大幅提升。這個項目也成為了其他學校改造的參考樣本，展示了如何通過設計為鄉村教育帶來積極變化。',
  },
  yuanling: {
    name: '沅陵第六中學PEER空間',
    location: '湖南省沅陵縣',
    year: '2023',
    area: '95㎡',
    cost: '28萬元',
    architect: '石藝苑',
    collaborators: 'PEER毅恆摯友',
    students: '15名初中學生',
    story: '沅陵第六中學位於湖南山區，面臨空間不足和設施老舊的挑戰。我們與學校師生共同尋找解決方案，通過充分利用現有空間和創新設計，為學生創造更好的學習環境。',
    concept: '設計方案強調「充分利用」和「靈活配置」，通過巧妙的空間分割和多功能家具，將有限的空間發揮最大效益。同時融入當地文化元素，讓空間具有清晰的地域特色。',
    impact: '改造後的空間成為學生最喜愛的學習場所，不僅提高了學習效率，也增強了師生之間的交流互動。項目的成功實施證明了小規模改造同樣可以產生大影響。',
  },
  longsheng: {
    name: '龍勝中學PEER空間',
    location: '廣西龍勝縣',
    year: '2023',
    area: '180㎡',
    cost: '45萬元',
    architect: '石藝苑',
    collaborators: 'PEER毅恆摯友、當地工匠',
    students: '25名侗族學生',
    story: '龍勝中學坐落在廣西侗族自治區，該地區擁有豐富的侗族文化傳統。我們與當地師生和工匠合作，將傳統侗族鼓樓建築元素融入現代教育空間設計中，創造了一個獨特的文化教育空間。',
    concept: '設計以侗族鼓樓為原型，採用傳統的木結構工藝和現代的空間布局。整個空間層次豐富，既保持了傳統建築的文化韻味，又滿足了現代教育的功能需求。',
    impact: '這個項目成為了文化傳承與現代教育結合的典型案例，不僅提高了學生對本民族文化的認同感，也吸引了經有各地的參觀者前來學習交流。',
  },
};

type IPortfolioDetailProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export function generateStaticParams() {
  return routing.locales
    .map(locale =>
      Object.keys(projects).map(slug => ({
        slug,
        locale,
      })),
    )
    .flat(1);
}

export async function generateMetadata(props: IPortfolioDetailProps) {
  const { locale, slug } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'PortfolioSlug',
  });

  return {
    title: t('meta_title', { slug }),
    description: t('meta_description', { slug }),
  };
}

export default async function PortfolioDetail(props: IPortfolioDetailProps) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);
  const project = projects[slug as keyof typeof projects];
  
  if (!project) {
    notFound();
  }

  const t = await getTranslations({
    locale,
    namespace: 'ProjectDetail',
  });

  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-16 lg:py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="u-display-xl mb-6 text-gray-900">{project.name}</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-8">
              <div>
                <span className="font-medium text-gray-900">{t('location')}: </span>
                {project.location}
              </div>
              <div>
                <span className="font-medium text-gray-900">{t('year')}: </span>
                {project.year}
              </div>
              <div>
                <span className="font-medium text-gray-900">{t('area')}: </span>
                {project.area}
              </div>
              <div>
                <span className="font-medium text-gray-900">{t('cost')}: </span>
                {project.cost}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Image */}
      <section className="w-full">
        <div className="aspect-video bg-gradient-to-br from-amber-100 to-blue-100 overflow-hidden">
          {/* Placeholder for main project image */}
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-8xl mb-4">🏫</div>
              <p className="text-xl text-gray-600">{project.name}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="w-full py-16 lg:py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="u-display-m mb-8 text-gray-900">項目背景</h2>
            <p className="u-paragraph-l text-gray-700 leading-relaxed">
              {project.story}
            </p>
          </div>
        </Container>
      </section>

      {/* Design Concept */}
      <section className="w-full py-16 lg:py-24 bg-amber-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="u-display-m mb-8 text-gray-900">{t('design_concept')}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="u-paragraph-l text-gray-700 leading-relaxed">
                  {project.concept}
                </p>
              </div>
              <div className="aspect-square bg-gradient-to-br from-amber-200 to-blue-200 rounded-lg overflow-hidden">
                {/* Placeholder for design sketches/models */}
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">✏️</div>
                    <p className="text-lg text-gray-600">設計草圖</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Before & After */}
      <section className="w-full py-16 lg:py-24">
        <Container>
          <div className="max-w-6xl mx-auto">
            <h2 className="u-display-m mb-12 text-gray-900 text-center">{t('before_after')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">改造前</h3>
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🏢</div>
                      <p className="text-gray-600">原有空間</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">改造后</h3>
                <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden">
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">✨</div>
                      <p className="text-gray-600">新的PEER空間</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Project Info */}
      <section className="w-full py-16 lg:py-24 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="u-display-m mb-8 text-gray-900">{t('project_info')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <CardHeader className="p-0 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">基本資訊</h3>
                  </CardHeader>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('architect')}:</span>
                      <span className="text-gray-900">{project.architect}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('year')}:</span>
                      <span className="text-gray-900">{project.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('area')}:</span>
                      <span className="text-gray-900">{project.area}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('cost')}:</span>
                      <span className="text-gray-900">{project.cost}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <CardHeader className="p-0 mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{t('collaborators')}</h3>
                  </CardHeader>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-600 block mb-1">合作方:</span>
                      <span className="text-gray-900">{project.collaborators}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 block mb-1">{t('students')}:</span>
                      <span className="text-gray-900">{project.students}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Impact */}
      <section className="w-full py-16 lg:py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="u-display-m mb-8 text-gray-900">{t('impact')}</h2>
            <p className="u-paragraph-l text-gray-700 leading-relaxed">
              {project.impact}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
};

export const dynamicParams = false;
