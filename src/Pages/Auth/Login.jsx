import React, { useState } from 'react';
import '../../Css/Auth/Register.css'; 
import Navbar from '../../Components/Navbar';
import Loading from '../../Components/Loading';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Api_link } from '../../assets/Api';


export default function Login() {
  const [IsLoading, SetIsLoading] = useState(false);
  const Cookie = new Cookies();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null); // لتخزين الرسائل

  // تحقق من صحة الفورم
  const validateForm = () => {
    const newErrors = {};

    if (!form.email || !/\S+@\S+\.\S+/.test(form.email) || form.email.length > 40 || form.email.length < 14) {
      newErrors.email = 'Entrez un email valide et entre 12 et 40 caractères.';
    }

    if (!form.password || form.password.length < 6 || form.password.length > 22) {
      newErrors.password = 'Le mot de passe doit contenir entre 6 et 22 caractères.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // دالة اظهار التوست
  const showToast = (message, type = "error") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 15000); // يختفي بعد 3 ثواني
  };

  // دالة تسجيل الدخول
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    SetIsLoading(true);

    const response = await axios.post(`${Api_link}login`, {
      email: form.email,
      password: form.password,
    });

    console.log("✅ You Are Connected:", response.data);

    // حفظ التوكن أو البيانات في localStorage
    Cookie.set("Nazya_access_token", response.data.access_token, { path: "/", maxAge: 60 * 60 * 24 }); 
    Cookie.set("Nazya_refresh_token", response.data.refresh_token, { path: "/", maxAge: 60 * 60 * 24 }); 

    showToast("✅ Connexion réussie !", "success");
    setForm({ email: "", password: "" });
    SetIsLoading(false);

  } catch (error) {
    SetIsLoading(false);
    console.error("Erreur:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      showToast("⚠️ Email ou mot de passe incorrect.");
    } else if (error.response?.status === 429) {
      showToast("🚫 Trop de tentatives. Réessayez plus tard.");
    } else {
      showToast("⚠️ Erreur: " + (error.response?.data?.message || error.message));
    }
  }
};

  return (
    <>
      <Navbar Activity={true} />

      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h1 className="form-heading">Se Connecter</h1>

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

          {/* Password */}
          <div className="form-group">
            <label>Mot de pass</label>
            <input
              type="password"
              placeholder="Entrez votre mot de passe"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <button type="submit" className="btn-continue">
            Se Connecter
          </button>

          <p className="login-link">
            Pas de compte ? <a href="/register">Créer un compte</a>
          </p>
        </form>
      </div>

      {/* ✅ Toast Notification */}
      {toast && (
        <div className={`toasterr ${toast.type}`}>
          {toast.message}
        </div>
      )}

      {/* ✅ CSS داخل الكومبوننت مباشرة */}

{IsLoading && 
      <Loading />
}
    </>
  );
}

