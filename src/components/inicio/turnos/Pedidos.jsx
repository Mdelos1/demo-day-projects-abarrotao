import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Pedidos = ({setIsModal, isModal}) => {

  const apiTienda = "https://abarrotao-backend-production.up.railway.app/api/v1/"
  const [usuario, setUsuario] = useState([])

  useEffect(() => {
    axios.get(`${apiTienda}/usuario/${1}`)
    .then(res => {
      setUsuario(res.data);
      console.log(res.data)
    })
  }, []);
  const v = usuario[0]?.created_at?.split("-")
  const l = v?.[2].split("T")
  const fecha = l?.[0]+" "+v?.[1]+" "+v?.[0]
  console.log(l)
  return (
    <div className='pedidos'>
      <div className='pedidos__modal'>
        <h1>Todos mis pedidos</h1>
        <div className='pedidos__all'>
          <p className='pedidos__nombre'>{usuario[0]?.usuario.nombre}</p>
          <p className='pedidos__email'>{usuario[0]?.usuario.email}</p>
          <div className='pedidos__todosLosMensajes'>
            {
              usuario.map(mensaje => (
                <div className='pedidos__recientes'>
                  <div>
                    <div className='pedidos__logo' style={{backgroundImage: `url(${mensaje.tienda.logo})`}}></div>
                    <p>{mensaje.tienda.nombre}</p>
                    <p>{fecha}</p>
                  </div>
                  <div>
                    <p>{mensaje.mensaje}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <button className='pedidos__boton' onClick={() => setIsModal(!isModal)}>X</button>
      </div>
    </div>
  )
}

export default Pedidos
