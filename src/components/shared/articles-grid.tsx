'use client'

import { ArticleCardProps } from "@src/types/article"
import { useCallback, useEffect, useRef, useState } from "react"
import { Masonry } from "react-plock"
import { ArticleCard } from "./article-card"
import { getArticles } from "@src/lib/api"

export const ArticlesGrid = ({
    articles: initialArticles,
    loadNext,
}: {
    articles: ArticleCardProps[]
    loadNext: boolean
}) => {
  const [articles, setArticles] = useState<ArticleCardProps[]>(initialArticles ?? []);
  const loadRef = useRef<HTMLDivElement>(null);
  const currentPage = useRef(1);
  const hasMore = useRef(true);

  const fetchArticles = useCallback(async () => {
    const articles = await getArticles(currentPage.current+1);
    currentPage.current++;
    setArticles(prev=>[...prev, ...articles.data]);
    if (articles.data.length < 12) {
      hasMore.current = false;
    }
  }, [currentPage]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && loadNext && hasMore.current) {
          fetchArticles();
        }
      });
    });

    if (loadRef.current) {
      observer.observe(loadRef.current);
    }

    return () => {
      if (loadRef.current) {
        observer.unobserve(loadRef.current);
      }
    }
  }, [loadRef, loadNext, hasMore]);

    return (
      <section>

        <Masonry
          items={articles}
          config={{
            columns: [1, 2, 3],
            gap: [16, 16, 24],
            media: [640, 768, 1024],
          }}
          render={(article) => (
            <ArticleCard key={article.id} {...article} />
          )}
          />
          {/* Inifinite Scroll */}
        {loadNext && (
            <div ref={loadRef} className="mt-16 pt-8 border-t text-center text-muted-foreground">
            Loading...
          </div>
        )}
        </section>
    )
}