import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import prisma from "@/lib/database";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import PostsList from "@/components/dashboard/posts-list";

export default async function PostsPage() {
  const session = await getServerSession(authOptions);
  
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email || "" },
  });

  const posts = await prisma.post.findMany({
    where: { author_id: user?.user_id },
    orderBy: { created_at: "desc" },
    include: {
      category: true,
      analytics: true,
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Posts</h1>
          <p className="text-gray-500 mt-2">Manage your articles</p>
        </div>
        <Link href="/dashboard/posts/new">
          <Button>
            <Plus size={20} className="mr-2" />
            New Post
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <PostsList posts={posts} />
        </CardContent>
      </Card>
    </div>
  );
}
