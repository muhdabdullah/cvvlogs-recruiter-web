import React from "react";
import "./PremiumPackages.css";
import Footer from "../../Components/Footer/Footer";
import PackageRecr from "../../Components/PackagesRecr/PackageRecr";
import RightIcon from "../../Assests/home/right-icon.svg";
import WrongIcon from "../../Assests/home/wrong-icon.svg";
import Nav2 from "../../Components/Nav2/Nav2";
import MStripe from "../../stripeBtn";
import { getPricing } from "../../actions/pricingAction";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";
import pre from "../../Assests/recruiter.png";
import GPay from "../../Components/Gpay/Gpay";

function PremiumPackages(props) {
  useEffect(() => {
    loadGetPersonal(localStorage.getItem("auth_id1"));
  }, []);
  const loadGetPersonal = async (userId) => {
    await props.getPricing(userId);
    return null;
  };
  return (
    <>
      <Nav2 />
      <div className="container mt-4">
        <div className="row d-flex justify-content-center">
          <div className="col-12">
            <h1
              className="font-weight-bold text-center"
              style={{ color: "#865ddd" }}
            >
              Packages
            </h1>
          </div>
          <div className="col-12 d-flex justify-content-center">
            {/* {localStorage.getItem("userCurrentLocation") &&
            localStorage.getItem("userCurrentLocation") == "PK" ? (
              <img
                style={{ objectFit: "contain", height: "200px" }}
                src={pre}
                className="text-center"
              />
            ) : null} */}
            <h3 className="font-weight-bold">30 DAYS FREE TRIAL</h3>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          {props.pricingReducer.pricing.packages &&
          props.pricingReducer.pricing.packages.length > 0
            ? props.pricingReducer.pricing.packages.map((pri, index) => (
                <div
                  key={index}
                  className="col-lg-4 col-sm-12 shadow m-4 p-4 text-center"
                  style={{ borderRadius: "15px" }}
                >
                  <h4 className="text-center font-weight-bold">{pri.name}</h4>
                  <p>{pri.job_post_description}</p>
                  <p>{pri.search_candidates_description}</p>
                  <h2 className="cash-stan-main">
                    <div className="style-4">
                      <del>
                        {/* {localStorage.getItem("userCurrentLocation")
                          ? localStorage.getItem("userCurrentLocation") ==
                            "PK"
                            ? "PKR " + pri.price_pkr
                            : "USD " + pri.price
                          : !pri?.is_show_usd
                          ? "PKR " + pri.price_pkr
                          : "USD " + pri.price} */}
                        {"USD " + pri.price}
                      </del>
                    </div>
                  </h2>
                  <p className="font-weight-bold">
                    Please contact us for individual corporate packages
                  </p>
                </div>
              ))
            : ""}
        </div>
        {props.pricingReducer.loading == false ? <FullPageLoader /> : null}
      </div>

      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  pricingReducer: state.pricingReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getPricing: (userId) => dispatch(getPricing(userId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PremiumPackages);
