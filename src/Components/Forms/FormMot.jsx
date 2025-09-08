import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Api_link } from "../../assets/Api";
import '../../Css/Services/FormMot.css';


export default function FormMot( {UserData} ) {

  const maxFiles = 3;
  const maxFileSizeMB = 5;
  const Cookie = new Cookies();
  const token = Cookie.get("Nazya_access_token");
  const [IsLoading, SetIsLoading] = useState(false);

  const PACKAGES = [
    { key: "1-lettre", label: "1 Lettre", price: 2000 },
    { key: "2-lettres", label: "2 Lettres", price: 3000 },
    { key: "3-lettres", label: "3 Lettres", price: 3500 },
    { key: "4-lettres", label: "4 Lettres", price: 4500 },
    { key: "5-lettres", label: "5 Lettres", price: 5000 },
    { key: "7-lettres", label: "7 Lettres", price: 6000 },
  ];

  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const [selectedPkg, setSelectedPkg] = useState(null);
  const [form, setForm] = useState({
    fullName: UserData?.name || "",
    email: UserData?.email || "",
    phone: "",
    field: "",
    universities: "",
    studyProject: "",
    academic: "",
  });
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [fileError, setFileError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    setSuccessMessage("");
    setErrorMessage("");
  }, [form, files, selectedPkg]);

  function humanFileSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1024 / 1024).toFixed(2) + " MB";
  }

  function handleInput(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function selectPackage(pkg) {
    setSelectedPkg(pkg);
    setErrors((p) => ({ ...p, selectedPkg: undefined }));
  }

  function handleFilesSelect(list) {
    const incoming = Array.from(list || []);
    if (!incoming.length) return;

    const validated = [];
    const errs = [];

    const slots = maxFiles - files.length;
    if (incoming.length > slots) {
      errs.push(`Vous pouvez télécharger au maximum ${maxFiles} fichiers`);
    }

    for (const file of incoming) {
      if (files.length + validated.length >= maxFiles) break;

      const sizeMB = file.size / 1024 / 1024;
      const okType =
        allowedTypes.includes(file.type) ||
        /\.(pdf|jpg|jpeg|png|doc|docx)$/i.test(file.name);

      if (!okType) {
        errs.push(`${file.name} : type de fichier non autorisé`);
        continue;
      }
      if (sizeMB > maxFileSizeMB) {
        errs.push(`${file.name} : taille > ${maxFileSizeMB} MB`);
        continue;
      }

      const dup =
        files.some((f) => f.name === file.name && f.size === file.size) ||
        validated.some((f) => f.name === file.name && f.size === file.size);
      if (dup) {
        errs.push(`${file.name} : fichier déjà ajouté`);
        continue;
      }

      validated.push(file);
    }

    if (errs.length) {
      setFileError(errs.join(" — "));
    } else {
      setFileError("");
    }

    if (validated.length) setFiles((p) => [...p, ...validated]);

    if (fileInputRef.current) fileInputRef.current.value = null;
  }

  function removeFile(index) {
    setFiles((p) => p.filter((_, i) => i !== index));
  }

  function validate() {
    const e = {};
    if (!selectedPkg) e.selectedPkg = "Veuillez choisir une formule";
    if (!form.fullName.trim()) e.fullName = "Le nom complet est requis";
    if (!form.email.trim()) e.email = "L'adresse e-mail est requise";
    else {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(form.email)) e.email = "Adresse e-mail invalide";
    }
    if (!form.phone.trim()) e.phone = "Le numéro de téléphone est requis";
    else {
      const rePhone = /^[0-9+\\s()-]{6,20}$/;
      if (!rePhone.test(form.phone)) e.phone = "Numéro de téléphone invalide";
    }
    if (!form.field.trim()) e.field = "Le domaine est requis";
    if (!form.universities.trim()) e.universities = "Les universités sont requises";
    if (!form.studyProject.trim()) e.studyProject = "Le projet d'études est requis";
    if (!form.academic.trim()) e.academic = "Le parcours académique est requis";

    setErrors(e);
    return Object.keys(e).length === 0;
  }


  async function submitRequest(ev) {
    ev.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    if (!validate()) return;

    const fd = new FormData();
    if (UserData?.id) fd.append("user_id", UserData.id);
    if (UserData?.name) fd.append("user_name", UserData.name);
    if (UserData?.email) fd.append("user_email", UserData.email);

    fd.append("package_key", selectedPkg.key);
    fd.append("package_label", selectedPkg.label);
    fd.append("package_price", selectedPkg.price);

    fd.append("fullName", form.fullName);
    fd.append("email", form.email);
    fd.append("phone", form.phone);
    fd.append("field", form.field);
    fd.append("universities", form.universities);
    fd.append("studyProject", form.studyProject);
    fd.append("academic", form.academic);

    files.forEach((f) => fd.append("documents[]", f, f.name));

    try {
      SetIsLoading(true);
      setUploadProgress(0);

      const headers = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;
    console.log([...fd.entries()]);

      const res = await axios.post(`${Api_link}Motivation-Request`, fd, {
        headers,
        onUploadProgress: (ev) => {
          if (!ev.lengthComputable) return;
          setUploadProgress(Math.round((ev.loaded * 100) / ev.total));
        },
        timeout: 120000,
      });
      console.log(res)
      setSuccessMessage(res?.data?.message || "Demande envoyée avec succès !");
setForm({
  fullName: UserData?.name || "",
  email: UserData?.email || "",
  phone: "",
  field: "",
  universities: "",
  studyProject: "",
  academic: "",
});   setFiles([]);
      setSelectedPkg(null);
    } catch (err) {
      console.error(err);
      setErrorMessage(err?.response?.data?.message || err.message || "Erreur lors de l'envoi");
    } finally {
      SetIsLoading(false);
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = null;
    }
  }

  return (
    <div className="form-lettre-container">
      <h2 className="form-title">📝 Demande de Service — Lettres de Motivation</h2>
      <p className="form-subtitle">Choisissez une formule et remplissez vos informations</p>

      <div className="package-grid">
        {PACKAGES.map((p) => (
          <div key={p.key} onClick={() => selectPackage(p)} className={`package-card ${selectedPkg?.key === p.key ? "selected" : ""}`}>
            <div>
              <div className="package-price">{p.price} DA</div>
              <div className="package-label">{p.label}</div>
              <div className="package-desc">Rédaction professionnelle</div>
            </div>
            <div className="badge">{selectedPkg?.key === p.key ? "✓" : ""}</div>
          </div>
        ))}
      </div>

      <form className="form-content" onSubmit={submitRequest} noValidate>
        <div className="form-grid-lettre">
          <div className="form-field-lettre">
            <label>Nom complet</label>
            <input name="fullName" value={form.fullName} onChange={handleInput} placeholder="Nom complet" className="form-input-lettre" />
            {errors.fullName && <div className="error-message">{errors.fullName}</div>}
          </div>

          <div className="form-field-lettre">
            <label>Email</label>
            <input name="email" value={form.email} onChange={handleInput} placeholder="Adresse e-mail" className="form-input-lettre" />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
        </div>

        <div className="form-field-lettre">
          <label>Téléphone</label>
          <input name="phone" value={form.phone} onChange={handleInput} placeholder="Numéro de téléphone" className="form-input-lettre" />
          {errors.phone && <div className="error-message">{errors.phone}</div>}
        </div>

        <div className="form-field-lettre">
          <label>Formule choisie</label>
          <input readOnly value={selectedPkg ? `${selectedPkg.label} — ${selectedPkg.price} DA` : ""} className="form-input-disabled" />
          {errors.selectedPkg && <div className="error-message">{errors.selectedPkg}</div>}
        </div>

        <div className="form-field-lettre">
          <label>Domaine / Spécialité</label>
          <input name="field" value={form.field} onChange={handleInput} placeholder="Votre domaine ou spécialité" className="form-input-lettre" />
          {errors.field && <div className="error-message">{errors.field}</div>}
        </div>

        <div className="form-field-lettre">
          <label>Universités / Formations ciblées</label>
          <textarea name="universities" value={form.universities} onChange={handleInput} rows="2" placeholder="Universités ciblées" className="form-textarea-lettre"></textarea>
          {errors.universities && <div className="error-message">{errors.universities}</div>}
        </div>

        <div className="form-field-lettre">
          <label>Projet d'études / professionnel</label>
          <textarea name="studyProject" value={form.studyProject} onChange={handleInput} rows="3" placeholder="Décrivez votre projet" className="form-textarea-lettre"></textarea>
          {errors.studyProject && <div className="error-message">{errors.studyProject}</div>}
        </div>

        <div className="form-field-lettre">
          <label>Parcours académique</label>
          <textarea name="academic" value={form.academic} onChange={handleInput} rows="3" placeholder="Votre parcours académique" className="form-textarea-lettre"></textarea>
          {errors.academic && <div className="error-message">{errors.academic}</div>}
        </div>

        <div className="file-upload-area" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
          <div className="file-upload-icon">📁</div>
          <div className="file-upload-text">Cliquez ou glissez vos fichiers ici</div>
          <div className="file-upload-subtext">PDF, JPG, PNG, DOC — max {maxFiles} fichiers, {maxFileSizeMB}MB chacun</div>
          <input ref={fileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" multiple style={{ display: "none" }} onChange={(e) => handleFilesSelect(e.target.files)} />
        </div>

        {fileError && <div className="info-warning">{fileError}</div>}

        {files.length > 0 && (
          <div className="file-list">
            {files.map((f, i) => (
              <div key={i} className="file-item">
                <div className="file-info">
                  <div className="file-name">📄 {f.name}</div>
                  <div className="file-size">{humanFileSize(f.size)}</div>
                </div>
                <button type="button" className="remove-file" onClick={() => removeFile(i)}>Supprimer</button>
              </div>
            ))}
          </div>
        )}

        {uploadProgress > 0 && (
          <>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
            </div>
            <div className="progress-percent">{uploadProgress}%</div>
          </>
        )}

        {errorMessage && <div className="info-warning">{errorMessage}</div>}
        {successMessage && <div className="success-message-lettre">{successMessage}</div>}

        <div className="form-actions-lettre">
          <button type="button" className="reset-button-lettre" onClick={() => {
            setForm({ fullName: userData?.name || "", email: userData?.email || "", phone: "", field: "", universities: "", studyProject: "", academic: "" });
            setFiles([]);
            setSelectedPkg(null);
            setErrors({});
            setFileError("");
            setSuccessMessage("");
            setErrorMessage("");
          }}>Réinitialiser</button>

          <button type="submit" disabled={IsLoading} className="submit-button-lettre">
            {IsLoading ? `Envoi... ${uploadProgress}%` : (`Envoyer ma demande${selectedPkg ? ' — ' + selectedPkg.price + ' DA' : ''}`)}
          </button>
        </div>
      </form>
    </div>
  );
}
