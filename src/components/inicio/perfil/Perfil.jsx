import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";

const Perfil = () => {

  const userStore = useSelector((store) => store.userStore);

  const [usuario, setUsuario] = useState({});
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const {
        displayName,
        email,
        phoneNumber,
      } = user?.auth.currentUser;
      setUsuario({displayName, email, phoneNumber})
    });
    
  }, [userStore]);


  return (
    <div className='perfil'>
      <h1>Información del Usuario</h1>
      <div className='perfil__informacion'>
        <h2>{usuario.displayName}</h2>

        <b>{usuario.email}</b>
      </div>
    </div>
  )
}

export default Perfil