import React from 'react'
import { Route, Routes } from "react-router-dom";
import Home from '../components/inicio/home/Home'
import Turnos from '../components/inicio/turnos/Turnos';
import Buscar from '../components/inicio/buscar/Buscar';
import Perfil from '../components/inicio/perfil/Perfil';
import MasInfo from '../components/inicio/home/MasInfo';


const DashBoardRouter = () => {
  return (
    <Routes>
        <Route path='/home' element={<Home />}/>
        <Route path='/turnos' element={<Turnos />} />        
        <Route path='/buscar' element={<Buscar />} />        
        <Route path='/perfil' element={<Perfil />} />  
        <Route path='/mas_inforamcion/:id' element={<MasInfo />} />      
    </Routes>
  )
}

export default DashBoardRouter