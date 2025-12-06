"use client";

import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Input } from "../ui/input";

export const SearchBox = ({className}: {className?: string}) => {
    const search = useSearchParams().get("search");
    return (
        <div className={className}>
          <form action="/" method="get" className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              name="search"
              placeholder="Search..."
              defaultValue={search || ""}
              className="w-full pl-10 bg-secondary/50 border-border focus-visible:ring-0 ring-0 shadow-none"
            />
          </form>
        </div>
    )
}