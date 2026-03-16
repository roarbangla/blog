import { Footer, Header } from "@src/components/shared";
import { ArticlesGrid } from "@src/components/shared/articles-grid";
import {
  getAuthorByUsername,
  getArticlesByAuthor,
  getTotalArticlesByAuthor,
} from "@src/lib/authors";
import { Button } from "@src/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const author = await getAuthorByUsername(username);

  if (!author) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Author Not Found</h1>
            <Link href="/">
              <Button>Return Home</Button>
            </Link>
          </div>
        </main>
      </>
    );
  }

  const articles = await getArticlesByAuthor(
    author.user_id ?? undefined
  );
  const totalArticles = await getTotalArticlesByAuthor(
    author.user_id ?? undefined
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Author Header Section */}
        <section className="mb-12 animate-fade-in">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>

          <div className="bg-card rounded-lg shadow-card p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Author Avatar */}
              {author.avatar && (
                <div className="flex-shrink-0">
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    width={120}
                    height={120}
                    className="rounded-full object-cover"
                  />
                </div>
              )}

              {/* Author Info */}
              <div className="flex-1">
                <h1 className="font-playfair font-bold text-4xl md:text-5xl lg:text-6xl mb-4 text-foreground">
                  {author.name}
                </h1>
                {author.description && (
                  <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-4">
                    {author.description}
                  </p>
                )}
                <div className="text-sm text-muted-foreground">
                  {totalArticles} {totalArticles === 1 ? "article" : "articles"} published
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <ArticlesGrid articles={articles} loadNext={false} />
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No articles found by this author yet.
            </p>
          </div>
        )}

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
