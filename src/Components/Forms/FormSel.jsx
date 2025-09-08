import React, { useState, useRef, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { Api_link } from "../../assets/Api";
import "../../Css/Services/FormSel.css";
import Loading from "../Loading";

export default function FormSel({ UserData }) {
const Cookie = new Cookies();
  const token = Cookie.get("Nazya_access_token");
  const [IsLoading, SetIsLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: UserData?.name || "",
    email: UserData?.email || "",
    phone: "",
    age: "",
    serviceType: "",
    currentLevel: "",
    currentField: "",
    average: "",
    specificDomain: "",
    frenchLevel: "",
    tcfScore: "",
    englishLevel: "",
    otherLanguage: "",
    interests: "",
    objectives: "",
    questions: "",
  });

  const [files, setFiles] = useState({ documents: [] });
  const docsRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [fileError, setFileError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [successMsg, setSuccessMsg] = useState("");
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const maxFiles = 2;
  const maxFileSizeMB = 3;

  useEffect(() => {
    setForm((p) => ({
      ...p,
      fullName: UserData?.name || "",
      email: UserData?.email || "",
    }));
  }, [UserData]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setServerError("");
    setSuccessMsg("");
  }

  function selectService(type) {
    setForm((p) => ({
      ...p,
      serviceType: type,
      specificDomain: type === "specific" ? p.specificDomain : "",
    }));
    setErrors((prev) => ({ ...prev, serviceType: undefined, specificDomain: undefined }));
  }

  function humanFileSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1024 / 1024).toFixed(2) + " MB";
  }

  function handleFiles(e) {
    const incoming = Array.from(e.target.files || []);
    if (!incoming.length) return;

    let current = [...files.documents];
    const errs = [];

    for (const f of incoming) {
      if (current.length >= maxFiles) {
        errs.push(`Maximum ${maxFiles} fichiers atteints`);
        break;
      }
      if (f.size / 1024 / 1024 > maxFileSizeMB) {
        errs.push(`${f.name} dépasse ${maxFileSizeMB}MB`);
        continue;
      }
      const dup = current.some((x) => x.name === f.name && x.size === f.size);
      if (dup) {
        errs.push(`${f.name} : déjà ajouté`);
        continue;
      }
      current.push(f);
    }

    if (errs.length) setFileError(errs.join(" — "));
    else setFileError("");

    setFiles({ documents: current });
    e.target.value = null;
  }

  function removeFile(index) {
    setFiles((p) => ({ documents: p.documents.filter((_, i) => i !== index) }));
    setFileError("");
  }

  function validate() {
  const e = {};
  if(!form.fullName.trim()) e.fullName="Le nom complet est requis";
  if(!form.email.trim()) e.email="L'email est requis";
  else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email="L'email est invalide";
  if(!form.phone.trim()) e.phone="Le téléphone est requis";
  else if(!/^[0-9+\s()-]{6,20}$/.test(form.phone)) e.phone="Le téléphone semble invalide";
  if(!form.age) e.age="L'âge est requis";
  else if(form.age<16||form.age>100) e.age="Âge doit être entre 16 et 100";
  if(!form.serviceType) e.serviceType="Choisissez un type de service";
  if(!form.currentLevel) e.currentLevel="Niveau actuel requis";
  if(!form.currentField) e.currentField="Champ actuel requis";
  if(!form.average) e.average="Moyenne requise";
  if(!form.frenchLevel) e.frenchLevel="Niveau de français requis";
  if(!form.tcfScore) e.tcfScore="Score TCF requis";
  if(!form.englishLevel) e.englishLevel="Niveau d'anglais requis";
  if(!form.interests) e.interests="Veuillez indiquer vos intérêts";
  if(!form.objectives) e.objectives="Veuillez indiquer vos objectifs";
  if(!form.questions) e.questions="Veuillez poser une question ou commentaire";
  if(form.serviceType==="specific"&&!form.specificDomain) e.specificDomain="Choisissez un domaine";
  if(!files.documents.length) e.documents="Veuillez joindre au moins un document";
  setErrors(e);
  return Object.keys(e).length===0;
}


  async function submitForm(ev) {
    ev.preventDefault();
    setServerError("");
    setSuccessMsg("");

    if (!UserData?.id) {
      setServerError("Veuillez vous connecter / créer un compte avant d'envoyer la demande.");
      return;
    }

    if (!validate()) return;

    const fd = new FormData();
    if (UserData?.id) fd.append("user_id", UserData.id);
    if (UserData?.name) fd.append("user_name", UserData.name);
    if (UserData?.email) fd.append("user_email", UserData.email);

    Object.keys(form).forEach((k) => {
      if (form[k] !== undefined && form[k] !== null) fd.append(k, form[k]);
    });

    files.documents.forEach((f) => fd.append("documents[]", f, f.name));

    try {
      setSubmitting(true);
      setUploadProgress(0);

      const headers = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

        console.log("Payload envoyé:", [...fd.entries()]);
        SetIsLoading(true);
      const res = await axios.post(`${Api_link}Sel-Request`, fd, {
        headers,
        onUploadProgress: (ev) => {
          if (!ev.lengthComputable) return;
          setUploadProgress(Math.round((ev.loaded * 100) / ev.total));
        },
        timeout: 120000,
      });

      console.log(res)

      setSuccessMsg(res?.data?.message || "Demande envoyée avec succès !");
      setForm({
        fullName: UserData?.name || "",
        email: UserData?.email || "",
        phone: "",
        age: "",
        serviceType: "",
        currentLevel: "",
        currentField: "",
        average: "",
        specificDomain: "",
        frenchLevel: "",
        tcfScore: "",
        englishLevel: "",
        otherLanguage: "",
        interests: "",
        objectives: "",
        questions: "",
      });
      setFiles({ documents: [] });
      setErrors({});
      setFileError("");
      alert("Envoyé avec succès!")
    } catch (err) {
      const msg = err?.response?.data?.message || err?.response?.data || err.message || "Erreur lors de l'envoi";
      setServerError(typeof msg === "string" ? msg : JSON.stringify(msg));
      console.log(err)
    } finally {
      setSubmitting(false);
      setUploadProgress(0);
      SetIsLoading(false);
      if (docsRef.current) docsRef.current.value = null;
    }
  }

  const isDisabled = !UserData?.id || submitting;

  return (
    <div className="per-wrap">
  {/* رسالة خطأ علوية لو اليوزر غير مسجل */}
  {!UserData?.id && (
    <div className="top-error">
      ⚠️ Veuillez vous connecter pour soumettre la demande.{" "}
      <span className="small">
        (Se connecter permettra de pré-remplir votre nom & email)
      </span>
    </div>
  )}

  {serverError && <div className="top-error">{serverError}</div>}
  {successMsg && <div className="top-success">{successMsg}</div>}

  <form className="per-form" onSubmit={submitForm} noValidate>
    {/* Personal */}
    <section className="card-sel">
      <h3>👤 Informations Personnelles</h3>
      <div className="grid2">
        <div className="form-field-lettre">
          <label className="form-label-lettre">Nom complet *</label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="form-input-lettre"
          />
        {errors.fullName && <small className="error">{errors.fullName}</small>}

        </div>

        <div className="form-field-lettre">
          <label className="form-label-lettre">Email *</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            disabled={isDisabled && !UserData?.id}
            className="form-input-lettre"
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="form-field-lettre">
          <label className="form-label-lettre">Téléphone *</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Ex: +2136..."
            className="form-input-lettre"
          />
          {errors.phone && (
            <span className="error-message">{errors.phone}</span>
          )}
        </div>

        <div className="form-field-lettre">
          <label className="form-label-lettre">Âge</label>
          <input
            name="age"
            type="number"
            min="16"
            max="100"
            value={form.age}
            onChange={handleChange}
            className="form-input-lettre"
          />
            {errors.age && <small className="error">{errors.age}</small>}

        </div>
      </div>
    </section>

    {/* Service type */}
    <section className="card-sel">
      <h3>🎯 Type de Service Souhaité</h3>
      <div className="service-grid">
        <div
          className={`service-card ${
            form.serviceType === "specific" ? "selected" : ""
          }`}
          onClick={() => selectService("specific")}
        >
          <input
            type="radio"
            name="serviceType"
            checked={form.serviceType === "specific"}
            readOnly
          />
          <div className="svc-title">Domaine spécifique — 3 000 DA</div>
          <div className="svc-desc">
            Vous savez le domaine — on cible les formations & universités
            correspondantes.
          </div>
        </div>
        <div
          className={`service-card ${
            form.serviceType === "complete" ? "selected" : ""
          }`}
          onClick={() => selectService("complete")}
        >
          <input
            type="radio"
            name="serviceType"
            checked={form.serviceType === "complete"}
            readOnly
          />
          <div className="svc-title">Orientation complète — 4 000 DA</div>
          <div className="svc-desc">
            Hésitations sur le domaine — analyse large selon votre profil.
          </div>
        </div>
      </div>
      {errors.serviceType && (
        <span className="error-message">{errors.serviceType}</span>
      )}
    </section>

    {/* Academic */}
    <section className="card-sel">
      <h3>📚 Situation Académique</h3>
      <div className="grid2">
        <div className="form-field-lettre">
          <label className="form-label-lettre">
            Niveau d'études actuel *
          </label>
          <select
            name="currentLevel"
            value={form.currentLevel}
            onChange={handleChange}
            className="form-select-lettre"
          >
            <option value="">Sélectionnez</option>
            <option value="terminale">Terminale</option>
            <option value="bac">Bachelier</option>
            <option value="l1">Licence 1</option>
            <option value="l2">Licence 2</option>
            <option value="l3">Licence 3</option>
          </select>
          {errors.currentLevel && (
            <span className="error-message">{errors.currentLevel}</span>
          )}
        </div>

        <div className="form-field-lettre">
          <label className="form-label-lettre">
            Filière actuelle / Bac obtenu
          </label>
          <input
            name="currentField"
            value={form.currentField}
            onChange={handleChange}
            className="form-input-lettre"
          />

          {errors.currentField && (
        <span className="error-message">{errors.currentField}</span>
      )}
        </div>

        <div className="form-field-lettre">
          <label className="form-label-lettre">Moyenne générale</label>
          <input
            name="average"
            type="number"
            step="0.01"
            min="0"
            max="20"
            value={form.average}
            onChange={handleChange}
            className="form-input-lettre"
          />
          {errors.average && (
        <span className="error-message">{errors.average}</span>
      )}
        </div>
      </div>
    </section>

    {/* Specific domain */}
    {form.serviceType === "specific" && (
      <section className="card-sel">
        <h3>🎯 Domaine Spécifique</h3>
        <div className="form-field-lettre">
          <label className="form-label-lettre">
            Domaine d'études souhaité *
          </label>
          <select
            name="specificDomain"
            value={form.specificDomain}
            onChange={handleChange}
            className="form-select-lettre"
          >
            <option value="">Sélectionnez un domaine</option>
            <option value="medecine">Médecine</option>
            <option value="pharmacie">Pharmacie</option>
            <option value="informatique">Informatique</option>
            <option value="ingenierie">Ingénierie</option>
            <option value="droit">Droit</option>
            <option value="economie">Économie</option>
            <option value="architecture">Architecture</option>
            <option value="langues">Langues</option>
            <option value="autre">Autre</option>
          </select>
          {errors.specificDomain && (
            <span className="error-message">{errors.specificDomain}</span>
          )}
        </div>
      </section>
    )}

    {/* Documents & language */}
    <section className="card-sel">
      <h3>📄 Documents & Niveau de Langue</h3>

      <div className="form-field-lettre">
        <label className="form-label-lettre">Documents à joindre *</label>
        <div className="upload-box" onClick={() => docsRef.current?.click()}>
          <div>📎 Cliquez pour joindre vos documents</div>
          <div className="muted">
            Bulletins, TCF, relevés... (max {maxFiles} fichiers ·{" "}
            {maxFileSizeMB}MB chacun)
          </div>
        </div>
        <input
          ref={docsRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          style={{ display: "none" }}
          onChange={handleFiles}
        />
        {fileError && <span className="error-message">{fileError}</span>}
        {errors.documents && (
          <span className="error-message">{errors.documents}</span>
        )}

        <div className="files-list">
          {files.documents.map((f, i) => (
            <div key={i} className="file-row">
              <div className="file-info">
                <span className="file-icon">
                  {f.type.includes("pdf") ? "📄" : "🖼️"}
                </span>
                <div>
                  <div className="file-name">{f.name}</div>
                  <div className="file-size">{humanFileSize(f.size)}</div>
                </div>
              </div>
              <button
                type="button"
                className="btn-remove"
                onClick={() => removeFile(i)}
              >
                Suppr.
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid2" style={{ marginTop: 12 }}>
        <div className="form-field-lettre">
          <label className="form-label-lettre">Niveau de français *</label>
          <select
            name="frenchLevel"
            value={form.frenchLevel}
            onChange={handleChange}
            className="form-select-lettre"
          >
            <option value="">Sélectionnez</option>
            <option value="a1">A1</option>
            <option value="a2">A2</option>
            <option value="b1">B1</option>
            <option value="b2">B2</option>
            <option value="c1">C1</option>
            <option value="c2">C2</option>
            <option value="natif">Natif</option>
          </select>
          {errors.frenchLevel && (
            <span className="error-message">{errors.frenchLevel}</span>
          )}
        </div>

        <div className="form-field-lettre">
          <label className="form-label-lettre">Score TCF (optionnel)</label>
          <input
            name="tcfScore"
            type="number"
            min="100"
            max="699"
            value={form.tcfScore}
            onChange={handleChange}
            className="form-input-lettre"
          />
          {errors.tcfScore && (
        <span className="error-message">{errors.tcfScore}</span>
      )}
        </div>
      </div>

      <div className="grid2" style={{ marginTop: 12 }}>
        <div className="form-field-lettre">
          <label className="form-label-lettre">Anglais</label>
          <select
            name="englishLevel"
            value={form.englishLevel}
            onChange={handleChange}
            className="form-select-lettre"
          >
            <option value="">--</option>
            <option value="a1">A1</option>
            <option value="a2">A2</option>
            <option value="b1">B1</option>
            <option value="b2">B2</option>
            <option value="c1">C1</option>
            <option value="c2">C2</option>
            <option value="natif">Natif</option>
          </select>
          {errors.englishLevel && (
        <span className="error-message">{errors.englishLevel}</span>
      )}
        </div>

        <div className="form-field-lettre">
          <label className="form-label-lettre">Autre langue</label>
          <input
            name="otherLanguage"
            value={form.otherLanguage}
            onChange={handleChange}
            className="form-input-lettre"
          />
          
        </div>
      </div>
    </section>

    {/* Additional info */}
    <section className="card-sel">
      <h3>💬 Informations Complémentaires</h3>
      <div className="form-field-lettre">
        <label className="form-label-lettre">
          Centres d'intérêt et compétences
        </label>
        <textarea
          name="interests"
          value={form.interests}
          onChange={handleChange}
          rows={3}
          className="form-textarea-lettre"
        />
        {errors.interests && (
        <span className="error-message">{errors.interests}</span>
      )}
      </div>
      <div className="form-field-lettre">
        <label className="form-label-lettre">Objectifs professionnels</label>
        <textarea
          name="objectives"
          value={form.objectives}
          onChange={handleChange}
          rows={3}
          className="form-textarea-lettre"
        />
        {errors.objectives && (
        <span className="error-message">{errors.objectives}</span>
      )}
      </div>
      <div className="form-field-lettre">
        <label className="form-label-lettre">
          Questions ou demandes spécifiques
        </label>
        <textarea
          name="questions"
          value={form.questions}
          onChange={handleChange}
          rows={3}
          className="form-textarea-lettre"
        />
        {errors.questions && (
        <span className="error-message">{errors.questions}</span>
      )}
      </div>
    </section>

    {/* Progress + submit */}
    <div className="submit-wrap">
      {uploadProgress > 0 && (
        <div className="progress">
          <div
            className="progress-bar"
            style={{ width: `${uploadProgress}%` }}
          />
          <div className="progress-label">{uploadProgress}%</div>
        </div>
      )}

      <button type="submit" className="btn-primary" disabled={isDisabled}>
        {submitting
          ? `Envoi... ${uploadProgress}%`
          : "📤 Envoyer ma demande"}
      </button>
      <div className="muted center">
        Nous vous contacterons dans les 24h pour confirmer votre demande
      </div>
    </div>
  </form>

  { IsLoading && <Loading />}
</div>

  );
}
