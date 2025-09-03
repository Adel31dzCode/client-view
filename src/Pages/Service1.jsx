import React from 'react';
import "../Css/Services/Services.css";
import Navbar from '../Components/Navbar';
import list_style from "../Img/finger.png";

export default function Service1() {
  return (<>

    <Navbar Activity={true} logo_anim_st={true}/>

    <div id="page-service">
        <aside id='aside'>
            <ul>
                <li>A propos du program</li>
                <li>Frais</li>
                <li>Description</li>
                <li>Documents</li>
            </ul>
        </aside>

        <section id='section-content'>
            <h1>Category 1</h1>
            <div id="separator-service"><span className="separator-span1"></span><span className="separator-span2"></span></div>

            <h2 className="title-service"><img src={list_style} alt="lis-style" />Service 1</h2>

            <p className='para-content-service'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Assumenda porro excepturi repellat maxime sunt voluptatibus dolore temporibus, laborum similique alias minus unde? Ipsa culpa aliquam harum quia officia iste provident!</p>


        </section>
    </div>

    </>
  )
}
