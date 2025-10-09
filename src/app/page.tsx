import { Header } from "@src/components/shared";
import { ArticlesGrid } from '@src/components/shared/articles-grid';
import { getArticles } from "@src/lib/articles";

export default async function Home() {
  let articles = await getArticles();
  const loadMore = async (page: number) => {
    const articles = await getArticles({ page });
    articles.push(...articles);
  }

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
            Discover compelling narratives across sports, culture, history, and current events.
          </p>
        </section>

        <ArticlesGrid articles={articles} />

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; 2024 Roar Media. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};