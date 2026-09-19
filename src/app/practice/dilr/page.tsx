"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, ArrowRight, Layers } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";

export default function DILRPracticeRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/learn/dilr");
  }, [router]);

  return (
    <AppShell>
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-5 text-center max-w-md mx-auto p-6 animate-in fade-in duration-200">
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
          <BookOpen className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white">DILR Moved to Concept Section</h2>
          <p className="text-sm text-slate-400">
            The Data Interpretation & Logical Reasoning curriculum and CAT problem sets have been relocated to the Concept section. Redirecting you now...
          </p>
        </div>
        <Link href="/learn/dilr">
          <Button className="bg-indigo-600 hover:bg-indigo-500 text-white gap-2">
            <span>Go to DILR Concepts</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </AppShell>
  );
}
