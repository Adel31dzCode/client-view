// FormCvSmart.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Cookies from 'universal-cookie';
import "../../Css/Services/FormCv.css";
import { Api_link } from "../../assets/Api";

// تعريف رابط API (يجب تعديله حسب متطلباتك)

// --------- Default values (كل الحقول) ----------
const DEFAULT_VALUES = {
  // معلومات شخصية
  nom: "",
  prenom: "",
  adresse: "",
  email: "",
  telephone: "",
  linkedin: "",

  // Permis
  permis: "non",
  categoriesPermis: [],

  // Site web
  siteWeb: "non",
  siteWebUrl: "",

  // Baccalauréat
  baccalaureat: "non",
  lyceeActuel: "",
  filiereBac: "",
  lyceeBac: "",
  mentionBac: "",
  anneeBac: "",

  // Études supérieures
  etudesSuperieures: "non",
  niveauEtudes: "",
  etablissementActuel: "",
  specialiteActuelle: "",

  // Licence
  licenceObtenue: "non",
  nomLicence: "",
  anneeLicence: "",
  mentionLicence: "",
  etablissementLicence: "",

  // BTS
  btsObtenu: "non",
  nomBts: "",
  anneeBts: "",
  etablissementBts: "",
  mentionBts: "",

  // Diplôme fin d'études
  diplomeFinEtude: "non",
  nomDiplomeFin: "",
  anneeDiplomeFin: "",
  mentionDiplomeFin: "",
  etablissementDiplomeFin: "",

  // Expériences
  stages: "non",
  stagesDetails: "",
  postes: "non",
  postesDetails: "",

  // Compétences
  competencesTechniques: "",
  competencesInformatiques: "",
  competencesLinguistiques: "",

  // Centres d'intérêt
  centresInteret: [],
  autreInteret: "",

  // Projets
  projetFinEtude: "non",
  intituleProjetFinEtude: "",
  themeProjetFinEtude: "",
  objectifsProjetFinEtude: "",
  methodologieProjetFinEtude: "",
  resultatsProjetFinEtude: "",
  etablissementProjetFinEtude: "",
  dateDebutProjetFinEtude: "",
  dateFinProjetFinEtude: "",

  projetFinCycle: "non",
  intituleProjetFinCycle: "",
  themeProjetFinCycle: "",
  objectifsProjetFinCycle: "",
  methodologieProjetFinCycle: "",
  resultatsProjetFinCycle: "",
  etablissementProjetFinCycle: "",
  dateDebutProjetFinCycle: "",
  dateFinProjetFinCycle: "",

  // Objectif CV
  typeEtablissement: "",
  nomEtablissementVise: "",
  formationVisee: "",
  villeEtablissement: "",
  projetProfessionnel: "",
};

// --------- Zod Schema ----------
const schema = z.object({
  nom: z.string().min(1, "Nom requis"),
  prenom: z.string().min(1, "Prénom requis"),
  adresse: z.string().min(5, "Adresse trop courte"),
  email: z.string().email("Email invalide"),
  telephone: z.string().min(6, "Téléphone invalide"),
});

// --------- اختيارات مساعدة ----------
const PERMIS_CATEGORIES = [
  { value: "A", label: "A (Moto)" },
  { value: "B", label: "B (Voiture)" },
  { value: "C", label: "C (Camion)" },
  { value: "D", label: "D (Transport)" },
];

const INTERETS = [
  "Sport",
  "Musique",
  "Lecture",
  "Voyage",
  "Informatique",
  "Bénévolat",
  "Art",
];

// ---------- Component ----------
export default function FormCvSmart({ UserData }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(!UserData);
    const Cookie = new Cookies();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(schema),
  });

  // التحقق من وجود المستخدم عند التحميل وعند تغيير UserData
  useEffect(() => {
    setIsFormDisabled(!UserData);
  }, [UserData]);

  // watchers للحقول المشروطة
  const permis = watch("permis");
  const siteWeb = watch("siteWeb");
  const baccalaureat = watch("baccalaureat");
  const etudesSuperieures = watch("etudesSuperieures");
  const licenceObtenue = watch("licenceObtenue");
  const btsObtenu = watch("btsObtenu");
  const diplomeFinEtude = watch("diplomeFinEtude");
  const stages = watch("stages");
  const postes = watch("postes");
  const projetFinEtude = watch("projetFinEtude");
  const projetFinCycle = watch("projetFinCycle");

  const onSubmit = async (data) => {
    try {
      console.log(data)
      // جلب التوكن من التخزين
      const token = Cookie.get("Nazya_access_token");
      
      if (!token) {
        alert("يجب تسجيل الدخول أولاً");
        return;
      }

      // إرسال البيانات الفعلية (data) بدلاً من DEFAULT_VALUES
      const response = await axios.post(
        `${Api_link}cv-requests`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ تم الإرسال:", response.data);
      setIsSubmitted(true);
    } catch (error) {
      console.error("❌ خطأ أثناء إرسال النموذج:", error);
      const errorMessage = error.response?.data?.message || error.message;
      alert(`Error: ${error.response?.status || "Unknown"} - ${errorMessage}`);
    }
  };

  // إذا لم يكن المستخدم موجودًا، عرض رسالة
  if (!UserData) {
    return (
      <div className="form-cv-container">
        <div className="form-disabled-message">
          <h2>يجب تسجيل الدخول أولاً</h2>
          <p>عذرًا، يجب أن تكون مسجلاً الدخول لاستخدام هذه الخدمة.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-cv-container">
      <div className="form-cv-header">
        <h1>Création de CV</h1>
        <p>Remplissez le formulaire ci-dessous</p>
      </div>

      {isSubmitted ? (
        <div className="submission-success">
          <h2>تم إرسال طلبك بنجاح!</h2>
          <p>سيتم مراجعة معلوماتك وعملية إنشاء السيرة الذاتية قريبًا.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="form-cv-form">
          {/* Informations personnelles */}
          <div className="form-section-cv">
            <h2>Informations personnelles</h2>
            <div className="form-grid form-grid-2">
              <div className="form-field">
                <label className="form-label">Nom *</label>
                <input 
                  {...register("nom")} 
                  className="form-input" 
                  placeholder="Votre nom de famille"
                  disabled={isFormDisabled}
                />
                {errors.nom && <div className="error-text">{errors.nom.message}</div>}
              </div>

              <div className="form-field">
                <label className="form-label">Prénom *</label>
                <input 
                  {...register("prenom")} 
                  className="form-input" 
                  placeholder="Votre prénom"
                  disabled={isFormDisabled}
                />
                {errors.prenom && <div className="error-text">{errors.prenom.message}</div>}
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">Adresse complète *</label>
              <textarea 
                {...register("adresse")} 
                className="form-textarea" 
                placeholder="Votre adresse complète"
                disabled={isFormDisabled}
              />
              {errors.adresse && <div className="error-text">{errors.adresse.message}</div>}
            </div>

            <div className="form-grid form-grid-2">
              <div className="form-field">
                <label className="form-label">Email *</label>
                <input 
                  type="email" 
                  {...register("email")} 
                  className="form-input" 
                  placeholder="exemple@email.com"
                  disabled={isFormDisabled}
                />
                {errors.email && <div className="error-text">{errors.email.message}</div>}
              </div>

              <div className="form-field">
                <label className="form-label">Téléphone *</label>
                <input 
                  type="tel" 
                  {...register("telephone")} 
                  className="form-input" 
                  placeholder="06 12 34 56 78"
                  disabled={isFormDisabled}
                />
                {errors.telephone && <div className="error-text">{errors.telephone.message}</div>}
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">LinkedIn</label>
              <input 
                {...register("linkedin")} 
                className="form-input" 
                placeholder="https://linkedin.com/in/votrenom"
                disabled={isFormDisabled}
              />
            </div>
          </div>

          {/* Permis */}
          <div className="form-section-cv">
            <h2>Permis de conduire</h2>
            <div className="form-field">
              <label className="radio-option">
                <input type="radio" value="non" {...register("permis")} defaultChecked disabled={isFormDisabled} /> Non
              </label>
              <label className="radio-option">
                <input type="radio" value="oui" {...register("permis")} disabled={isFormDisabled} /> Oui
              </label>
            </div>

            {permis === "oui" && (
              <div className="checkbox-group">
                <div className="checkbox-group-title">Catégories</div>
                <Controller
                  control={control}
                  name="categoriesPermis"
                  render={({ field }) => (
                    <div className="checkbox-grid">
                      {PERMIS_CATEGORIES.map((opt) => (
                        <label key={opt.value} className="checkbox-option">
                          <input
                            type="checkbox"
                            value={opt.value}
                            checked={(field.value || []).includes(opt.value)}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              const cur = field.value || [];
                              const next = checked ? [...cur, opt.value] : cur.filter((v) => v !== opt.value);
                              field.onChange(next);
                            }}
                            disabled={isFormDisabled}
                          />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  )}
                />
              </div>
            )}
          </div>

          {/* Site web */}
          <div className="form-section-cv">
            <h2>Site web personnel</h2>
            <div className="form-field">
              <label className="radio-option">
                <input type="radio" value="non" {...register("siteWeb")} defaultChecked disabled={isFormDisabled} /> Non
              </label>
              <label className="radio-option">
                <input type="radio" value="oui" {...register("siteWeb")} disabled={isFormDisabled} /> Oui
              </label>
            </div>

            {siteWeb === "oui" && (
              <div className="form-field">
                <label className="form-label">URL du site</label>
                <input 
                  {...register("siteWebUrl")} 
                  className="form-input" 
                  placeholder="https://votre-site.com"
                  disabled={isFormDisabled}
                />
              </div>
            )}
          </div>

          {/* Parcours scolaire */}
          <div className="form-section-cv">
            <h2>Parcours scolaire et universitaire</h2>

            <div className="form-field">
              <label className="form-label">Baccalauréat</label>
              <div>
                <label className="radio-option">
                  <input type="radio" value="non" {...register("baccalaureat")} defaultChecked disabled={isFormDisabled} /> Non
                </label>
                <label className="radio-option">
                  <input type="radio" value="en_cours" {...register("baccalaureat")} disabled={isFormDisabled} /> En cours
                </label>
                <label className="radio-option">
                  <input type="radio" value="obtenu" {...register("baccalaureat")} disabled={isFormDisabled} /> Obtenu
                </label>
              </div>
            </div>

            {baccalaureat === "en_cours" && (
              <div className="form-field">
                <label className="form-label">Nom du lycée actuel</label>
                <input 
                  {...register("lyceeActuel")} 
                  className="form-input" 
                  placeholder="Nom de votre lycée"
                  disabled={isFormDisabled}
                />
              </div>
            )}

            {baccalaureat === "obtenu" && (
              <div className="form-grid form-grid-2">
                <div className="form-field">
                  <label className="form-label">Filière</label>
                  <input 
                    {...register("filiereBac")} 
                    className="form-input" 
                    placeholder="Scientifique, Littéraire, etc."
                    disabled={isFormDisabled}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Lycée d'obtention</label>
                  <input 
                    {...register("lyceeBac")} 
                    className="form-input" 
                    placeholder="Nom du lycée"
                    disabled={isFormDisabled}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Mention</label>
                  <input 
                    {...register("mentionBac")} 
                    className="form-input" 
                    placeholder="ex: Bien, Assez Bien, Très Bien"
                    disabled={isFormDisabled}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Année</label>
                  <input 
                    type="number" 
                    {...register("anneeBac")} 
                    className="form-input" 
                    placeholder="2020"
                    disabled={isFormDisabled}
                  />
                </div>
              </div>
            )}

            {/* Études supérieures */}
            <div className="form-field mt-4">
              <label className="form-label">Études supérieures</label>
              <div>
                <label className="radio-option">
                  <input type="radio" value="non" {...register("etudesSuperieures")} defaultChecked disabled={isFormDisabled} /> Non
                </label>
                <label className="radio-option">
                  <input type="radio" value="en_cours" {...register("etudesSuperieures")} disabled={isFormDisabled} /> En cours
                </label>
              </div>
            </div>

            {etudesSuperieures === "en_cours" && (
              <div className="form-grid form-grid-2">
                <div className="form-field">
                  <label className="form-label">Niveau actuel</label>
                  <input 
                    {...register("niveauEtudes")} 
                    className="form-input" 
                    placeholder="L1, L2, M1, DUT, etc."
                    disabled={isFormDisabled}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Établissement actuel</label>
                  <input 
                    {...register("etablissementActuel")} 
                    className="form-input" 
                    placeholder="Nom de l'université/école"
                    disabled={isFormDisabled}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Spécialité</label>
                  <input 
                    {...register("specialiteActuelle")} 
                    className="form-input" 
                    placeholder="Informatique, Droit, etc."
                    disabled={isFormDisabled}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Diplômes: Licence / BTS / Diplôme fin d'études */}
          <div className="form-section-cv">
            <h2>Diplômes</h2>

            {/* Licence */}
            <div className="form-field">
              <label className="form-label">Licence obtenue ?</label>
              <div>
                <label className="radio-option">
                  <input type="radio" value="non" {...register("licenceObtenue")} defaultChecked disabled={isFormDisabled} /> Non
                </label>
                <label className="radio-option">
                  <input type="radio" value="oui" {...register("licenceObtenue")} disabled={isFormDisabled} /> Oui
                </label>
              </div>
            </div>

            {licenceObtenue === "oui" && (
              <div className="form-grid form-grid-2">
                <div className="form-field">
                  <label className="form-label">Nom de la licence</label>
                  <input 
                    {...register("nomLicence")} 
                    className="form-input" 
                    placeholder="Informatique, Droit, etc."
                    disabled={isFormDisabled}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Année</label>
                  <input 
                    type="number" 
                    {...register("anneeLicence")} 
                    className="form-input" 
                    placeholder="2020"
                    disabled={isFormDisabled}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Mention</label>
                  <input 
                    {...register("mentionLicence")} 
                    className="form-input" 
                    placeholder="Assez Bien, Bien, etc."
                    disabled={isFormDisabled}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Établissement</label>
                  <input 
                    {...register("etablissementLicence")} 
                    className="form-input" 
                    placeholder="Nom de l'université"
                    disabled={isFormDisabled}
                  />
                </div>
              </div>
            )}

            {/* BTS */}
            <div className="form-field mt-4">
              <label className="form-label">BTS obtenu ?</label>
              <div>
                <label className="radio-option">
                  <input type="radio" value="non" {...register("btsObtenu")} defaultChecked disabled={isFormDisabled} /> Non
                </label>
                <label className="radio-option">
                  <input type="radio" value="oui" {...register("btsObtenu")} disabled={isFormDisabled} /> Oui
                </label>
              </div>
            </div>

            {btsObtenu === "oui" && (
              <div className="form-grid form-grid-2">
                <div className="form-field">
                  <label className="form-label">Nom BTS</label>
                  <input 
                    {...register("nomBts")} 
                    className="form-input" 
                    placeholder="SIO, MUC, NRC, etc."
                    disabled={isFormDisabled}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Année</label>
                  <input 
                    type="number" 
                    {...register("anneeBts")} 
                    className="form-input" 
                    placeholder="2020"
                    disabled={isFormDisabled}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Établissement</label>
                  <input 
                    {...register("etablissementBts")} 
                    className="form-input" 
                    placeholder="Nom du lycée/école"
                    disabled={isFormDisabled}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Mention</label>
                  <input 
                    {...register("mentionBts")} 
                    className="form-input" 
                    placeholder="Assez Bien, Bien, etc."
                    disabled={isFormDisabled}
                  />
                </div>
              </div>
            )}

            {/* Diplôme fin d'étude */}
            <div className="form-field mt-4">
              <label className="form-label">Diplôme de fin d'étude ?</label>
              <div>
                <label className="radio-option">
                  <input type="radio" value="non" {...register("diplomeFinEtude")} defaultChecked disabled={isFormDisabled} /> Non
                </label>
                <label className="radio-option">
                  <input type="radio" value="oui" {...register("diplomeFinEtude")} disabled={isFormDisabled} /> Oui
                </label>
              </div>
            </div>

            {diplomeFinEtude === "oui" && (
              <div className="form-grid form-grid-2">
                <div className="form-field">
                  <label className="form-label">Nom du diplôme</label>
                  <input 
                    {...register("nomDiplomeFin")} 
                    className="form-input" 
                    placeholder="Master, Doctorat, etc."
                    disabled={isFormDisabled}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Année</label>
                  <input 
                    type="number" 
                    {...register("anneeDiplomeFin")} 
                    className="form-input" 
                    placeholder="2020"
                    disabled={isFormDisabled}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Mention</label>
                  <input 
                    {...register("mentionDiplomeFin")} 
                    className="form-input" 
                    placeholder="Assez Bien, Bien, etc."
                    disabled={isFormDisabled}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Établissement</label>
                  <input 
                    {...register("etablissementDiplomeFin")} 
                    className="form-input" 
                    placeholder="Nom de l'université/école"
                    disabled={isFormDisabled}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Expériences professionnelles */}
          <div className="form-section-cv">
            <h2>Expériences professionnelles</h2>

            <div className="form-field">
              <label className="form-label">Stages</label>
              <div>
                <label className="radio-option">
                  <input type="radio" value="non" {...register("stages")} defaultChecked disabled={isFormDisabled} /> Non
                </label>
                <label className="radio-option">
                  <input type="radio" value="oui" {...register("stages")} disabled={isFormDisabled} /> Oui
                </label>
              </div>
            </div>

            {stages === "oui" && (
              <div className="form-field">
                <label className="form-label">Détails des stages</label>
                <textarea 
                  {...register("stagesDetails")} 
                  className="form-textarea" 
                  rows={4} 
                  placeholder="Décrivez vos stages: entreprise, durée, missions réalisées..."
                  disabled={isFormDisabled}
                />
              </div>
            )}

            <div className="form-field mt-4">
              <label className="form-label">Postes professionnels</label>
              <div>
                <label className="radio-option">
                  <input type="radio" value="non" {...register("postes")} defaultChecked disabled={isFormDisabled} /> Non
                </label>
                <label className="radio-option">
                  <input type="radio" value="oui" {...register("postes")} disabled={isFormDisabled} /> Oui
                </label>
              </div>
            </div>

            {postes === "oui" && (
              <div className="form-field">
                <label className="form-label">Détails des postes</label>
                <textarea 
                  {...register("postesDetails")} 
                  className="form-textarea" 
                  rows={4} 
                  placeholder="Décrivez vos postes: entreprise, durée, responsabilités..."
                  disabled={isFormDisabled}
                />
              </div>
            )}
          </div>

          {/* Compétences */}
          <div className="form-section-cv">
            <h2>Compétences</h2>
            <div className="form-field">
              <label className="form-label">Compétences techniques</label>
              <textarea 
                {...register("competencesTechniques")} 
                className="form-textarea" 
                rows={3} 
                placeholder="Langages de programmation, outils techniques, etc."
                disabled={isFormDisabled}
              />
            </div>
            <div className="form-field">
              <label className="form-label">Compétences informatiques</label>
              <textarea 
                {...register("competencesInformatiques")} 
                className="form-textarea" 
                rows={3} 
                placeholder="Logiciels maîtrisés, systèmes d'exploitation, etc."
                disabled={isFormDisabled}
              />
            </div>
            <div className="form-field">
              <label className="form-label">Compétences linguistiques</label>
              <textarea 
                {...register("competencesLinguistiques")} 
                className="form-textarea" 
                rows={2} 
                placeholder="Langues parlées avec niveau (ex: Anglais B2, Espagnol A1...)"
                disabled={isFormDisabled}
              />
            </div>
          </div>

          {/* Centres d'intérêt */}
          <div className="form-section-cv">
            <h2>Centres d'intérêt</h2>
            <Controller
              control={control}
              name="centresInteret"
              render={({ field }) => (
                <div className="checkbox-grid">
                  {INTERETS.map((opt) => (
                    <label key={opt} className="checkbox-option">
                      <input
                        type="checkbox"
                        value={opt}
                        checked={(field.value || []).includes(opt)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          const cur = field.value || [];
                          const next = checked ? [...cur, opt] : cur.filter((v) => v !== opt);
                          field.onChange(next);
                        }}
                        disabled={isFormDisabled}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              )}
            />
            <div className="form-field">
              <label className="form-label">Autre (préciser)</label>
              <input 
                {...register("autreInteret")} 
                className="form-input" 
                placeholder="Autres centres d'intérêt non listés"
                disabled={isFormDisabled}
              />
            </div>
          </div>

          {/* Projets */}
          <div className="form-section-cv">
            <h2>Projets</h2>

            <div className="form-field">
              <label className="form-label">Projet de fin d'étude</label>
              <div>
                <label className="radio-option">
                  <input type="radio" value="non" {...register("projetFinEtude")} defaultChecked disabled={isFormDisabled} /> Non
                </label>
                <label className="radio-option">
                  <input type="radio" value="en_cours" {...register("projetFinEtude")} disabled={isFormDisabled} /> En cours
                </label>
                <label className="radio-option">
                  <input type="radio" value="termine" {...register("projetFinEtude")} disabled={isFormDisabled} /> Terminé
                </label>
              </div>
            </div>

            {projetFinEtude !== "non" && (
              <div className="form-field">
                <label className="form-label">Intitulé</label>
                <input 
                  {...register("intituleProjetFinEtude")} 
                  className="form-input" 
                  placeholder="Titre du projet"
                  disabled={isFormDisabled}
                />
                <label className="form-label">Thème</label>
                <textarea 
                  {...register("themeProjetFinEtude")} 
                  className="form-textarea" 
                  rows={2} 
                  placeholder="Sujet et domaine du projet"
                  disabled={isFormDisabled}
                />
                <label className="form-label">Objectifs</label>
                <textarea 
                  {...register("objectifsProjetFinEtude")} 
                  className="form-textarea" 
                  rows={2} 
                  placeholder="Buts et objectifs du projet"
                  disabled={isFormDisabled}
                />
                <div className="form-grid form-grid-2">
                  <div className="form-field">
                    <label className="form-label">Date début</label>
                    <input 
                      type="date" 
                      {...register("dateDebutProjetFinEtude")} 
                      className="form-input" 
                      disabled={isFormDisabled}
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Date fin</label>
                    <input 
                      type="date" 
                      {...register("dateFinProjetFinEtude")} 
                      className="form-input" 
                      disabled={isFormDisabled}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="form-field mt-4">
              <label className="form-label">Projet de fin de cycle</label>
              <div>
                <label className="radio-option">
                  <input type="radio" value="non" {...register("projetFinCycle")} defaultChecked disabled={isFormDisabled} /> Non
                </label>
                <label className="radio-option">
                  <input type="radio" value="en_cours" {...register("projetFinCycle")} disabled={isFormDisabled} /> En cours
                </label>
                <label className="radio-option">
                  <input type="radio" value="termine" {...register("projetFinCycle")} disabled={isFormDisabled} /> Terminé
                </label>
              </div>
            </div>

            {projetFinCycle !== "non" && (
              <div className="form-field">
                <label className="form-label">Intitulé</label>
                <input 
                  {...register("intituleProjetFinCycle")} 
                  className="form-input" 
                  placeholder="Titre du projet"
                  disabled={isFormDisabled}
                />
                <label className="form-label">Thème</label>
                <textarea 
                  {...register("themeProjetFinCycle")} 
                  className="form-textarea" 
                  rows={2} 
                  placeholder="Sujet et domaine du projet"
                  disabled={isFormDisabled}
                />
                <label className="form-label">Objectifs</label>
                <textarea 
                  {...register("objectifsProjetFinCycle")} 
                  className="form-textarea" 
                  rows={2} 
                  placeholder="Buts et objectifs du projet"
                  disabled={isFormDisabled}
                />
                <div className="form-grid form-grid-2">
                  <div className="form-field">
                    <label className="form-label">Date début</label>
                    <input 
                      type="date" 
                      {...register("dateDebutProjetFinCycle")} 
                      className="form-input" 
                      disabled={isFormDisabled}
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Date fin</label>
                    <input 
                      type="date" 
                      {...register("dateFinProjetFinCycle")} 
                      className="form-input" 
                      disabled={isFormDisabled}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Objectif du CV */}
          <div className="form-section-cv">
            <h2>Objectif du CV</h2>
            <div className="form-grid form-grid-2">
              <div className="form-field">
                <label className="form-label">Type d'établissement visé *</label>
                <select 
                  {...register("typeEtablissement")} 
                  className="form-select"
                  disabled={isFormDisabled}
                >
                  <option value="">-- Sélectionnez --</option>
                  <option value="universite">Université</option>
                  <option value="ecole_ingenieur">École d'ingénieur</option>
                  <option value="ecole_commerce">École de commerce</option>
                  <option value="iut">IUT</option>
                  <option value="bts">BTS</option>
                  <option value="cpge">CPGE</option>
                  <option value="ecole_specialisee">École spécialisée</option>
                </select>
              </div>

              <div className="form-field">
                <label className="form-label">Nom de l'établissement visé *</label>
                <input 
                  {...register("nomEtablissementVise")} 
                  className="form-input" 
                  placeholder="Nom de l'établissement"
                  disabled={isFormDisabled}
                />
              </div>

              <div className="form-field">
                <label className="form-label">Formation/Filière visée *</label>
                <input 
                  {...register("formationVisee")} 
                  className="form-input" 
                  placeholder="Nom de la formation"
                  disabled={isFormDisabled}
                />
              </div>

              <div className="form-field">
                <label className="form-label">Ville</label>
                <input 
                  {...register("villeEtablissement")} 
                  className="form-input" 
                  placeholder="Ville de l'établissement"
                  disabled={isFormDisabled}
                />
              </div>

              <div className="form-field md:col-span-2">
                <label className="form-label">Projet professionnel</label>
                <textarea 
                  {...register("projetProfessionnel")} 
                  className="form-textarea" 
                  rows={4} 
                  placeholder="Décrivez vos ambitions professionnelles à court et moyen terme"
                  disabled={isFormDisabled}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 12 }}>
            <button 
              type="button" 
              onClick={() => reset(DEFAULT_VALUES)} 
              className="submit-button" 
              style={{ background: "#e2e8f0", color: "#111" }}
              disabled={isFormDisabled}
            >
              Réinitialiser
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting || isFormDisabled} 
              className="submit-button"
            >
              {isSubmitting ? "Envoi..." : "Soumettre"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}