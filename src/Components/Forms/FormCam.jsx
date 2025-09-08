import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Api_link } from "../../assets/Api";
import "../../Css/Services/FormCam.css";
import Loading from "../Loading";
import axiosClient from "../../assets/AxiosClient";

export default function FormCam({ UserData }) {
  // config
  const Cookie = new Cookies();
  const token = Cookie.get("Nazya_access_token"); // si vous gérez token en cookie
  const [IsLoading, SetIsLoading] = useState(false);

  // helper to split user full name into prenom/nom (best-effort)
  const splitName = (full = "") => {
    const parts = String(full || "").trim().split(/\s+/);
    return {
      prenom: parts.length ? parts[0] : "",
      nom: parts.length > 1 ? parts.slice(1).join(" ") : "",
    };
  };

  const initialName = splitName(UserData?.name || "");

  // form state
  const [form, setForm] = useState({
    prenom: initialName.prenom,
    nom: initialName.nom,
    email: UserData?.email || "",
    telephone: "",
    formation1: "",
    universite1: "",
    formation2: "",
    universite2: "",
    formation3: "",
    universite3: "",
    date_entretien: "",
    lettre_motivation: "",
    preoccupations: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null); // reserved if you add files later

  useEffect(() => {
    // clear messages when user types
    setSuccessMessage("");
    setErrorMessage("");
  }, [form]);

  function handleInput(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
  }

  // validation (messages en français)
  function validate() {
    const e = {};
    if (!form.prenom.trim()) e.prenom = "Le prénom est requis";
    if (!form.nom.trim()) e.nom = "Le nom est requis";

    if (!form.email.trim()) e.email = "L'adresse e-mail est requise";
    else {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(form.email)) e.email = "Adresse e-mail invalide";
    }

    if (!form.telephone.trim()) e.telephone = "Le numéro de téléphone est requis";
    else {
      const rePhone = /^[0-9+\s()-]{6,25}$/;
      if (!rePhone.test(form.telephone)) e.telephone = "Numéro de téléphone invalide";
    }

    if (!form.formation1.trim()) e.formation1 = "La 1ère formation est requise";
    if (!form.universite1.trim()) e.universite1 = "Université pour la 1ère formation requise";

    if (!form.formation2.trim()) e.formation2 = "La 2ème formation est requise";
    if (!form.universite2.trim()) e.universite2 = "Université pour la 2ème formation requise";

    if (!form.formation3.trim()) e.formation3 = "La 3ème formation est requise";
    if (!form.universite3.trim()) e.universite3 = "Université pour la 3ème formation requise";

    if (!form.lettre_motivation.trim()) e.lettre_motivation = "La lettre de motivation est requise";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // submit
  async function submitRequest(e) {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!validate()) {
      // scroll to first error
      const el = document.querySelector(".error-message");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // build FormData
    const fd = new FormData();

    // identity (from props UserData) — fallback: none (server should verify auth)
    if (UserData?.id) fd.append("user_id", UserData.id);
    if (UserData?.name) fd.append("user_name", UserData.name);
    if (UserData?.email) fd.append("user_email", UserData.email);

    // form fields
    fd.append("prenom", form.prenom);
    fd.append("nom", form.nom);
    fd.append("email", form.email);
    fd.append("telephone", form.telephone);
    fd.append("formation1", form.formation1);
    fd.append("universite1", form.universite1);
    fd.append("formation2", form.formation2);
    fd.append("universite2", form.universite2);
    fd.append("formation3", form.formation3);
    fd.append("universite3", form.universite3);
    if (form.date_entretien) fd.append("date_entretien", form.date_entretien);
    fd.append("lettre_motivation", form.lettre_motivation);
    fd.append("preoccupations", form.preoccupations);

    // debugging: display FormData entries (use this in dev tools)
    // console.log([...fd.entries()]);

    try {
      SetIsLoading(true);

      const headers = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;
        console.log([...fd.entries()]);

      const res = await axiosClient.post(`${Api_link}Campus-Request`, fd)

      setSuccessMessage(res?.data?.message || "Inscription enregistrée — nous vous contacterons bientôt.");
      setErrorMessage("");
      console.log(res)
      // reset form but keep prenom/nom/email from UserData if available
      const initName = splitName(UserData?.name || "");
      setForm({
        prenom: initName.prenom,
        nom: initName.nom,
        email: UserData?.email || "",
        telephone: "",
        formation1: "",
        universite1: "",
        formation2: "",
        universite2: "",
        formation3: "",
        universite3: "",
        date_entretien: "",
        lettre_motivation: "",
        preoccupations: "",
      });

      // optional: auto-hide success after a while
      setTimeout(() => setSuccessMessage(""), 8000);
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || err.message || "Erreur lors de l'envoi";
      setErrorMessage(msg);
      setSuccessMessage("");
    } finally {
      SetIsLoading(false);
    }
  }

  return (
    <div className="ipf-container">
      <h1 className="ipf-title">Inscription - Préparation Entretien Campus France</h1>
      <p className="ipf-sub">Maximisez vos chances — remplissez le formulaire ci-dessous</p>

      <div className="ipf-card">
        <form id="inscriptionForm" className="ipf-form" onSubmit={submitRequest} noValidate>
          <div className="ipf-grid-2">
            <div className="ipf-field">
              <label>Prénom *</label>
              <input name="prenom" value={form.prenom} onChange={handleInput} className="ipf-input" placeholder="Votre prénom" />
              {errors.prenom && <div className="error-message">{errors.prenom}</div>}
            </div>

            <div className="ipf-field">
              <label>Nom *</label>
              <input name="nom" value={form.nom} onChange={handleInput} className="ipf-input" placeholder="Votre nom" />
              {errors.nom && <div className="error-message">{errors.nom}</div>}
            </div>
          </div>

          <div className="ipf-field">
            <label>Email *</label>
            <input name="email" value={form.email} onChange={handleInput} className="ipf-input" placeholder="votre.email@exemple.com" />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="ipf-field">
            <label>Téléphone *</label>
            <input name="telephone" value={form.telephone} onChange={handleInput} className="ipf-input" placeholder="+33 6 12 34 56 78" />
            {errors.telephone && <div className="error-message">{errors.telephone}</div>}
          </div>

          <div className="ipf-grid-2">
            <div className="ipf-field">
              <label>1ère Formation souhaitée *</label>
              <input name="formation1" value={form.formation1} onChange={handleInput} className="ipf-input" placeholder="Ex: Master en Informatique" />
              {errors.formation1 && <div className="error-message">{errors.formation1}</div>}
            </div>
            <div className="ipf-field">
              <label>Université pour la 1ère formation *</label>
              <input name="universite1" value={form.universite1} onChange={handleInput} className="ipf-input" placeholder="Ex: Université Paris-Saclay" />
              {errors.universite1 && <div className="error-message">{errors.universite1}</div>}
            </div>
          </div>

          <div className="ipf-grid-2">
            <div className="ipf-field">
              <label>2ème Formation souhaitée *</label>
              <input name="formation2" value={form.formation2} onChange={handleInput} className="ipf-input" placeholder="Ex: Master en Commerce International" />
              {errors.formation2 && <div className="error-message">{errors.formation2}</div>}
            </div>
            <div className="ipf-field">
              <label>Université pour la 2ème formation *</label>
              <input name="universite2" value={form.universite2} onChange={handleInput} className="ipf-input" placeholder="Ex: HEC Paris" />
              {errors.universite2 && <div className="error-message">{errors.universite2}</div>}
            </div>
          </div>

          <div className="ipf-grid-2">
            <div className="ipf-field">
              <label>3ème Formation souhaitée *</label>
              <input name="formation3" value={form.formation3} onChange={handleInput} className="ipf-input" placeholder="Ex: Licence en Droit" />
              {errors.formation3 && <div className="error-message">{errors.formation3}</div>}
            </div>
            <div className="ipf-field">
              <label>Université pour la 3ème formation *</label>
              <input name="universite3" value={form.universite3} onChange={handleInput} className="ipf-input" placeholder="Ex: Université Panthéon-Sorbonne" />
              {errors.universite3 && <div className="error-message">{errors.universite3}</div>}
            </div>
          </div>

          <div className="ipf-field">
            <label>Date prévue de l'entretien</label>
            <input type="date" name="date_entretien" value={form.date_entretien} onChange={handleInput} className="ipf-input" />
          </div>

          <div className="ipf-field">
            <label>Lettre de motivation *</label>
            <textarea name="lettre_motivation" value={form.lettre_motivation} onChange={handleInput} rows="6" className="ipf-textarea" placeholder="Expliquez pourquoi vous souhaitez étudier en France..."></textarea>
            {errors.lettre_motivation && <div className="error-message">{errors.lettre_motivation}</div>}
          </div>

          <div className="ipf-field">
            <label>Préoccupations principales (optionnel)</label>
            <textarea name="preoccupations" value={form.preoccupations} onChange={handleInput} rows="3" className="ipf-textarea" placeholder="Vos inquiétudes concernant l'entretien..."></textarea>
          </div>

          {errorMessage && <div className="ipf-info ipf-error">{errorMessage}</div>}
          {successMessage && <div className="ipf-info ipf-success">{successMessage}</div>}

          <div className="ipf-actions">
            <button type="submit" className="ipf-submit" disabled={IsLoading}>
              {IsLoading ? "Envoi en cours..." : " S'inscrire maintenant"}
            </button>
            <button type="button" className="ipf-reset" onClick={() => {
              const init = splitName(UserData?.name || "");
              setForm({
                prenom: init.prenom,
                nom: init.nom,
                email: UserData?.email || "",
                telephone: "",
                formation1: "",
                universite1: "",
                formation2: "",
                universite2: "",
                formation3: "",
                universite3: "",
                date_entretien: "",
                lettre_motivation: "",
                preoccupations: "",
              });
              setErrors({});
              setErrorMessage("");
              setSuccessMessage("");
            }}>Réinitialiser</button>

            
          </div>
        </form>
      </div>

      <div className="service-summary">
          <h3>📄 Ce que vous obtiendrez:</h3>
          <ul>
            <li>✓ Préparation complète <br />
Tout ce qu'il faut savoir pour réussir votre entretien</li>
            <li>✓ Erreurs à éviter Les pièges les plus fréquents et comment les contourner</li>
            <li>✓ Astuces pour convaincre Techniques éprouvées pour impressionner les agents</li>
            <li>✓ Gestion du stress Méthodes efficaces pour rester calme et confiant</li>
            <li>✓ Support PDF personnalisé Document adapté spécifiquement à votre profil et votre candidature</li>

          </ul>
      </div>

        {IsLoading  &&<Loading/>}
    </div>
  );
}
