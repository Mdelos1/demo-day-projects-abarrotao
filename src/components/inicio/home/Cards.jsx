import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Cards = () => {

  const apiTienda = "https://abarrotao-backend-production.up.railway.app/api/v1/"

  const [tienda, setTienda] = useState([])

  useEffect(() => {
    axios.get(`${apiTienda}/tienda`)
    .then(res => {
      setTienda(res.data);
      console.log(res.data)
    })
  }, [])

  const navigate = useNavigate();

  return (
    <>
      {
        tienda.map((ten,i) => (
          <div className='card' key={i} onClick={() => navigate(`/mas_inforamcion/${ten.id}`)}>
            <div className='card__img' style={{backgroundImage: `url(${ten.imagenesCorporativas[0]})`}}></div>
            <div className='card__informacion'>
              <b>{ten.nombre}</b>
              <div className='card__horario'>
                <b>Horarios:</b>
                <p>{ten.horarios[0].horarioInicio}</p>
                <b>{"--"}</b>
                <p>{ten.horarios[0].horarioFinal}</p>
              </div>
              <div className='card__contactoW'>
                <b>Whatsapp: </b>
                <p>{ten.contacto[0].whatsapp}</p>
              </div>
            </div>
          </div>
        ))
      }
    </>
  )
}

export default Cards
