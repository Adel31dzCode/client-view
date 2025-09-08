import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Pricing from './Pages/Pricing'
import FormTcf from './Components/FormTcf'
import Dashboard from './Pages/Dashboard'
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import CheckCode from './Pages/Auth/CheckCode';
import TcfFormules from './Pages/Dahboard/TcfFormules';
import Users from './Pages/Dahboard/Users';
import AdmissionPageDap from './Pages/AdmissionPageDap';
import AdmissionPageHorz from './Pages/AdmissionPageHorz';
import Cookies from 'universal-cookie';

import { Api_link } from './assets/Api';

import CompletSerivce from './Pages/Cat-Dap/CompletSerivce'
import Service1 from './Pages/Cat-Dap/Service1'
import Service2_horz from './Pages/Cat-horDap/Service2_horz'
import ServiceCompletHorz from './Pages/Cat-horDap/ServiceCompletHorz'
import Service3 from './Pages/Cat-Dap/Service3'
import Service2 from './Pages/Cat-Dap/Service2'
import axiosClient from './assets/AxiosClient'
import Service1_horz from './Pages/Cat-horDap/Service1_horz'
import Service3_horz from './Pages/Cat-horDap/Service3_horz'
import Shop from './Pages/Shop'

function App() {

  const Cookie = new Cookies();
  const [user, setUser] = useState(null);
  const [IsLoading, SetIsLoading] = useState();

    useEffect(() => {
      const token = Cookie.get("Nazya_access_token");
      if (token) {
        SetIsLoading(true);
        axiosClient.get(`${Api_link}user`)
        .then(res =>{ setUser(res.data); SetIsLoading(false); console.log(res)})
        .catch((err) =>{ setUser(null); SetIsLoading(false); console.log(err)});
      }
    }, []);


  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard UserExisting={user}/>}>
        <Route path="Tcf-Formule" element={<TcfFormules />}></Route>
        <Route path="users" element={<Users />}></Route>
      </Route>
      <Route path="/" element={<Home UserExisting={user}/>}/>
      <Route path="/round" element={<Pricing UserExisting={user}/>}/>
      <Route path="/form" element={<FormTcf UserExisting={user}/>}/>
      <Route path="/register" element={<Register UserExisting={user}/>}/>
      <Route path="/login" element={<Login UserExisting={user}/>}/>
      <Route path="/verify-code" element={<CheckCode UserExisting={user}/>}/>
      <Route path="/AdmissionDap" element={<AdmissionPageDap UserExisting={user}/>}/>
      <Route path="/AdmissionHorzDap" element={<AdmissionPageHorz UserExisting={user}/>}/>



      <Route path="/service-complet-dap" element={<CompletSerivce UserExisting={user}/>}/>

      <Route path="/Service-dap-one" element={<Service1 UserExisting={user} LoadingState={IsLoading}/>}/>
      <Route path="/Service-dap-two" element={<Service2 UserExisting={user} LoadingState={IsLoading}/>}/>
      <Route path="/Service-dap-three" element={<Service3 UserExisting={user} LoadingState={IsLoading}/>}/>

      
      
      <Route path="/Service-complet-horz" element={<ServiceCompletHorz UserExisting={user} LoadingState={IsLoading}/>}/>      <Route path="/Service-horz-two" element={<Service2_horz UserExisting={user} LoadingState={IsLoading}/>}/>
      <Route path="/Service-horz-one" element={<Service1_horz UserExisting={user} LoadingState={IsLoading}/>}/>
      <Route path="/Service-horz-two" element={<Service2_horz UserExisting={user} LoadingState={IsLoading}/>}/>
      <Route path="/Service-horz-three" element={<Service3_horz UserExisting={user} LoadingState={IsLoading}/>}/>

      <Route path="/Boutique-online" element={<Shop UserExisting={user}/>}/>




    </Routes>
  )
}

export default App;



// , {
//           headers: { Authorization: `Bearer ${token}` }
//         })
