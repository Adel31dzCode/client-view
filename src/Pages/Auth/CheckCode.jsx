import React, { useState } from 'react';
import '../../Css/Auth/Register.css'; 
import Navbar from '../../Components/Navbar';
import Loading from '../../Components/Loading';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Api_link } from '../../assets/Api';
import { useNavigate, useLocation } from 'react-router-dom';


export default function CheckCode() {

  const location = useLocation();
  const emailFromRegister = location.state?.email || "";

  console.log(emailFromRegister)
  const [IsLoading, SetIsLoading] = useState(false);
  const Cookie = new Cookies();

  const [form, setForm] = useState({
    email: emailFromRegister,        // لازم يجي من صفحة التسجيل أو من localStorage
    codeEntered: "",
  });


  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  // تحقق من صحة الفورم
  const validateForm = () => {
    const newErrors = {};
    if (!form.codeEntered || form.codeEntered.length !== 6) {
      newErrors.codeEntered = "Enter a valid 6-digit code.";
    }
    if (!form.email) {
      newErrors.email = "Missing email address Please Register Again Something Went Wrong. Sorry !.";
      setTimeout(() => {
      navigate("/"); 
      }, 2000);
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showToast = (message, type = "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };


console.log(toast)
const CodeResending = async () => {
  try {
    SetIsLoading(true);
    const response = await axios.post(`${Api_link}resend-code`, {
      email: form.email,
    });

    showToast("📩 Code de vérification renvoyé avec succès.");
    SetIsLoading(false);
    console.log("✅ Resend success:", response.data);


  } catch (error) {
    SetIsLoading(false);
    if (!error.response) {
      showToast("❌ Impossible de se connecter au serveur Resend.");
      return;
    }

    const status = error.response.status;
    const apiMsg = error.response.data?.message;

    switch (status) {
      case 404:
        showToast("⚠️ Aucun enregistrement en attente pour cet e-mail. Register!");
        setTimeout(() => {
          navigate("/Register"); 
        }, 3000);
        break;
      case 403:
        showToast("🚫 Vous avez déjà utilisé votre tentative de renvoi. Attendez 3 heures Et Register.");
        break;
      default:
        showToast(`⚠️ Erreur: ${apiMsg || error.message}`);
        break;
    }
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      SetIsLoading(true);

      const response = await axios.post(`${Api_link}verify-code`, {
        email: form.email,
        code: form.codeEntered,
      });

      console.log("✅ Code Verified:", response.data);

      Cookie.set("Nazya_access_token", response.data.access_token, { path: "/", maxAge: 60 * 60 * 24 }); 
      Cookie.set("Nazya_refresh_token", response.data.refresh_token, { path: "/", maxAge: 60 * 60 * 24 }); 

      showToast("✅ Email Verified Successfully 3Sec And We Will Redirect You To Home Page!", "success");
      setForm({ email: "", codeEntered: "" });

      setTimeout(() => {
        navigate("/"); 
      }, 3000);


    } catch (error) {
  console.error("Erreur:", error.response?.data || error.message);

  if (!error.response) {
    showToast("❌ Impossible de se connecter au serveur.");
    return;
  }

  const status = error.response.status;
  const apiMsg = error.response.data?.message;
  const apiErrors = error.response.data?.errors;

  switch (status) {
    case 401:
      showToast("⚠️ Code invalide ou expiré.");
      break;

    default:
      showToast(`⚠️ Erreur: ${apiMsg || error.message}`);
      setTimeout(() => {
        navigate("/register");
      }, 3000);
      break;
  }
    } finally {
      SetIsLoading(false);
    }
  };

  return (
    <>
      <Navbar Activity={true} />

      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h1 className="form-heading">Confirm Code</h1>
          <p className="form-note">
            We sent you a 6-digit code by email, please enter it below:
          </p>

          <div className="form-group">
            <label>Code</label>
            <input
              type="text"
              id='code-input-check'
              placeholder="XXXXXX"
              pattern="[0-9]*" 
              inputMode="numeric"
              max={6}
              maxLength={6}
              value={form.codeEntered}
              onChange={(e) => {
                  const onlyNums = e.target.value.replace(/\D/g, ""); // يمسح أي حرف غير رقم
                  setForm({ ...form, codeEntered: onlyNums });
                }}
              required
            />
            {errors.codeEntered && <p className="error">{errors.codeEntered}</p>}
          </div>

          <button type="submit" className="btn-continue">Confirm</button>

          <div id="flex_resend">
            <p className="login-link resend-btn mr-t-resend"><a href="/register">Back</a></p>
            <p className="login-link resend-btn" onClick={CodeResending}>Resend Code</p>
          </div>
        </form>
      </div>

      {toast && <div className={`toasterr ${toast.type}`}>{toast.message}</div>}
      {IsLoading && <Loading />}
    </>
  );

}
