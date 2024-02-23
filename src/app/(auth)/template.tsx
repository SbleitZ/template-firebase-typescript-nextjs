"use client";

import { AuthProvider } from "../Hooks/AuthContext";

export default function Template({ children }: { children: React.ReactNode }) {
  return (<AuthProvider>{children}</AuthProvider>);
}