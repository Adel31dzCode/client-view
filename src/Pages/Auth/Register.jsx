import React, { useEffect, useState } from 'react';
import '../../Css/Auth/Register.css';
import Navbar from '../../Components/Navbar';
import axios from "axios";
import { Api_link } from '../../assets/Api';
import Loading from '../../Components/Loading';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';


export default function Register({ onSubmit }) {

  const auth = getAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    number: '',
    password: '',
    password_confirmation: '',
  });
  const navigate = useNavigate();


  const [LoadingState, SetLoadingState] = useState(false);
  const Cookie = new Cookies();
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);


  const showToast = (message, type = "error") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 15000); // يختفي بعد 3 ثواني
  };


  // دالة تحقق من صحة الفورم
  const validateForm = () => {
    const newErrors = {};

    // التحقق من الاسم
    if (!form.name || form.name.length < 3 || form.name.length > 30) {
      newErrors.name = 'Le nom doit contenir au moins 2 et 30 caractères .';
    }

    // التحقق من البريد
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Entrez un email valide.';
    }

    // التحقق من الرقم (10 أرقام)
    if (!form.number || !/^\d{10}$/.test(form.number)) {
      newErrors.number = 'Le numéro doit contenir exactement 10 chiffres.';
    }

    // التحقق من كلمة المرور (6–12 حرف)
    if (!form.password || form.password.length < 6 || form.password.length > 12) {
      newErrors.password = 'Le mot de passe doit contenir entre 6 et 22 caractères.';
    }

    if (form.password !== form.password_confirmation) {
  newErrors.password_confirmation = 'Le mot de passe ne correspond pas.';
}

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // إذا لم يوجد أخطاء
  };

const handleSubmit = async (e) => {
  console.log(form)
  e.preventDefault();
  if (!validateForm()) return;

  try {
    SetLoadingState(true);

    const response = await axios.post(`${Api_link}register`, {
      name: form.name,
      email: form.email,
      number: form.number,
      password: form.password,
      password_confirmation: form.password_confirmation,
    });

    SetLoadingState(false);

    showToast("📩 Verification code sent to your email!", "success");
    setTimeout(() => {
      navigate("/verify-code", { state: { email: form.email } });
    }, 2000);

    setForm({
      name: '',
      email: '',
      number: '',
      password: '',
      password_confirmation: '', 
  });


  } catch (error) {
    SetLoadingState(false);
    console.error("Erreur:", error.response?.data || error.message);
    showToast("⚠️ " + (error.response?.data?.message || error.message));
  }
};



  return (
    <>
      <Navbar Activity={true} />

      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h1 className="form-heading">Create your account</h1>

          <p className="form-note">
            Créez votre compte maintenant
          </p>

          {/* name */}
          <div className="form-group">
            <label>Nom et Prénom</label>
            <input
              type="text"
              placeholder="Entrez votre nom complet"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Example@gmail.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          {/* Number */}
          <div className="form-group">
            <label>Number</label>
            <input
              type="text"
              placeholder="Ex: 0663892345"
              value={form.number}
              onChange={(e) => setForm({ ...form, number: e.target.value })}
              required
            />
            {errors.number && <p className="error">{errors.number}</p>}
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Entrez votre mot de passe"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div className="form-group">
            <label>Password Confirmation</label>
            <input
              type="password"
              placeholder="Entrez votre mot de passe Confirmation"
              value={form.password_confirmation}
              onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
              required
            />
            {errors.password_confirmation && <p className="error">{errors.password_confirmation}</p>}
          </div>

          <button type="submit" className="btn-continue">
            Créer un compte
          </button>

          <p className="login-link">
            Vous avez déjà un compte ? <a href="/login">Connectez</a>
          </p>
        </form>
      </div>

      {toast && (
        <div className={`toasterr ${toast.type}`}>
          {toast.message === "⚠️ The email has already been taken." ? "⚠️ Cet email a déjà été enregistré": toast.message}
        </div>
      )}

      {LoadingState ?  <Loading /> : null }
    </>
  );
}
