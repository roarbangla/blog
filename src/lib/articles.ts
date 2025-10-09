import prisma from "./database";
import { ArticleCardProps } from "@src/types/article";

export async function getArticles(props?:{
  page?: number,
  perPage?: number,
  search?: string,
}): Promise<ArticleCardProps[]> {
  const { page = 1, perPage = 12, search } = props || {};

    return await prisma.post.findMany({
        where: {
          title: {
            contains: search ?? '',
            mode: 'insensitive',
          },
        },
        select:{
            id: true,
            title: true,
            excerpt: true,
            slug: true,
            date: true,
            created_at: true,
            featured_media: true,
            author: {
                select: {
                    name: true,
                    username: true,
                    avatar: true,
                }
            },
            category: {
              select: {
                name: true,
                slug: true,
              }
            }
        },
        take: perPage,
        skip: (page - 1) * perPage,
        orderBy: {
          date: 'desc',
        },
    }) as ArticleCardProps[];
}

export async function getArticle(slug: string): Promise<ArticleCardProps | null> {
    return await prisma.post.findUnique({
        where: { slug },
        include:{
          author: true,
          category: true,
        }
    }) as ArticleCardProps | null;
}

export async function getRelatedArticles(slug: string, categoryId?: bigint|null): Promise<ArticleCardProps[]> {
    return await prisma.post.findMany({
        where: { category_id: categoryId, slug: { not: slug } },
        include:{
          author: true,
          category: true,
        },
        // random 6 articles
        take: 6,
        orderBy: {
          created_at: 'desc',
        },
    }) as ArticleCardProps[];
}