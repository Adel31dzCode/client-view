import React, { useEffect, useState } from 'react';
import '../../Css/Services/FormRec.css';
import axios from 'axios';
import { Api_link } from '../../assets/Api';
import Cookies from 'universal-cookie';
import Loading from '../Loading';


const FormRec = ({ UserData }) => {

    const [isLoading, setIsLoading] = useState(false);
    const Cookie = new Cookies();






  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    serviceType: '',
    domain: '',
    projectDetails: '',
    deadline: '',
    studyProgram: '',
    letterCount: '',
    additionalServices: [],
    existingLetter: null
  });
  
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      return { ...prev, additionalServices: [...prev.additionalServices, value] };
    } else {
      return { ...prev, additionalServices: prev.additionalServices.filter(v => v !== value) };
    }
  });
};

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // إنشاء FormData لإرسال الملفات والنموذج
      const dataToSend = new FormData();
      
      // إضافة بيانات النموذج
      Object.keys(formData).forEach(key => {
        if (key !== 'existingLetter') {
          if (Array.isArray(formData[key])) {
            formData[key].forEach(item => dataToSend.append(`${key}[]`, item));
          } else {
            dataToSend.append(key, formData[key]);
          }
        }
      });
      
      // إضافة الملف إذا وجد
      if (file) {
        dataToSend.append('existingLetter', file);
      }
      
      for (let [key, value] of dataToSend.entries()) {
        console.log(key, value);
        }
      // إرسال البيانات إلى API
      const response = await axios.post(`${Api_link}rec-request`, dataToSend, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${Cookie.get("Nazya_access_token")}`
        }
        });
      
      if (response.status === 200) {
        setIsSubmitted(true);
        console.log(response);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('حدث خطأ أثناء إرسال النموذج. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="success-message">
        <div className="success-flex">
          <div className="success-icon">✅</div>
          <div>
            <h3 className="font-semibold text-green-800">Demande envoyée avec succès !</h3>
            <p className="text-green-700">Nous vous contacterons dans les 24h avec un devis personnalisé.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="form-cv-container">

        {!UserData && (
        <p className='registration-warning'>You Have To Connect First</p>)}
      <form onSubmit={handleSubmit} className={`space-y-6 ${!UserData && "no-user-form"}`}>
        {/* Informations personnelles */}
        <div className="form-grid form-grid-2">
          <div>
            <label className="form-label">Prénom *</label>
            <input 
              type="text" 
              name="firstName" 
              required 
              value={formData.firstName}
              onChange={handleInputChange}
              className="form-input input-focus"
              placeholder="Votre prénom" 
              disabled={!UserData && true}
            />
          </div>
          <div>
            <label className="form-label">Nom *</label>
            <input 
              type="text" 
              name="lastName" 
              required 
              value={formData.lastName}
              onChange={handleInputChange}
              className="form-input input-focus"
              placeholder="Votre nom" 
              disabled={!UserData && true}
            />
          </div>
        </div>

        <div className="form-grid form-grid-2">
          <div>
            <label className="form-label">Email *</label>
            <input 
              type="email" 
              name="email" 
              required 
              value={formData.email}
              onChange={handleInputChange}
              className="form-input input-focus"
              placeholder="votre@email.com" 
              disabled={!UserData && true}
            />
          </div>
          <div>
            <label className="form-label">Téléphone</label>
            <input 
              type="tel" 
              name="phone" 
              value={formData.phone}
              onChange={handleInputChange}
              className="form-input input-focus"
              placeholder="06 12 34 56 78" 
              disabled={!UserData && true}
            />
          </div>
        </div>

        {/* Type de service */}
        <div>
          <label className="form-label mb-3">Type de service souhaité *</label>
          <div className="form-grid form-grid-2">
            <label disabled={!UserData && true} className="option-card hover-border-purple-300 transition-colors">
              <input 
                type="radio" 
                name="serviceType" 
                value="creation" 
                required 
                checked={formData.serviceType === 'creation'}
                onChange={handleInputChange}
                className="mr-3 text-purple-600" 
                disabled={!UserData && true}
              />
              <div>
                <div className="option-title">Création complète</div>
                <div className="option-description">Rédaction de A à Z</div>
              </div>
            </label>
            <label className="option-card hover-border-purple-300 transition-colors">
              <input 
                type="radio" 
                name="serviceType" 
                value="optimization" 
                required 
                checked={formData.serviceType === 'optimization'}
                onChange={handleInputChange}
                className="mr-3 text-purple-600" 
                disabled={!UserData && true}
              />
              <div>
                <div className="option-title">Optimisation</div>
                <div className="option-description">Amélioration d'une lettre existante</div>
              </div>
            </label>
          </div>
        </div>

        {/* Domaine d'application */}
        <div>
          <label className="form-label">Domaine d'application *</label>
          <select 
            name="domain" 
            required 
            value={formData.domain}
            onChange={handleInputChange}
            className="form-select input-focus"
            disabled={!UserData && true}
          >
            <option value="">Sélectionnez un domaine</option>
            <option value="academic">Académique (université, école)</option>
            <option value="professional">Professionnel (emploi, stage)</option>
            <option value="scholarship">Bourse d'études</option>
            <option value="immigration">Immigration</option>
            <option value="other">Autre</option>
          </select>
        </div>

        {/* Détails du projet */}
        <div>
          <label className="form-label">Décrivez votre projet *</label>
          <textarea 
            name="projectDetails" 
            required 
            rows="4"
            value={formData.projectDetails}
            onChange={handleInputChange}
            className="form-textarea input-focus resize-none"
            placeholder="Décrivez le contexte, l'objectif de la lettre, le destinataire, et toute information pertinente..."
            disabled={!UserData && true}
          ></textarea>
        </div>

        {/* Délai souhaité */}
        <div>
          <label className="form-label">Délai souhaité *</label>
          <select 
            name="deadline" 
            required 
            value={formData.deadline}
            onChange={handleInputChange}
            className="form-select input-focus"
            disabled={!UserData && true}
          >
            <option value="">Sélectionnez un délai</option>
            <option value="urgent">Urgent (24-48h)</option>
            <option value="express">Express (3-5 jours)</option>
            <option value="standard">Standard (1-2 semaines)</option>
            <option value="flexible">Flexible (3+ semaines)</option>
          </select>
        </div>

        {/* Nom du module/programme */}
        <div>
          <label className="form-label">Nom du module/programme d'études *</label>
          <input 
            type="text" 
            name="studyProgram" 
            required 
            value={formData.studyProgram}
            onChange={handleInputChange}
            className="form-input input-focus"
            placeholder="Ex: Master en Marketing Digital, Licence en Informatique, MBA..." 
            disabled={!UserData && true}
          />
        </div>

        {/* Nombre de lettres et tarification */}
        <div>
          <label className="form-label mb-3">Nombre de lettres de recommandation *</label>
          <div className="form-grid">
            <label className="option-card hover-border-purple-300 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    name="letterCount" 
                    value="1" 
                    required 
                    checked={formData.letterCount === '1'}
                    onChange={handleInputChange}
                    className="mr-3 text-purple-600" 
                    disabled={!UserData && true}
                  />
                  <div>
                    <div className="option-title">1 lettre de recommandation</div>
                    <div className="option-description">Parfait pour une candidature ciblée</div>
                  </div>
                </div>
                <div className="option-price">600 DA</div>
              </div>
            </label>
            <label className="option-card hover-border-purple-300 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    name="letterCount" 
                    value="2" 
                    required 
                    checked={formData.letterCount === '2'}
                    onChange={handleInputChange}
                    className="mr-3 text-purple-600" 
                    disabled={!UserData && true}
                  />
                  <div>
                    <div className="option-title">2 lettres de recommandation</div>
                    <div className="option-description">Idéal pour plusieurs candidatures</div>
                  </div>
                </div>
                <div className="option-price">800 DA</div>
              </div>
            </label>
            <label className="option-card hover-border-purple-300 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    name="letterCount" 
                    value="3+" 
                    required 
                    checked={formData.letterCount === '3+'}
                    onChange={handleInputChange}
                    className="mr-3 text-purple-600" 
                    disabled={!UserData && true}
                  />
                  <div>
                    <div className="option-title">3 lettres ou plus</div>
                    <div className="option-description">Pour maximiser vos chances</div>
                  </div>
                </div>
                <div className="option-price">1000 DA</div>
              </div>
            </label>
          </div>
        </div>

        {/* Services additionnels */}
        <div>
          <label className="form-label mb-3">Services additionnels</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                name="additionalServices" 
                value="translation" 
                onChange={handleCheckboxChange}
                className="mr-3 text-purple-600" 
                disabled={!UserData && true}
              />
              <span>Traduction (français ↔ anglais)</span>
            </label>
            </div>
        </div>

        {/* Fichier existant */}
        <div>
          <label className="form-label">Lettre existante (si optimisation)</label>
          <div className="file-upload-area hover-border-purple-400 transition-colors">
            <input 
              type="file" 
              name="existingLetter" 
              accept=".pdf,.doc,.docx,.txt" 
              className="file-input" 
              id="fileInput"
              onChange={handleFileChange}
              disabled={!UserData && true}
            />
            <label htmlFor="fileInput" className="cursor-pointer">
              {fileName ? (
                <div className="text-green-600">
                  <svg className="file-icon mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <p className="option-title">Fichier sélectionné: {fileName}</p>
                  <p className="option-description">Cliquez pour changer</p>
                </div>
              ) : (
                <div className="text-gray-600">
                  <svg className="file-icon mx-auto text-gray-400 mb-2" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="option-title">Cliquez pour télécharger votre fichier</p>
                  <p className="option-description">PDF, DOC, DOCX, TXT (max 10MB)</p>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Bouton de soumission */}
        <button 
          type="submit" 
          disabled={isLoading}
          className="submit-button"
        >
          {isLoading ? 'Envoi en cours...' : '🚀 Demander un devis gratuit'}
          {isLoading && <Loading />}
        </button>
      </form>
    </div>
  );
};

export default FormRec;