import React, { useState } from 'react'
import { Link } from "react-router-dom";
import homeImg from '../../assets/imgs/home-icon.png';
import historyImg from '../../assets/imgs/history-icon.png';
import searchImg from '../../assets/imgs/search-icon.png';
import profileImg from '../../assets/imgs/profile-icon.png';

const NavigationMenu = ({ isAuthentication }) => {

  const arrayImgs = [
    homeImg,
    historyImg,
    searchImg,
    profileImg,
  ]
  const arrayNames = [
    "Home",
    "Turnos",
    "Buscar",
    "Perfil",
  ]
  const [numId, setNumId] = useState(0);

  const click = (id) => {
    setNumId(id)
  }

  return (
    isAuthentication? 
      <div className='navWrapper'>
        <div className='navigation__menu'>
          <ul>
            {
              arrayImgs.map((img, i) => (
                <li className='list active' key={i} onClick={() => click(i) } >
                  <Link 
                    to={`/${arrayNames[i].toLowerCase()}`} 
                    className='linkNav' 
                    style={{
                      backgroundColor: i === numId && "#129dc7", 
                      color: i === numId && "#fff",
                      paddingTop: i === numId && "0",
                    }}>
                    <span className='icon'><img src={img} alt={arrayNames[i]} /></span>
                    <span className='text'>{arrayNames[i]}</span>
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
      :
      <></>   
  )
}

export default NavigationMenu;
