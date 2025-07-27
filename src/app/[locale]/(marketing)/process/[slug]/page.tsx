import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { routing } from '@/libs/I18nRouting';

const articles = {
  'rural-education-thoughts': {
    title: '鄉村教育建築的思考與實踐',
    category: '設計思考',
    date: '2024年1月15日',
    readTime: '8分鐘',
    content: `
      在與PEER合作的這些年裡，我深深感受到建築在教育環境中的重要作用。每一個空間都承載著學習的可能性，每一次設計都是對教育本質的重新思考。

      ## 空間即教育

      傳統的教室設計往往以功能性為主導，排列整齊的桌椅、單一的講台布局。但在鄉村教育的實踐中，我發現學生們需要的不僅僅是一個上課的地方，更需要一個能夠激發創造力、促進協作的環境。

      在京山一中的項目中，我們打破了傳統教室的固有模式，採用了靈活的家具配置和可移動隔斷。學生們可以根據不同的學習需求重新組織空間，這種靈活性不僅提高了空間利用率，更重要的是培養了學生的主動性和創造性思維。

      ## 文化的載體

      建築不只是提供庇護的結構，更是文化傳承的載體。在龍勝中學的設計中，我們將侗族傳統的干欄式建築元素融入現代教育空間，不僅體現了對當地文化的尊重，也讓學生在日常學習中感受到自己文化的魅力。

      這種文化融入不是簡單的形式借用，而是對文化內涵的深度理解和創新表達。我們與當地工匠合作，學習傳統的木結構工藝，在保持文化精神的同時，滿足現代教育的功能需求。

      ## 社區的橋樑

      優秀的教育建築不應該是封閉的，而應該成為連接學校與社區的橋樑。在我們的設計中，總是會考慮如何讓空間在非上課時間服務於整個社區，讓教育資源得到最大化利用。

      這種開放性設計不僅提高了建築的使用效率，更重要的是加強了學校與社區的聯繫，讓教育真正融入社區生活，讓建築成為推動社區發展的積極力量。
    `,
  },
  'dong-architecture-craft': {
    title: '侗族建築工藝的當代傳承',
    category: '文化觀察',
    date: '2023年11月20日',
    readTime: '6分鐘',
    content: `
      龍勝項目讓我重新思考傳統工藝在現代建築中的運用。與當地工匠的合作過程充滿挑戰，也充滿驚喜。

      ## 技藝的傳承

      侗族的建築工藝有著悠久的歷史，特別是他們的木結構技術，完全不用釘子，僅靠榫卯結構就能建造出穩固耐用的建築。這種技藝承載著深厚的文化內涵和實用智慧。

      在龍勝中學的項目中，我有幸與幾位年長的侗族工匠合作。他們的手藝精湛，對木材性質的理解超乎想像。每一個榫卯的設計都經過精密計算，每一刀的雕刻都蘊含著匠人的心血。

      ## 現代的創新

      傳承不是簡單的複製，而是在理解精神內核的基礎上進行創新。我們在設計中保持了侗族建築的結構邏輯和美學特徵，但在材料選擇、空間布局等方面進行了現代化的調整。

      例如，我們採用了現代的防腐處理技術來提高木結構的耐久性，同時保持了傳統的榫卯工藝。這種傳統與現代的結合，既尊重了文化傳統，又滿足了現代使用需求。

      ## 文化的責任

      作為一名建築師，我深感保護和傳承傳統文化的責任重大。在全球化的今天，許多傳統工藝面臨失傳的危險。通過建築項目來傳承這些工藝，不僅是對文化的保護，更是對未來的投資。
    `,
  },
  // Add more articles as needed...
};

type IProcessDetailProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export function generateStaticParams() {
  return routing.locales
    .map(locale =>
      Object.keys(articles).map(slug => ({
        slug,
        locale,
      })),
    )
    .flat(1);
}

export async function generateMetadata(props: IProcessDetailProps) {
  const { locale: _locale, slug } = await props.params;
  const article = articles[slug as keyof typeof articles];

  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    };
  }

  return {
    title: `${article.title} - 石藝苑設計思考`,
    description: `${article.content.substring(0, 160)}...`,
  };
}

export default async function ProcessDetail(props: IProcessDetailProps) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);
  const article = articles[slug as keyof typeof articles];

  if (!article) {
    notFound();
  }

  return (
    <>
      {/* Article Header */}
      <section className="w-full py-16 lg:py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Link
                href="/process"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors no-underline"
              >
                ← 返回設計思考
              </Link>
            </div>

            <div className="mb-8">
              <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">
                {article.category}
              </span>
            </div>

            <h1 className="u-display-xl mb-6 text-gray-900">{article.title}</h1>

            <div className="flex items-center space-x-4 text-gray-500 text-sm mb-12">
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
              <span>•</span>
              <span>石藝苑</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Image */}
      <section className="w-full mb-16">
        <div className="aspect-video bg-gradient-to-br from-amber-100 to-blue-100 overflow-hidden">
          {/* Placeholder for article featured image */}
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-8xl mb-4">📝</div>
              <p className="text-xl text-gray-600">{article.title}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="w-full pb-16 lg:pb-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              {article.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-2xl font-semibold text-gray-900 mt-12 mb-6">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.trim()) {
                  return (
                    <p key={index} className="text-gray-700 leading-relaxed mb-6">
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Author Bio */}
      <section className="w-full py-16 lg:py-24 bg-amber-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                石
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">石藝苑</h3>
                <p className="text-gray-600 leading-relaxed">
                  建築師，RIBA全球傑出人才認證，專注於鄉村教育建築設計。作為PEER毅恒摯友的建築顧問，
                  致力於通過建築設計連接傳統與現代，為中國的鄉村教育帶來積極變化。
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Articles */}
      <section className="w-full py-16 lg:py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">相關文章</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(articles)
                .filter(([key]) => key !== slug)
                .slice(0, 2)
                .map(([key, relatedArticle]) => (
                  <Link key={key} href={`/process/${key}`} className="group no-underline">
                    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                      <div className="mb-3">
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                          {relatedArticle.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-gray-500 text-sm">{relatedArticle.date}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export const dynamicParams = false;
