import { Footer, Header } from "@src/components/shared";
import { ArticlesGrid } from "@src/components/shared/articles-grid";
import {
  getCategoryBySlug,
  getArticlesByCategory,
  getTotalArticlesByCategory,
} from "@src/lib/categories";
import { Button } from "@src/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
            <Link href="/">
              <Button>Return Home</Button>
            </Link>
          </div>
        </main>
      </>
    );
  }

  const articles = await getArticlesByCategory(
    category.category_id ?? undefined
  );
  const totalArticles = await getTotalArticlesByCategory(
    category.category_id ?? undefined
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Category Header Section */}
        <section className="mb-12 animate-fade-in">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>

          <div className="bg-card rounded-lg shadow-card p-8 md:p-12">
            <h1 className="font-playfair font-bold text-4xl md:text-5xl lg:text-6xl mb-4 text-foreground">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                {category.description}
              </p>
            )}
            <div className="mt-6 text-sm text-muted-foreground">
              {totalArticles} {totalArticles === 1 ? "article" : "articles"} in
              this category
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <ArticlesGrid articles={articles} loadNext={true} />
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No articles found in this category yet.
            </p>
          </div>
        )}

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
