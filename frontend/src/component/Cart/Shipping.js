import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Country, State } from "country-state-city";
import { saveShippingInfo } from "../../actions/cartAction";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { toast } from "react-toastify";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
        toast.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };

  return (
    <>
      <MetaData title={`Shipping Information`} />
      <div className="container mt-4">
        <div className="row justify-content-center ">
          <div className="col-md-6 col-12 shadow-lg p-2 usercontainer rounded-4 animate__animated animate__fadeInUp ">
            <div className="signupimagecontainer mb-5 ">
              <img src="/images/logoimage.png" alt="" />
              <h5 className="text-center">ShippingDetails</h5>
            </div>
            <form
              className="shippingForm "
              encType="multipart/form-data"
              onSubmit={shippingSubmit}
            >
              <div>
                <input
                  type="text"
                  placeholder="Enter Address ...."
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="form-control mb-3 "
                  required={true}
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Enter City ....."
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="form-control mb-3"
                  required={true}
                />
              </div>

              <div>
                <input
                  type="number"
                  placeholder="Enter Pin Code ...."
                  required
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="form-control mb-3"
                  required={true}
                />
              </div>

              <div>
                <input
                  type="number"
                  placeholder="Enter Phone Number ....."
                  required
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  size="10"
                  className="form-control mb-3"
                  required={true}
                />
              </div>

              <div>
                <select
                  className="form-select mb-3"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required={true}
                >
                  <option value="">Country</option>
                  {Country &&
                    Country.getAllCountries().map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>

              {country && (
                <div>
                  <select
                    class="form-select mb-3"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required={true}
                  >
                    <option value="">State</option>
                    {State &&
                      State.getStatesOfCountry(country).map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              <div className="text-center">
                <button
                  type="submit"
                  value="Continue"
                  className="btn btn-outline-dark btn-sm my-3 neumorphin"
                  disabled={state ? false : true}
                >
                  Next To Proceed <i class="fa-solid fa-angles-right ms-1"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
