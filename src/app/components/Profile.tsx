"use client";
import { FormEvent, useEffect, useState } from "react";
import { useAuth, useAuthState } from "../Hooks/AuthContext";
export default function Profile(){
  const { user, setUser } = useAuthState();
  const { logout,updateName } =  useAuth();
  const [ loading, setLoading ] = useState<boolean>(false);
  const [Name, setName] = useState<string>('');  
  const onLogout = () => {
    logout()
    setLoading(false)
  }
  useEffect(() =>{
    if(user !== null){
      setLoading(true)
    }else{
      setLoading(false)
    }
  },[user])
  const onChangeName = (name:string) =>{
    setName(name)
  }
  async function onUpdateName(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    await updateName(Name)
    // console.log("enviado")
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <h2>Tu información</h2>
      {
        loading ? 
        <>
          <div className="flex flex-col gap-4 items-center">
            <img
              src={user?.photoURL ? user?.photoURL:"/none"}
              alt={user?.photoURL ? user?.photoURL + "foto":"No tienes foto"}
              />
            <div>{user && user?.displayName}</div>
            <div>{user && user?.email}</div>
          </div>
          <h2>Actualizar Datos</h2>
          <form onSubmit={onUpdateName} className="flex flex-col gap-2">
            <input type="text" onChange={(e) => onChangeName(e.target.value)} placeholder='Nombre'/>
            <input type="text" onChange={(e) => onChangeName(e.target.value)} placeholder='Email'/>
            <button className="p-2 rounded-lg bg-white text-black">Guardar cambios</button>
          </form>
        </>:"Cargando datos.."
      }
      <button className={loading ? "mt-4 block bg-white text-black p-2 rounded-lg":"hidden"} onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}