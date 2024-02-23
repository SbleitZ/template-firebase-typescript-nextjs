"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../Hooks/AuthContext";
export default function ProtectedRoutes({ children }: { children: any }) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { user} = useAuth();
  useEffect(() => {
    if (user !== null) {
      setLoading(true);
      // console.log("logueado");
    } else {
      setLoading(false);
      router.push("/login");
    }
  }, [user, router]);
  if (user?.email) {
    return <>{children}</>;
  } else {
    return (
      <div className="w-full h-screen flex items-center justify-center dark:bg-fDark bg-fLight dark:text-tDark text-tLight">
        <div className="animate-bounce">
          Cargando...
        </div>
      </div>
    );
  }
}