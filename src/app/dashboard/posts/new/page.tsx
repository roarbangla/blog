import prisma from "@/lib/database";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PostEditor from "@/components/dashboard/post-editor";

export default async function NewPostPage() {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Post</h1>
        <p className="text-gray-500 mt-2">Write and publish your article</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Post Details</CardTitle>
        </CardHeader>
        <CardContent>
          <PostEditor categories={categories} />
        </CardContent>
      </Card>
    </div>
  );
}
