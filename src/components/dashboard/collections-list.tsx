"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, FileText } from "lucide-react";
import { useState } from "react";

interface Collection {
  id: bigint;
  name: string;
  slug: string;
  description: string | null;
  posts: any[];
}

export default function CollectionsList({
  collections,
}: {
  collections: Collection[];
}) {
  const [collectionsList, setCollectionsList] = useState(collections);

  const handleDelete = async (id: bigint) => {
    if (!confirm("Are you sure you want to delete this collection?")) return;

    try {
      const response = await fetch(`/api/collections/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCollectionsList(collectionsList.filter((col) => col.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete collection:", error);
    }
  };

  if (collectionsList.length === 0) {
    return (
      <p className="text-gray-500">
        No collections yet. Create your first collection!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {collectionsList.map((collection) => (
        <div
          key={collection.slug}
          className="flex items-center justify-between border-b pb-4"
        >
          <div className="flex-1">
            <h3 className="font-medium text-lg">{collection.name}</h3>
            <p className="text-sm text-gray-500 mt-1">
              {collection.description || "No description"}
            </p>
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
              <FileText size={14} />
              <span>{collection.posts.length} posts</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/dashboard/collections/edit/${collection.slug}`}>
              <Button variant="outline" size="sm">
                <Edit size={16} className="mr-1" />
                Edit
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDelete(collection.id)}
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
