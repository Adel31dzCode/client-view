// FormLettreExplicative.jsx
import React, { useState } from 'react';
import '../../Css/Services/FormExp.css';
import { Api_link } from '../../assets/Api';
import axios from 'axios';
import Cookies from 'universal-cookie';


const FormExp = ({ UserData }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    adresse: '',
    telephone: '',
    precisions: '',
    motifs: []
  });

  
  
  
  const Cookie = new Cookies();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const motifsOptions = [
    { id: 'moyenne_faible', label: 'Moyenne très faible ou année abandonnée', description: 'Moyenne entre 0 et 5 ou abandon d\'année' },
    { id: 'redoublement_medical', label: 'Redoublement dû à des problèmes médicaux', description: 'Maladie, hospitalisation, traitement médical' },
    { id: 'annee_sans_etudes', label: 'Année sans études ni emploi', description: 'Période d\'inactivité dans le parcours' },
    { id: 'experience_autre_domaine', label: 'Expérience professionnelle dans un autre domaine', description: 'Travail différent de vos études actuelles' },
    { id: 'ecart_bac_formation', label: 'Écart entre l\'obtention du bac et la reprise de formation', description: 'Plusieurs années entre le bac et les études supérieures' },
    { id: 'raisons_personnelles', label: 'Raisons médicales, psychologiques ou personnelles', description: 'Difficultés personnelles ayant impacté le parcours' },
    { id: 'changement_orientation', label: 'Changement d\'orientation', description: 'Première voie qui ne correspondait pas à vos ambitions' },
    { id: 'maternite', label: 'Maternité/Paternité', description: 'Pause dans les études pour raisons familiales' },
    { id: 'difficultes_financieres', label: 'Difficultés financières', description: 'Contraintes économiques ayant affecté les études' },
    { id: 'service_civique', label: 'Service civique ou militaire', description: 'Engagement citoyen ou service national' },
    { id: 'voyage_humanitaire', label: 'Voyage ou mission humanitaire', description: 'Expérience à l\'étranger enrichissante' },
    { id: 'autres', label: 'Autres raisons', description: 'Précisez dans le champ ci-dessous' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      if (checked) {
        return { ...prev, motifs: [...prev.motifs, value] };
      } else {
        return { ...prev, motifs: prev.motifs.filter(v => v !== value) };
      }
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.motifs.length === 0) {
    alert('⚠️ Veuillez sélectionner au moins un motif pour votre lettre explicative.');
    return;
  }

  setIsLoading(true);

  console.log(formData)
  try {
    const response = await axios.post(
      `${Api_link}lettre-explicative`,
      {
        ...formData,
        user_id: UserData?.id,
        user_name: UserData?.name,
        user_email: UserData?.email,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookie.get("Nazya_access_token")}`, // Middleware حماية
        },
      }
    );

    console.log("✅ Form submitted:", response.data);
    setIsSubmitted(true);

  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Erreur lors de l'envoi du formulaire. Veuillez réessayer.");
  } finally {
    setIsLoading(false);
  }
};

  const resetForm = () => {
    setFormData({
      nom: '',
      prenom: '',
      adresse: '',
      telephone: '',
      precisions: '',
      motifs: []
    });
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="success-message-lettre">
        <div className="success-flex-lettre">
          <div className="success-icon-lettre">✅</div>
          <div>
            <h3 className="font-semibold text-green-800">Demande enregistrée avec succès !</h3>
            <p className="text-green-700">Votre demande de lettre explicative a été prise en compte. Vous recevrez votre lettre personnalisée sous 24-48h.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="form-lettre-container">
      <div className="form-lettre-header">
        <p className='info-warning'>{ !UserData ? "Register First" : "Remplissez ce formulaire pour obtenir votre lettre explicative personnalisée" }</p>
      </div>

      <div className="form-lettre-card">
        <form onSubmit={handleSubmit}>
          {/* Informations personnelles */}
          <div className="form-section-lettre">
            <h2>👤 Informations personnelles</h2>
            
            <div className="form-grid-lettre form-grid-2-lettre">
              <div>
                <label className="form-label-lettre">Nom *</label>
                <input 
                  type="text" 
                  name="nom" 
                  required 
                  value={formData.nom}
                  onChange={handleInputChange}
                  className="form-input-lettre"
                  placeholder="Votre nom"
                  disabled={!UserData}
                />
              </div>
              <div>
                <label className="form-label-lettre">Prénom *</label>
                <input 
                  type="text" 
                  name="prenom" 
                  required 
                  value={formData.prenom}
                  onChange={handleInputChange}
                  className="form-input-lettre"
                  placeholder="Votre prénom"
                  disabled={!UserData}
                />
              </div>
            </div>
            
            <div className="form-field-lettre">
              <label className="form-label-lettre">Adresse complète *</label>
              <textarea 
                name="adresse" 
                required 
                rows="3"
                value={formData.adresse}
                onChange={handleInputChange}
                className="form-textarea-lettre"
                placeholder="Numéro, rue, ville, code postal"
                disabled={!UserData}
              ></textarea>
            </div>
            
            <div className="form-field-lettre">
              <label className="form-label-lettre">Numéro de téléphone *</label>
              <input 
                type="tel" 
                name="telephone" 
                required 
                value={formData.telephone}
                onChange={handleInputChange}
                className="form-input-lettre"
                placeholder="06 12 34 56 78"
                disabled={!UserData}
              />
            </div>
          </div>

          {/* Motifs de rédaction */}
          <div className="form-section-lettre">
            <h2>📋 Motif(s) de la demande de lettre explicative</h2>
            <p className="motif-description">Sélectionnez tous les motifs qui correspondent à votre situation :</p>
            
            <div className="motifs-container">
              {motifsOptions.map((motif) => (
                <div key={motif.id} className="motif-option">
                  <input 
                    type="checkbox" 
                    id={motif.id}
                    value={motif.id}
                    checked={formData.motifs.includes(motif.id)}
                    onChange={handleCheckboxChange}
                    className="checkbox-custom-lettre"
                    disabled={!UserData}
                  />
                  <label htmlFor={motif.id} className="motif-label">
                    <span className="motif-title">{motif.label}</span>
                    <span className="motif-desc">{motif.description}</span>
                  </label>
                </div>
              ))}
            </div>
            
            <div className="form-field-lettre">
              <label className="form-label-lettre">Précisions supplémentaires (optionnel)</label>
              <textarea 
                name="precisions" 
                rows="4"
                value={formData.precisions}
                onChange={handleInputChange}
                className="form-textarea-lettre"
                placeholder="Ajoutez des détails spécifiques à votre situation..."
                disabled={!UserData}
              ></textarea>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="form-actions-lettre">
            <button 
              type="submit" 
              disabled={isLoading || !UserData}
              className="submit-button-lettre"
            >
              {isLoading ? '⏳ Traitement en cours...' : '✉️ Générer ma lettre explicative'}
            </button>
            <button 
              type="button" 
              onClick={resetForm}
              className="reset-button-lettre"
            >
              🔄 Réinitialiser
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormExp;