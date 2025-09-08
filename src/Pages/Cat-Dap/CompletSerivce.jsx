import React from 'react';
import "../../Css/Services/Services.css";
import Navbar from '../../Components/Navbar';
import list_style from "../../Img/finger.png";

export default function CompletSerivce({ UserExisting }) {
  return (<>

    <Navbar Activity={true} logo_anim_st={true} UserData={UserExisting}/>

 <div id="page-service">
      <aside id='aside'>
        <ul>
          <li><a href="#serice1-title">Étude Personnalisée de Votre Dossier</a></li>
          <li><a href="#serice2-title">Choix de Domaine</a></li>
          <li><a href="#serice3-title">Constitution de dossier</a></li>
          <li><a href="#serice4-title">Panier de Formation</a></li>
          <li><a href="#serice5-title">Préparation à l'entretien</a></li>
          <li><a href="#serice6-title">Recours gracieux</a></li>
        </ul>
      </aside>
      
      <section id='section-content'>
        <h1>Procédure DAP (Demande d'Admission Préalable)</h1>
        
        <p className="intro-text-service">Cette procédure s'adresse aux candidats souhaitant intégrer une première année de licence, qu'ils soient actuellement en classe de terminale (baccalauréat en cours) ou déjà inscrits dans l'enseignement supérieur (de la L1 à la L3 en cours).</p>
        
        <div id="separator-service">
          <span className="separator-span1"></span>
          <span className="separator-span2"></span>
        </div>
        
        <h2 className="title-service underline" id='service0-title'>NOS SERVICES :</h2>
        
        <h2 className="title-service" id='serice1-title'>
          <img src={list_style} alt="list-style" /> 1- Étude Personnalisée de Votre Dossier
        </h2>
        <p className='para-content-service'>
          <strong>Nous procédons à une analyse détaillée de votre dossier</strong> afin d'identifier vos <strong>points forts</strong> et vos <strong>axes d'amélioration</strong> ; à l'issue de ce diagnostic, nous vous expliquons clairement <strong>votre situation</strong> et vous donnons des <strong>conseils pratiques</strong> pour maximiser vos chances d'admission et <strong>valoriser pleinement votre profil</strong>.
        </p>
        
        <h2 className="title-service" id='serice2-title'>
          <img src={list_style} alt="list-style" /> 2- Choix du domaine
        </h2>
        <p className='para-content-service'>
          Nous vous présentons l'ensemble des <strong>domaines disponibles</strong>, classés par catégorie, afin de vous offrir une vision claire de vos possibilités. Après analyse de votre candidature, nous mettons en avant les <strong>domaines les plus accessibles</strong> pour vous ainsi que ceux où vous avez <strong>le plus de chances d'être admis</strong>.
        </p>
        
        <h2 className="title-service" id='serice3-title'>
          <img src={list_style} alt="list-style" /> 3- Constitution de dossier :
        </h2>
        <p className="para-content-service">
          Nous vous assistons dans la création de votre <strong>compte Pastel</strong> et dans le remplissage minutieux de votre dossier, afin de garantir une saisie précise et sans erreur.
        </p>
        
        <ul className="service-list">
          <li>
            <strong className='title-colored-service'>Rédaction d'un CV professionnel :</strong> un CV adapté à votre candidature, qui résume correctement votre parcours, met en avant les <strong>points forts</strong> de votre dossier et valorise les <strong>compétences recherchées</strong> par les universités choisies, en cohérence avec votre projet d'études.
          </li>
          <li>
            <strong className='title-colored-service'>Rédaction d'une lettre explicative :</strong> si votre dossier le nécessite, nous préparons une lettre claire et persuasive, dotée d'une <strong>argumentation solide</strong> et d'une excellente <strong>qualité rédactionnelle</strong>.
          </li>
          <li>
            <strong className='title-colored-service'>Optimisation des lettres de recommandation :</strong> si vos professeurs vous ont fourni des lettres simples, nous les retravaillons pour les renforcer et mettre en valeur vos <strong>atouts académiques et personnels</strong>.
          </li>
        </ul>
        
        <h2 className="title-service" id='serice4-title'>
          <img src={list_style} alt="list-style" /> Panier de formation :
        </h2>
        <p className='para-content-service'>
          Nous gérons votre <strong>panier de formation de A à Z</strong>, en toute transparence. À chaque étape, nous discutons avec vous et vous expliquons clairement toutes les options possibles.
        </p>
        
        <p className='para-content-service'>
          <span className='color-main-services'>Choix de formation (projet d'étude) :</span> Nous analysons en détail toutes les formations disponibles pour vous. Après avoir étudié leur contenu et effectué des recherches approfondies (sites des universités, plateformes spécialisées), nous vous proposons :
        </p>
        
        <ul className="service-list">
          <li>Un <strong>résumé clair</strong> du contenu de chaque formation et de ses débouchés.</li>
          <li>Des <strong>recommandations personnalisées</strong> sur les formations les moins sélectives, où vous avez le plus de chances d'être accepté.</li>
          <li>Des <strong>données précises</strong> : nombre de places disponibles et taux d'acceptation pour chaque formation.</li>
        </ul>
        
        <p className='para-content-service'>
          <span className='color-main-services'>Choix des universités :</span> En fonction de votre situation (<strong>budget</strong>, <strong>parcours académique</strong>, <strong>projet réel</strong>), nous vous guidons vers :
        </p>
        
        <ul className="service-list">
          <li>Les universités <strong>les plus adaptées</strong> à votre profil.</li>
          <li>Les établissements <strong>les moins sélectifs</strong>, où vos chances d'admission sont maximales.</li>
        </ul>
        
        <p className='para-content-service'>
          <span className='color-main-services'>Choix du projet professionnel :</span> Nous définissons avec vous un projet professionnel qui :
        </p>
        
        <ul className="service-list">
          <li><strong>S'aligne parfaitement</strong> avec votre parcours académique.</li>
          <li><strong>Valorise vos compétences et aspirations</strong>.</li>
          <li><strong>Correspond aux débouchés réels</strong> des formations visées.</li>
          <li>Met en cohérence votre <strong>dossier</strong> et vos <strong>ambitions</strong>.</li>
        </ul>
        
        <p className='para-content-service'>
          <span className='color-main-services'>Rédaction des lettres de motivation :</span> Nous rédigeons pour vous <strong>trois lettres de motivation entièrement personnalisées</strong> afin de maximiser l'impact de votre candidature, adaptées à chaque université et formation.
        </p>
        
        <p className='para-content-service'><strong>Notre approche :</strong></p>
        
        <ul className="service-list">
          <li>Analyse approfondie des <strong>attentes de la formation</strong> et des points clés recherchés par les responsables pédagogiques.</li>
          <li>Mise en valeur stratégique des <strong>atouts de votre dossier</strong>.</li>
          <li>Argumentation persuasive et <strong>structure claire</strong> pour capter l'attention des examinateurs.</li>
        </ul>
        
        <p className='para-content-service'>
          Enfin, une fois votre dossier finalisé, nous l'examinons avec vous en détail. <strong>Vous gardez le contrôle total</strong> : c'est vous qui validez chaque élément avant toute soumission.
        </p>
        
        <h2 className="title-service" id='serice5-title'>
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
        
        <h2 className="title-service" id='serice6-title'>
          <img src={list_style} alt="list-style" /> Recours gracieux
        </h2>
        
        <p className='para-content-service'>
          En cas de refus de votre candidature par une université, nous prenons en charge la <strong>rédaction d'un recours gracieux personnalisé</strong>, entièrement adapté à votre situation afin de maximiser vos chances d'obtenir une révision favorable de la décision.
        </p>
          <p className='para-content-service' id='marger-forbtn-service'>
            <strong>Tarif de service : <span className='colored-price'>10 000 DA</span></strong>
          </p>

        <div id="btn-continer-service-join">
          <button id='join-service'>Bénéficier de ce service</button>
        </div>
      </section>
    </div>


    </>
  )
}
