"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch("/api/auth/me");

        if (!response.ok) {
          router.replace("/auth/login");
          return;
        }

        const result = await response.json();
        console.log("result :", result);
        setUser(result.user);
      } catch (error) {
        console.error("Unable to fetch user:", error);
      } finally {
        setLoading(false);
      }
    }

    getUser();
  }, [router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        Loading dashboard...
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        Unable to load your account. Please log in again.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 p-6 text-white md:p-10">
      <header className="mb-10 flex items-center justify-between border-b border-zinc-800 pb-5">
        <h1 className="text-2xl font-bold">
          Dev<span className="text-emerald-400">Notes</span>
        </h1>

        <button
          onClick={async () => {
            await fetch("/api/auth/logout", { method: "POST" });
            router.replace("/auth/login");
            router.refresh();
          }}
          className="rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-800"
        >
          Log out
        </button>
      </header>

      <section>
        <p className="text-sm text-zinc-400">Your workspace</p>

        <h2 className="mt-2 text-3xl font-semibold">
          Welcome back, {user.name}!
        </h2>

        <p className="mt-3 text-zinc-400">
          Your notes and ideas will live here.
        </p>

        <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
          <h3 className="text-lg font-medium">Your notes</h3>

          <p className="mt-2 text-sm text-zinc-400">
            Your notes dashboard is ready for the next step.
          </p>
        </div>
      </section>
    </main>
  );
}