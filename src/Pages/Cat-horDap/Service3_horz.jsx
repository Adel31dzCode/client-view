import React from 'react';
import "../../Css/Services/Services.css";
import Navbar from '../../Components/Navbar';
import list_style from "../../Img/finger.png";
import FormCam from '../../Components/Forms/FormCam';
import FormDem from '../../Components/Forms/FormDem';

export default function Service3_horz({ UserExisting }) {
  return (<>
    <Navbar  Activity={true} logo_anim_st={true}  UserData={UserExisting}/>

    <div id="page-service">
      <aside id='aside'>
        <ul>
          <li><a href="#service1-title">Préparation à l'entretien</a></li>
          <li><a href="#service0-title-last">Recours gracieux</a></li>

          
        </ul>
      </aside>
      
      <section id='section-content'>
        <h1>Service de Préparation à l'Entretien Campus France</h1>
        
        <p className="intro-text-service">
          Ce service spécialisé vous prépare de manière complète pour réussir votre entretien Campus France, 
          étape cruciale pour votre projet d'études en France.
        </p>
        
        <div id="separator-service">
          <span className="separator-span1"></span>
          <span className="separator-span2"></span>
        </div>
        
        <h2 className="title-service underline" id='service0-title'>NOTRE SERVICE :</h2>
        
        <h2 className="title-service" id='service1-title'>
          <img src={list_style} alt="list-style" /> Préparation à l'entretien
        </h2>
        
        <p className='para-content-service'>
          Nous vous expliquons en détail le <strong>déroulement de l'entretien Campus France</strong> en mettant l'accent sur :
        </p>
        
        <ul className="service-list">
          <li><strong>Ce qu'il faut absolument savoir</strong>,</li>
          <li><strong>Les erreurs à éviter</strong>,</li>
          <li><strong>Les astuces pour convaincre</strong>.</li>
        </ul>
        
        <p className='para-content-service'>
          Nous vous donnons également des <strong>techniques efficaces pour gérer votre stress</strong> et transformer ce moment en une réussite, même à la dernière minute. Enfin, vous recevez un <strong>support PDF exclusif</strong> comprenant :
        </p>
        
        <ul className="service-list">
          <li>La <strong>liste complète des questions fréquemment posées</strong> par les agents,</li>
          <li>Leurs <strong>différentes formulations possibles</strong> (directes, indirectes ou implicites),</li>
          <li>Des <strong>exemples de réponses convaincantes</strong> que vous pourrez personnaliser en fonction de votre profil.</li>
        </ul>
        
        <p className='para-content-service' id='marger-forbtn-service'>
          <strong>Tarif de service : <span className='colored-price'>7 500 DA</span></strong>
        </p>

        <FormCam UserData={UserExisting}/>


        <h2 className="title-service underline" id='service0-title-last'>Recours gracieux</h2>

        <p className='para-content-service'>
          En cas de refus de votre candidature par une université, nous prenons en charge la rédaction d’un recours gracieux personnalisé, entièrement adapté à votre situation afin de maximiser vos chances d’obtenir une révision favorable de la décision.
        </p>

        <FormDem UserData={UserExisting}/>




        
      </section>
    </div>
  </>);
}