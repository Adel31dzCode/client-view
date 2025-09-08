import React, { useState, useEffect } from 'react';
import '../Css/Navbar.css';
import logo from '../Img/logo.jpg';
import { Link } from "react-router-dom";
import { Api_link } from '../assets/Api';
import axios from 'axios';
import Loading from './Loading';
import avatar from '../Img/avatar.jpg';
import Cookies from 'universal-cookie';



export default function Navbar({ UserData, LoadingState, Activity, current_page, logo_anim_st }) {
  // const [user, setUser] = useState(null);
    const Cookie = new Cookies();
  
  const [Open, SetOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [IsLaoding, SetIsLoading] = useState(false);

  // 👇 Effect الأول: مراقبة ال scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 👇 Effect الثاني: جلب بيانات المستخدم
  // useEffect(() => {
  //   const token = Cookie.get("Nazya_access_token");
  //   if (token) {
  //     SetIsLoading(true);
  //     axios.get(`${Api_link}user`, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     })
  //     .then(res =>{ setUser(res.data); SetIsLoading(false); console.log(res)})
  //     .catch((err) =>{ setUser(null); SetIsLoading(false); console.log(err)});
  //   }
  // }, []);

  const handleLogout = () => {
    Cookie.remove("Nazya_access_token");
    console.log("log out btn clicked")
    setUser(null);
  };

  return (
    <>
      <nav
        className={`main-navbar ${Activity  ? "active-navbar-side" : "" } ${Open ? "active-navbar-side" : ""} ${
          scrolled ? "navbar-scrolled" : ""
        }`}
      >
        <div
          id="burger_menu"
          className={`${Activity  ? "navbar-scrolled-burger" : "" } ${scrolled ? "navbar-scrolled-burger" : ""} ${Open ? "active-burger" : ""}`}
           onClick={() => SetOpen(!Open)}>
          <i
            className={
              Open ? "fa-solid fa-bars active-burger-i" : "fa-solid fa-bars"
            }
          />
          <div className="activer" />
        </div>

        <ul id="list-navbar" className={Open ? "active-list" : ""}>
          <form className="search-form-input">
            <button>
              <svg
                width={17}
                height={16}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-labelledby="search"
              >
                <path
                  d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                  stroke="currentColor"
                  strokeWidth="1.333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <input
              className="input-navbar"
              placeholder="Type your text"
              required=""
              type="text"
            />
            <button className="reset" type="reset">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </form>
          <div id="bg-design">
            <Link to={"/"}><li className={`mini-list-navbar ${current_page === "home" ? "current" : ""} `} >
              <i className="fa-solid fa-house" /> Accueil
            </li></Link>
            <Link to={"/Boutique"}><li className={`mini-list-navbar ${current_page === "shop" ? "current" : ""} `}>
              <i className="fa-solid fa-shop" /> Boutique Online Pour Preparer Le Test TCF
            </li></Link>
            <Link to={"/round"}><li className={`mini-list-navbar ${current_page === "date" ? "current" : ""} `}>
              <i className="fa-solid fa-money-check-dollar" /> Service de Prise
              de Rendez-vous pour le TCF (Dap/So)
            </li></Link>
            <Link to={"/contact"}><li className={`mini-list-navbar ${current_page === "contact" ? "current" : ""} `}>
              <i className="fa-solid fa-address-book"></i>  Contacter Nous
            </li></Link>

            {!UserData ? (
                 
                    <li id="list-navbar-connected-side" className="mini-list-navbar-user-side">
                      <div className="user-menu-side">
                        <img src={avatar} alt="avatar" className="user-avatar-side" />
                        <span className="user-name-side">{UserData?.name || "Guest"}  <i className="fa-solid fa-caret-down"></i></span>
                        <ul className="submenu-side">
                          <li onClick={handleLogout}><i className="fa-solid fa-arrow-right-from-bracket"></i>  Se déconnecter  </li>
                        </ul>
                      </div>
                    </li>
                  
            ) : (
              <>
            <Link to={"/register"}><li className={`mini-list-navbar auth-query${current_page === "contact" ? "current" : ""} `}>
              <i className="fa-solid fa-user-plus"></i>  S’inscrire
            </li></Link>
            <Link to={"/login"}><li className={`mini-list-navbar auth-query${current_page === "contact" ? "current" : ""} `}>
               <i className="fa-solid fa-arrow-right-to-bracket"></i>  Se connecter
            </li></Link>
             </>
            )}

          </div>
          <hr id="separate_contract" />
          <p className="contact_p">
            <i className="fa-solid fa-phone-volume" /> ͏ +1 555-555-5556{" "}
            <i className="fa-solid fa-copy" />
          </p>
          <p className="contact_p">
            <i className="fa-solid fa-envelope" /> ͏ info@yourcompany.example.com{" "}
            <i className="fa-solid fa-copy" />
          </p>
        </ul>

        

        {/* نضيف كلاس مختلف للوغو عند النزول */}
        <a href="">
          <img
            src={logo}
            id='img-logo'
            alt="logo"
            className={`logo-navbar ${scrolled || Open ? "logo-scrolled" : ""} ${logo_anim_st ? "logo-scrolled" : ""}`}
          />
        </a>



        
  {UserData ? (
  <ul id="list-navbar-connected">
    <li className="mini-list-navbar-user">
      <div className="user-menu">
        <img src={avatar} alt="avatar" className="user-avatar" />
        <span className="user-name">{UserData.name}  <i className="fa-solid fa-caret-down"></i></span>
        <ul className="submenu">
          <li onClick={handleLogout}><i className="fa-solid fa-arrow-right-from-bracket"></i>  Se déconnecter  </li>
        </ul>
      </div>
    </li>
  </ul>

  ) : (
    <ul id="list-navbar-auth">
      <li className="mini-list-navbar-login">
        <Link to="/login"> Se connecter</Link>
      </li>
      <li className="mini-list-navbar-register">
        <Link to="/register">S’inscrire</Link>
      </li>
    </ul>
  )}


      </nav>

      {LoadingState && <Loading />}

      {/* overlay */}
      <div
        className={Open ? "overlay overlay-active" : "overlay"}
        onClick={() => SetOpen(false)}
      />
    </>
  );
}
