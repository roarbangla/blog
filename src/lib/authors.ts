import { User } from "@src/generated/prisma/client";
import prisma from "./database";
import { ArticleCardProps } from "@src/types/article";

export async function getAuthorByUsername(username: string): Promise<User | null> {
    return await prisma.user.findFirst({
        where: { username },
    });
}

export async function getArticlesByAuthor(
    authorId: bigint | undefined,
    props?: {
        page?: number,
        perPage?: number,
    }
): Promise<ArticleCardProps[]> {
    const { page = 1, perPage = 12 } = props || {};

    if (!authorId) {
        return [];
    }

    return await prisma.post.findMany({
        where: {
            author_id: authorId,
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

export const getTotalArticlesByAuthor = async (authorId: bigint | undefined): Promise<number> => {
    if (!authorId) {
        return 0;
    }

    return await prisma.post.count({
        where: { author_id: authorId },
    });
}
