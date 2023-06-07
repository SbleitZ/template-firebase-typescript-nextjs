"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAuth } from "../Hooks/AuthContext";
import AuthProvider from "../Hooks/AuthContext";
import { useRouter } from "next/navigation";
import { errorsFirebase } from "../../../firebase/utils";
import Image from "next/image";
import Link from "next/link";

export default function Register(){
  const router = useRouter();
  const [errorSubmit, setErrorSubmit ] = useState('');
  const [user,setUser] = useState({
    email:'',
    password:'',
    passwordConfirmation: ''
  });
  const { signup } = useAuth()
  const onChange = (e:ChangeEvent<HTMLInputElement>,name:string,value:string) =>{
    e.preventDefault()
    setUser({...user, [name]: value})
  }
  const onSubmit = async(e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if(user.password !== user.passwordConfirmation) return setErrorSubmit("Las contraseñas son distintas.");
    try {
      await signup(user.email,user.password)
      router.push('/')
    } catch (error: any) {
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
      <div className="flex items-center justify-center min-h-screen w-full bg-[#6ba9ee] text-black">
        <div className="flex flex-col w-1/4 bg-white p-10 rounded-lg gap-2">
          <div className="font-bold text-center">
            <h2>
              Registro
            </h2>
          </div>
          <form className="flex flex-col gap-4" onSubmit={(e) => onSubmit(e)}>
            <input className="placeholder:text-slate-400 rounded-md p-4 border-2 border-solid border-slate-400" type="text" name="email" placeholder="Email" onChange={(e) => onChange(e,e.target.name,e.target.value)}/>
            <input className="placeholder:text-slate-400 rounded-md p-4 border-2 border-solid border-slate-400" type="password" name="password" placeholder="Contraseña" onChange={(e) => onChange(e,e.target.name,e.target.value)}/>
            <input className="placeholder:text-slate-400 rounded-md p-4 border-2 border-solid border-slate-400" type="password" name="passwordConfirmation" placeholder="Confirmar contraseña" onChange={(e) => onChange(e,e.target.name,e.target.value)}/>
            <div className="text-red-600">{errorSubmit}</div>
            <Link href="/register" className="text-center text-sky-600">¿Olvide mi contraseña?</Link>
            <button className="bg-[#0171d3] text-white p-2 rounded-lg">Registrar</button>
            <div className="flex items-center gap-2 text-slate-600">
              <hr className="grow"/>
              <span className="self-center text-slate-600">Más</span>
              <hr className="grow"/>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex bg-[#093db5] items-center border-2 text-white border-solid border-slate-400 p-2 rounded-lg">
                <Image
                  src="/icons/FacebookIcon.svg"
                  alt="Facebook icon"
                  className="bg-white p-2 rounded-full"
                  width={40}
                  height={40}
                />
                <div className="text-center w-full">
                  Logueate con Facebook
                </div>
              </div>
              <div className="flex items-center border-2 border-solid border-slate-400 p-2 rounded-lg">
                <Image
                  src="/icons/GoogleIcon.svg"
                  alt="Google icon"
                  width={40}
                  height={40}
                />
                <div className="text-center w-full">
                  Logueate con Google
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AuthProvider>
  );
}