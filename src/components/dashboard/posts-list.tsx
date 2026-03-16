"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye } from "lucide-react";
import { useState } from "react";

interface Post {
  id: bigint;
  title: string;
  slug: string;
  status: string | null;
  created_at: Date | null;
  category: { name: string } | null;
  analytics: { views: number } | null;
}

export default function PostsList({ posts }: { posts: Post[] }) {
  const [postsList, setPostsList] = useState(posts);

  const handleDelete = async (id: bigint) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPostsList(postsList.filter((post) => post.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  if (postsList.length === 0) {
    return <p className="text-gray-500">No posts yet. Create your first post!</p>;
  }

  return (
    <div className="space-y-4">
      {postsList.map((post) => (
        <div
          key={post.slug}
          className="flex items-center justify-between border-b pb-4"
        >
          <div className="flex-1">
            <h3 className="font-medium text-lg">{post.title}</h3>
            <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
              <span>{post.category?.name || "Uncategorized"}</span>
              <span>•</span>
              <span>{new Date(post.created_at || "").toLocaleDateString()}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye size={14} />
                {post.analytics?.views || 0} views
              </span>
              <span>•</span>
              <span
                className={`px-2 py-0.5 rounded text-xs ${
                  post.status === "published"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {post.status}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/dashboard/posts/edit/${post.slug}`}>
              <Button variant="outline" size="sm">
                <Edit size={16} className="mr-1" />
                Edit
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDelete(post.id)}
            >
              <Trash2 size={16} className="mr-1" />
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
