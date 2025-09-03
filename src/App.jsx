import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Pricing from './Pages/Pricing'
import FormTcf from './Components/FormTcf'
import Dashboard from './Pages/Dashboard'
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';

import { ref, onValue } from "firebase/database";
import { db } from "./firebase";
import CheckCode from './Pages/Auth/CheckCode'
import TcfFormules from './Pages/Dahboard/TcfFormules'
import Users from './Pages/Dahboard/Users'
import AdmissionPage from './Pages/AdmissionPage'
import Service1 from './Pages/Service1'
import CompletSerivce from './Pages/CompletSerivce'

function App() {



  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="Tcf-Formule" element={<TcfFormules />}></Route>
        <Route path="users" element={<Users />}></Route>
      </Route>
      <Route path="/" element={<Home />}/>
      <Route path="/round" element={<Pricing />}/>
      <Route path="/form" element={<FormTcf />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/verify-code" element={<CheckCode />}/>
      <Route path="/Admission" element={<AdmissionPage />}/>
      <Route path="/Service" element={<Service1 />}/>
      <Route path="/service-complet" element={<CompletSerivce />}/>


    </Routes>
  )
}

export default App;
