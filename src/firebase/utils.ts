interface typeEror{
  [key:string]: string;
}
//puedes añadir más cosas acá
export const errorsFirebase: typeEror = {
  "auth/missing-password":"Contraseña no proporcionada o esta vacia.",
  "auth/wrong-password": "Contraseña incorrecta.",
  "auth/user-not-found":"El email/usuario introducido no ha sido encontrado",
  "auth/invalid-email":"El email introducido es invalido, porfavor prueba con otro.",
  "auth/weak-password":"Contraseña debil. La contraseña tiene que tener un minimo de 6 caracteres.",
  "auth/email-already-in-use":"El email ya esta en uso, porfavor intenta con otro."
}