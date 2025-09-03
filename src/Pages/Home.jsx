import React, { useState } from 'react';
import '../Css/Home.css';
import Navbar from '../Components/Navbar';
import welcome_logo from '../Img/welcome-logo.png';
import scrolldown from '../Img/sc1.gif';
import ImgPer from '../Img/f.png';
import Footer from '../Components/Footer';
import Select from 'react-select'; // أضف هذا في أعلى الملف
import { useNavigation } from 'react-router-dom';

export default function Home() {

  const [TcfChoice, setTcfChoice] = useState(null); // الخيار الأول
  const [ServiceChoosenState, SetServiceChoosen] = useState(false); // الخيار الثاني
  const [VisaOptionChoosen, SetVisaOptionChoosen] = useState(false);





 const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Quels types de services proposez-vous ?",
      answer: "Nous sommes spécialisés dans la prestation de services, l’accompagnement personnalisé et la vente d’articles numériques. Nous offrons des solutions sur mesure afin de répondre aux besoins variés de nos clients et de les aider à réussir leurs projets d’études à l’étranger."
    },
    {
      question: "De quelle manière accompagnez-vous les candidats au TCF ?",
      answer: `nous proposons un service de prise de rendez-vous pour le TCF, afin de vous simplifier toutes les démarches administratives. D’autre part, nous mettons à votre disposition des articles numériques de préparation au TCF, conçus pour vous aider à réviser efficacement et à comprendre le format du test. Découvrez notre sélection d'articles de préparation spécialement conçus pour le TCF dans notre boutique en ligne <p><a href="">👉 Accéder à notre boutique</a></p>`
    },
    {
      question: "Quelle est votre politique de retour ?",
      answer: "Nous offrons une politique de retour de 30 jours pour tous les produits. Les articles doivent être dans leur état d'origine, ne pas avoir été utilisés et être accompagnés du reçu ou de la preuve d'achat. Les remboursements sont effectués dans les 5 à 7 jours ouvrables suivant la réception de l'article retourné."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const visaOptions = [
    { value: 'visa_demande', label: 'Demander Visa' },
  ];

  const ServiceChoosen = [
    { value: 'DAP', label: 'TCF DAP' },
    { value: 'SO', label: 'TCF SO' },
  ];

  const tcfOptions = [
    { value: 'payment', label: 'Prendre rendez-vous avec Nazya Services' },
    { value: 'Boutique', label: 'Préparer au test TCF avec Nazya Services' }
  ];



    const type_ladmission = [
    { value: 'connecte', label: "établissement connecté à l'espace campus France " },
    { value: 'no_connect', label: "établissement non connecté à l'espace campus France" },
  ];


const [admissionChoice, setAdmissionChoice] = useState(null);
const [subAdmissionChoice, setSubAdmissionChoice] = useState(null);

// خيارات المستوى الثاني (مقسمة A / B)
const optionsForA = [
  { value: 'a1', label: 'procédure Dap blanche (L1)' },
  { value: 'a2', label: 'procédure hors Dap' },
];

const optionsForB = [
  { value: 'b1', label: 'universités de Paris Saclay' },
  { value: 'b2', label: 'procédure parcoursup' },
];



  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'white',
      borderRadius: '6px',
      border: '1px solid #ccc',
      padding: '5px',
      fontSize: '16px',
      fontFamily: "var(--second-font)",
      width: '100%',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#e6f0fa' : 'white',
      color: 'black',
      padding: '12px',
      fontSize: '16px',
      cursor: "pointer",
      fontFamily: "var(--second-font)",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#999',
      fontSize: '16px'
    })
  };

  let buttonText = "Prendre rendez-vous";
  let buttonLink = "/round";
  let isDisabled = false;

  if (TcfChoice?.value === "payment") {
    isDisabled = !ServiceChoosenState;
    buttonText = "Prendre rendez-vous";
    buttonLink = "/round";
  } else if (TcfChoice?.value === "Boutique") {
    isDisabled = false;
    buttonText = "Aller à la boutique";
    buttonLink = "/boutique";
  } else {
    isDisabled = true;
  }

  return (
    <>
  
    <Navbar  current_page={"home"}/>


  <section id="first_sec">
    <div id="filter_bg" />
    <div id="exposer_sec_one">
      <div className="ep_one_sec">
        <h1>Votre partenaire pour réussir vos  <span className="owner-color-aura">études en France!</span></h1>
        <p id="title_sec_one">
          Découvrez nos services personnalisés pour réussir votre projet
          d’études en France .
        </p>
        <div className="container">
          <a href="#" className="button type--C">
            <div className="button__line" />
            <div className="button__line" />
            <span className="button__text">Contactez-nous dès aujourd’hui</span>
            <div className="button__drow1" />
            <div className="button__drow2" />
          </a>
        </div>
      </div>
      <div className="ep_two_sec">
        <img
          src={welcome_logo}
          alt="img of welcome"
          id="img_welcome"
        />
      </div>
    </div>

    <a href="#bg_sec_two"><img src={scrolldown} id='scroll_gif' alt="Scroll Down" /></a>
  </section>

    <section id="second_sec">


<svg id="bg_sec_two" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <rect width="100%" height="100%" fill="#2c3b4e" />

  <defs>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#b7a8e6bd" strokeWidth="1" />
    </pattern>

    <linearGradient id="fadeGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="white" stopOpacity="0" />
      <stop offset="100%" stopColor="white" stopOpacity="1" />
    </linearGradient>

    <mask id="fadeMask">
      <rect width="100%" height="100%" fill="url(#fadeGradient)" />
    </mask>
  </defs>

  <rect width="100%" height="100%" fill="url(#grid)" mask="url(#fadeMask)" />

  <g stroke="#e0d4ff" strokeWidth="2" opacity="0.4">

    <line x1="0" y1="48" x2="48" y2="48">
      <animate attributeName="x1" values="0;100%;0" dur="8s" repeatCount="indefinite" />
      <animate attributeName="x2" values="48;100%;48" dur="8s" repeatCount="indefinite" />
    </line>

    <line x1="0" y1="192" x2="48" y2="192">
      <animate attributeName="x1" values="0;100%;0" dur="12s" repeatCount="indefinite" />
      <animate attributeName="x2" values="48;100%;48" dur="12s" repeatCount="indefinite" />
    </line>

    <line x1="0" y1="320" x2="48" y2="320">
      <animate attributeName="x1" values="0;100%;0" dur="15s" repeatCount="indefinite" />
      <animate attributeName="x2" values="48;100%;48" dur="15s" repeatCount="indefinite" />
    </line>

    <line x1="0" y1="420" x2="48" y2="420">
      <animate attributeName="x1" values="0;100%;0" dur="20s" repeatCount="indefinite" />
      <animate attributeName="x2" values="48;100%;48" dur="20s" repeatCount="indefinite" />
    </line>

    <line x1="96" y1="0" x2="96" y2="48">
      <animate attributeName="y1" values="0;100%;0" dur="10s" repeatCount="indefinite" />
      <animate attributeName="y2" values="48;100%;48" dur="10s" repeatCount="indefinite" />
    </line>

    <line x1="240" y1="0" x2="240" y2="48">
      <animate attributeName="y1" values="0;100%;0" dur="14s" repeatCount="indefinite" />
      <animate attributeName="y2" values="48;100%;48" dur="14s" repeatCount="indefinite" />
    </line>

    <line x1="360" y1="0" x2="360" y2="48">
      <animate attributeName="y1" values="0;100%;0" dur="18s" repeatCount="indefinite" />
      <animate attributeName="y2" values="48;100%;48" dur="18s" repeatCount="indefinite" />
    </line>

    <line x1="480" y1="0" x2="480" y2="48">
      <animate attributeName="y1" values="0;100%;0" dur="22s" repeatCount="indefinite" />
      <animate attributeName="y2" values="48;100%;48" dur="22s" repeatCount="indefinite" />
    </line>

  </g>
</svg>


<div id='content_saver_sec_two'>
  <h1>Découvrez les 3 étapes incontournables pour obtenir votre <span className="owner-color-aura">visa étudiant</span>  en toute sérénité</h1>
    <div id="card_organaser_sec_two">


      <div id="progress_line_etaps">
        <span className="one_progressive">1</span>
        <span className="two_progressive">2</span>
        <span className="three_progressive">3</span>
      </div>


      <div id='flexer_organaser_sec_two'>



        <div className="card_sec_two">
          <div className="card_icon_sec_two">
            <div className='icon_circle'>
              <i className="fa-solid fa-certificate"></i>
            </div>
            <h2>TCF</h2>
          </div>
          <div className="card_text_sec_two">

            <p>Souhaitez-vous prendre rendez-vous ou vous préparer au TCF ?</p>
            <div className="custom-select-wrapper">
              <Select
                name="Date-or-Prepare"
                options={tcfOptions}
                placeholder="Sélectionnez l’option souhaitée"
                styles={customSelectStyles}
                onChange={(option) => {
                  setTcfChoice(option);
                  SetServiceChoosen(false); // نرجعه false كل مرة يغير الاختيار
                }}
              />
            </div>

            <p>Type de TCF souhaité</p>
            <div className="custom-select-wrapper">
              <Select
                name="TCF-Type"
                id='select_tcf_type'
                options={ServiceChoosen}
                placeholder="Choisir le TCF Type ..."
                styles={customSelectStyles}
                onChange={(option) => {
                  SetServiceChoosen(true);
                  // 🟢 تخزين في localStorage حسب الاختيار
                  if (option.value === "DAP") {
                    localStorage.setItem("tcfType", "dap");
                  } else if (option.value === "SO") {
                    localStorage.setItem("tcfType", "so");
                  }
                }}
                isDisabled={TcfChoice?.value !== "payment"} // مقفل إلا إذا اختار Rendez-vous
              />
            </div>

            <button
              disabled={isDisabled}
              id="take-date-tcf"
              onClick={() => {
                if (!isDisabled) {
                  const selectedType = localStorage.getItem("tcfType"); 
                  console.log("✅ TCF choisi:", selectedType); // للتحقق فقط
                  window.location.href = buttonLink;
                }
              }}
            >
              {buttonText}
            </button>

            
          </div>
        </div>



        <div className="card_sec_two">
  <div className="card_icon_sec_two">
    <div className="icon_circle">
      <i className="fa-solid fa-clipboard-check"></i>
    </div>
    <h2>L’admission</h2>
  </div>

  <div className="card_text_sec_two">
    <p>Sélectionnez votre type d’établissemen :</p>

    {/* الحقل الأول */}
    <Select
      name="L'admission"
      options={type_ladmission}
      placeholder="Choisissez d'établissement type :"
      styles={customSelectStyles}
      onChange={(option) => {
        setAdmissionChoice(option.value); // A أو B
        setSubAdmissionChoice(null); // نفرغ الثاني لما يغير الأول
      }}
    />

        <p>Sélectionnez l’établissement:</p>


    {/* الحقل الثاني */}

    <Select
      id="only_select_pad"
      name="Sub-admission"
      options={
        admissionChoice === "connecte"
          ? optionsForA
          : admissionChoice === "no_connect"
          ? optionsForB
          : []
      }
      placeholder="Choisissez d'établissement :"
      styles={customSelectStyles}
      value={subAdmissionChoice}
      onChange={(option) => setSubAdmissionChoice(option)}
      isDisabled={!admissionChoice} // مغلق لو الأول مش مختار
    />

    {/* زر Go Book */}
    <button
      id="take-date-tcf"
      disabled={!admissionChoice || !subAdmissionChoice} // يفتح فقط بعد الحقلين
      onClick={() => {
        if (admissionChoice && subAdmissionChoice) {
          window.location.href = "/admission"; // غيّر اللينك حسب رغبتك
        }
      }}
    >
      Accéder
    </button>
  </div>
</div>



        <div className="card_sec_two">
          <div className="card_icon_sec_two">
            <div className='icon_circle'>
              <i className="fa-brands fa-cc-visa"></i>
            </div>
            <h2>Le visa</h2>
          </div>
          <div className="card_text_sec_two">
            
            <p>
              Après l’admission, vous pourrez déposer votre demande de visa étudiant pour la France afin de finaliser votre inscription et préparer votre séjour.
            </p>

            <p>
              Faire une demande:
            </p>

            <Select
                name="Date-or-Prepare"
                options={visaOptions}
                placeholder="Faire une demande visa"
                styles={customSelectStyles}
                onChange={(option) => {
                  SetVisaOptionChoosen(true); // نرجعه false كل مرة يغير الاختيار
                }}
              />

            <button
              id="take-date-tcf"
              disabled={!VisaOptionChoosen} // يفتح فقط بعد الحقلين
              onClick={() => {
                if (VisaOptionChoosen) {
                  window.location.href = "/visa"; // غيّر اللينك حسب رغبتك
                }
              }}
            >
              Accéder
            </button>
          </div>
        </div>


      </div>

      <h3 id="invite_to_question_para">C'est fait ? Nous vous livrons tout ce que vous avez vu !</h3>

    </div>

</div>

    </section>
      

    <section id="third_sec">
      <div className="tringel_sec_three"></div>

<h1 id='add_boutique_invite'>Préparez-vous à l'examen TCF grâce à nos<span className='owner-color-aura2'> livres numériques</span> disponibles dans notre boutique.</h1>
      <div id="separator_sec_three">

        <div id="first_sec_three">
          <h4>Questions que vous pourriez poser:</h4>

          
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

        </div>
        <div id="second_sec_three">
          <img src={ImgPer} id='personal_photo_sec_three' alt="personal image" />
        </div>
      </div>
    </section>

    <Footer />
</>

  )
}
