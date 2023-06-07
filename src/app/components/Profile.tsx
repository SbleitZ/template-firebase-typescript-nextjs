"use client";
import { FormEvent, useEffect, useState } from "react";
import { useAuth, useAuthState } from "../Hooks/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Profile(){
  const router = useRouter()
  const { user, setUser } = useAuthState();
  const { logout,updateName, updateEmailP, updateImg} =  useAuth();
  const [ loading, setLoading ] = useState<boolean>(false);
  const [dataProfile, setDataProfile] = useState({
    name: '',
    email: '',
    urlImg: '',
  });  
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
    }
  },[user])
  const onChangeValue= (value:string,name:string) =>{
    setDataProfile({...dataProfile, [name]:value})
    console.log(dataProfile)
  }
  async function onUpdateProfile(e:FormEvent<HTMLFormElement>){
    //aqui deberias de mostrar el error, "el email" es el mismo que el anterior y no le permitira hacer un cambio irrelevante
    if(dataProfile.email == user?.email || dataProfile.name == user?.displayName) return;
    e.preventDefault();
    try {
      await updateName(dataProfile.name)
      await updateEmailP(dataProfile.email)
      await updateImg(dataProfile.urlImg)
    // console.log("cambio realizado")
    } catch (error:any) {
      console.log(error)
    }
    // console.log("enviado")
  }
  console.log(user?.photoURL)
  return (
    <div className="flex flex-col items-center justify-center justify-center">
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
            <div>Correo:{user && user?.email}</div>
          </div>
          <h2>Actualizar Datos</h2>
          <form onSubmit={onUpdateProfile} className="flex flex-col gap-2">
            <input className="placeholder:text-slate-400 text-black" type="text" name="name" onChange={(e) => onChangeValue(e.target.value, e.target.name)} placeholder='Nombre'/>
            <input className="placeholder:text-slate-400 text-black" type="email" name="email" onChange={(e) => onChangeValue(e.target.value,e.target.name)} placeholder='Email'/>
            <input className="placeholder:text-slate-400 text-black" type="text" name="urlImg" onChange={(e) => onChangeValue(e.target.value,e.target.name)} placeholder='Url de la imagen'/>
            <button className="p-2 rounded-lg bg-white text-black">Guardar cambios</button>
          </form>
        </>:"Cargando datos.."
      }
      <button className={loading ? "mt-4 block bg-white text-black p-2 rounded-lg":"hidden"} onClick={onLogout}>
        Logout
      </button>
      <Link href='/register' className="text-sky-200">
        Registrarse
      </Link>
      <Link href='/login' className="text-sky-200">
        Loguearse
      </Link>
    </div>
  );
}