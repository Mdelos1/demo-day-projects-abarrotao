import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const MasInfo = () => {

  const apiTienda = "https://abarrotao-backend-production.up.railway.app/api/v1/"
  const { id } = useParams();
  const [tienda, setTienda] = useState({})

  useEffect(() => {
    axios.get(`${apiTienda}/tienda/${id}`)
    .then(res => {
      setTienda(res.data);
      console.log(res.data);
    })
  }, [])

  return (
    <div className='info__tienda'>
      <h1>Información detallada de la tienda</h1>

      <div className='info__tienda--detalles'>
        <div className='info__tienda--logo' style={{backgroundImage: `url(${tienda.logo})`}}></div>
        <div className='info__tienda--container'>
          <div className='info__tienda--descripcion'>
            <div className='info__descripcion'>
              <p>{tienda.descripcion}</p>
            </div>
            <div>
              {
                tienda.horarios?.map((hora, i) => (
                  <div className='info__horarios' key={i}>
                    <b>Horarios: </b>
                    <p>{hora.horarioInicio}</p>
                    <b>{"--"}</b>
                    <p>{hora.horarioFinal}</p>
                  </div>
                ))
              }
            </div>

          </div>
          <div className='info__tienda--direccion'>
            <div className='info__tienda--corporacion' style={{backgroundImage: `url(${tienda.imagenesCorporativas?.[1]})`}}></div>
            <p><b>Direccion:</b> {tienda.contacto?.[0].direccion}</p>
          </div>
        </div>
        <div className='info__contacto'>
          <p><b>WhatsApp: </b> {tienda.contacto?.[0].whatsapp}</p>
          <p><b>Email: </b> {tienda.contacto?.[0].email}</p>
          <p><b>Tel: </b> {tienda.contacto?.[0].tel}</p>
        </div>
      </div>
    </div>
  )
}

export default MasInfo;
