"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAuth } from "../Hooks/AuthContext";
import AuthProvider from "../Hooks/AuthContext";
import { useRouter } from "next/navigation";
import { errorsFirebase } from "../../../firebase/utils";

export default function Register(){
  const router = useRouter()
  const [errorSubmit, setErrorSubmit ] = useState('');
  const [user,setUser] = useState({
    email:'',
    password:''
  });
  const { signup } = useAuth()
  const onChange = (e:ChangeEvent<HTMLInputElement>,name:string,value:string) =>{
    e.preventDefault()
    setUser({...user, [name]: value})
  }
  const onSubmit = async(e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    try {
      await signup(user.email,user.password)
      router.push('/')
    } catch (error: any) {
      console.log("penazo")
      try {
        setErrorSubmit(errorsFirebase[error.code])
      } catch (error:any) {
        setErrorSubmit(error.code)
      }
      // console.log(error.message)
      // //error.code
      // console.log(error.code)
      // console.log(errorSubmit)
    }
  }

  return (
    <AuthProvider>
      <form className="flex flex-col items-center gap-2" onSubmit={(e) => onSubmit(e)}>
        <label htmlFor="name">{errorSubmit}</label>
        <label htmlFor="">Email</label>
        <input className="placeholder:text-slate-400 text-black" type="text" name="email" id="" onChange={(e) => onChange(e,e.target.name,e.target.value)}/>
        <label htmlFor="">password</label>
        <input className="placeholder:text-slate-400 text-black" type="password" name="password" id="" onChange={(e) => onChange(e,e.target.name,e.target.value)}/>
        <button className="bg-white text-black p-2 rounded-lg">Registrar</button>
      </form>
    </AuthProvider>
  );
}