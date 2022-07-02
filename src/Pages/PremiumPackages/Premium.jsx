import React from "react";
import "./PremiumPackages.css";
import Footer from "../../Components/Footer/Footer";
import Nav2 from "../../Components/Nav2/Nav2";
import { getPricing } from "../../actions/pricingAction";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";
import freetrial from "../../Assests/freeTrial.png";

function PremiumPackages(props) {
  useEffect(() => {
    loadGetPersonal(localStorage.getItem("auth_id1"));
  }, []);
  const loadGetPersonal = async (userId) => {
    await props.getPricing(userId);
  };
  const isIPPK = () => {
    if (
      localStorage.getItem("userCurrentLocation") &&
      localStorage.getItem("userCurrentLocation") == "PK"
    )
      return true;
    else return false;
  };
  if (!props.pricingReducer.loading) {
    <FullPageLoader />;
  }

  return (
    <>
      <Nav2 />
      <div className="container my-4">
        <div className="row d-flex justify-content-center">
          {/* <div className="col-12 head">
            <h1 className="font-weight-bold text-center">
              Pricing and Planing
            </h1>
            <p className="text-center">
              Price building for your purpose of all types. Always know what
              you'll pay
            </p>
          </div> */}
          <div className="col-12 d-flex justify-content-center">
            <img style={{ width: "300px" }} src={freetrial} alt="free" />
          </div>
          <div
            className="col-lg-10 col-md-12 shadow main-package-box"
            style={{ borderRadius: "15px" }}
          >
            <div className="row p-2 package-types d-flex justify-content-end">
              {props?.pricingReducer?.pricing?.packages?.map((x, i) => (
                <>
                  <div
                    key={i}
                    className={`col-md-3 col-12 shadow type ${x.name.toLowerCase()}`}
                  >
                    {x.name === "Basic" ? (
                      <i class="fas fa-star"></i>
                    ) : (
                      <i class="far fa-gem"></i>
                    )}

                    <h4>{x.name}</h4>
                    <h1>
                      {x.price === "FREE"
                        ? x.price
                        : x.currency_symbol + x.price}
                      {x.price != "FREE" ? <span>{x.duration}</span> : null}
                    </h1>
                  </div>
                  {i ===
                  props?.pricingReducer?.pricing?.packages.length - 1 ? null : (
                    <div className="col-1"></div>
                  )}
                </>
              ))}
            </div>
            <div className="features mt-4">
              <div className="row p-2">
                <div className="col-6">
                  <p className="font-weight-bold">Features</p>
                </div>
                <div className="col-3 basic checks">
                  <p className="font-weight-bold">Basic</p>
                </div>
                <div className="col-3 premium checks">
                  <p className="font-weight-bold">Premium</p>
                </div>
              </div>
              <div className="row p-2">
                <div className="col-6 feature">
                  <p>Upto 10 Job posts per month</p>
                </div>
                <div className="col-3 basic checks">
                  <i class="far fa-check-circle checked"></i>
                </div>
                <div className="col-3 premium checks">
                  <i class="far fa-check-circle"></i>
                </div>
              </div>
              <div className="row p-2">
                <div className="col-6 feature">
                  <p>Upto 20 Job posts per month</p>
                </div>
                <div className="col-3 basic checks">
                  <i class="far fa-check-circle "></i>
                </div>
                <div className="col-3 premium checks">
                  <i class="far fa-check-circle checked"></i>
                </div>
              </div>
              <div className="row p-2">
                <div className="col-6 feature">
                  <p>
                    Search & view profile and video{" "}
                    {isIPPK() ? "cv's" : "resume's"} of unlimited number of
                    candidates.
                  </p>
                </div>
                <div className="col-3 basic checks">
                  <i class="far fa-check-circle checked"></i>
                </div>
                <div className="col-3 premium checks">
                  <i class="far fa-check-circle checked"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 mt-4">
            <p className="text-center">
              Please contact us for corporate packages.
            </p>
            <p className="text-center">
              By joining, you agree to our privacy policy and terms and
              conditions.
            </p>
          </div>
        </div>
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
