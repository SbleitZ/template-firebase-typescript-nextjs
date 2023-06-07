"use client"
import { FormEvent, useState } from "react";
import { useAuth, useAuthState } from "../Hooks/AuthContext";
import Link from "next/link";

export default function UpdateProfile(){
  const { user, setUser } = useAuthState();
  const {updateName, updateEmailP, updateImg} =  useAuth();
  const [dataProfile, setDataProfile] = useState({
    name: '',
    email: '',
    urlImg: '',
  });  

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
      window.location.href = "/"
    // console.log("cambio realizado")
    } catch (error:any) {
      console.log(error)
    }
    // console.log("enviado")
  }
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-[#6ba9ee] text-black">
      {
        user == null ? <>
          <Link className="animate-bounce" href='/login'>Inicia sesión</Link>

        </>:
        <div className="flex flex-col xl:w-1/4 bg-white p-10 rounded-lg gap-6">
          <div className="font-bold text-center text-xl">
            <h2>
              Actualizar Datos
            </h2>
            <div className="font-normal text-sm text-slate-700">
              Deja en blanco si no quieres modificar
            </div>
          </div>
          <form onSubmit={onUpdateProfile} className="flex flex-col gap-2">
            <input className="placeholder:text-slate-400 rounded-md p-4 border-2 border-solid border-slate-400 outline-none" type="text" name="name" onChange={(e) => onChangeValue(e.target.value, e.target.name)} placeholder='Nombre'/>
            <input className="placeholder:text-slate-400 rounded-md p-4 border-2 border-solid border-slate-400 outline-none" type="email" name="email" onChange={(e) => onChangeValue(e.target.value,e.target.name)} placeholder='Email'/>
            <input className="placeholder:text-slate-400 rounded-md p-4 border-2 border-solid border-slate-400 outline-none" type="text" name="urlImg" onChange={(e) => onChangeValue(e.target.value,e.target.name)} placeholder='Url de la imagen'/>
            <button className="bg-[#0171d3] text-white py-2 px-6 rounded-md">Guardar cambios</button>
            <Link href="/" className="bg-red-600 text-white py-2 px-6 rounded-md text-center">Volver</Link>
          </form>
        </div>
      }
    </div>
  );
}