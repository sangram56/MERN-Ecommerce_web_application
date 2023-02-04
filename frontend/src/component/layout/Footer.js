import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="container-fluid footercontainer shadow-lg">
        <div className="row p-1 align-items-center justify-content-around footercontainerow">
          <div className="col-md-3 col-6">
            <ul className="footerlinks">
              <h6 className="footerheadtext">Links : </h6>
              <Link to={`/`} className="footerlink">
                <li>home</li>
              </Link>

              <Link to={`/products`} className="footerlink">
                <li>products</li>
              </Link>

              <Link to={`/search`} className="footerlink">
                <li>search Product</li>
              </Link>

              <Link to={`/login`} className="footerlink">
                <li>login</li>
              </Link>

             
            </ul>
          </div>

          <div className="col-md-3 col-6">
            <ul className="footerlinks">
              <h6 className="footerheadtext">Address : </h6>
              <li>Manjunathnagar</li>
              <li>60feet road</li>
              <li>560010</li>
              <li>123456789</li>
            </ul>
          </div>

          <div className="col-md-3 col-6">
            <ul className="footerlinks">
              <h6 className="footerheadtext">Socila Media Links</h6>
              <Link to={`/`} className="footerlink">
                <li>
                  Facebook :
                  <i className="fa-brands footericon fa-facebook-f"></i>{" "}
                </li>
              </Link>
              <Link to={`/`} className="footerlink">
                <li>
                  Dribble :<i className="fa-solid footericon fa-basketball"></i>
                </li>
              </Link>

              <Link to={`/`} className="footerlink">
                <li>
                  Whatsapp :<i className="fa-brands footericon fa-whatsapp"></i>
                </li>
              </Link>

              <Link to={`/`} className="footerlink">
                <li>
                  Twitter :<i className="fa-brands footericon fa-twitter"></i>
                </li>
              </Link>
            </ul>
          </div>

          <div className="col-md-3 col-6">
          <p className='text-center copyright'>Buy Sure @ 2022 - All Right Reserved</p>
          <hr className="text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
