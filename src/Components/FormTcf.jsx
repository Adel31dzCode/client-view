import React, { useEffect, useState } from 'react';
import '../Css/FormTcf.css';
import Navbar from './Navbar';
import axios from 'axios';
import { Api_link } from '../assets/Api';
import Loading from './Loading';

export default function FormTcf() {
    let selectedType = localStorage.getItem("tcfType"); 
    if (selectedType) {
        selectedType = selectedType.toLowerCase();
        }
    const [IsLoading, SetIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        type: selectedType,
        // معلومات الحساب
        vfsAccount: '',
        existingVfsEmail: '',
        vfsPassword: '',
        emailPassword: '',
        newFirstName: '',
        newLastName: '',
        newEmail: '',
        newEmailPassword: '',
        newPhone: '',

        // معلومات TCF
        idNumber: '',
        idExpiry: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        phone: '',
        birthCountry: '',
        nationality: '',
        gender: '',
        language: '',
        registrationReason: '',

        // العنوان
        address: '',
        commune: '',
        wilaya: '',
        postalCode: '',

        // تفضيلات الامتحان
        examCenter: '',
        otherCenter: '',
        periodFrom: '',
        periodTo: '',
        timeSlot: '',
        remarks: ''
    });

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});



const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => {
        const updated = { ...prev, [name]: value };

        // إذا المستخدم غير examCenter
        if (name === 'examCenter') {
            if (value === 'alger' || value === 'oran' || value === 'constantine') {
                // ننسخ الاختيار مباشرة في otherCenter
                updated.otherCenter = value;
            } else if (value === 'other') { // غيرت من 'autre' إلى 'other'
                // نفرغ otherCenter ليكتب المستخدم
                updated.otherCenter = '';
            }
        }

        return updated;
    });

    // إزالة الخطأ لو كان موجود
    if (errors[name] && value.trim() !== '') {
        setErrors(prev => ({ ...prev, [name]: '' }));
    }
};





    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));
        validateField(name, formData[name]);
    };

    const validateField = (fieldName, value) => {
        let error = '';
        
        switch (fieldName) {
            case 'vfsAccount':
                if (!value) error = 'vfsAccount est requis';
                break;

            case 'existingVfsEmail':
                if (formData.vfsAccount === 'yes') {
                    if (!value) error = 'VFS Email est requis';
                    else if (!/\S+@\S+\.\S+/.test(value)) error = 'Email invalide';
                }
                break;

            case 'vfsPassword':
                if (formData.vfsAccount === 'yes' && !value) error = 'VFS Password est requis';
                break;

            case 'emailPassword':
                if (formData.vfsAccount === 'yes' && !value) error = 'Email Password est requis';
                break;

            case 'newFirstName':
                if (formData.vfsAccount === 'no' && !value) error = 'Prénom  est requis';
                break;

            case 'newLastName':
                if (formData.vfsAccount === 'no' && !value) error = 'Nom est requis';
                break;

            case 'newEmail':
                if (formData.vfsAccount === 'no') {
                    if (!value) error = 'Email est requis';
                    else if (!/\S+@\S+\.\S+/.test(value)) error = 'Email invalide';
                }
                break;

            case 'newEmailPassword':
                if (formData.vfsAccount === 'no' && !value) error = 'Email Password est requis';
                break;

            case 'newPhone':
                if (formData.vfsAccount === 'no' && !value) error = 'Telephone est requis';
                break;

            case 'idNumber':
                if (!value) error = "Numéro d'identification national est requis";
                break;

            case 'idExpiry':
                if (!value) error = "Date d'expiration  est requis";
                break;

            case 'firstName':
                if (!value) error = 'Prénom est requis';
                break;

            case 'lastName':
                if (!value) error = 'Nom est requis';
                break;

            case 'birthDate':
                if (!value) error = 'Date de naissance est requis';
                break;

            case 'phone':
                if (!value) error = 'Numéro est requis';
                break;

            case 'birthCountry':
                if (!value) error = 'Pays de naissance est requis';
                break;

            case 'nationality':
                if (!value) error = 'Nationality est requis';
                break;

            case 'gender':
                if (!value) error = 'Gender est requis';
                break;

            case 'language':
                if (!value) error = 'Language est requis';
                break;

            case 'registrationReason':
                if (!value) error = "Motif d'inscription est requis";
                break;

            case 'address':
                if (!value) error = 'Address est requis';
                break;

            case 'commune':
                if (!value) error = 'Commune est requis';
                break;

            case 'wilaya':
                if (!value) error = 'Wilaya est requis';
                break;

            case 'postalCode':
                if (!value) error = 'Postal Code est requis';
                break;

            case 'examCenter':
                if (!value) error = 'Exam Center est requis';
                break;

            case 'periodFrom':
                if (!value) error = 'Période souhaitée - Du est requis';
                break;

            case 'periodTo':
                if (!value) error = 'Période souhaitée - Au est requis';
                break;

            case 'timeSlot':
                if (!value) error = 'timeSlot est requis';
                break;

            default:
                break;
        }

        setErrors(prev => ({
            ...prev,
            [fieldName]: error
        }));
        return error === '';
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.vfsAccount) newErrors.vfsAccount = 'VFS Account est requis';
        if (!formData.gender) newErrors.gender = 'Gender est requis';
        if (!formData.language) newErrors.language = 'Language est requis';
        if (!formData.examCenter) newErrors.examCenter = 'Exam Center est requis';
        if (!formData.timeSlot) newErrors.timeSlot = 'Plage horaire est requis';

        if (formData.vfsAccount === 'yes') {
            if (!formData.existingVfsEmail) newErrors.existingVfsEmail = ' Vfs Email est requis';
            else if (!/\S+@\S+\.\S+/.test(formData.existingVfsEmail)) newErrors.existingVfsEmail = 'Email invalide';
            if (!formData.vfsPassword) newErrors.vfsPassword = 'VFS Mot de pass est requis';
            if (!formData.emailPassword) newErrors.emailPassword = 'Email Mot De Pass est requis';
        } else if (formData.vfsAccount === 'no') {
            if (!formData.newFirstName) newErrors.newFirstName = 'Prénom est requis';
            if (!formData.newLastName) newErrors.newLastName = 'Nom est requis';
            if (!formData.newEmail) newErrors.newEmail = 'Email est requis';
            else if (!/\S+@\S+\.\S+/.test(formData.newEmail)) newErrors.newEmail = 'Email invalide';
            if (!formData.newEmailPassword) newErrors.newEmailPassword = 'Email mot de pass est requis';
            if (!formData.newPhone) newErrors.newPhone = 'Téléphone est requis';
        }

        if (!formData.idNumber) newErrors.idNumber = "Numéro d'identification national est requis";
        if (!formData.idExpiry) newErrors.idExpiry = "Date d'expiration est requis";
        if (!formData.firstName) newErrors.firstName = 'Prénom est requis';
        if (!formData.lastName) newErrors.lastName = 'Nom est requis';
        if (!formData.birthDate) newErrors.birthDate = 'Date de naissance est requis';
        if (!formData.phone) newErrors.phone = 'Téléphone est requis';
        if (!formData.birthCountry) newErrors.birthCountry = 'Pays de naissance est requis';
        if (!formData.nationality) newErrors.nationality = 'nationality est requis';
        if (!formData.registrationReason) newErrors.registrationReason = "Motif d'inscription est requis";

        if (!formData.address) newErrors.address = 'Address est requis';
        if (!formData.commune) newErrors.commune = 'Commune est requis';
        if (!formData.wilaya) newErrors.wilaya = 'Wilaya est requis';
        if (!formData.postalCode) newErrors.postalCode = 'Postal Code est requis';

if (formData.examCenter === 'other') { // غيرت من 'autre' إلى 'other'
    if (!formData.otherCenter) newErrors.otherCenter = "autre Center d'examen  est requis";
} else {
    if (!formData.examCenter) newErrors.examCenter = 'Veuillez sélectionner un centre';
}
        if (!formData.periodFrom) newErrors.periodFrom = 'Période souhaitée Du est requis';
        if (!formData.periodTo) newErrors.periodTo = 'Période souhaitée Au est requis';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }






    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("clicked before condition")

        if (validateForm()) {
                  console.log("validitated")

            try {
                SetIsLoading(true);
                const dataToSend = {
                    type: formData.type,
                    idNumber: formData.idNumber,
                    idExpiry: formData.idExpiry,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    birthDate: formData.birthDate,
                    phone: formData.phone,
                    birthCountry: formData.birthCountry,
                    nationality: formData.nationality,
                    gender: formData.gender,
                    language: formData.language,
                    registrationReason: formData.registrationReason,
                    address: formData.address,
                    commune: formData.commune,
                    wilaya: formData.wilaya,
                    postalCode: formData.postalCode,
                    examCenter: formData.examCenter,
                    otherCenter: formData.otherCenter,
                    periodFrom: formData.periodFrom,
                    periodTo: formData.periodTo,
                    timeSlot: formData.timeSlot,
                    remarks: formData.remarks,
                    createdAt: new Date().toISOString(),
                    timestamp: Date.now()
                };

                if (formData.vfsAccount === 'yes') {
                    dataToSend.vfsAccount = 'yes';
                    dataToSend.existingVfsEmail = formData.existingVfsEmail;
                    dataToSend.vfsPassword = formData.vfsPassword;
                    dataToSend.emailPassword = formData.emailPassword;
                } else if (formData.vfsAccount === 'no') {
                    dataToSend.vfsAccount = 'no';
                    dataToSend.newFirstName = formData.newFirstName;
                    dataToSend.newLastName = formData.newLastName;
                    dataToSend.newEmail = formData.newEmail;
                    dataToSend.newEmailPassword = formData.newEmailPassword;
                    dataToSend.newPhone = formData.newPhone;
                }
                console.log(dataToSend)
                
                await axios.post(`${Api_link}formule-store`, dataToSend);

                setShowConfirmation(true);

                SetIsLoading(false);

                setTimeout(() => {
                    const confirmationElement = document.getElementById("confirmationMessage");
                    if (confirmationElement) {
                        confirmationElement.scrollIntoView({ behavior: "smooth" });
                    }
                }, 100);



            } catch (error) {
                console.error("❌ خطأ في إرسال البيانات:", error);
                SetIsLoading(false);
            }
              }
    };

    return (
        <>
            <Navbar Activity={true} />
            <div id="body-form">
                <div className="tcf-form-container">
                    <div className="tcf-header">
                        <h1>Formulaire de Prise de Rendez-vous TCF</h1>
                        <div className="icon_continer_pricing">
                                  <i className="fa-solid fa-file-lines"></i>
                        </div>
                    </div>

                    <div className="demo-notice">
                        <strong>Veuillez remplir ce formulaire avec attention. Vos informations seront utilisées pour créer ou gérer votre compte VFS et organiser votre rendez-vous pour le test TCF.</strong>
                    </div>

                    {!showConfirmation ? (
                        <form id="tcfForm" onSubmit={handleSubmit}>
                            {/* Section 1: Compte VFS Global */}
                            <div className="form-section">
                                <div className="section-header">
                                    <h2>1. Compte VFS Global</h2>
                                </div>
                                <div className="section-content">
                                    <div className="form-field">
                                        <label className="required">Avez-vous déjà un compte VFS Global ?</label>
                                        <div className="radio-group">
                                            <div className="radio-item">
                                                <input
                                                    type="radio"
                                                    id="hasAccount"
                                                    name="vfsAccount"
                                                    value="yes"
                                                    checked={formData.vfsAccount === 'yes'}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="hasAccount">Oui, j'ai déjà un compte</label>
                                            </div>
                                            <div className="radio-item">
                                                <input
                                                    type="radio"
                                                    id="noAccount"
                                                    name="vfsAccount"
                                                    value="no"
                                                    checked={formData.vfsAccount === 'no'}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="noAccount">Non, je n'ai pas de compte</label>
                                            </div>
                                        </div>
                                        {errors.vfsAccount && <span className="error-message">{errors.vfsAccount}</span>}
                                    </div>

                                    {formData.vfsAccount === 'yes' && (
                                        <div id="existingAccountFields">
                                            <h3>A. Informations du compte existant</h3>
                                            <div className="form-grid">
                                                <div className="form-field">
                                                    <label className="required">Email utilisé pour VFS</label>
                                                    <input
                                                        type="email"
                                                        name="existingVfsEmail"
                                                        placeholder="votre.email@exemple.com"
                                                        value={formData.existingVfsEmail}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={errors.existingVfsEmail ? 'error' : ''}
                                                    />
                                                    {errors.existingVfsEmail && <span className="error-message">{errors.existingVfsEmail}</span>}
                                                </div>
                                                <div className="form-field">
                                                    <label className="required">Mot de passe du compte VFS</label>
                                                    <input
                                                        type="password"
                                                        name="vfsPassword"
                                                        placeholder="••••••••"
                                                        value={formData.vfsPassword}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={errors.vfsPassword ? 'error' : ''}
                                                    />
                                                    {errors.vfsPassword && <span className="error-message">{errors.vfsPassword}</span>}
                                                </div>
                                                <div className="form-field full-width">
                                                    <label className="required">Mot de passe de votre email</label>
                                                    <input
                                                        type="password"
                                                        name="emailPassword"
                                                        placeholder="••••••••"
                                                        value={formData.emailPassword}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={errors.emailPassword ? 'error' : ''}
                                                    />
                                                    {errors.emailPassword && <span className="error-message">{errors.emailPassword}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {formData.vfsAccount === 'no' && (
                                        <div id="newAccountFields">
                                            <h3>B. Création d'un nouveau compte</h3>
                                            <div className="form-grid">
                                                <div className="form-field">
                                                    <label className="required">Prénom</label>
                                                    <input
                                                        type="text"
                                                        name="newFirstName"
                                                        placeholder="Votre prénom"
                                                        value={formData.newFirstName}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={errors.newFirstName ? 'error' : ''}
                                                    />
                                                    {errors.newFirstName && <span className="error-message">{errors.newFirstName}</span>}
                                                </div>
                                                <div className="form-field">
                                                    <label className="required">Nom</label>
                                                    <input
                                                        type="text"
                                                        name="newLastName"
                                                        placeholder="Votre nom"
                                                        value={formData.newLastName}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={errors.newLastName ? 'error' : ''}
                                                    />
                                                    {errors.newLastName && <span className="error-message">{errors.newLastName}</span>}
                                                </div>
                                                <div className="form-field">
                                                    <label className="required">Email</label>
                                                    <input
                                                        type="email"
                                                        name="newEmail"
                                                        placeholder="votre.email@exemple.com"
                                                        value={formData.newEmail}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={errors.newEmail ? 'error' : ''}
                                                    />
                                                    {errors.newEmail && <span className="error-message">{errors.newEmail}</span>}
                                                </div>
                                                <div className="form-field">
                                                    <label className="required">Mot de passe de l'email</label>
                                                    <input
                                                        type="password"
                                                        name="newEmailPassword"
                                                        placeholder="••••••••"
                                                        value={formData.newEmailPassword}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={errors.newEmailPassword ? 'error' : ''}
                                                    />
                                                    {errors.newEmailPassword && <span className="error-message">{errors.newEmailPassword}</span>}
                                                </div>
                                                <div className="form-field full-width">
                                                    <label className="required">Numéro de téléphone</label>
                                                    <input
                                                        type="tel"
                                                        name="newPhone"
                                                        placeholder="+213 XX XX XX XX XX"
                                                        value={formData.newPhone}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        className={errors.newPhone ? 'error' : ''}
                                                    />
                                                    {errors.newPhone && <span className="error-message">{errors.newPhone}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Section 2: Informations TCF */}
                            <div className="form-section">
                                <div className="section-header">
                                    <h2>2. Informations nécessaires pour la prise de rendez-vous TCF</h2>
                                </div>
                                <div className="section-content">
                                    <div className="form-grid">
                                        <div className="form-field">
                                            <label className="required">N° de carte d'identité nationale</label>
                                            <input
                                                type="text"
                                                name="idNumber"
                                                placeholder="123456789012"
                                                value={formData.idNumber}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={errors.idNumber ? 'error' : ''}
                                            />
                                            {errors.idNumber && <span className="error-message">{errors.idNumber}</span>}
                                        </div>
                                        <div className="form-field">
                                            <label className="required">Date d'expiration de la pièce d'identité</label>
                                            <input
                                                type="date"
                                                name="idExpiry"
                                                value={formData.idExpiry}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={errors.idExpiry ? 'error' : ''}
                                            />
                                            {errors.idExpiry && <span className="error-message">{errors.idExpiry}</span>}
                                        </div>
                                        <div className="form-field">
                                            <label className="required">Prénom</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                placeholder="Votre prénom"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={errors.firstName ? 'error' : ''}
                                            />
                                            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                                        </div>
                                        <div className="form-field">
                                            <label className="required">Nom</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                placeholder="Votre nom"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={errors.lastName ? 'error' : ''}
                                            />
                                            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                                        </div>
                                        <div className="form-field">
                                            <label className="required">Date de naissance</label>
                                            <input
                                                type="date"
                                                name="birthDate"
                                                value={formData.birthDate}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={errors.birthDate ? 'error' : ''}
                                            />
                                            {errors.birthDate && <span className="error-message">{errors.birthDate}</span>}
                                        </div>
                                        <div className="form-field">
                                            <label className="required">Numéro de téléphone</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="+213 XX XX XX XX XX"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={errors.phone ? 'error' : ''}
                                            />
                                            {errors.phone && <span className="error-message">{errors.phone}</span>}
                                        </div>
                                        <div className="form-field">
                                            <label className="required">Pays de naissance</label>
                                            <input
                                                type="text"
                                                name="birthCountry"
                                                placeholder="Algérie"
                                                value={formData.birthCountry}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={errors.birthCountry ? 'error' : ''}
                                            />
                                            {errors.birthCountry && <span className="error-message">{errors.birthCountry}</span>}
                                        </div>
                                        <div className="form-field">
                                            <label className="required">Nationalité</label>
                                            <input
                                                type="text"
                                                name="nationality"
                                                placeholder="Algérienne"
                                                value={formData.nationality}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={errors.nationality ? 'error' : ''}
                                            />
                                            {errors.nationality && <span className="error-message">{errors.nationality}</span>}
                                        </div>
                                    </div>
                                    <div className="form-field">
                                        <label className="required">Sexe</label>
                                        <div className="radio-group">
                                            <div className="radio-item">
                                                <input type="radio" id="female" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} />
                                                <label htmlFor="female">Féminin</label>
                                            </div>
                                            <div className="radio-item">
                                                <input type="radio" id="male" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} />
                                                <label htmlFor="male">Masculin</label>
                                            </div>
                                            <div className="radio-item">
                                                <input type="radio" id="other" name="gender" value="other" checked={formData.gender === 'other'} onChange={handleChange} />
                                                <label htmlFor="other">Autre</label>
                                            </div>
                                        </div>
                                        {errors.gender && <span className="error-message">{errors.gender}</span>}
                                    </div>
                                    <div className="form-field">
                                        <label className="required">Langue usuelle</label>
                                        <div className="radio-group">
                                            <div className="radio-item">
                                                <input type="radio" id="arabic" name="language" value="arabic" checked={formData.language === 'arabic'} onChange={handleChange} />
                                                <label htmlFor="arabic">Arabe</label>
                                            </div>
                                            <div className="radio-item">
                                                <input type="radio" id="kabyle" name="language" value="kabyle" checked={formData.language === 'kabyle'} onChange={handleChange} />
                                                <label htmlFor="kabyle">Kabyle</label>
                                            </div>
                                        </div>
                                        {errors.language && <span className="error-message">{errors.language}</span>}
                                    </div>
                                    <div className="form-field">
                                        <label className="required">Motif d'inscription</label>
                                        <textarea
                                            name="registrationReason"
                                            rows="3"
                                            placeholder="Décrivez le motif de votre inscription au TCF..."
                                            value={formData.registrationReason}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.registrationReason ? 'error' : ''}
                                        ></textarea>
                                        {errors.registrationReason && <span className="error-message">{errors.registrationReason}</span>}
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Adresse postale */}
                            <div className="form-section">
                                <div className="section-header">
                                    <h2>3. Adresse postale</h2>
                                </div>
                                <div className="section-content">
                                    <div className="form-grid">
                                        <div className="form-field full-width">
                                            <label className="required">Adresse</label>
                                            <input
                                                type="text"
                                                name="address"
                                                placeholder="Rue, numéro, bâtiment..."
                                                value={formData.address}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={errors.address ? 'error' : ''}
                                            />
                                            {errors.address && <span className="error-message">{errors.address}</span>}
                                        </div>
                                        <div className="form-field">
                                            <label className="required">Commune</label>
                                            <input
                                                type="text"
                                                name="commune"
                                                placeholder="Nom de la commune"
                                                value={formData.commune}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={errors.commune ? 'error' : ''}
                                            />
                                            {errors.commune && <span className="error-message">{errors.commune}</span>}
                                        </div>
                                        <div className="form-field">
                                            <label className="required">Wilaya</label>
                                            <input
                                                name="wilaya"
                                                type='text'
                                                placeholder='Sélectionnez une wilaya'
                                                value={formData.wilaya}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={errors.wilaya ? 'error' : ''}
                                            />
                                            
                                            {errors.wilaya && <span className="error-message">{errors.wilaya}</span>}
                                        </div>
                                        <div className="form-field full-width">
                                            <label className="required">Code postal</label>
                                            <input
                                                type="text"
                                                name="postalCode"
                                                placeholder="16000"
                                                value={formData.postalCode}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={errors.postalCode ? 'error' : ''}
                                            />
                                            {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 4: Préférences d'examen */}



                            <div className="form-section">
                                <div className="section-header">
                                    <h2>4. Préférences d'examen</h2>
                                </div>
                                <div className="section-content">
                                    <div className="form-field">
    <label className="required">Centre d'examen souhaité</label>
    <div className="radio-group">
        {/* كل إدخال في div منفصل */}

        <div className="radio-item">
            <input type="radio" id="centerAlger" name="examCenter" value="alger" checked={formData.examCenter === 'alger'} onChange={handleChange} />
            <label htmlFor="centerAlger">Alger</label>
        </div>
        <div className="radio-item">
            <input type="radio" id="centerOran" name="examCenter" value="oran" checked={formData.examCenter === 'oran'} onChange={handleChange} />
            <label htmlFor="centerOran">Oran</label>
        </div>
        <div className="radio-item">
            <input type="radio" id="centerConstantine" name="examCenter" value="constantine" checked={formData.examCenter === 'constantine'} onChange={handleChange} />
            <label htmlFor="centerConstantine">Constantine</label>
        </div>
        <div className="radio-item">
            <input type="radio" id="centerConstantine" name="examCenter" value="tlemcen" checked={formData.examCenter === 'tlemcen'} onChange={handleChange} />
            <label htmlFor="centerConstantine">Tlemcen</label>
        </div>
        <div className="radio-item">
            <input type="radio" id="centerConstantine" name="examCenter" value="annaba" checked={formData.examCenter === 'annaba'} onChange={handleChange} />
            <label htmlFor="centerConstantine">Annaba</label>
        </div>
        <div className="radio-item">
            <input type="radio" id="centerOther" name="examCenter" value="other" checked={formData.examCenter === 'other'} onChange={handleChange} />
            <label htmlFor="centerOther">Autre</label>
        </div>
    </div>
    {errors.examCenter && <span className="error-message">{errors.examCenter}</span>}

    {formData.examCenter === 'other' && ( // غيرت من 'autre' إلى 'other'
    <div id="otherCenterField">
        <input
            type="text"
            name="otherCenter"
            placeholder="Précisez le centre souhaité..."
            value={formData.otherCenter}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.otherCenter ? 'error' : ''}
        />
        {errors.otherCenter && <span className="error-message">{errors.otherCenter}</span>}
    </div>
)}
</div>
                                    <div className="form-grid">
                                        <div className="form-field">
                                            <label className="required">Période souhaitée - Du</label>
                                            <input
                                                type="date"
                                                name="periodFrom"
                                                value={formData.periodFrom}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={errors.periodFrom ? 'error' : ''}
                                            />
                                            {errors.periodFrom && <span className="error-message">{errors.periodFrom}</span>}
                                        </div>
                                        <div className="form-field">
                                            <label className="required">Période souhaitée - Au</label>
                                            <input
                                                type="date"
                                                name="periodTo"
                                                value={formData.periodTo}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={errors.periodTo ? 'error' : ''}
                                            />
                                            {errors.periodTo && <span className="error-message">{errors.periodTo}</span>}
                                        </div>
                                    </div>
                                    <div className="form-field">
                                        <label className="required">Plage horaire préférée</label>
                                        <div className="radio-group">
                                            <div className="radio-item">
                                                <input type="radio" id="morning" name="timeSlot" value="Matinée (de 8h à 12h)" checked={formData.timeSlot === 'Matinée (de 8h à 12h)'} onChange={handleChange} />
                                                <label htmlFor="morning">Matinée (de 8h à 12h)</label>
                                            </div>
                                            <div className="radio-item">
                                                <input type="radio" id="afternoon" name="timeSlot" value="Après-midi (de 13h à 17h)" checked={formData.timeSlot === 'Après-midi (de 13h à 17h)'} onChange={handleChange} />
                                                <label htmlFor="afternoon">Après-midi (de 13h à 17h)</label>
                                            </div>
                                            <div className="radio-item">
                                                <input type="radio" id="indifferent" name="timeSlot" value="Indifférent(e)" checked={formData.timeSlot === 'Indifférent(e)'} onChange={handleChange} />
                                                <label htmlFor="indifferent">Indifférent(e)</label>
                                            </div>
                                        </div>
                                        {errors.timeSlot && <span className="error-message">{errors.timeSlot}</span>}
                                    </div>
                                    <div className="form-field">
                                        <label>Remarques ou contraintes particulières</label>
                                        <textarea
                                            name="remarks"
                                            rows="4"
                                            placeholder="Indiquez ici toute remarque ou contrainte particulière..."
                                            value={formData.remarks}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="submit-container">
                                <button type="submit" className="submit-btn">
                                    Soumettre le formulaire
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div id="confirmationMessage" className="confirmation-message">
                            <div className="message-content">
                                <div className="message-icon">✅</div>
                                <div>
                                    <h3>Formulaire soumis avec succès !</h3>
                                    <p>Vos informations ont été enregistrées. <strong>Vous recevrez une confirmation  par email. </strong></p>
                                    <p><a href="/">Page D'accueil</a></p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>


            {IsLoading && <Loading />}
        </>
    );
}