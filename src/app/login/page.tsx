"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAuth } from "../Hooks/AuthContext";
import { useRouter } from "next/navigation";
import AuthProvider from '../Hooks/AuthContext'
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
      console.log(error.message)
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
      <form onSubmit={(e) => onSubmit(e)}>
        <label htmlFor="">Email</label>
        <input type="text" name="email" id="" onChange={(e) => onChange(e,e.target.name,e.target.value)}/>
        <label htmlFor="">password</label>
        <input type="password" name="password" id="" onChange={(e) => onChange(e,e.target.name,e.target.value)}/>
        <button>Login</button>
        <button onClick={onSubmitGoogle}>Google</button>
        <button onClick={onResetPassword}>Olvide mi contraseña</button>
      </form>
    </AuthProvider>
  );
}