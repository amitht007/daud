"use client";
import { useSession } from "next-auth/react";

export function RequireRole({ role, children }: { role: string; children: React.ReactNode }) {
  const { data: session, status } = useSession();
  if (status === "loading") return null;
  if (!session || session.user.role !== role) return null;
  return <>{children}</>;
}
