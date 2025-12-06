import { Footer, Header } from "@src/components/shared";
import { ArticlesGrid } from "@src/components/shared/articles-grid";
import { getArticles } from "@src/lib/articles";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search = "" } = await searchParams;

  const articles = await getArticles({ search });

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12 animate-fade-in">
          <h1 className="font-playfair font-bold text-4xl md:text-5xl lg:text-6xl mb-4 text-foreground">
            Stories That Matter
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Discover compelling narratives across sports, culture, history, and
            current events.
          </p>
        </section>

        <ArticlesGrid articles={articles} loadNext={search === ""} />

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
