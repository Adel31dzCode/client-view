import React, { useState, useRef } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Api_link } from "../../assets/Api";
import "../../Css/Services/FormDem.css";
import { Alert } from "bootstrap";

export default function FormDem({ UserData }) {
  const Cookie = new Cookies();
  const token = Cookie.get("Nazya_access_token");

  const [form, setForm] = useState({
    prenom: UserData?.prenom || "",
    nom: UserData?.nom || "",
    email: UserData?.email || "",
    telephone: "",
    universite: "",
    formation: "",
    date_refus: "",
    motif: "",
    elements: "",
    delai: "standard",
  });

  const [files, setFiles] = useState({
    lettreRefus: null,
    dossierCandidature: null,
    lettreMotivation: null,
    documentsComplementaires: [],
  });

  const [errors, setErrors] = useState({});
  const [fileError, setFileError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [serverError, setServerError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const inputRefs = {
    lettreRefus: useRef(null),
    dossierCandidature: useRef(null),
    lettreMotivation: useRef(null),
    documentsComplementaires: useRef(null),
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const maxFileSizeMB = 3; // limite 3 Mo

const handleFile = (e, field, multiple = false) => {
  const incoming = multiple ? Array.from(e.target.files) : e.target.files[0];
  if (!incoming) return;

  if (multiple) {
    const validFiles = [];
    incoming.forEach((f) => {
      if (f.size / 1024 / 1024 > maxFileSizeMB) {
        alert(
          `${f.name} dépasse ${maxFileSizeMB}MB.\n👉 Contactez-nous sur Instagram ou Facebook pour envoyer votre fichier.`
        );
      } else {
        validFiles.push(f);
      }
    });
    // ناخذ أول ملف فقط
    setFiles((p) => ({ ...p, [field]: validFiles.slice(0, 1) }));
  } else {
    if (incoming.size / 1024 / 1024 > maxFileSizeMB) {
      alert(
        `${incoming.name} dépasse ${maxFileSizeMB}MB.\n👉 Contactez-nous sur Instagram ou Facebook pour envoyer votre fichier.`
      );
      return;
    }
    // ملف واحد فقط
    setFiles((p) => ({ ...p, [field]: incoming }));
  }

  setFileError("");
};

  const removeFile = (field, index = null) => {
    if (index !== null) {
      setFiles((p) => ({
        ...p,
        [field]: p[field].filter((_, i) => i !== index),
      }));
    } else {
      setFiles((p) => ({ ...p, [field]: null }));
    }
  };

  const validate = () => {
  const e = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!form.prenom.trim()) e.prenom = "Le prénom est requis";
  if (!form.nom.trim()) e.nom = "Le nom est requis";
    if (!form.email.trim()) {
    e.email = "L'email est requis";
  } else if (!emailRegex.test(form.email)) {
    e.email = "Adresse email invalide";
  }
  if (!form.telephone.trim()) e.telephone = "Le téléphone est requis";
  if (!form.universite.trim()) e.universite = "Université requise";
  if (!form.formation.trim()) e.formation = "Formation requise";
  if (!form.date_refus.trim()) e.date_refus = "Date de refus requise";
  if (!form.motif.trim()) e.motif = "Motif du refus requis";
  if (!form.elements.trim()) e.elements = "Éléments à valoriser requis";
  if (!form.delai.trim()) e.delai = "Choisir un délai est requis";
  if (!files.lettreRefus) e.lettreRefus = "Lettre de refus obligatoire";
  if (!files.dossierCandidature) e.dossierCandidature = "Dossier de candidature obligatoire";
  if (!files.lettreMotivation) e.lettreMotivation = "Lettre de motivation obligatoire";
  if (files.documentsComplementaires.length === 0) e.documentsComplementaires = "Documents complémentaires obligatoires";
  
  setErrors(e);
  return Object.keys(e).length === 0;
};

  const submitRequest = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccessMsg("");
    if (!validate()) return;

    const fd = new FormData();
    if (UserData?.id) fd.append("user_id", UserData.id);
    if (UserData?.name) fd.append("user_name", UserData.name);
    if (UserData?.email) fd.append("user_email", UserData.email);

    Object.keys(form).forEach((k) => fd.append(k, form[k]));

    if (files.lettreRefus)
      fd.append("lettreRefus", files.lettreRefus, files.lettreRefus.name);
    if (files.dossierCandidature)
      fd.append(
        "dossierCandidature",
        files.dossierCandidature,
        files.dossierCandidature.name
      );
    if (files.lettreMotivation)
      fd.append(
        "lettreMotivation",
        files.lettreMotivation,
        files.lettreMotivation.name
      );
    if (files.documentsComplementaires.length > 0) {
      const f = files.documentsComplementaires[0];
      fd.append("documentsComplementaires", f, f.name);
    }

    console.log("FormData:", [...fd.entries()]);

    setSubmitting(true);
    try {
  // إعداد الهيدر
  const headers = { "Content-Type": "multipart/form-data" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  console.log([...fd.entries()]);

  // إرسال الطلب عبر API
  const res = await axios.post(`${Api_link}Demande-Request`, fd, {
    headers,
    onUploadProgress: (ev) => {
      if (ev.lengthComputable) {
        setUploadProgress(Math.round((ev.loaded * 100) / ev.total));
      }
    },
    timeout: 120000,
  });

  console.log("Réponse API:", res.data);

  // رسالة نجاح
  setSuccessMsg(res?.data?.message || "✅ Demande envoyée avec succès !");

  // إعادة تعيين الفورم
  setForm({
    prenom: UserData?.prenom || "",
    nom: UserData?.nom || "",
    email: UserData?.email || "",
    telephone: "",
    universite: "",
    formation: "",
    date_refus: "",
    motif: "",
    elements: "",
    delai: "standard",
  });

  setFiles({
    lettreRefus: null,
    dossierCandidature: null,
    lettreMotivation: null,
    documentsComplementaires: [],
  });
} catch (err) {
  console.error("Erreur API:", err);
  setServerError(
    err?.response?.data?.message || "❌ Erreur lors de l'envoi du formulaire"
  );
} finally {
  setSubmitting(false);
  setUploadProgress(0);

  // تنظيف الحقول المخفية للملفات
  Object.values(inputRefs).forEach((r) => {
    if (r.current) r.current.value = null;
  });
}

  };

  return (
    <div className="recours-container">
      <h2 className="form-title">📑 Demande de Recours Gracieux</h2>
      <p className="form-subtitle">
        Remplissez ce formulaire pour obtenir votre recours gracieux
      </p>

      <form onSubmit={submitRequest} className="form-content" noValidate>
        <div className="form-grid">
          <div className="form-field">
  <label className="form-label">Prénom *</label>
  <input
    name="prenom"
    value={form.prenom}
    onChange={handleInput}
    placeholder="Votre prénom"
    className="form-input"
  />
  {errors.prenom && <span className="error-message">{errors.prenom}</span>}
</div>

<div className="form-field">
  <label className="form-label">Nom *</label>
  <input
    name="nom"
    value={form.nom}
    onChange={handleInput}
    placeholder="Votre nom"
    className="form-input"
  />
  {errors.nom && <span className="error-message">{errors.nom}</span>}
</div>



        </div>

        <div className="form-grid">
          <div className="form-field">
            <label className="form-label">Email *</label>
            <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleInput}
                placeholder="votre.email@exemple.com"
                className="form-input"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="form-field">
            <label className="form-label">Telephone *</label>
            <input
              name="telephone"
              value={form.telephone}
              onChange={handleInput}
              placeholder="Téléphone"
              className="form-input"
            />
              {errors.telephone && <span className="error-message">{errors.telephone}</span>}
          </div>
        </div>

        <div className="form-field">
         <label className="form-label">Université concernée *</label>           
          <input
            name="universite"
            value={form.universite}
            onChange={handleInput}
            placeholder="Université concernée"
            className="form-input"
          />
          {errors.universite && (
            <span className="error-message">{errors.universite}</span>
          )}
        </div>

        <div className="form-field">
        <label className="form-label">Formation demandée *</label>
          <input
            name="formation"
            value={form.formation}
            onChange={handleInput}
            placeholder="Formation demandée"
            className="form-input"
          />
          {errors.formation && (
            <span className="error-message">{errors.formation}</span>
          )}
        </div>

        <div className="form-field">
          <label className="form-label">Date Refus *</label>
          <input
            name="date_refus"
            type="date"
            value={form.date_refus}
            onChange={handleInput}
            className="form-input"
          />
            {errors.date_refus && <span className="error-message">{errors.date_refus}</span>}

        </div>

        <div className="form-field">
            <label className="form-label">Motif du refus *</label>
          <select
            name="motif"
            value={form.motif}
            onChange={handleInput}
            className="form-input"
          >
            <option value="">Motif du refus</option>
            <option value="dossier-incomplet">Dossier incomplet</option>
            <option value="notes-insuffisantes">Notes insuffisantes</option>
            <option value="capacite-accueil">Capacité d'accueil limitée</option>
            <option value="profil-inadequat">Profil inadéquat</option>
            <option value="autre">Autre</option>
            <option value="non-precise">Non précisé</option>
          </select>
            {errors.motif && <span className="error-message">{errors.motif}</span>}

        </div>

        <div className="form-field">
            <label className="form-label">Éléments nouveaux à valoriser *</label>
          <textarea
            name="elements"
            rows="4"
            value={form.elements}
            onChange={handleInput}
            placeholder="Éléments nouveaux à valoriser"
            className="form-input"
          />
          {errors.elements && (
    <span className="error-message">{errors.elements}</span>
  )}
          
        </div>

        <div className="form-field">
            <label className="form-label">Delai *</label>
          <select
            name="delai"
            value={form.delai}
            onChange={handleInput}
            className="form-input"
          >
            <option value="urgent">Urgent (48h)</option>
            <option value="rapide">Rapide (1 semaine)</option>
            <option value="standard">Standard (2 semaines)</option>
          </select>
        </div>

        {/* Fichiers */}
{/* Fichiers */}
<div className="file-upload">
  <label>Lettre de refus *</label>
  <div
    className="upload-box"
    onClick={() => inputRefs.lettreRefus.current?.click()}
  >
    <div className="upload-icon">📎</div>
    <p>Cliquez ou glissez votre fichier ici</p>
    <small>Formats acceptés: PDF, JPG, PNG, DOC (max 10MB)</small>
  </div>
  <input
    ref={inputRefs.lettreRefus}
    type="file"
    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
    onChange={(e) => handleFile(e, "lettreRefus")}
    style={{ display: "none" }}
  />
  {errors.lettreRefus && (
    <span className="error-message">{errors.lettreRefus}</span>
  )}
  {files.lettreRefus && (
    <div className="file-item">
      📄 {files.lettreRefus.name}{" "}
      <button type="button" onClick={() => removeFile("lettreRefus")}>
        Supprimer
      </button>
    </div>
  )}
</div>

<div className="file-upload">
  <label>Dossier de candidature initial</label>
  <div
    className="upload-box"
    onClick={() => inputRefs.dossierCandidature.current?.click()}
  >
    <div className="upload-icon">📎</div>
    <p>Cliquez ou glissez votre fichier ici</p>
    <small>Formats acceptés: PDF, ZIP, RAR (max 20MB)</small>
  </div>
  <input
    ref={inputRefs.dossierCandidature}
    type="file"
    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
    onChange={(e) => handleFile(e, "dossierCandidature")}
    style={{ display: "none" }}
  />
  {errors.dossierCandidature && (
    <span className="error-message">{errors.dossierCandidature}</span>
  )}
  {files.dossierCandidature && (
    <div className="file-item">
      📄 {files.dossierCandidature.name}{" "}
      <button
        type="button"
        onClick={() => removeFile("dossierCandidature")}
      >
        Supprimer
      </button>
    </div>
  )}
</div>

<div className="file-upload">
  <label>Lettre de motivation *</label>
  <div
    className="upload-box"
    onClick={() => inputRefs.lettreMotivation.current?.click()}
  >
    <div className="upload-icon">📎</div>
    <p>Cliquez ou glissez votre fichier ici</p>
    <small>Formats acceptés: PDF, DOC, DOCX (max 5MB)</small>
  </div>
  <input
    ref={inputRefs.lettreMotivation}
    type="file"
    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
    onChange={(e) => handleFile(e, "lettreMotivation")}
    style={{ display: "none" }}
  />
  {errors.lettreMotivation && (
    <span className="error-message">{errors.lettreMotivation}</span>
  )}
  {files.lettreMotivation && (
    <div className="file-item">
      📄 {files.lettreMotivation.name}{" "}
      <button
        type="button"
        onClick={() => removeFile("lettreMotivation")}
      >
        Supprimer
      </button>
    </div>
  )}
</div>

<div className="file-upload">
  <label>Documents complémentaires</label>
  <div
    className="upload-box"
    onClick={() =>
      inputRefs.documentsComplementaires.current?.click()
    }
  >
    <div className="upload-icon">📎</div>
    <p>Cliquez ou glissez vos fichiers ici</p>
    <small>Formats acceptés: PDF, JPG, PNG, DOC (max 5MB chacun)</small>
  </div>
  <input
    ref={inputRefs.documentsComplementaires}
    type="file"
    multiple
    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
    onChange={(e) => handleFile(e, "documentsComplementaires", true)}
    style={{ display: "none" }}
  />
  {errors.documentsComplementaires && (
    <span className="error-message">{errors.documentsComplementaires}</span>
  )}
  {files.documentsComplementaires.length > 0 && (
    <ul className="file-list">
      {files.documentsComplementaires.map((f, i) => (
        <li key={i} className="file-item">
          📄 {f.name}{" "}
          <button
            type="button"
            onClick={() =>
              removeFile("documentsComplementaires", i)
            }
          >
            Supprimer
          </button>
        </li>
      ))}
    </ul>
  )}
</div>


        {fileError && <div className="error-message">{fileError}</div>}

        {uploadProgress > 0 && (
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}

        {serverError && <div className="error-message">{serverError}</div>}
        {successMsg && <div className="success-message">{successMsg}</div>}

        <button type="submit" disabled={submitting} className="submit-button">
          {submitting ? `Envoi... ${uploadProgress}%` : "Envoyer ma demande"}
        </button>
      </form>
    </div>
  );
}
