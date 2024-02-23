"use client";
import { AuthContextType } from "@/app/types/AuthContext";
import { auth } from "@/firebase/firebase";
import { GoogleAuthProvider, User,createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateEmail, updateProfile } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext<AuthContextType|null>({} as AuthContextType);

export const useAuth = () =>{
  const context = useContext(AuthContext);
  if (!context) throw new Error("No esta autenticado.")
  return context;
}
export function AuthProvider ({children}:{
  children:React.ReactNode
}) {
  const [user,setUser] = useState<User | null>({} as User);
  const googleSignIn = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth,googleProvider)
  }
  const resetPassword = (email:string) => sendPasswordResetEmail(auth,email);
  const register = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);
  const login = async (email: string, password: string) => {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredentials;
  };
  const logout = () => signOut(auth);
  const updateEmailP = async(email:string) =>{
    if(email == "") return;
    if(auth.currentUser !== null){
      try{
        await updateEmail(auth.currentUser,email)
      }catch(error:any){
        console.error(error);
      }
    }
  }
  const updateName = async(name:string) => {
   if(name == "") return;
   if(auth.currentUser !== null){
    try {
      await updateProfile(auth.currentUser, {
        displayName: name, 
      })
    } catch (error:any) {
      console.error(error)
    }
   }
  }
  const updateImg = async(urlImg: string) => {
    if(urlImg == "") return;
    if(auth.currentUser !== null){
     try {
       await updateProfile(auth.currentUser, {
         photoURL: urlImg, 
       })
       console.log(urlImg)
     } catch (error:any) {
       console.error(error)
     }
    }
   }
  useEffect(()=>{
    const unsuscribe = onAuthStateChanged(auth,(currentUser)=>{
      setUser(currentUser);
    });
    return () => unsuscribe();
  },[])
  return ( 
    <AuthContext.Provider value={{login,logout,user,googleSignIn,resetPassword,register,updateEmailP,updateImg,updateName}}>
      {children}
    </AuthContext.Provider>
  )
}