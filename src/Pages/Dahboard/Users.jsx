import React, { useEffect, useState } from 'react';
import "../../Css/Dashboard-css/Tcf.css";
import { Api_link } from '../../assets/Api';
import Skeleton from "react-loading-skeleton";
import axios from 'axios';
import "../../Css/Dashboard-css/users.css";



export default function Users() {

  const [forms, setForms] = useState([]);
  
  const [NumForms, SetNumForms] = useState(0);
  const [loading, setLoading] = useState(true); // متغير اللودينغ
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(""); // القيمة الفعلية اللي نرسلها للـ API

const fetchUsers = () => {
  setLoading(true);
      axios.get(`${Api_link}users?page=${currentPage}&search=${query}`)
    .then(response => {
        console.log(response)
      setForms(response.data.data);
      setLastPage(response.data.last_page);
      SetNumForms(response.data.total);
      setLoading(false);
    })
    .catch(error => {
      console.error("❌ Error:", error);
      setLoading(false);
    });
}

useEffect(() => {
  fetchUsers();
}, [currentPage, query]);


const handleDelete = (id) => {
  if (window.confirm("⚠️ Voulez-vous supprimer cet utilisateur ?")) {
    axios.delete(`${Api_link}users/${id}`)
      .then(() => {
        fetchUsers(); // 🔥 عاود جيب البيانات كاملة من السيرفر
      })
      .catch(err => {
        console.error("❌ Error deleting user:", err);
      });
  }
};



  return (
  <>
    <div id='title-forms-dashboard'>
      <h1>Liste Des Utilisateurs</h1>
      <div className='flexer_para_dashboard'>
        <p> Users Per Page:  <span className='color-red'>  25</span></p>
        <p>Tous les résultats: <span className='color-red'> {NumForms} </span></p>
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
          setQuery(search);
          setCurrentPage(1);
        }}
      >
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>

    <div className="users-table-container">
      {loading ? (
        <Skeleton className="my-skeleton" width={1200} height={400} borderRadius={8}/>
      ) : forms.length === 0 ? (
        <div className="no-results">❌ No results found</div>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Date Création</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {forms.map(user => {
              const createdAt = new Date(user.created_at);
              const formattedDate = createdAt.toLocaleString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              });
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.number ?? "—"}</td>
                  <td>{formattedDate}</td>
                  <td>
                        <i className="fa-solid fa-user-minus delete-icon" onClick={() => handleDelete(user.id)}></i>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  </>

  )
}
