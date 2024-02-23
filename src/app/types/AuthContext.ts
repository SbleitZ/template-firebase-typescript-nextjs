import { User, UserCredential } from "firebase/auth";

export type AuthContextType = {
  login:(email: string, password: string) =>Promise<UserCredential>;
  register: (email: string, password: string) => Promise<UserCredential>;
  logout:() =>void;
  user: User | null;
  googleSignIn: () => Promise<UserCredential>;
  resetPassword: (email:string) => Promise<void>;
  updateName: (name:string) => Promise<void>;
  updateEmailP: (email:string) => Promise<void>;
  updateImg: (image:string) => Promise<void>;
}