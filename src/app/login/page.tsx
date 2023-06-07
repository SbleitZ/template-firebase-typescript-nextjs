"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAuth } from "../Hooks/AuthContext";
// import { useRouter } from "next/navigation";
import AuthProvider from '../Hooks/AuthContext'
import Image from "next/image";
import Link from "next/link";
import { errorsFirebase } from "../../../firebase/utils";
export default function Login(){
  const [errorSubmit, setErrorSubmit ] = useState('');
  // const router = useRouter()
  const [user,setUser] = useState({
    email:'',
    password:''
  });
  const {login,googleSignIn,resetPassword} = useAuth()
  const onChange = (e:ChangeEvent<HTMLInputElement>,name:string,value:string) =>{
    e.preventDefault()
    setUser({...user, [name]: value})
    setErrorSubmit('')
  }
  const onSubmit = async(e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    try {
      await login(user.email,user.password)
      //la otra alternativa es usar el useRouter, router.push("/")
      window.location.href = "/"
      console.log("logueado correctamente")
    } catch (error:any) {
      try {
        setErrorSubmit(errorsFirebase[error.code])
      } catch (error:any) {
        setErrorSubmit(error.code)
      }
    }
  }
  const onSubmitGoogle = async() =>{
    await googleSignIn()
    // router.push('/')
    window.location.href = "/"

  }
  const onResetPassword = async() =>{
    window.open("/resetpassword", "_blank",'width=500,height=300')
  }
  return (
    <AuthProvider>
      <div className="flex items-center justify-center min-h-screen w-full bg-[#6ba9ee] text-black">
        <div className="flex flex-col xl:w-1/4 bg-white p-10 rounded-lg gap-6">
        <div className="font-bold text-center text-xl">
            <h2>
              Iniciar sesión
            </h2>
          </div>
          <form className="flex flex-col gap-4" onSubmit={(e) => onSubmit(e)}>
            <input className="placeholder:text-slate-400 rounded-md p-4 border-2 border-solid border-slate-400 outline-none" type="text" name="email" placeholder="Email" onChange={(e) => onChange(e,e.target.name,e.target.value)}/>
            <input className="placeholder:text-slate-400 rounded-md p-4 border-2 border-solid border-slate-400 outline-none" type="password" name="password" placeholder="Contraseña" onChange={(e) => onChange(e,e.target.name,e.target.value)}/>
            <div className="text-red-600 text-sm">{errorSubmit}</div>
            <div onClick={onResetPassword} className="text-center text-sky-600">
              <span className="cursor-pointer">¿Olvidaste tu contraseña?</span>
            </div>
            <span className="text-center">¿No estas registrado? {" "}
              <Link className="text-sky-600" href="/register">Registrate</Link>
            </span>
            <button className="bg-[#0171d3] text-white py-2 px-6 rounded-md">Ingresar</button>
            <div className="flex items-center gap-2 text-slate-600">
              <hr className="grow"/>
              <span className="self-center text-slate-600">Más</span>
              <hr className="grow"/>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex bg-[#093db5] items-center border-2 text-white p-2 rounded-lg">
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
              <div onClick={onSubmitGoogle} className="cursor-pointer flex items-center border-2 border-solid border-slate-400 p-2 rounded-lg">
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