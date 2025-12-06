import { Category, Post, User } from "@src/generated/prisma/client";

export type ArticleCardProps = Post & { category: Category, author: User, featured?: boolean, featured_media: { source_url: string } }