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

  const features = [
    {
      icon: '🚀',
      title: 'Next.js 15 + App Router',
      description: '基于最新的 Next.js 15 和 App Router，支持 React 19 并配置了 TypeScript，提供卓越的开发体验。',
    },
    {
      icon: '🎨',
      title: '现代设计系统',
      description: '完整的设计令牌系统和组件库，遵循现代 UI/UX 设计原则，支持 Tailwind CSS v4。',
    },
    {
      icon: '🔒',
      title: '企业级安全认证',
      description: '集成 Clerk 认证系统，支持多因素认证、社交登录等企业级安全特性。',
    },
    {
      icon: '⚡',
      title: '性能优先',
      description: '使用现代构建工具优化，支持 Turbopack、代码分割和性能监控，确保极致体验。',
    },
    {
      icon: '🌐',
      title: '国际化就绪',
      description: '内置 next-intl 国际化支持，配合 Crowdin 实现专业的多语言工作流。',
    },
    {
      icon: '🧪',
      title: '质量保证',
      description: '完整的测试套件，包含 Vitest、React Testing Library 和 Playwright 端到端测试。',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-16 lg:py-24">
        <Container>
          <div className="u-grid-desktop gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <h1 className="u-display-xl mb-6">
                下一代 Next.js 开发模板
              </h1>
              <p className="u-paragraph-l mb-8 text-text-faded">
                由 Neurora 团队精心打造的现代化 Next.js 模板，集成最佳实践、完整工具链和企业级特性，助力开发者快速构建生产就绪的应用程序。
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" size="lg">
                  开始使用
                </Button>
                <Button variant="secondary" size="lg">
                  查看文档
                </Button>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-swatch-fig to-swatch-sky rounded-2xl p-8 text-white">
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">⚡</div>
                      <p className="text-xl font-medium">Next.js 15 模板</p>
                      <p className="text-sm mt-2 opacity-90">现代化 • 类型安全 • 生产就绪</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 lg:py-24 u-bg-ivory-medium">
        <Container>
          <div className="text-center mb-16">
            <h2 className="u-display-m mb-4">构建现代应用所需的一切</h2>
            <p className="u-paragraph-l text-text-faded max-w-3xl mx-auto">
              我们的模板包含了快速交付生产就绪应用程序所需的所有工具和最佳实践。
            </p>
          </div>

          <div className="u-grid-desktop gap-8">
            {features.map(feature => (
              <div key={feature.title} className="lg:col-span-4">
                <Card>
                  <CardIcon>
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      {feature.icon}
                    </div>
                  </CardIcon>
                  <CardContent>
                    <CardHeader>
                      <h3 className="u-display-s mb-2">{feature.title}</h3>
                    </CardHeader>
                    <p className="u-paragraph-m text-text-faded">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Use Cases Section */}
      <section className="w-full py-16 lg:py-24">
        <Container>
          <div className="text-center mb-12">
            <h2 className="u-display-m mb-4">适合各种项目类型</h2>
            <p className="u-paragraph-l text-text-faded">
              无论您是构建创业公司 MVP 还是企业级应用，我们的模板都能与您一起扩展。
            </p>
          </div>

          <Tabs defaultValue="startup" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="startup">创业公司</TabsTrigger>
              <TabsTrigger value="enterprise">企业应用</TabsTrigger>
              <TabsTrigger value="saas">SaaS 产品</TabsTrigger>
              <TabsTrigger value="ecommerce">电商平台</TabsTrigger>
            </TabsList>

            <TabsContent value="startup" className="mt-8">
              <div className="text-center space-y-4">
                <h3 className="u-display-s">快速 MVP 开发</h3>
                <p className="u-paragraph-m text-text-faded">
                  完整的认证系统、数据库集成和 CI/CD 配置，让您专注于核心业务逻辑，快速验证产品想法。
                </p>
              </div>
            </TabsContent>

            <TabsContent value="enterprise" className="mt-8">
              <div className="text-center space-y-4">
                <h3 className="u-display-s">企业级应用</h3>
                <p className="u-paragraph-m text-text-faded">
                  内置安全最佳实践、监控、日志记录和性能优化，满足企业级应用的严格要求。
                </p>
              </div>
            </TabsContent>

            <TabsContent value="saas" className="mt-8">
              <div className="text-center space-y-4">
                <h3 className="u-display-s">SaaS 平台</h3>
                <p className="u-paragraph-m text-text-faded">
                  多租户架构、订阅管理、用户权限控制和国际化支持，构建可扩展的 SaaS 产品。
                </p>
              </div>
            </TabsContent>

            <TabsContent value="ecommerce" className="mt-8">
              <div className="text-center space-y-4">
                <h3 className="u-display-s">电商应用</h3>
                <p className="u-paragraph-m text-text-faded">
                  高性能产品展示、购物车、支付集成和订单管理，打造现代化的电商体验。
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 lg:py-24 u-theme-dark">
        <Container>
          <div className="text-center">
            <h2 className="u-display-m text-white mb-6">准备开始了吗？</h2>
            <p className="u-paragraph-l text-gray-300 mb-8 max-w-2xl mx-auto">
              加入数千名使用我们现代化模板构建下一代应用程序的开发者行列。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                免费开始
              </Button>
              <Button variant="secondary" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-background-dark">
                在 GitHub 查看
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
