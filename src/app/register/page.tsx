"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAuth } from "../components/AuthContext";
import AuthProvider from "../components/AuthContext";
import { useRouter } from "next/navigation";

export default function Register(){
  const router = useRouter()
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
      //error.code
      console.log(error.message)
    }
  }

  return (
    <AuthProvider>
      <form onSubmit={(e) => onSubmit(e)}>
        <label htmlFor="">Email</label>
        <input type="text" name="email" id="" onChange={(e) => onChange(e,e.target.name,e.target.value)}/>
        <label htmlFor="">password</label>
        <input type="password" name="password" id="" onChange={(e) => onChange(e,e.target.name,e.target.value)}/>
        <button>Register</button>
      </form>
    </AuthProvider>
  );
}