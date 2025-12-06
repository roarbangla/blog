import { Menu, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex relative items-center space-x-2">
          <span className="text-2xl font-bold tracking-tight text-primary font-playfair">
            roar<span className="text-orange-500 ml-1 text-normal">বাংলা</span>
          </span>
          <Badge variant="outline" className="absolute top-0 -right-10 text-xs text-orange-500">Beta</Badge>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <form action="/" method="get" className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              name="search"
              placeholder="Search..."
              className="w-full pl-10 bg-secondary/50 border-border focus-visible:ring-primary"
            />
          </form>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          {/* Search Icon - Mobile */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>

          {/* Menu */}
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};