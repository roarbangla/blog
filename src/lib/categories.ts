import prisma from "./database";
import { Category } from "@src/generated/prisma";
import { ArticleCardProps } from "@src/types/article";

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
    return await prisma.category.findFirst({
        where: { slug },
    });
}

export async function getArticlesByCategory(
    categoryId: bigint | undefined,
    props?: {
        page?: number,
        perPage?: number,
    }
): Promise<ArticleCardProps[]> {
    const { page = 1, perPage = 12 } = props || {};

    if (!categoryId) {
        return [];
    }

    return await prisma.post.findMany({
        where: {
            category_id: categoryId,
        },
        select: {
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
