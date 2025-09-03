import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import '../Css/Pricing.css'
import { Link } from 'react-router-dom';
import FormTcf from '../Components/FormTcf';

export default function Pricing() {

 const [openIndex, setOpenIndex] = useState(null);


  const faqs = [
    {
      question: "Est-ce que je peux changer la date de mon rendez-vous TCF une fois que je l'ai pris ?",
      answer: "Non, il n'est pas possible de changer la date de votre rendez-vous TCF une fois que vous l'avez réservé. Le système de réservation est conçu pour attribuer des créneaux spécifiques, et les modifications ne sont pas autorisées. Nous vous recommandons de bien vérifier votre disponibilité avant de finaliser votre réservation."
    },
    {
      question: "Quels sont les papiers que je dois ramener avec moi le jour du test ?",
      answer: `Le jour de votre test TCF, vous devez apporter :
<li> La confirmation de rendez-vous que VFS vous envoie par email</li>
<li> Votre carte d'identité nationale</li>
<b style="color: red">Note importante :</b> Le passeport n'est pas accepté comme pièce d'identité pour le test TCF en Algérie. Vous devez présenter votre carte d'identité nationale.`
    },
    {
      question: "Quelle est la durée que je dois respecter pour prendre un autre rendez-vous TCF ?",
      answer: "Vous devez respecter un délai de 30 jours entre deux inscriptions au TCF. Cette règle s'applique quel que soit le pays où vous passez le test. Si vous avez déjà passé le TCF récemment, vous devrez attendre un mois avant de pouvoir vous réinscrire."
    }
    ,
    {
      question: "J'ai commencé à prendre un rendez-vous TCF mais je n'ai pas effectué le paiement. Que faire ?",
      answer: `Si vous avez commencé le processus de réservation mais n'avez pas finalisé le paiement, le système considère que vous avez déjà un rendez-vous en attente de confirmation. Dans ce cas, le message "Vous avez déjà pris un rendez-vous" apparaîtra si vous essayez de recommencer la procédure.

<br />La solution est d'attendre 3 jours ouvrables pour que la réservation non confirmée soit automatiquement annulée par le système. Après ce délai, vous pourrez à nouveau accéder à la procédure de réservation.`
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };


const selectedType = localStorage.getItem("tcfType");





  return (
  
  <>

    <Navbar current_page={"date"}/>
      <section id="first_sec_pricing">
        <div id="invite-to-shop-pricing">
          <h1 id='title_boutique_invite_pricing'>Préparez-vous à l'examen TCF grâce à nos livres numériques disponibles dans notre boutique.</h1>
          <p id='para_boutique_invite_pricing'>Préparez-vous à l'examen TCF grâce à différents livres numériques dans notre <a href="">boutique numérique</a>.</p>
        </div>

              </section>



        <div id="sec_one_prime_pricing">
          <h1 id='title_sec_pricing'>Planifier votre <span className='owner-color-aura2'> rendez-vous </span> </h1>

          <div className="tringel_pricing"></div>

          <div id='procudur-pricing'>
            <p id="etap1">
              
              Pour réserver votre<span className="colored-red"><strong> rendez-vous TCF</strong></span> , il vous suffit de remplir le formulaire ci-dessous. Vous recevrez ensuite un e-mail de confirmation avec les instructions pour effectuer votre paiement. Une fois ce paiement validé, vous recevrez votre bon de paiement ainsi que toutes les informations nécessaires à votre rendez-vous.</p>

          </div>

          <div id="separator_pay_form_pricing">


    {
  selectedType === "so" ? (
    <div id="first_form_pricing">

      <div className="icon_continer_pricing">
        <i className="fa-solid fa-file-lines"></i>
        SO
      </div>
      
      <h2 className='title_method_side_pricing'>
        <span className="colored-price">Important – Paiement du test TCF</span>
        Afin de réserver un rendez-vous de TCF sur le site de VFS Global, 
        le paiement doit être effectué exclusivement avec une carte magnétique.
        Vous êtes donc obligé(e) de verser le montant du test ainsi que le coût 
        de la prestation avant la réservation du rendez-vous.
      </h2>
      <p className="text_method_side_pricing">
        Tarifs de réservation Avec 
        <span className="owner-color-aura2"> Nazya Services</span>
      </p>
      <ul className="tarifs-pricing">
        <li className="tarif-pricing">
          <span><i className="fa-regular fa-circle-right icon-list-style"></i>Service: </span>
          <span className="colored-price">1 000DA</span>
        </li>
        <li className="tarif-pricing">
          <i className="fa-regular fa-circle-right icon-list-style"></i>
          TCF SO <span className="colored-states"> (Oran, Annaba, Tlemcen, Constantine) </span>: 
          <span className="colored-price">12 400 DA</span>
        </li>
        <li className="tarif-pricing">
          <span><i className="fa-regular fa-circle-right icon-list-style"></i>TCF SO 
          <span className="colored-states"> (Alger) </span>:</span>
          <span className="colored-price">13 600 DA</span>
        </li>
      </ul>
      {/* <p className="text_method_side_pricing">
        Après avoir rempli le formulaire, un email vous sera envoyé 
        avec votre numéro personnel pour confirmer la transaction.
      </p> */}
    </div>
  ) : (
    <div id="second_pay_pricing">
      <div className="icon_continer_pricing">
        <i className="fa-solid fa-file-lines"></i>
        DAP
      </div>
      <h2 className='title_method_side_pricing'>
        <span className="colored-price">Important – Paiement du test TCF</span>
        Afin de réserver un rendez-vous de TCF sur le site de VFS Global, 
        le paiement doit être effectué exclusivement avec une carte magnétique.
        Vous êtes donc obligé(e) de verser le montant du test ainsi que le coût 
        de la prestation avant la réservation du rendez-vous.
      </h2>
      <p className="text_method_side_pricing">
        Tarifs de réservation Avec 
        <span className="owner-color-aura2"> Nazya Services</span>
      </p>
      <ul className="tarifs-pricing">
        <li className="tarif-pricing">
          <span><i className="fa-regular fa-circle-right icon-list-style"></i>Service: </span>
          <span className="colored-price">1 000 DA</span>
        </li>
        <li className="tarif-pricing">
          <i className="fa-regular fa-circle-right icon-list-style"></i>
          TCF Dap <span className="colored-states"> (Oran, Annaba, Tlemcen, Constantine) </span>: 
          <span className="colored-price">19 000 DA</span>
        </li>
        <li className="tarif-pricing">
          <span><i className="fa-regular fa-circle-right icon-list-style"></i>
          TCF Dap <span className="colored-states"> (Alger) </span>:</span>
          <span className="colored-price">22 000 DA</span>
        </li>
      </ul>
      {/* <p className="text_method_side_pricing">
        Après avoir rempli le formulaire, un email vous sera envoyé 
        avec votre numéro personnel pour confirmer la transaction.
      </p> */}
    </div>
  )
}


            </div>
          </div>

        
            <FormTcf />

        


      <h1 id='title_faq_pricing'>Questions clés résolues</h1>

        <div id="faq_ques" className="faq-container">
  {faqs.map((faq, index) => (
    <div
      key={index}
      className={`faq-item ${openIndex === index ? "open" : ""}`}
    >
      <div
        className="faq-question"
        onClick={() => toggleFAQ(index)}
      >
        {faq.question}
        <span className={`faq-icon ${openIndex === index ? "open" : ""}`}>
          +
        </span>
      </div>

      <div
        className={`faq-answer ${openIndex === index ? "open" : ""}`}
        dangerouslySetInnerHTML={{ __html: faq.answer }}
      ></div>
    </div>
  ))}
</div>


    <Footer />

    </>
  )
}
