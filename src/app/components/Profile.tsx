"use client";
import { FormEvent, useEffect, useState } from "react";
import { useAuth, useAuthState } from "../Hooks/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UpdateProfile from "../updateprofile/page";
export default function Profile(){
  const router = useRouter()
  const { user, setUser } = useAuthState();
  const { logout} =  useAuth();
  const [ loading, setLoading ] = useState<boolean>(false);
  const onLogout = () => {
    logout()
    setLoading(false)
    router.push('/login')
  }
  useEffect(() =>{
    if(user !== null){
      setLoading(true)
    }else{
      setLoading(false)
      router.push('/login')
    }
  },[user,router])
  console.log(user)
  return (
    <div className="flex flex-col items-center justify-center justify-center gap-4">
      <h2>Tu información</h2>
      {
        loading ? 
        <>
          <div className="flex flex-col gap-4 items-center">
            <img
              className="w-24 h-24 rounded-full"
              src={user?.photoURL ? user?.photoURL:"/none"}
              alt={user?.photoURL ? user?.photoURL + "foto":"No tienes foto"}
              width="384"
              height="512"
              />
            <div>Nombre: {user?.displayName || "Sin nombre"}</div>
            <div>Correo: {user && user?.email}</div>
          </div>
          
        </>:"Cargando datos.."
      }
      
      <button className={loading ? "mt-4 block bg-white text-black p-2 rounded-lg":"hidden"} onClick={onLogout}>
        Cerrar sesión
      </button>
      <div className="text-center flex flex-col gap-2">
        <h3>¿Quieres actualizar tu perfil?</h3>
        <Link className="text-sky-500" href="/updateprofile">Modificalo</Link>
        <Link className="text-sky-500" href="/register">Crea un perfil</Link>
        <Link className="text-sky-500" href="/login">Entrar con otro perfil</Link>
      </div>
    </div>
  );
}