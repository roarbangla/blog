"use client"

import { ArticleCardProps } from "@src/types/article";
import { Calendar, FileText } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { formatDate, parseHtml } from "@src/lib/utils";

export const ArticleCard = ({
  slug,
  title,
  excerpt,
  category,
  featured,
  featured_media,
  author,
  date,
}: ArticleCardProps) => {
  return (
    <Link href={`/article/${slug}`} prefetch="auto">
      <article
        className={`group relative overflow-hidden rounded-lg bg-card shadow-card hover:shadow-card-hover transition-all duration-300 h-full flex flex-col border border-accent ${
          featured ? "md:col-span-2 md:row-span-2" : ""
        }`}
      >
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-[16/10]">
          <img
            src={featured_media?.source_url}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-overlay" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <Badge className="bg-primary/90 hover:bg-primary text-primary-foreground backdrop-blur-sm">
              {category.name}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col">
          <h3 className="font-playfair font-bold text-lg md:text-xl mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {parseHtml(title)}
          </h3>
          
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">
            {parseHtml(excerpt ?? "")}
          </p>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              <span>Article</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium text-foreground">{author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <time dateTime={formatDate(date)}>{formatDate(date)}</time>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};