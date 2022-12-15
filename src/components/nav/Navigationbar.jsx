import React from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { actionLogoutAsync } from "../../redux/actions/userActions";
import logoHeader from '../../assets/imgs/abarrotados-logo2.jpeg'


const Navigationbar = ({ isAuthentication }) => {
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(actionLogoutAsync());
  };
  return ( 
    <div className="navigation">
      <div className="navigation__container">
        <div className="navigation_logo">
          <img src={logoHeader} alt='Abarrotado Logo' className="imgLogoNav"/>
          <div className="appName">
            <h2 >Abarrotao</h2>
          </div>
        </div>
        <div className="navigation__login">
          {isAuthentication ? (
            <div className="navigation__login--actions">
              <Link to="/home" className={({isActive})=>isActive?'navLink navLink--active': 'navLink ' }>Home</Link >
              <button onClick={logOut}>Logout</button>
            </div>
          ) : (
            <div className="navigation__login--actions">
              <Link to="/" className={({isActive})=>isActive?'navLink navLink--active': 'navLink ' }>Login</Link>
              <Link to="/register" className={({isActive})=>isActive?'navLink navLink--active': 'navLink ' }>Register</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigationbar;
