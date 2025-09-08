import React, { useState } from 'react';
import "../../Css/Services/Services.css";
import "../../Css/Services/Service2.css";
import Navbar from '../../Components/Navbar';
import FormFor from '../../Components/Forms/FormFor';
import FormMot from '../../Components/Forms/FormMot';

export default function Service2_horz({ UserExisting, LoadingState }) {
  return (
    <>
      <Navbar UserData={UserExisting} LoadingState={LoadingState} Activity={true} logo_anim_st={true} />
      
      <div id="page-service">
        <aside id='aside'>
          <ul>
            <li><a href="#service-selection">Sélection Formation & Université</a></li>
            <li><a href="#service-motivation">Lettres de Motivation</a></li>
          </ul>
        </aside>
        
        <section id='section-content'>
          <h1>Services d'Orientation Universitaire (Horz Dap)</h1>
          
          <p className="intro-text-service">
            Nos services d'orientation vous aident à choisir la formation idéale et à rédiger des lettres de motivation percutantes pour maximiser vos chances d'admission.
          </p>
          
          <div id="separator-service">
            <span className="separator-span1"></span>
            <span className="separator-span2"></span>
          </div>
          
          <FormFor UserData={UserExisting} />


          <h1 id='title_must_reduce'>Service de Rédaction de Lettres de Motivation et de Définition de Projet Professionnel</h1>
          <p class="para-content-service">
              Nous vous aidons à transformer votre projet professionnel en une histoire convaincante qui captivera les jurys d'admission. Notre service combine la définition précise de votre projet avec la rédaction de lettres de motivation percutantes.
          </p>
          <p class="para-content-service">
            Nous commençons par élaborer avec vous un projet professionnel solide et cohérent, qui s'aligne parfaitement sur votre parcours académique et vos aspirations. Ce projet devient ensuite le fondement stratégique de vos lettres de motivation, où nous mettons en valeur vos atouts de manière persuasive et personnalisée pour chaque formation.          
          </p>
          <p class="para-content-service">
              Chaque lettre est rédigée sur-mesure après une analyse approfondie des attentes de la formation et de votre dossier. Vous bénéficiez d'un accompagnement complet qui garantit la cohérence et l'impact de votre dossier de candidature.
          </p>



          <FormMot UserData={UserExisting} />
        </section>
      </div>
    </>
  );
}


