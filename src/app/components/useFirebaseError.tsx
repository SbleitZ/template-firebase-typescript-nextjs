import { useState } from "react";
import { errorsFirebase } from "../../firebase/utils";
export default function FireBaseError({message}:{message:string}){
  const [errorSubmit, setErrorSubmit ] = useState('');
  return (
    <>
      <label htmlFor="name">{errorSubmit}</label>
    </>
  )
}