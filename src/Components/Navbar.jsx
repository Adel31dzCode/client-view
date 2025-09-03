import React, { useState, useEffect } from 'react';
import '../Css/Navbar.css';
import logo from '../Img/logo.jpg';
import { Link } from "react-router-dom";


export default function Navbar({ Activity, current_page, logo_anim_st }) {
  const [Open, SetOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // مراقبة ال scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
            <Link to={"/dashboard"}><li className={`mini-list-navbar ${current_page === "contact" ? "current" : ""} `}>
              <i className="fa-solid fa-chart-line"></i>  Dashboard
            </li></Link>
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
            alt="logo"
            className={`logo-navbar ${scrolled || Open ? "logo-scrolled" : ""} ${logo_anim_st ? "logo-scrolled" : ""}`}
          />
        </a>

        <ul id="list-navbar-auth">
          <li className="mini-list-navbar-login">
            <Link to="/login"> Se connecter</Link>
          </li>
          <li className="mini-list-navbar-register">
            <Link to="/register">S’inscrire</Link>
          </li>
        </ul>
      </nav>

      {/* overlay */}
      <div
        className={Open ? "overlay overlay-active" : "overlay"}
        onClick={() => SetOpen(false)}
      />
    </>
  );
}
