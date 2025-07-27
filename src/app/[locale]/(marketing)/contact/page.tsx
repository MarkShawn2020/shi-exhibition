import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/layout/Container';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

type IContactProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IContactProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Contact' as any,
  });

  return {
    title: (t as any)('meta_title'),
    description: (t as any)('meta_description'),
  };
}

export default async function Contact(props: IContactProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'Contact' as any,
  });

  const contactMethods = [
    {
      type: 'email',
      label: (t as any)('email_label'),
      value: 'contact@shiyiyuan.com',
      href: 'mailto:contact@shiyiyuan.com',
      icon: '📧',
      description: '專業諮詢與合作洽談',
    },
    {
      type: 'linkedin',
      label: (t as any)('linkedin_label'),
      value: 'linkedin.com/in/shiyiyuan',
      href: 'https://linkedin.com/in/shiyiyuan',
      icon: '💼',
      description: '專業網絡與經歷查看',
    },
    {
      type: 'riba',
      label: (t as any)('riba_label'),
      value: 'RIBA Profile',
      href: 'https://riba.com/profile/shiyiyuan',
      icon: '🏛️',
      description: '皇家建築師學會認證資料',
    },
  ];

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

      {/* Contact Methods */}
      <section className="w-full py-16 lg:py-24 bg-amber-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactMethods.map(method => (
                <a
                  key={method.type}
                  href={method.href}
                  target={method.type !== 'email' ? '_blank' : undefined}
                  rel={method.type !== 'email' ? 'noopener noreferrer' : undefined}
                  className="group no-underline"
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 text-center">
                    <CardContent className="p-8">
                      <div className="text-4xl mb-4">{method.icon}</div>
                      <CardHeader className="p-0 mb-4">
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {method.label}
                        </h3>
                      </CardHeader>
                      <p className="text-gray-600 text-sm mb-4">
                        {method.description}
                      </p>
                      <p className="text-blue-600 text-sm font-medium">
                        {method.value}
                      </p>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* PEER Collaboration Note */}
      <section className="w-full py-16 lg:py-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">🤝</div>
                  <div>
                    <CardHeader className="p-0 mb-4">
                      <h3 className="text-xl font-semibold text-blue-900">PEER 合作項目</h3>
                    </CardHeader>
                    <p className="text-blue-800 leading-relaxed">
                      {(t as any)('collaboration_note')}
                    </p>
                    <a
                      href="https://peer.org.cn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-700 font-medium no-underline"
                    >
                      訪問 PEER 官網 →
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Location Section */}
      <section className="w-full py-16 lg:py-24 bg-gray-50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="u-display-m mb-4 text-gray-900">服務地區</h2>
              <p className="u-paragraph-l text-gray-600">
                主要服務於中國大陸地區的鄉村教育建築項目
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">專業服務</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span>鄉村教育建築設計</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span>社區參與式設計諮詢</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span>文化建築保護與活化</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span>建築策展與文化推廣</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">合作夥伴</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>PEER 毅恒摯友</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>各地鄉村學校</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>當地傳統工匠</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>文化保護組織</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Response Time Notice */}
      <section className="w-full py-16 lg:py-24">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-amber-100 rounded-2xl p-8">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">回覆時間</h3>
              <p className="text-gray-700 leading-relaxed">
                我會在收到您的訊息後 48 小時內回覆。如果是緊急項目諮詢，
                請在郵件標題中註明「緊急」，我會優先處理。
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
