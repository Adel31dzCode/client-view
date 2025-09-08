import React, { useState, useRef } from "react";
import "../../Css/Services/FormPer.css";
import Cookies from "universal-cookie";
import axios from "axios";
import { Api_link } from "../../assets/Api";
import Loading from "../Loading";

export default function FormPer({ UserData }) {
  const Cookie = new Cookies();
  const token = Cookie.get("Nazya_access_token");

  const [form, setForm] = useState({
    fullName: UserData?.name || "",
    email: UserData?.email || "",
    phone: "",
    currentLevel: "",
    currentField: "",
    frenchLevel: "",
    englishLevel: "",
    otherLanguages: "",
  });

  const [files, setFiles] = useState({
    lyceeDocuments: [],
    documents: [],
  });

  const [errors, setErrors] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [IsLoading, SetIsLoading] = useState(false);

  const lyceeRef = useRef(null);
  const docsRef = useRef(null);

  const maxFiles = 2;
  const maxFileSizeMB = 3;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleFiles(e, field) {
    const incoming = Array.from(e.target.files);
    let current = [...files[field]];

    for (let f of incoming) {
      if (f.size / 1024 / 1024 > maxFileSizeMB) {
        alert(`${f.name} dépasse ${maxFileSizeMB}MB`);
        continue;
      }
      if (current.length < maxFiles) {
        current.push(f);
      } else {
        alert(`Maximum ${maxFiles} fichiers autorisés pour ${field}`);
        break;
      }
    }
    setFiles((prev) => ({ ...prev, [field]: current }));
    e.target.value = "";
  }

  function removeFile(field, index) {
    setFiles((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  }

  function validate() {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Le nom complet est requis";
    if (!form.email.trim()) e.email = "L'email est requis";
    else {
      const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
      if (!re.test(form.email)) e.email = "L'email est invalide";
    }
    if (!form.phone.trim()) e.phone = "Le téléphone est requis";
    else {
      const rePhone = /^[0-9+\s()-]{6,20}$/;
      if (!rePhone.test(form.phone))
        e.phone = "Le téléphone semble invalide";
    }
    if (!form.currentLevel) e.currentLevel = "Niveau actuel requis";
    if (!form.currentField.trim())
      e.currentField = "Spécialité actuelle requise";
    if (!form.frenchLevel) e.frenchLevel = "Niveau de français requis";
    if (!form.englishLevel) e.englishLevel = "Niveau d'anglais requis";
    if (files.lyceeDocuments.length === 0)
      e.lyceeDocuments = "Bulletins de lycée obligatoires";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submitForm(e) {
    e.preventDefault();
    if (!validate()) return;

    const fd = new FormData();
    if (UserData?.id) fd.append("user_id", UserData.id);
    if (UserData?.name) fd.append("user_name", UserData.name);
    if (UserData?.email) fd.append("user_email", UserData.email);

    Object.keys(form).forEach((k) => fd.append(k, form[k]));

    files.lyceeDocuments.forEach((f) =>
      fd.append("lyceeDocuments[]", f, f.name)
    );
    files.documents.forEach((f) => fd.append("documents[]", f, f.name));

    try {
      setSubmitting(true);
      setSuccessMsg("");
      setServerError("");

      const headers = { "Content-Type": "multipart/form-data" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      console.log("Payload envoyé:", [...fd.entries()]);

      SetIsLoading(true);
      const res = await axios.post(`${Api_link}Per-Request`, fd, {
        headers,
        onUploadProgress: (ev) => {
          if (ev.lengthComputable) {
            setUploadProgress(Math.round((ev.loaded * 100) / ev.total));
          }
        },
        timeout: 120000,
      });

      console.log("Réponse API:", res.data);
      setSuccessMsg(res?.data?.message || "✅ Demande envoyée avec succès !");

      // reset
      setForm({
        fullName: "",
        email: "",
        phone: "",
        currentLevel: "",
        currentField: "",
        frenchLevel: "",
        englishLevel: "",
        otherLanguages: "",
      });
      setFiles({
        lyceeDocuments: [],
        documents: [],
      });
    } catch (err) {
      console.error("Erreur API:", err);
      setServerError(
        err?.response?.data?.message ||
          "❌ Erreur lors de l'envoi du formulaire"
      );
    } finally {
      SetIsLoading(false);
      setSubmitting(false);
      setUploadProgress(0);
      if (lyceeRef.current) lyceeRef.current.value = null;
      if (docsRef.current) docsRef.current.value = null;
    }
  }



  return (
    <div className="formper-wrap">

        {!UserData && <p className="error-message warn-register-first">Inscrivez-vous d'abord</p>}
      <form className="formper" onSubmit={submitForm}>
        {/* Infos personnelles */}
        <section className="card-per">
          <h2>📋 Informations Personnelles</h2>
          <div className="row2">
            <div className="field">
              <label>Nom complet *</label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                disabled={!UserData}
              />
              {errors.fullName && (
                <span className="error-message">{errors.fullName}</span>
              )}
            </div>
            <div className="field">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                disabled={!UserData}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>
          </div>
          <div className="field">
            <label>Téléphone *</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+213..."
              disabled={!UserData}
            />
            {errors.phone && (
              <span className="error-message">{errors.phone}</span>
            )}
          </div>
        </section>

        {/* Parcours académique */}
        <section className="card-per">
          <h2>🎓 Parcours Académique</h2>
          <div className="row2">
            <div className="field">
              <label>Niveau actuel *</label>
              <select
                name="currentLevel"
                value={form.currentLevel}
                onChange={handleChange}
                disabled={!UserData}
              >
                <option value="">-- Sélectionnez --</option>
                <option value="bac">Baccalauréat</option>
                <option value="bac+1">Bac+1</option>
                <option value="bac+2">Bac+2</option>
                <option value="bac+3">Licence</option>
              </select>
              {errors.currentLevel && (
                <span className="error-message">{errors.currentLevel}</span>
              )}
            </div>
            <div className="field">
              <label>Spécialité *</label>
              <input
                name="currentField"
                value={form.currentField}
                onChange={handleChange}
                disabled={!UserData}
              />
              {errors.currentField && (
                <span className="error-message">{errors.currentField}</span>
              )}
            </div>
          </div>
        </section>

        {/* Documents */}
        <section className="card-per">
          <h2>📎 Documents</h2>
          <div className="file-block">
            <label>Bulletins de lycée *</label>
            <div
              className="upload-box"
              onClick={() => lyceeRef.current?.click()}
            >
              <span className="upload-ico">📄</span>
              <div>
                <div className="upload-title">Joindre les bulletins</div>
                <div className="upload-sub">Max {maxFiles} fichiers</div>
              </div>
            </div>
            <input
              ref={lyceeRef}
              type="file"
              className="hidden-file"
              multiple
              onChange={(e) => handleFiles(e, "lyceeDocuments")}
              disabled={!UserData}
            />
            {errors.lyceeDocuments && (
              <span className="error-message">{errors.lyceeDocuments}</span>
            )}
            <div className="file-list">
              {files.lyceeDocuments.map((f, i) => (
                <div className="file-row" key={i}>
                  <span>{f.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile("lyceeDocuments", i)}
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="file-block">
            <label>Autres documents (optionnel)</label>
            <div
              className="upload-box"
              onClick={() => docsRef.current?.click()}
            >
              <span className="upload-ico">📎</span>
              <div>
                <div className="upload-title">Joindre d'autres fichiers</div>
              </div>
            </div>
            <input
              ref={docsRef}
              type="file"
              className="hidden-file"
              multiple
              onChange={(e) => handleFiles(e, "documents")}
              disabled={!UserData}
            />
            <div className="file-list">
              {files.documents.map((f, i) => (
                <div className="file-row" key={i}>
                  <span>{f.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile("documents", i)}
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Langues */}
        <section className="card-per">
          <h2>🌐 Compétences Linguistiques</h2>
          <div className="row2">
            <div className="field">
              <label>Français *</label>
              <select
                name="frenchLevel"
                value={form.frenchLevel}
                onChange={handleChange}
                disabled={!UserData}
              >
                <option value="">--</option>
                <option>Débutant</option>
                <option>Intermédiaire</option>
                <option>Avancé</option>
                <option>Natif</option>
              </select>
              {errors.frenchLevel && (
                <span className="error-message">{errors.frenchLevel}</span>
              )}
            </div>
            <div className="field">
              <label>Anglais *</label>
              <select
                name="englishLevel"
                value={form.englishLevel}
                onChange={handleChange}
                disabled={!UserData}
              >
                <option value="">--</option>
                <option>Débutant</option>
                <option>Intermédiaire</option>
                <option>Avancé</option>
                <option>Natif</option>
              </select>
              {errors.englishLevel && (
                <span className="error-message">{errors.englishLevel}</span>
              )}
            </div>
          </div>
          <div className="field">
            <label>Autres langues</label>
            <textarea
              name="otherLanguages"
              value={form.otherLanguages}
              onChange={handleChange}
              disabled={!UserData}
            ></textarea>
          </div>
        </section>

        {/* Submit */}
        <section className="card-per">
          <div className="summary">
            <button type="submit" className="primary-btn">
              Soumettre ma demande
            </button>
          </div>
        </section>

                {/* Progress + Messages */}
        {uploadProgress > 0 && (
          <div className="progress-bar">
            Progression: {uploadProgress}%
          </div>
        )}
        {successMsg && <p className="success-message">{successMsg}</p>}
        {serverError && <p className="error-message">{serverError}</p>}
      </form>

      { IsLoading && <Loading />}
    </div>
  );
}
