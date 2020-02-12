import React, { useState, useCallback } from "react";
import { render } from "react-dom";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

function Support() {
  return (
    <div className="sidebar-exit">
      <h2 className="text-center mb-3">Support</h2>
      <div className="container">
        <h3 className="text-center">Management</h3>
        <div className="row">
          <div className="col-md-4">
            <img
              src="https://i.ibb.co/QmkBM36/principal.jpg"
              style={{ width: "100%", height: "300px" }}
            />
            <p className="text-center mt-2 mb-0">Dr. G.M. Patil</p>
            <p className="text-center m-0">Principal, JSSATE, Noida</p>
          </div>
          <div className="col-md-4">
            <img
              src="https://i.ibb.co/Dgx4KKT/18198492-10208708315532014-828268460074402944-n.jpg"
              alt="18198492-10208708315532014-828268460074402944-n"
              style={{ width: "100%", height: "300px" }}
            />
            <p className="text-center mt-2 mb-0">Dr. Prashant Chauhan</p>
            <p className="text-center m-0">Dean(SW), JSSATE, Noida</p>
          </div>
          <div className="col-md-4">
            <img
              src="https://i.ibb.co/58ydFCF/girish.jpg"
              alt="18198492-10208708315532014-828268460074402944-n"
              style={{ width: "100%", height: "300px" }}
            />
            <p className="text-center mt-2 mb-0">B.E.Girish (M.P.Ed)</p>
            <p className="text-center m-0">Physical Education Director</p>
          </div>
        </div>
        <h3 className="text-center my-4">Our Alumni</h3>
        <div className="row">
          <div className="col-md-3 col-6 mt-2">
            <img
              src="https://i.ibb.co/rtD1G35/14976886-779512452190150-2342831653206792280-o.jpg"
              alt="14976886-779512452190150-2342831653206792280-o"
              style={{ width: "100%", height: "200px" }}
            />
            <p className="text-center mt-2 mb-0">Vasu Chaudhary</p>
          </div>
          <div className="col-md-3 col-6 mt-2">
            <img
              src="https://i.ibb.co/pXRrVKx/19667814-484102688594949-5840545497000616388-o.jpg"
              alt="18198492-10208708315532014-828268460074402944-n"
              style={{ width: "100%", height: "200px" }}
            />
            <p className="text-center mt-2 mb-0">Ruchir Verma</p>
          </div>
          <div className="col-md-3 col-6 mt-2">
            <img
              src="https://i.ibb.co/C0PqFK6/amar.jpg"
              alt="18198492-10208708315532014-828268460074402944-n"
              style={{ width: "100%", height: "200px" }}
            />
            <p className="text-center mt-2 mb-0">Amardeep Singh</p>
          </div>
          <div className="col-md-3 col-6 mt-2">
            <img
              src="https://i.ibb.co/k2rv5Jt/ani.jpg"
              alt="18198492-10208708315532014-828268460074402944-n"
              style={{ width: "100%", height: "200px" }}
            />
            <p className="text-center mt-2 mb-0">Kumar Aniruddh</p>
          </div>
        </div>
        <div className="row my-3">
          <div className="col-md-3 col-6 mt-2">
            <img
              src="https://i.ibb.co/DgnV0tG/veeru.jpg"
              style={{ width: "100%", height: "200px" }}
            />
            <p className="text-center mt-2 mb-0">Birender Yadav</p>
          </div>
          <div className="col-md-3 col-6 mt-2">
            <img
              src="https://i.ibb.co/2qr9rcn/pp.jpg"
              style={{ width: "100%", height: "200px" }}
            />
            <p className="text-center mt-2 mb-0">Anuj Vashisth</p>
          </div>
          <div className="col-md-3 col-6 mt-2">
            <img
              src="https://i.ibb.co/bvh6xHC/pp-1.jpg"
              alt="18198492-10208708315532014-828268460074402944-n"
              style={{ width: "100%", height: "200px" }}
            />
            <p className="text-center mt-2 mb-0">Kshitij Tyagi</p>
          </div>
          <div className="col-md-3 col-6 mt-2">
            <img
              src="https://i.ibb.co/BqbRfhX/hapur.jpg"
              alt="18198492-10208708315532014-828268460074402944-n"
              style={{ width: "100%", height: "200px" }}
            />
            <p className="text-center mt-2 mb-0">Divyansh Singh</p>
          </div>
          <div className="col-md-3 col-6 mt-2">
            <img
              src="https://i.ibb.co/XXW9rjX/ashish.jpg"
              alt="18198492-10208708315532014-828268460074402944-n"
              style={{ width: "100%", height: "200px" }}
            />
            <p className="text-center mt-2 mb-0">Ashish Kumar</p>
          </div>

          <div className="col-md-3 col-6 mt-2">
            <img
              src="https://i.ibb.co/4JYyXbR/abhi.jpg"
              alt="18198492-10208708315532014-828268460074402944-n"
              style={{ width: "100%", height: "200px" }}
            />
            <p className="text-center mt-2 mb-0">Abhishek Chaudhary</p>
          </div>

          <div className="col-md-3 col-6 mt-2">
            <img
              src="https://i.ibb.co/3NTzqkz/prabhat.jpg"
              alt="18198492-10208708315532014-828268460074402944-n"
              style={{ width: "100%", height: "200px" }}
            />
            <p className="text-center mt-2 mb-0">Prabhat Chaturvedi</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Support;


