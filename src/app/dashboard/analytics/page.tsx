import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import prisma from "@/lib/database";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, TrendingUp, FileText } from "lucide-react";

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions);
  
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email || "" },
  });

  const posts = await prisma.post.findMany({
    where: { author_id: user?.user_id },
    include: {
      analytics: true,
    },
    orderBy: {
      analytics: {
        views: "desc",
      },
    },
    take: 10,
  });

  const totalViews = await prisma.postAnalytics.aggregate({
    _sum: { views: true },
    where: {
      post: { author_id: user?.user_id },
    },
  });

  const publishedPosts = await prisma.post.count({
    where: {
      author_id: user?.user_id,
      status: "published",
    },
  });

  const avgViews = publishedPosts > 0 
    ? Math.round((totalViews._sum.views || 0) / publishedPosts)
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-gray-500 mt-2">Track your content performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews._sum.views || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Published Posts</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedPosts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Views per Post</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgViews}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Performing Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {posts.length === 0 ? (
              <p className="text-gray-500">No posts with analytics yet.</p>
            ) : (
              posts.map((post) => (
                <div
                  key={post.slug}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div className="flex-1">
                    <h3 className="font-medium">{post.title}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(post.created_at || "").toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Eye size={16} />
                    <span className="font-medium">
                      {post.analytics?.views || 0} views
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
