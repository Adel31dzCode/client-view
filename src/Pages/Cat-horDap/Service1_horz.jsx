import React from 'react';
import "../../Css/Services/Services.css";
import Navbar from '../../Components/Navbar';
import list_style from "../../Img/finger.png";
import FormRec from '../../Components/Forms/FormRec';
import FormExp from '../../Components/Forms/FormExp';
import FormCv from '../../Components/Forms/FormCv';

export default function Service1_horz({ UserExisting, LoadingState }) {
  return (<>

    <Navbar UserData={UserExisting} LoadingState={LoadingState} Activity={true} logo_anim_st={true}/>

 <div id="page-service">
      <aside id='aside'>
        <ul>
          <li><a href="#serice1-title">Rédaction d'un CV professionnel</a></li>
          <li><a href="#serice2-title">Rédaction d'une lettre explicative</a></li>
          <li><a href="#serice3-title">Optimisation des lettres de recommandation</a></li>
          <li><a href="#serice4-title">Pannier de formation</a></li>
        </ul>
      </aside>
      
      <section id='section-content'>
        <h1>Constitution de dossier</h1>
        
        <p className="intro-text-service">Nos services de constitution de dossier vous accompagnent dans la préparation de votre candidature pour maximiser vos chances d'admission dans les universités de votre choix.</p>
        
        <div id="separator-service">
          <span className="separator-span1"></span>
          <span className="separator-span2"></span>
        </div>
        
        <h2 className="title-service underline" id='service0-title'>NOS SERVICES :</h2>
        
        <h2 className="title-service" id='serice1-title'>
          <img src={list_style} alt="list-style" /> 1- Rédaction d'un CV professionnel
        </h2>
        <p className='para-content-service'>
          Un CV adapté à votre candidature, qui résume correctement votre parcours, met en avant les <strong>points forts de votre dossier et valorise les compétences recherchées par les universités</strong> choisies, en cohérence avec votre projet d'études.
        </p>
        <p className='para-content-service'>
          <strong>Frais : 500 DA</strong>
        </p>

        <FormCv UserData={UserExisting}/>
        
        <h2 className="title-service" id='serice2-title'>
          <img src={list_style} alt="list-style" /> 2- Rédaction d'une lettre explicative
        </h2>
        <p className='para-content-service'>
          Votre parcours comporte une particularité qui mérite d'être justifiée ?
        </p>
        
        <ul className="service-list">
          <li>Une moyenne très faible (même entre 0 et 5) ou une année abandonnée</li>
          <li>Un redoublement dû à des problèmes médicaux</li>
          <li>Une année sans études ni emploi</li>
          <li>Une expérience professionnelle déclarée dans un autre domaine que vos études</li>
          <li>Un écart de plusieurs années entre l'obtention du bac et la reprise de votre formation</li>
          <li>Des raisons médicales, psychologiques ou personnelles ayant impacté votre parcours</li>
          <li>Un changement d'orientation après une première voie qui ne correspondait pas à vos ambitions</li>
          <li>Une maternité ayant entraîné une pause dans vos études</li>
          <li>autres....</li>
        </ul>
        
        <p className='para-content-service'>
          Nous rédigeons pour vous une <strong>lettre explicative, claire et persuasive, dotée d'une argumentation solide et d'une excellente qualité rédactionnelle.</strong>
        </p>
        <p className='para-content-service'>
          <strong>Frais : 600 DA</strong>
        </p>

        <FormExp UserData={UserExisting}/>
        
        <h2 className="title-service" id='serice3-title'>
          <img src={list_style} alt="list-style" /> 3- Optimisation des lettres de recommandation
        </h2>
        <p className="para-content-service">
          Si vos professeurs vous ont fourni des lettres simples, nous les retravaillons pour les renforcer et mettre en valeur vos <strong>atouts académiques et personnels.</strong>
        </p>
        
        <p className='para-content-service'>
          <strong>Frais :</strong>
        </p>
        
        <ul className="service-list">
          <li><strong>600 DA</strong> pour une seule lettre</li>
          <li><strong>800 DA</strong> pour 2 lettres</li>
          <li><strong>1 000 DA</strong> pour 3 lettres ou plus</li>
        </ul>

        <FormRec UserData={UserExisting}/>
        
        <h2 className="title-service" id='serice4-title'>
          <img src={list_style} alt="list-style" /> 4- Pannier de formation
        </h2>
        
        <h3 className="subtitle-service">Étude personnalisée & choix du domaine</h3>
        
        <p className='para-content-service'>
          Bénéficiez d'un accompagnement ciblé pour optimiser vos chances d'admission. Nous analysons votre dossier en détail afin d'identifier vos points forts et vos axes d'amélioration, puis nous vous expliquons clairement votre situation avec des conseils pratiques et adaptés.
        </p>
        
        <p className='para-content-service'>
          En parallèle, nous vous présentons l'ensemble des domaines disponibles, classés par catégorie, pour vous offrir une vision claire de vos possibilités. À l'issue de cette analyse, nous mettons en avant :
        </p>
        
        <ul className="service-list">
          <li>Les <strong>domaines les plus accessibles</strong> pour vous</li>
          <li>Ceux où vous avez <strong>le plus de chances d'être admis</strong></li>
        </ul>
        
        <p className='para-content-service'>
          <strong>Frais du service : 1 500 DA</strong>
        </p>
        
        
      </section>
    </div>

    </>
  )
}