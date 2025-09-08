import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../../Css/Services/FormFor.css";
import { Api_link } from "../../assets/Api";
import Cookies from "universal-cookie";
import Loading from "../Loading";

// Enhanced FormFor component
// - Controlled inputs
// - Validation + user-friendly errors
// - File validation and preview
// - Upload progress (axios onUploadProgress)
// - Configurable apiEndpoint and auth token via props

export default function FormFor({ UserData }) {
  const Cookie = new Cookies();
  const token = Cookie.get("Nazya_access_token");
  const [IsLoading, SetIsLoading] = useState(false);

  // main form state
  const [form, setForm] = useState({
    fullName: "",
    email:  "",
    phone: "",
    diploma: "",
    specialty: "",
    average: "",
    frenchLevel: "",
    englishLevel: "",
    otherLanguages: [], // { name: '', level: '' }
    constraints: "",
    specificRequests: "",
  });

  const [files, setFiles] = useState([]); // File objects
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState(null);
  const fileInputRef = useRef(null);

  // Settings
  const MAX_FILE_SIZE_MB = 4; // per file
  const MAX_FILES = 3;
  const ALLOWED_TYPES = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  useEffect(() => {
    // Clear messages when user edits
    setMessage(null);
  }, [form, files]);

  function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1024 / 1024).toFixed(2) + " MB";
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleAddOtherLanguage() {
    setForm((prev) => ({ ...prev, otherLanguages: [...prev.otherLanguages, { name: "", level: "" }] }));
  }

  function handleOtherLangChange(index, key, value) {
    setForm((prev) => {
      const copy = { ...prev };
      copy.otherLanguages = copy.otherLanguages.map((l, i) => (i === index ? { ...l, [key]: value } : l));
      return copy;
    });
  }

  function handleRemoveOtherLang(index) {
    setForm((prev) => ({ ...prev, otherLanguages: prev.otherLanguages.filter((_, i) => i !== index) }));
  }

  function handleFileChange(e) {
  const incoming = Array.from(e.target.files || []);
  if (!incoming.length) return;

  const validated = [];
  const errorList = [];

  // Check if total exceeds MAX_FILES
  if (files.length + incoming.length > MAX_FILES) {
      alert(`⚠️ Vous pouvez télécharger au maximum ${MAX_FILES} fichiers`);
  }

  for (const file of incoming) {
    if (files.length + validated.length >= MAX_FILES) break; // stop if reached limit

    const sizeMB = file.size / 1024 / 1024;
    if (sizeMB > MAX_FILE_SIZE_MB) {
      alert(`${file.name} dépasse la taille maximale (${MAX_FILE_SIZE_MB} MB)`);
      continue;
    }

    const duplicate = files.some((f) => f.name === file.name && f.size === file.size);
    if (duplicate) {
      alert(`${file.name} est déjà ajouté`);
      continue;
    }

    validated.push(file);
  }

  if (errorList.length) {
    setMessage({ type: "error", text: errorList.join(" — ") });
  }

  setFiles((prev) => {
    const total = prev.length + validated.length;
    return total <= MAX_FILES ? [...prev, ...validated] : prev;
  });

  // reset native input pour permettre de ré-uploader le même fichier après suppression
  if (fileInputRef.current) fileInputRef.current.value = null;
}


  function removeFile(index) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

function validate() {
  const e = {};
  if (!form.fullName.trim()) e.fullName = "Le nom complet est requis";
  if (!form.email.trim()) e.email = "L'adresse e-mail est requise";
  else {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
    if (!re.test(form.email)) e.email = "Adresse e-mail invalide";
  }
  if (!form.phone.trim()) e.phone = "Le numéro de téléphone est requis";
  else {
    const rePhone = /^[0-9+\s()-]{6,20}$/;
    if (!rePhone.test(form.phone)) e.phone = "Le numéro de téléphone semble invalide";
  }
  if (!form.diploma) e.diploma = "Veuillez sélectionner votre diplôme";
  if (!form.specialty.trim()) e.specialty = "La spécialité est requise";
  if (form.average) {
    const val = parseFloat(form.average);
    if (isNaN(val) || val < 0 || val > 20) e.average = "Veuillez entrer une moyenne entre 0 et 20";
  }
  if (!form.frenchLevel) e.frenchLevel = "Veuillez sélectionner votre niveau de français";
  if (!form.englishLevel) e.englishLevel = "Veuillez sélectionner votre niveau d'anglais";

  setErrors(e);
  return Object.keys(e).length === 0;
}


  async function handleSubmit(ev) {
    ev.preventDefault();
    setMessage(null);

    if (!validate()) {
      setMessage({ type: "error", text: "Veuillez corriger les erreurs ci-dessus." });
      return;
    }

    const fd = new FormData();

    fd.append("user_id", UserData.id);
    fd.append("user_name", UserData.name);
    fd.append("user_email", UserData.email);


    fd.append("fullName", form.fullName);
    fd.append("email", form.email);
    fd.append("phone", form.phone);
    fd.append("diploma", form.diploma);
    fd.append("specialty", form.specialty);
    fd.append("average", form.average);
    fd.append("frenchLevel", form.frenchLevel);
    fd.append("englishLevel", form.englishLevel);
    fd.append("constraints", form.constraints);
    fd.append("specificRequests", form.specificRequests);

    if (form.otherLanguages && form.otherLanguages.length) {
      fd.append("otherLanguages", JSON.stringify(form.otherLanguages));
    }

    files.forEach((file, i) => {
      // Use documents[] so the backend receives an array
      fd.append("documents[]", file, file.name);
    });

    setSubmitting(true);
    setUploadProgress(0);

    console.log([...fd.entries()]);
    SetIsLoading(true);
    try {
      const headers = { "Content-Type": "multipart/form-data" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await axios.post(`${Api_link}Form-Formation`, fd, {
        headers,
        onUploadProgress: (e) => {
          if (!e.lengthComputable) return;
          setUploadProgress(Math.round((e.loaded * 100) / e.total));
        },
        timeout: 120000, // 2 min
        
      });
      SetIsLoading(false);
      console.log(res);

      setMessage({ type: "success", text: "Sent! Thank You" });
      alert("✅ Envoyé avec succès. Veuillez vérifier votre boîte de réception.")
      setFiles([]);
      // reset form but keep user data
      setForm((prev) => ({ ...prev, diploma: "", specialty: "", average: "", frenchLevel: "", englishLevel: "", otherLanguages: [], constraints: "", specificRequests: "" }));

      if (typeof onSuccess === "function") onSuccess(res.data);
    } catch (err) {
      SetIsLoading(false);
      console.error(err);
      const serverMsg = err?.response?.data?.message || err.message || "حدث خطأ أثناء الإرسال";
      setMessage({ type: "error", text: `Failed:  ${serverMsg}` });
      if (typeof onError === "function") onError(err);
    } finally {
      setSubmitting(false);
      setUploadProgress(0);
      SetIsLoading(false);
    }
  }

  return (
    <div id="service-selection" className="service-form-container continer-dap-horz">
      <h2 className="title-service underline">Service d'Aide à la Sélection de Formation et d'Université</h2>
      <p className="para-content-service">Nous vous proposons un accompagnement personnalisé pour choisir la formation et l'université idéales selon votre profil.</p>
      <div className="price-tag">💰 Tarif : 6 000 DA</div>

      <div className="form-container continer-dap-horz-inside">
        <form onSubmit={handleSubmit} className="service-form" noValidate>
          <div className="form-section-for">
            <h3 className="form-section-for-title">👤 Informations Personnelles</h3>

            <div className="form-grid">
              <div className="form-group">
                <label>Nom complet *</label>
                <input name="fullName" value={form.fullName} onChange={handleInputChange} type="text" required placeholder="Votre nom et prénom" />
                {errors.fullName && <small className="error">{errors.fullName}</small>}
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input name="email" value={form.email} onChange={handleInputChange} type="email" required placeholder="votre.email@exemple.com" />
                {errors.email && <small className="error">{errors.email}</small>}
              </div>

              <div className="form-group">
                <label>Téléphone *</label>
                <input name="phone" value={form.phone} onChange={handleInputChange} type="tel" required placeholder="0X XX XX XX XX" />
                {errors.phone && <small className="error">{errors.phone}</small>}
              </div>
            </div>
          </div>

          <div className="form-section-for">
            <h3 className="form-section-for-title">📚 Niveau d'Études Actuel</h3>

            <div className="form-group">
              <label>Diplôme actuel *</label>
              <select name="diploma" value={form.diploma} onChange={handleInputChange} required>
                <option value="">Sélectionnez votre niveau d'études</option>
                <option value="l1_encours">L1 en cours</option>
                <option value="l2_encours">L2 en cours</option>
                <option value="l3_encours">L3 en cours</option>
                <option value="licence_obtenu">Obtenu ma licence</option>
                <option value="m1_encours">M1 en cours</option>
                <option value="m2_encours">M2 en cours</option>
                <option value="master_obtenu">Obtenu mon diplôme de master</option>
                <option value="autre">Autre</option>
              </select>
              {errors.diploma && <small className="error">{errors.diploma}</small>}
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Filière/Spécialité *</label>
                <input name="specialty" value={form.specialty} onChange={handleInputChange} type="text" required placeholder="Ex: Sciences Exactes, Lettres, etc." />
                {errors.specialty && <small className="error">{errors.specialty}</small>}
              </div>

              <div className="form-group">
                <label>Moyenne générale</label>
                <input name="average" value={form.average} onChange={handleInputChange} type="number" step="0.01" min="0" max="20" placeholder="15.50" />
                {errors.average && <small className="error">{errors.average}</small>}
              </div>
            </div>
          </div>

          <div className="form-section-for">
            <h3 className="form-section-for-title">🌍 Niveaux de Langues</h3>

            <div className="form-grid">
              <div className="form-group">
                <label>Français *</label>
                <select name="frenchLevel" value={form.frenchLevel} onChange={handleInputChange} required>
                  <option value="">Sélectionnez votre niveau</option>
                  <option value="debutant">Débutant (A1)</option>
                  <option value="elementaire">Élémentaire (A2)</option>
                  <option value="intermediaire">Intermédiaire (B1)</option>
                  <option value="intermediaire_avance">Intermédiaire avancé (B2)</option>
                  <option value="avance">Avancé (C1)</option>
                  <option value="maitrise">Maitrise (C2)</option>
                  <option value="natif">Langue maternelle</option>
                </select>
                {errors.frenchLevel && <small className="error">{errors.frenchLevel}</small>}
              </div>

              <div className="form-group">
                <label>Anglais *</label>
                <select name="englishLevel" value={form.englishLevel} onChange={handleInputChange} required>
                  <option value="">Sélectionnez votre niveau</option>
                  <option value="debutant">Débutant (A1)</option>
                  <option value="elementaire">Élémentaire (A2)</option>
                  <option value="intermediaire">Intermédiaire (B1)</option>
                  <option value="intermediaire_avance">Intermédiaire avancé (B2)</option>
                  <option value="avance">Avancé (C1)</option>
                  <option value="maitrise">Maitrise (C2)</option>
                  <option value="natif">Langue maternelle</option>
                </select>
                {errors.englishLevel && <small className="error">{errors.englishLevel}</small>}
              </div>
            </div>

            <div className="form-group">
              <label>Autres langues (optionnel)</label>
              {form.otherLanguages.map((l, i) => (
                <div key={i} className="other-lang-row">
                  <input value={l.name} onChange={(e) => handleOtherLangChange(i, "name", e.target.value)} placeholder="Ex: Arabe" />
                  <select value={l.level} onChange={(e) => handleOtherLangChange(i, "level", e.target.value)}>
                    <option value="">Niveau</option>
                    <option value="debutant">Débutant (A1)</option>
                    <option value="elementaire">Élémentaire (A2)</option>
                    <option value="intermediaire">Intermédiaire (B1)</option>
                    <option value="intermediaire_avance">Intermédiaire avancé (B2)</option>
                    <option value="avance">Avancé (C1)</option>
                    <option value="maitrise">Maitrise (C2)</option>
                    <option value="natif">Langue maternelle</option>
                  </select>
                  <button type="button" className="btn-small" onClick={() => handleRemoveOtherLang(i)}>supprimer</button>
                </div>
              ))}
              <div>
                <button type="button" onClick={handleAddOtherLanguage} className="btn-small">Ajouter une langue</button>
              </div>
            </div>
          </div>

          <div className="form-section-for">
            <h3 className="form-section-for-title">📎 Envoi du Dossier</h3>

            <div className="form-group">
              <label>Joindre votre dossier académique *</label>
              <div className="file-upload-area">
                <input ref={fileInputRef} type="file" id="dossier" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={handleFileChange} />
                <label htmlFor="dossier" className="file-upload-label">
                  <div className="file-upload-content">
                    <span className="file-upload-icon">📁</span>
                    <p className="file-upload-text">Cliquez pour sélectionner vos fichiers</p>
                    <p className="file-upload-subtext">Relevés de notes, diplômes, CV (PDF, JPG, PNG, DOC)</p>
                    <p className="file-upload-info">Plusieurs fichiers acceptés — max {MAX_FILES} fichiers, {MAX_FILE_SIZE_MB}MB لكل ملف</p>
                  </div>
                </label>
              </div>

              {files.length > 0 && (
                <div className="file-list">
                  {files.map((file, index) => (
                    <div key={index} className="file-item">
                      <div className="file-info">
                        <span className="file-icon">📄</span>
                        <span className="file-name">{file.name}</span>
                        <span className="file-size">({formatFileSize(file.size)})</span>
                      </div>
                      <button type="button" onClick={() => removeFile(index)} className="file-remove">×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-section-for">
            <h3 className="form-section-for-title">💬 Informations Complémentaires</h3>

            <div className="form-group">
              <label>Contraintes particulières</label>
              <textarea name="constraints" value={form.constraints} onChange={handleInputChange} placeholder="Budget, horaires, situation familiale, handicap, etc." rows="4"></textarea>
            </div>

            <div className="form-group">
              <label>Questions ou demandes spécifiques</label>
              <textarea name="specificRequests" value={form.specificRequests} onChange={handleInputChange} placeholder="Toute information que vous jugez importante pour votre orientation..." rows="4"></textarea>
            </div>
          </div>

          <div className="form-submit">
            <button disabled={submitting} type="submit" className="submit-button">{submitting ? `Envoi... ${uploadProgress}%` : "📋 Soumettre ma demande - 6 000 DA"}</button>
          </div>

          {uploadProgress > 0 && (
            <div className="upload-progress">
              <div className="progress-bar" style={{ width: `${uploadProgress}%` }} />
              <small>{uploadProgress}%</small>
            </div>
          )}

          {message && (
            <div className={`alert ${message.type === "error" ? "alert-error" : "alert-success"}`}>
              {message.text}
            </div>
          )}
        </form>

        <div className="service-summary">
          <h3>📄 Ce que vous recevrez :</h3>
          <ul>
            <li>✓ Un comparatif détaillé des formations et universités recommandées</li>
            <li>✓ Le taux d'admission, le nombre de places et les débouchés pour chaque choix</li>
            <li>✓ Une liste stratégique classée par vos chances de réussite</li>
            <li>✓ Un choix final d'université et de formation adapté à votre profil</li>
          </ul>
        </div>
      </div>
      {IsLoading && <Loading />}
    </div>
  );
}
