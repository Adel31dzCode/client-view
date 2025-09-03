import React from 'react';
import '../Css/Footer.css';

export default function Footer() {
  return (
      <footer>
    <div id="uls">
      <ul className="links_footer">
        <li className="links_footer title_links">Web Site</li>
        <li className="links_footer">TCF Service</li>
        <li className="links_footer"> boutique en ligne</li>
        <li className="links_footer">L’obtention de votre visa</li>
        <li className="links_footer">traitement de dossier VISA</li>

      </ul>
      <ul className="links_footer">
        <li className="links_footer title_links">Ou?</li>
        <li className="links_footer">In Algeria</li>
        <li className="links_footer">Tizi Ouzou</li>
        <li className="links_footer">Wall 68, West</li>
      </ul>
      <ul className="links_footer">
        <li className="links_footer title_links">App</li>
        <li className="links_footer">App Store</li>
        <li className="links_footer">Play Store</li>
      </ul>
      <ul className="links_footer">
        <li className="links_footer title_links">Contact</li>
        <li className="links_footer">Youtube</li>
        <li className="links_footer">Linken</li>
        <li className="links_footer">X</li>
        <li className="links_footer">Facebook</li>
      </ul>
    </div>

    <hr />
    
    <div id="last">
      <p>@ 2025 Nazyha Cherfi</p>
      <p><i className="fa-brands fa-facebook mrg"></i> <i className="fa-brands fa-instagram mrg"></i> <i className="fa-brands fa-x-twitter mrg"></i></p>
    </div>

  </footer>
  )
}
