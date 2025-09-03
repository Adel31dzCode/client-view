import React, { useEffect, useState } from 'react';
import "../../Css/Dashboard-css/Tcf.css";
import { Api_link } from '../../assets/Api';
import Skeleton from "react-loading-skeleton";
import axios from 'axios';



export default function TcfFormules() {

  const [forms, setForms] = useState([]);
  
  const [NumForms, SetNumForms] = useState(0);
  const [loading, setLoading] = useState(true); // متغير اللودينغ
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(""); // القيمة الفعلية اللي نرسلها للـ API

const fetchFormules = () => {
  setLoading(true);
  axios.get(`${Api_link}formules?page=${currentPage}&search=${query}`)
    .then(response => {
      setForms(response.data.data);
      setLastPage(response.data.last_page);
      SetNumForms(response.data.total);
      setLoading(false);
    })
    .catch(error => {
      console.error("❌ Error:", error);
      setLoading(false);
    });
};

useEffect(() => {
  fetchFormules();
}, [currentPage, query]);



  // دالة نسخ النص للحافظة
  const copyToClipboard = text => {
    navigator.clipboard.writeText(text).catch(err => {
      console.error('Failed to copy:', err);
    });
  };

const handleDelete = (id) => {
  if (window.confirm("⚠️ Voulez-vous supprimer cet Formule ?")) {
    axios.delete(`${Api_link}formules/${id}`)
      .then(() => {
        fetchFormules(); // 🔥 عاود جيب البيانات كاملة من السيرفر
      })
      .catch(err => {
        console.error("❌ Error deleting formule:", err);
      });
  }
};

  return (
    <>
    <div id='title-forms-dashboard'>
        <h1>Les Formule List</h1>
        <div className='flexer_para_dashboard'>

          <p><span className='color-red'>4 </span>  Formule Per Page: </p>
          <p>Tout Les Resulta: <span className='color-red'> {NumForms} </span></p>
          
        </div>
      </div>

      {/* أزرار الباجينيشن */}
    <div className="pagination">
      {Array.from({ length: lastPage }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          className={`page-btn ${currentPage === page ? "active" : ""}`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
    </div>

    {/* 🔎 input للبحث */}
<div className="search-box">
  <input
    type="text"
    placeholder="🔎 Rechercher par prénom ou nom..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
  <button
    onClick={() => {
      setQuery(search);  // نثبت قيمة البحث هنا
      setCurrentPage(1); // يرجع للصفحة الأولى عند البحث
    }}
  >
    <i className="fa-solid fa-magnifying-glass"></i>
  </button>
</div>

      <div className="cards-container">
        {loading ? (
        <>
          <Skeleton className="my-skeleton" width={500} height={600} borderRadius={8}/>
          <Skeleton className="my-skeleton" width={500} height={600} borderRadius={8}/>
        </>
        ) : forms.length === 0 ? (
          <div className="no-results">❌ No results found</div>
      ) : (
          forms.map((form, idx) => {
              const createdAt = new Date(form.created_at);
              const formattedDate = createdAt.toLocaleString("fr-FR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            });
            const fields = [
  { label: 'TCF Type',          value: form.type.toUpperCase()},
  
  // VFS
  { label: 'VFS Compte',        value: form.vfsAccount === "yes" ? "Oui" : "Non" },
  { label: 'Email VFS existant',value: !form.existingVfsEmail ? "--------" : form.existingVfsEmail },
  { label: 'Mot de passe VFS',  value: !form.vfsPassword ? "--------" : form.vfsPassword },
  { label: 'Email Password',    value: !form.emailPassword ? "--------" : form.emailPassword },

  // Nouveaux (اختياريين)
  { label: 'Nouveau prénom',    value: !form.newFirstName ? "--------" : form.newFirstName },
  { label: 'Nouveau nom',       value: !form.newLastName ? "--------" : form.newLastName },
  { label: 'Nouvel email',      value: !form.newEmail ? "--------" : form.newEmail },
  { label: 'Mot de passe email',value: !form.newEmailPassword ? "--------" : form.newEmailPassword },
  { label: 'Nouveau téléphone', value: !form.newPhone ? "--------" : form.newPhone },

  // Infos personnelles
  { label: 'ID Number',         value: form.idNumber },
  { label: 'ID Expiry',         value: form.idExpiry },
  { label: 'Prénom',            value: form.firstName },
  { label: 'Nom',               value: form.lastName },
  { label: 'Naissance',         value: form.birthDate },
  { label: 'Pays de naissance', value: form.birthCountry },
  { label: 'Nationalité',       value: form.nationality },
  { label: 'Genre',             value: form.gender },
  { label: 'Langue',            value: form.language },
  { label: "Raison d'inscription", value: form.registrationReason },

  // Adresse
  { label: 'Adresse',           value: form.address },
  { label: 'Commune',           value: form.commune },
  { label: 'Wilaya',            value: form.wilaya },
  { label: 'Code Postal',       value: form.postalCode },

  // Préférences examen
  { label: 'Centre Examen',     value: form.examCenter },
  { label: 'Autre centre',      value: form.otherCenter },
  { label: 'Période début',     value: form.periodFrom },
  { label: 'Période fin',       value: form.periodTo },
  { label: 'Créneau',           value: form.timeSlot },
  { label: 'Remarques',         value: form.remarks },

  // Métadonnées
  { label: 'Créé le', value: formattedDate }
];

            return (
              <div key={form.id} className="card">
                <div className="card__title">
                  #{idx + 1} — {formattedDate} - {form.firstName + "  " + form.lastName}  <i className="fa-solid fa-trash delete-icon delete-icon-tcf" onClick={() => handleDelete(form.id)}></i>

                </div>
                <div className="card__data">
                  <div className="card__right">
                    {fields.map(f => (
                      <div key={f.label} className="item key_data">
                        {f.label}
                      </div>
                    ))}
                  </div>
                  <div className="card__left">
                    {fields.map(f => (
                      <div key={f.label} className="item copy-item">
                        <span className="copy-value">{f.value}</span>
                        <div id='i-continer-formular'>
                          <i
                            className="fa-solid fa-copy copy-icon"
                            onClick={() => copyToClipboard(f.value)}
                            title="Copier"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      </>
  )
}
