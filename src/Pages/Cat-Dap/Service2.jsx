import React from 'react';
import "../../Css/Services/Services.css";
import Navbar from '../../Components/Navbar';
import list_style from "../../Img/finger.png";
import FormPer from '../../Components/Forms/FormPer';
import FormSel from '../../Components/Forms/FormSel';
import FormRed from '../../Components/Forms/FormRed';

export default function Service2({ UserExisting }) {
  return (<>
    <Navbar Activity={true} logo_anim_st={true} UserData={UserExisting}/>

    <div id="page-service">
      <aside id='aside'>
        <ul>
          <li><a href="#service1-title">Étude personnalisée & choix du domaine</a></li>
          <li><a href="#service2-title">Service d'Aide à la Sélection</a></li>
          <li><a href="#service3-title">Service de Rédaction</a></li>
        </ul>
      </aside>
      
      <section id='section-content'>
        <h1>Services d'Étude Personnalisée et de Choix de Formation</h1>
        
        <p className="intro-text-service">
          Découvrez nos services spécialisés pour vous aider à choisir la meilleure formation 
          et université selon votre profil académique et vos aspirations professionnelles.
        </p>
        
        <div id="separator-service">
          <span className="separator-span1"></span>
          <span className="separator-span2"></span>
        </div>
        
        <h2 className="title-service underline" id='service0-title'>NOS SERVICES :</h2>
        
        <h2 className="title-service" id='service1-title'>
          <img src={list_style} alt="list-style" /> Étude personnalisée & choix du domaine
        </h2>
        
        <p className='para-content-service'>
          Bénéficiez d'un accompagnement ciblé pour optimiser vos chances d'admission. 
          Nous analysons votre dossier en détail afin d'identifier vos <strong>points forts</strong> 
          et vos <strong>axes d'amélioration</strong>, puis nous vous expliquons clairement 
          votre situation avec des <strong>conseils pratiques et adaptés</strong>.
        </p>
        
        <p className='para-content-service'>
          En parallèle, nous vous présentons l'ensemble des <strong>domaines disponibles</strong>, 
          classés par catégorie, pour vous offrir une vision claire de vos possibilités. 
          À l'issue de cette analyse, nous mettons en avant :
        </p>
        
        <ul className="service-list">
          <li>Les <strong>domaines les plus accessibles</strong> pour vous ;</li>
          <li>Ceux où vous avez le <strong>plus de chances d'être admis</strong>.</li>
        </ul>
        
        <p className='para-content-service price-p'>
          <strong>Frais de service : 1 500 DA</strong>
        </p>
        
        <FormPer UserData={UserExisting}/>
        
        <h2 className="title-service" id='service2-title'>
          <img src={list_style} alt="list-style" /> Service d'Aide à la Sélection de Formation et d'Université
        </h2>
        
        <p className='para-content-service'>
          Nous vous proposons un accompagnement personnalisé pour choisir la formation 
          et l'université idéales selon votre profil.
        </p>
        
        <p className='para-content-service'>
          <strong>Deux options adaptées à vos besoins :</strong>
        </p>
        
        <ol className="service-list" style={{listStyleType: 'decimal', paddingLeft: '2rem'}}>
          <li>
            <strong>Pour un domaine spécifique (3 000 DA)</strong><br/>
            Si vous savez déjà quel domaine étudier (exemple : médecine, informatique, droit), 
            nous concentrons nos recherches sur les formations et universités correspondantes. 
            Nous identifions celles où vos chances d'admission sont les plus élevées, en analysant 
            la sélectivité, le nombre de places, et les débouchés.
          </li>
          <li>
            <strong>Pour une orientation complète (4 000 DA)</strong><br/>
            Si vous hésitez sur le domaine, nous élargissons notre analyse pour vous proposer 
            plusieurs filières adaptées à votre profil, puis nous sélectionnons les meilleures 
            formations et universités pour chaque option.
          </li>
        </ol>
        
        <p className='para-content-service'>
          <strong>Vous recevrez :</strong>
        </p>
        
        <ul className="service-list">
          <li>Un comparatif détaillé des formations et universités recommandées</li>
          <li>Le taux d'admission, le nombre de places et les débouchés pour chaque choix</li>
          <li>Une liste stratégique classée par vos chances de réussite</li>
          <li>Un choix final d'université et de formation adapté à votre profil.</li>
        </ul>
        
        <FormSel UserData={UserExisting}/>
        
        <h2 className="title-service" id='service3-title'>
          <img src={list_style} alt="list-style" /> Service de Rédaction de Lettres de Motivation et de Définition de Projet Professionnel
        </h2>
        
        <p className='para-content-service'>
          Nous vous aidons à transformer votre projet professionnel en une histoire convaincante 
          qui captivera les jurys d'admission. Notre service combine la définition précise de 
          votre projet avec la rédaction de lettres de motivation percutantes.
        </p>
        
        <p className='para-content-service'>
          Nous commençons par élaborer avec vous un projet professionnel solide et cohérent, 
          qui s'aligne parfaitement sur votre parcours académique et vos aspirations. Ce projet 
          devient ensuite le fondement stratégique de vos lettres de motivation, où nous mettons 
          en valeur vos atouts de manière persuasive et personnalisée pour chaque formation.
        </p>
        
        <p className='para-content-service'>
          Chaque lettre est rédigée sur-mesure après une analyse approfondie des attentes de 
          la formation et de votre dossier. Vous bénéficiez d'un accompagnement complet qui 
          garantit la cohérence et l'impact de votre dossier de candidature.
        </p>
        
        <p className='para-content-service'>
          <strong>Options disponibles :</strong>
        </p>
        
        <ul className="service-list">
          <li>1 lettre adaptable pour 3 universités (2 000 DA)</li>
          <li>2 lettres personnalisées (3 000 DA)</li>
          <li>3 lettres personnalisées (3 500 DA)</li>
        </ul>
        
        <FormRed UserData={UserExisting}/>
        
      </section>
    </div>
  </>);
}