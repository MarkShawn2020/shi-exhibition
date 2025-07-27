import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

type IProcessProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IProcessProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Process' as any,
  });

  return {
    title: (t as any)('meta_title'),
    description: (t as any)('meta_description'),
  };
}

export default async function Process(props: IProcessProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'Process' as any,
  });

  const articles = [
    {
      id: 'rural-education-thoughts',
      title: '鄉村教育建築的思考與實踐',
      category: '設計思考',
      excerpt: '在與PEER合作的這些年裡，我深深感受到建築在教育環境中的重要作用。每一個空間都承載著學習的可能性...',
      date: '2024年1月15日',
      readTime: '8分鐘',
      featured: true,
    },
    {
      id: 'dong-architecture-craft',
      title: '侗族建築工藝的當代傳承',
      category: '文化觀察',
      excerpt: '龍勝項目讓我重新思考傳統工藝在現代建築中的運用。與當地工匠的合作過程充滿挑戰，也充滿驚喜...',
      date: '2023年11月20日',
      readTime: '6分鐘',
      featured: true,
    },
    {
      id: 'community-participation',
      title: '社區參與式設計的方法與經驗',
      category: '設計方法',
      excerpt: '真正的社區參與不是簡單的意見收集，而是建立在深度理解和信任基礎上的共創過程...',
      date: '2023年9月10日',
      readTime: '10分鐘',
      featured: false,
    },
    {
      id: 'material-selection-story',
      title: '材料背後的故事：從選擇到應用',
      category: '幕後故事',
      excerpt: '每一種材料的選擇都有其深層的考慮。從成本控制到文化意義，從環保因素到施工便利性...',
      date: '2023年7月5日',
      readTime: '7分鐘',
      featured: false,
    },
    {
      id: 'student-interactions',
      title: '與學生們的美好互動時光',
      category: '幕後故事',
      excerpt: '項目中最珍貴的時刻往往是與學生們的互動。他們的純真想法和創意思維總能給我帶來新的啟發...',
      date: '2023年5月18日',
      readTime: '5分鐘',
      featured: false,
    },
    {
      id: 'sustainable-design-practice',
      title: '可持續設計在鄉村建築中的實踐',
      category: '設計思考',
      excerpt: '可持續設計不僅僅是環保材料的使用，更是對當地環境、文化和經濟的綜合考慮...',
      date: '2023年3月22日',
      readTime: '9分鐘',
      featured: false,
    },
  ];

  const featuredArticles = articles.filter(article => article.featured);
  const recentArticles = articles.filter(article => !article.featured);

  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-16 lg:py-24">
        <Container>
          <div className="text-center mb-16">
            <h1 className="u-display-xl mb-6 text-gray-900">{(t as any)('title')}</h1>
            <p className="u-paragraph-l text-gray-600 max-w-3xl mx-auto">
              {(t as any)('description')}
            </p>
          </div>
        </Container>
      </section>

      {/* Featured Articles */}
      <section className="w-full py-16 lg:py-24 bg-amber-50">
        <Container>
          <div className="mb-12">
            <h2 className="u-display-m mb-4 text-gray-900">精選文章</h2>
            <p className="u-paragraph-l text-gray-600">
              深度分享設計過程中的思考與感悟
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredArticles.map(article => (
              <Link key={article.id} href={`/process/${article.id}`} className="group no-underline">
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-video bg-gradient-to-br from-amber-200 to-blue-200 rounded-t-lg overflow-hidden">
                    {/* Placeholder for article images */}
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">📝</div>
                        <p className="text-lg text-gray-600">{article.category}</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-3 mb-4 text-sm text-gray-500">
                      <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                        {article.category}
                      </span>
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                    <CardHeader className="p-0 mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </h3>
                    </CardHeader>
                    <p className="text-gray-600 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Recent Articles */}
      <section className="w-full py-16 lg:py-24">
        <Container>
          <div className="mb-12">
            <h2 className="u-display-m mb-4 text-gray-900">最新文章</h2>
            <p className="u-paragraph-l text-gray-600">
              更多關於設計過程和項目經驗的分享
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentArticles.map(article => (
              <Link key={article.id} href={`/process/${article.id}`} className="group no-underline">
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-green-100 rounded-t-lg overflow-hidden">
                    {/* Placeholder for article images */}
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">
                          {article.category === '設計思考'
                            ? '🧠'
                            : article.category === '文化觀察'
                              ? '🏛️'
                              : article.category === '設計方法' ? '📐' : '🎭'}
                        </div>
                        <p className="text-sm text-gray-600">{article.category}</p>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-3 text-xs text-gray-500">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {article.category}
                      </span>
                      <span>{article.readTime}</span>
                    </div>
                    <CardHeader className="p-0 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                    </CardHeader>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="mt-4 text-xs text-gray-500">
                      {article.date}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-16 lg:py-24 bg-blue-900 text-white">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="u-display-m mb-6">訂閱設計思考</h2>
            <p className="u-paragraph-l text-blue-100 mb-8">
              獲取最新的設計思考文章和項目動態，一起探索建築的更多可能性。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="輸入您的郵箱"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-6 py-3 bg-white text-blue-900 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                訂閱
              </button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
