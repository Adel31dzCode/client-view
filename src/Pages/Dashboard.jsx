import React from 'react';
import '../Css/Dashboard.css'; // لا تغيّر مسار الاستيراد
import "react-loading-skeleton/dist/skeleton.css";
import logo from "../Img/logo.jpg";
import userIcon from "../Svg/users-svgrepo-com.svg";
import ShopIcon from "../Svg/basket-alt-3-svgrepo-com.svg";
import docsIcon from "../Svg/doc-svgrepo-com.svg";
import burger_menu from "../Svg/burger-menu-svgrepo-com.svg"
import { NavLink, Outlet } from "react-router-dom";



export default function Dashboard() {

  return (
    <>

    <nav id="navbar-dashboard">
  <div className="burger-menu">
    <img src={burger_menu} alt="menu" />
  </div>

  <p><span className='owner-color-aura'> Nazya  Dashboard </span></p>

  <div className="user-info">
      <img src={logo} alt="User" className="user-avatar" />
    <span className="user-name">Naziha Cherfi</span>
  </div>
</nav>
    <div id="menu-sidebar-dashboard">
      <a href="/" id="logo-continer-dashboard">
        <img src={logo} alt="logo" id='logo-dashboard'/>
        <span className="logo-text">Nazya</span>
      </a>
      <ul id="list-sidebar-dashboard">
        <li>
          <NavLink 
            to="users" 
            className={({ isActive }) => 
              `mini-list-dashboard ${isActive ? "current-dashboard" : ""}`
            }
          >
            <img src={userIcon} className="icons-sidebar-dashboard" alt="user icon" />
            <span className="text-list-sidebar">Users</span>
          </NavLink>
        </li>

        <li>
          <NavLink 
            to="Tcf-Formule" 
            className={({ isActive }) => 
              `mini-list-dashboard ${isActive ? "current-dashboard" : ""}`
            }
          >
            <img src={docsIcon} className="icons-sidebar-dashboard" alt="Doc icon" />
            <span className="text-list-sidebar">Formule TCF</span>
          </NavLink>
        </li>

        <li>
          <NavLink 
            to="/dashboard/boutique" 
            className={({ isActive }) => 
              `mini-list-dashboard ${isActive ? "current-dashboard" : ""}`
            }
          >
            <img src={ShopIcon} className="icons-sidebar-dashboard" alt="shop icon" />
            <span className="text-list-sidebar">Demande Boutique</span>
          </NavLink>
        </li>

        <li>
          <NavLink 
            to="/dashboard/admission" 
            className={({ isActive }) => 
              `mini-list-dashboard ${isActive ? "current-dashboard" : ""}`
            }
          >
            <img src={docsIcon} className="icons-sidebar-dashboard" alt="Doc icon" />
            <span className="text-list-sidebar">Formule L'admision</span>
          </NavLink>
        </li>

        <li>
          <NavLink 
            to="/dashboard/visa" 
            className={({ isActive }) => 
              `mini-list-dashboard ${isActive ? "current-dashboard" : ""}`
            }
          >
            <img src={docsIcon} className="icons-sidebar-dashboard" alt="Doc icon" />
            <span className="text-list-sidebar">Formule Visa</span>
          </NavLink>
        </li>
      </ul>
    </div>

    <section id='action-continer-content'>

      
      <Outlet />

      </section>
    </>
  );
}
