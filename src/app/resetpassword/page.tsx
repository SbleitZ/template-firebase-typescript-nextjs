"use client";
import{ ChangeEvent, useState } from "react";
import { useAuth } from "../Hooks/AuthContext";
export default function ResetPassword(){
  const [email,setEmail] = useState('');
  const { resetPassword } = useAuth();
  async function onSubmit(){
    await resetPassword(email)
  }
  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-col items-center justify-center gap-2">
        <h2>Ingresa el correo para recuperarlo</h2>
        <input onChange={(e:ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} type="email" name="" placeholder="Tu email" />
        <button className="bg-white text-black rounded-lg p-2">Recuperar</button>
      </form>
    </>
  );
}