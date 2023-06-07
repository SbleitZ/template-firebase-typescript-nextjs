"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAuth } from "../Hooks/AuthContext";
import { useRouter } from "next/navigation";
import AuthProvider from '../Hooks/AuthContext'
import Image from "next/image";
export default function Login(){
  const router = useRouter()
  const [user,setUser] = useState({
    email:'',
    password:''
  });
  const {login,googleSignIn,resetPassword} = useAuth()
  const onChange = (e:ChangeEvent<HTMLInputElement>,name:string,value:string) =>{
    e.preventDefault()
    setUser({...user, [name]: value})
  }
  const onSubmit = async(e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    try {
      await login(user.email,user.password)
      router.push('/')
      console.log("logueado correctamente")
    } catch (error:any) {
      //error.code
      console.log("penazo")
      console.log(error.message)
      //error.code
      console.log(error.code)
    }
  }
  const onSubmitGoogle = async() =>{
    await googleSignIn()
    router.push('/')
  }
  const onResetPassword = async() =>{
    await resetPassword(user.email)
    console.log(user.email)
  }
  return (
    <AuthProvider>
      <form className="flex flex-col items-center gap-2" onSubmit={(e) => onSubmit(e)}>
        <label htmlFor="">Email</label>
        <input className="placeholder:text-slate-400 text-black" type="text" name="email" placeholder="Email" onChange={(e) => onChange(e,e.target.name,e.target.value)}/>
        <label htmlFor="">password</label>
        <input className="placeholder:text-slate-400 text-black" type="password" name="password" placeholder="Contraseña" onChange={(e) => onChange(e,e.target.name,e.target.value)}/>
        <button className="bg-white text-black p-2 rounded-lg">Login</button>
        <div className="flex gap-6">
          <button onClick={onSubmitGoogle}>
            <Image
              src={"/icons/GoogleIcon.svg"}
              alt="icon google sesion"
              height={30}
              width={30}/>
          </button>

        </div>
          <button className="text-sky-400" onClick={onResetPassword}>Olvide mi contraseña</button>
      </form>
    </AuthProvider>
  );
}