import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const Buscar = () => {

  
  const apiTienda = "https://abarrotao-backend-production.up.railway.app/api/v1/"
  const { register, handleSubmit } = useForm();
  const [tienda, setTienda] = useState([]);
  const [busqueda, setBusqueda] = useState({});
  

  useEffect(() => {
    axios.get(`${apiTienda}/tienda`)
    .then(res => {
      setTienda(res.data);
    })
  }, [])

  const submit = (form) => {
    const nombreBusqueda = form.tienda.toLowerCase();
    
    tienda.forEach(e => {
      if (nombreBusqueda === e.nombre.toLowerCase()) {
        setBusqueda(e);
        console.log(e)
      }
    })

  }
  console.log(busqueda)
  return (
    <div className='buscar'>
      <h1>Buscar</h1>
      <form onSubmit={handleSubmit(submit)} className="buscar__form">
        <input 
          autoComplete="true"
          type="text" 
          name="buscar_tienda" 
          id="buscar_tienda" 
          placeholder='Buscar tienda'
          className='buscar__tienda'
          {...register("tienda")}
          />
        <button className='buscar__boton' type='submit'>Buscar</button>
      </form>
      
      {
        busqueda !== {} ? (
          <div className='buscar__exito'>
            {
              <div className='card' onClick={() => navigate(`/mas_inforamcion/${busqueda.id}`)}>
                <div className='card__img' style={{backgroundImage: `url(${busqueda?.imagenesCorporativas?.[0]})`}}></div>
                <div className='card__informacion'>
                  <b>{busqueda?.nombre}</b>
                  <div className='card__horario'>
                    <b>Horarios:</b>
                    <p>{busqueda?.horarios?.[0].horarioInicio}</p>
                    <b>{"--"}</b>
                    <p>{busqueda?.horarios?.[0].horarioFinal}</p>
                  </div>
                  <div className='card__contactoW'>
                    <b>Whatsapp: </b>
                    <p>{busqueda?.contacto?.[0].whatsapp}</p>
                  </div>
                </div>
              </div>
            }
          </div>
        ) : (
          "La busqueda no coninside con nuestra base de datos"
        )
      }

    </div>
  )
}

export default Buscar
