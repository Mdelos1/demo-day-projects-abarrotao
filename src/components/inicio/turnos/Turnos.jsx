import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Pedidos from './Pedidos'

const Turnos = () => {
  const apiTienda = "https://abarrotao-backend-production.up.railway.app/api/v1/"
  const [tienda, setTienda] = useState([])

  useEffect(() => {
    axios.get(`${apiTienda}/tienda`)
    .then(res => {
      setTienda(res.data);
      console.log(res.data)
    })
  }, [])

  const modalPedido = async(id) => {
    const randomTienda = Math.floor(Math.random() * tienda.length);
    const random = Math.floor(Math.random() * 20);

    Swal.fire({
      icon: "info",
      title: "¿Quieres realizar un pedido?",
      text: `Esta es una ${id === randomTienda ? "tienda con alta demanda" : "tienda con baja demanda"}`,
      showCancelButton: true,
      confirmButtonText: "Si",
    }).then(res => {
      if (res.isConfirmed) {
        Swal.fire({
          title: '¡Haz tu pedido aquí!',
          text: `Tu turno es el: ${random}`,
          input: 'text',
          showCancelButton: true,
          confirmButtonText: 'Listo!',
          showLoaderOnConfirm: true,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Id tienda',
              text: `1, 2, 3`,
              input: 'number',
              confirmButtonText: 'Listo!',
            }).then(resp => {
              axios.post(`${apiTienda}/usuario/${1}/mensajes`, {mensaje: result.value, tiendaId: resp.value})
            })
          }
        })
      }
    })
  }
 
  const [isModal, setIsModal] = useState(false)

  return (
    <div className='turnos'>
      <h1>Pedir turnos</h1>
      <div className='turnos__all'>
        {
          tienda.map((ten,i) => (
            <div className='turnos__tienda' key={i}>
              <div className='turnos__info--tienda'>
                <div className='turnos__logo' style={{backgroundImage: `url(${ten.logo})`}}></div>
                <p>{ten.nombre}</p>
              </div>
              <div>
                <button className='turnos__boton' onClick={() => modalPedido(i)}>Pedir turno</button>
              </div>
            </div>
          ))
        }
      </div>
      <div>
        <button className='turnos__boton--ver' onClick={() => setIsModal(!isModal)}>Ver pedidos</button>
      </div>
      {
        isModal && <Pedidos setIsModal={setIsModal} isModal={isModal}/>
      }
    </div>
  )
}

export default Turnos
