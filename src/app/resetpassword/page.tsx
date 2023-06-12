"use client";
import{FormEvent,ChangeEvent, useState } from "react";
import { useAuth } from "../Hooks/AuthContext";
import { errorsFirebase } from "../../../firebase/utils";
export default function ResetPassword(){
  const [email,setEmail] = useState('');
  const [errorSubmit, setErrorSubmit ] = useState('');
  const { resetPassword } = useAuth();
  async function onSubmit(e:FormEvent<HTMLFormElement>){
    e.preventDefault()
    try {
      await resetPassword(email)
    } catch (error:any) {
      try {
        setErrorSubmit(errorsFirebase[error.code])
      } catch (error:any) {
        setErrorSubmit(error.code)
      }
    }
    
  }
  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col items-center justify-center gap-2">
        <div className="text-red-600 text-sm">{errorSubmit}</div>

        <h2>Ingresa el correo para recuperarlo</h2>
        <input className="placeholder:text-slate-400 rounded-md p-4 border-2 border-solid border-slate-400 outline-none text-black" onChange={(e:ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} type="email" name="" placeholder="Tu email" />
        <button className="bg-white text-black rounded-lg p-2">Recuperar</button>
      </form>
    </>
  );
}