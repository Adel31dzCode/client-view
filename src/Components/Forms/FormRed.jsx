import React, { useState, useRef, useEffect } from "react";
import "../../Css/Services/FormRed.css";
import Cookies from "universal-cookie";
import axios from "axios";
import { Api_link } from "../../assets/Api";
import Loading from "../Loading";

export default function FormRed({ UserData }) {
  const Cookie = new Cookies();
  const token = Cookie.get("Nazya_access_token");
  const [IsLoading, SetIsLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: UserData?.name || "",
    email: UserData?.email || "",
    phone: "",
    serviceType: "",
    currentLevel: "",
    currentField: "",
    average: "",
    frenchLevel: "",
    englishLevel: "",
    otherLanguages: "",
    universities: "",
    formations: "",
    deadline: "",
    specificRequests: "",
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
    setForm((p) => ({ ...p, serviceType: type }));
    setErrors((prev) => ({ ...prev, serviceType: undefined }));
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
    if (!form.fullName.trim()) e.fullName = "Le nom complet est requis";
    if (!form.email.trim()) e.email = "L'email est requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "L'email est invalide";
    if (!form.phone.trim()) e.phone = "Le téléphone est requis";
    else if (!/^[0-9+\s()-]{6,20}$/.test(form.phone)) e.phone = "Le téléphone semble invalide";
    if (!form.serviceType) e.serviceType = "Choisissez un type de service";
    if (!form.currentLevel) e.currentLevel = "Niveau actuel requis";
    if (!form.currentField) e.currentField = "Champ actuel requis";
    if (!form.average) e.average = "Moyenne requise";
    if (!form.frenchLevel) e.frenchLevel = "Niveau de français requis";
    if (!form.englishLevel) e.englishLevel = "Niveau d'anglais requis";
    if (!form.universities.trim()) e.universities = "Liste des universités requise";
    if (!form.formations.trim()) e.formations = "Liste des formations requise";
    if (!form.deadline) e.deadline = "Délai de livraison requis";
    
    setErrors(e);
    return Object.keys(e).length === 0;
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
      const res = await axios.post(`${Api_link}reduction-request`, fd, {
        headers,
        onUploadProgress: (ev) => {
          if (!ev.lengthComputable) return;
          setUploadProgress(Math.round((ev.loaded * 100) / ev.total));
        },
        timeout: 120000,
      });

      console.log(res);

      setSuccessMsg(res?.data?.message || "Demande envoyée avec succès !");
      setForm({
        fullName: UserData?.name || "",
        email: UserData?.email || "",
        phone: "",
        serviceType: "",
        currentLevel: "",
        currentField: "",
        average: "",
        frenchLevel: "",
        englishLevel: "",
        otherLanguages: "",
        universities: "",
        formations: "",
        deadline: "",
        specificRequests: "",
        questions: "",
      });
      setFiles({ documents: [] });
      setErrors({});
      setFileError("");
      alert("Envoyé avec succès!");
    } catch (err) {
      const msg = err?.response?.data?.message || err?.response?.data || err.message || "Erreur lors de l'envoi";
      setServerError(typeof msg === "string" ? msg : JSON.stringify(msg));
      console.log(err);
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
        {/* Personal Information */}
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
                disabled={isDisabled && !UserData?.id}
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
              {errors.email && <small className="error">{errors.email}</small>}
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
              {errors.phone && <small className="error">{errors.phone}</small>}
            </div>

           
          </div>
        </section>

        {/* Service Type */}
        <section className="card-sel">
          <h3>📝 Type de Service</h3>
          <div className="service-grid">
            {[
              {
                id: "one-letter",
                title: "1 lettre personnalisée pour 3 universités",
                price: "2 000 DA",
                desc: "Une lettre de motivation personnalisée que vous pourrez utiliser pour 3 universités différentes."
              },
              {
                id: "two-letters",
                title: "2 lettres de motivation",
                price: "3 000 DA",
                desc: "Deux lettres de motivation distinctes et personnalisées pour des formations ou universités différentes."
              },
              {
                id: "three-letters",
                title: "3 lettres de motivation personnalisées",
                price: "3 500 DA",
                desc: "Trois lettres de motivation entièrement personnalisées, chaque université avec sa propre lettre unique et adaptée."
              }
            ].map((service) => (
              <div
                key={service.id}
                className={`service-card ${form.serviceType === service.id ? "selected" : ""}`}
                onClick={() => selectService(service.id)}
              >
                <input
                  type="radio"
                  name="serviceType"
                  checked={form.serviceType === service.id}
                  readOnly
                />
                <div className="svc-content">
                  <h3 className="svc-title">{service.title}</h3>
                  <p className="svc-desc">{service.desc}</p>
                  <p className="svc-price">{service.price}</p>
                </div>
              </div>
            ))}
          </div>
          {errors.serviceType && <small className="error">{errors.serviceType}</small>}
        </section>

        {/* Academic Information */}
        <section className="card-sel">
          <h3>📚 Parcours Académique</h3>
          <div className="grid2">
            <div className="form-field-lettre">
              <label className="form-label-lettre">Niveau d'études actuel *</label>
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
              {errors.currentLevel && <small className="error">{errors.currentLevel}</small>}
            </div>

            <div className="form-field-lettre">
              <label className="form-label-lettre">Filière actuelle / Bac obtenu *</label>
              <input
                name="currentField"
                value={form.currentField}
                onChange={handleChange}
                className="form-input-lettre"
              />
              {errors.currentField && <small className="error">{errors.currentField}</small>}
            </div>

            <div className="form-field-lettre">
              <label className="form-label-lettre">Moyenne générale *</label>
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
              {errors.average && <small className="error">{errors.average}</small>}
            </div>
          </div>
        </section>

        {/* Language Skills */}
        <section className="card-sel">
          <h3>🗣️ Compétences Linguistiques</h3>
          <div className="grid2">
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
              {errors.frenchLevel && <small className="error">{errors.frenchLevel}</small>}
            </div>

            <div className="form-field-lettre">
              <label className="form-label-lettre">Niveau d'anglais *</label>
              <select
                name="englishLevel"
                value={form.englishLevel}
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
              {errors.englishLevel && <small className="error">{errors.englishLevel}</small>}
            </div>

            <div className="form-field-lettre">
              <label className="form-label-lettre">Autres langues</label>
              <input
                name="otherLanguages"
                value={form.otherLanguages}
                onChange={handleChange}
                className="form-input-lettre"
                placeholder="Arabe, Espagnol, etc."
              />
            </div>
          </div>
        </section>

        {/* University and Program Choices */}
        <section className="card-sel">
          <h3>🎯 Vos Choix d'Universités et Formations</h3>
          <div className="form-field-lettre">
            <label className="form-label-lettre">Universités que vous visez *</label>
            <textarea
              name="universities"
              value={form.universities}
              onChange={handleChange}
              rows={3}
              className="form-textarea-lettre"
              placeholder="Listez les universités ou écoles que vous souhaitez intégrer (ex: Sorbonne, Sciences Po, Université Lyon 1...)"
            ></textarea>
            {errors.universities && <small className="error">{errors.universities}</small>}
          </div>
          <div className="form-field-lettre">
            <label className="form-label-lettre">Formations que vous avez choisies *</label>
            <textarea
              name="formations"
              value={form.formations}
              onChange={handleChange}
              rows={3}
              className="form-textarea-lettre"
              placeholder="Précisez les formations ou spécialités que vous souhaitez suivre (ex: Master en Informatique, Licence en Médecine, Master en Gestion...)"
            ></textarea>
            {errors.formations && <small className="error">{errors.formations}</small>}
          </div>
        </section>

        {/* Documents */}
        <section className="card-sel">
          <h3>📄 Documents de Référence (optionnel)</h3>
          <div className="form-field-lettre">
            <label className="form-label-lettre">Documents à joindre</label>
            <div className="upload-box" onClick={() => docsRef.current?.click()}>
              <div>📎 Cliquez pour joindre vos documents</div>
              <div className="muted">
                CV, relevés de notes, certificats... (max {maxFiles} fichiers · {maxFileSizeMB}MB chacun)
              </div>
            </div>
            <input
              ref={docsRef}
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              style={{ display: "none" }}
              onChange={handleFiles}
            />
            {fileError && <span className="error-message">{fileError}</span>}

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
        </section>

        {/* Additional Information */}
        <section className="card-sel">
          <h3>💬 Informations Complémentaires</h3>
          <div className="form-field-lettre">
            <label className="form-label-lettre">Délai souhaité pour la livraison *</label>
            <select
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
              className="form-select-lettre"
            >
              <option value="">Sélectionnez un délai</option>
              <option value="urgent">Urgent (2-3 jours) - Supplément 500 DA</option>
              <option value="standard">Standard (5-7 jours)</option>
              <option value="flexible">Flexible (10-14 jours)</option>
            </select>
            {errors.deadline && <small className="error">{errors.deadline}</small>}
          </div>
          <div className="form-field-lettre">
            <label className="form-label-lettre">Demandes spécifiques ou style souhaité</label>
            <textarea
              name="specificRequests"
              value={form.specificRequests}
              onChange={handleChange}
              rows={3}
              className="form-textarea-lettre"
              placeholder="Ton formel/décontracté, points à mettre en avant, contraintes particulières..."
            />
          </div>
          <div className="form-field-lettre">
            <label className="form-label-lettre">Questions ou préoccupations</label>
            <textarea
              name="questions"
              value={form.questions}
              onChange={handleChange}
              rows={3}
              className="form-textarea-lettre"
              placeholder="Avez-vous des questions sur le processus ou des préoccupations particulières ?"
            />
          </div>
        </section>

        {/* Submit Section */}
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
              : "📤 Envoyer ma demande de rédaction"}
          </button>
          <div className="muted center">
            Nous vous contacterons dans les 24h pour confirmer votre demande
          </div>
        </div>
      </form>

      {IsLoading && <Loading />}
    </div>
  );
}