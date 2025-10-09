import Markdown from 'react-markdown'
import { ArticleCard, Header } from "@src/components/shared";
import { Button } from "@src/components/ui/button";
import { getArticle, getRelatedArticles } from "@src/lib/articles";
import { formatDate, parseHtml } from "@src/lib/utils";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Link from "next/link";

export default async function Article ({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  const relatedArticles = await getRelatedArticles(slug, article?.category_id);

  if (!article) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
            <Link href="/">
              <Button>Return Home</Button>
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <article className="animate-fade-in">
        {/* Hero Image */}
        <div className="relative w-full h-[60vh] overflow-hidden">
          <img
            src={article.featured_media?.source_url}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-overlay" />
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 -mt-32 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <div className="bg-card rounded-lg shadow-card p-8 md:p-12 mb-8">
              <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>

              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
                  {article.category.name}
                </span>
              </div>

              <h1 className="font-playfair font-bold text-4xl md:text-5xl mb-6 text-foreground">
                {parseHtml(article.title)}
              </h1>

              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{article.author.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={formatDate(article.date)}>{formatDate(article.date)}</time>
                </div>
              </div>
            </div>

            {/* Article Body */}
            <div className="bg-card rounded-lg shadow-card p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <Markdown>{article.content}</Markdown>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="container mx-auto px-4">
          <div className="mt-12 text-center pb-12">
              <h3 className="text-2xl font-bold my-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedArticles.map((article) => (
                  <ArticleCard key={article.id} {...article}/>
                ))}
              </div>
          </div>
        </div>
      </article>
    </>
  );
};