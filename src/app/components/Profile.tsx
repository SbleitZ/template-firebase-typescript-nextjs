"use client";
import { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../Hooks/AuthContext";
export default function Profile(){
  const router = useRouter()
  const { user } = useAuth();
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
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h2>Tu información</h2>
      {
        loading ? 
        <>
          <div className="flex flex-col gap-4 items-center">
            <img
              className="w-24 h-24 rounded-full"
              src={user?.photoURL ? user?.photoURL:"/none"}
              alt={user?.photoURL ? user?.photoURL + "foto":"Foto no encontrada"}
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