import React from 'react'
import Navbar from '../Components/Navbar'
import '../Css/Admission.css'
import { useNavigate } from 'react-router-dom';

export default function AdmissionPageHorz() {

    const navigate = useNavigate();

  return (
    <>
    <Navbar Activity={true}/>

    
    <div id="admision-body">

      <h1>L'admission Horz Dap</h1>

    <div id="services-continer-admission">
        <div id="service-complet">
          <h2>Service Complet</h2>

          <p id="desc_service_complet">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi sed eaque error odio illum, alias quo. Obcaecati nam, dolor velit cumque eveniet reprehenderit placeat corrupti laborum consequatur! Quae, assumenda debitis.</p>
            <button 
                className='acceder-btn' id='complet_service_btn' type="button"
                onClick={() => window.location.href = "/Service-complet-horz"}
              >
                Acceder
            </button>
        </div>

        <div id="service-parciel">
          <h2>Service Parciel</h2>

          <div id="forms-checksboxes-continer">

            <form>
              <h3>Category 1</h3>
              <label htmlFor="dossier1"><input type="checkbox" checked disabled name="Doisser" id='dossier1'/><span>Service 1</span></label>
              <label htmlFor="dossier2"><input type="checkbox" checked disabled name="Doisser" id='dossier2'/><span>Service 2</span></label>
              <label htmlFor="dossier3"><input type="checkbox" checked disabled name="Doisser" id='dossier3'/><span>Service 3</span></label>
              <button 
                className='acceder-btn' 
                type="button"
                onClick={() => navigate("/Service-horz-one")}
              >
                Acceder
              </button>
            </form>

            <form>
              <h3>Category 2</h3>
              <label htmlFor="dossier4"><input type="checkbox" checked disabled name="Doisser" id='dossier4'/><span>Service 1</span></label>
              <label htmlFor="dossier5"><input type="checkbox" checked disabled name="Doisser" id='dossier5'/><span>Service 2</span></label>
              <label htmlFor="dossier6"><input type="checkbox" checked disabled name="Doisser" id='dossier6'/><span>Service 3</span></label>
              <button 
                className='acceder-btn' 
                type="button"
                onClick={() => navigate("/Service-horz-two")}
              >
                Acceder
              </button>         
              </form>

            <form>
              <h3>Category 3</h3>
              <label htmlFor="dossier7"><input type="checkbox" checked disabled name="Doisser" id='dossier7'/><span>Service 1</span></label>
              <label htmlFor="dossier8"><input type="checkbox" checked disabled name="Doisser" id='dossier8'/><span>Service 2</span></label>
              <label htmlFor="dossier9"><input type="checkbox" checked disabled name="Doisser" id='dossier9'/><span>Service 3</span></label>
              <button 
                className='acceder-btn' 
                type="button"
                onClick={() => navigate("/Service-horz-three")}
              >
                Acceder
              </button>
            </form>
          </div>

              


        </div>
    </div>  

    </div>
    
    </>
  )
}
