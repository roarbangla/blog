"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-600 transition-colors"
    >
      <LogOut size={20} />
      Sign Out
    </button>
  );
}
