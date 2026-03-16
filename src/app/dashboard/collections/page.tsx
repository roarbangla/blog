import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import prisma from "@/lib/database";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import CollectionsList from "@/components/dashboard/collections-list";

export default async function CollectionsPage() {
  const session = await getServerSession(authOptions);
  
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email || "" },
  });

  const collections = await prisma.collection.findMany({
    where: { user_id: user?.id },
    include: {
      posts: {
        include: {
          post: true,
        },
      },
    },
    orderBy: { created_at: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Collections</h1>
          <p className="text-gray-500 mt-2">Organize your posts into series</p>
        </div>
        <Link href="/dashboard/collections/new">
          <Button>
            <Plus size={20} className="mr-2" />
            New Collection
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Collections</CardTitle>
        </CardHeader>
        <CardContent>
          <CollectionsList collections={collections} />
        </CardContent>
      </Card>
    </div>
  );
}
