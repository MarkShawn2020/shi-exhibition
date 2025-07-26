import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { Container } from '@/components/layout/Container';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

type IAboutProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IAboutProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'About',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function About(props: IAboutProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'About',
  });

  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-16 lg:py-24">
        <Container>
          <div className="text-center mb-16">
            <h1 className="u-display-xl mb-6 text-gray-900">關於石藝苑</h1>
            <p className="u-paragraph-l text-gray-600 max-w-3xl mx-auto">
              一位致力於連接傳統與現代的建築師
            </p>
          </div>
        </Container>
      </section>

      {/* Profile Section */}
      <section className="w-full py-16 lg:py-24 bg-amber-50">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="aspect-square bg-gradient-to-br from-amber-200 to-blue-200 rounded-2xl overflow-hidden mb-8">
                  {/* Placeholder for professional photo */}
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-8xl mb-4">👩‍🏭</div>
                      <p className="text-xl text-gray-600">石藝苑</p>
                      <p className="text-sm text-gray-500">建築師</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="u-display-m mb-6 text-gray-900">建築師背景</h2>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    {t('architect_background')}
                  </p>
                  <p>
                    她的作品不僅僅關注建築本身，更重視與當地社區的深度交流和合作。每一個項目都是一個關於人、文化和地方的故事，展示了建築如何成為社會變遷的媒介。
                  </p>
                </div>
                
                {/* Credentials */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-700">RIBA 全球傑出人才認證</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-700">世居侗族，深耕少數民族建築文化</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-700">策展經驗豐富，關注文化傳承與社會影響</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* PEER Section */}
      <section className="w-full py-16 lg:py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="u-display-m mb-6 text-gray-900">PEER 毅恆摯友</h2>
              <p className="u-paragraph-l text-gray-600">
                一個致力於改善中國鄉村教育環境的公益組織
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8">
                  <CardHeader className="p-0 mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">組織使命</h3>
                  </CardHeader>
                  <p className="text-gray-700 leading-relaxed">
                    PEER毅恆摯友致力於通過教育支持和環境改善，為中國鄉村地區的學生創造更好的學習條件。組織相信教育是改變社會的重要力量，而良好的學習環境是教育成功的必要條件。
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-8">
                  <CardHeader className="p-0 mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">石藝苑的角色</h3>
                  </CardHeader>
                  <p className="text-gray-700 leading-relaxed">
                    {t('peer_collaboration')}
                    通過與PEER的合作，石藝苑將建築設計的專業知識與公益事業相結合，為鄉村教育的發展貢獻力量。
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* PEER Projects Stats */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-amber-600 mb-2">15+</div>
                <div className="text-gray-600">合作學校</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600">參與學生</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">3</div>
                <div className="text-gray-600">年合作經驗</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Philosophy Section */}
      <section className="w-full py-16 lg:py-24 bg-blue-900 text-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="u-display-m mb-8">設計哲學</h2>
            <blockquote className="text-xl italic leading-relaxed mb-8">
              「建築不僅僅是空間的建造，更是文化的傳承和社區的連結。每一個設計都應該說述一個獨特的故事，反映當地的文化和人文精神。」
            </blockquote>
            <cite className="text-blue-200">—— 石藝苑</cite>
          </div>
        </Container>
      </section>
    </>
  );
};
