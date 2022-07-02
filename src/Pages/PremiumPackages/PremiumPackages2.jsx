import React from "react";
import "./PremiumPackages.css";
import Footer from "../../Components/Footer/Footer";
import PackageRecr from "../../Components/PackagesRecr/PackageRecr";
import RightIcon from "../../Assests/home/right-icon.svg";
import WrongIcon from "../../Assests/home/wrong-icon.svg";
import Nav2 from "../../Components/Nav2/Nav2";
import MStripe2 from "../../stripeBtn2";
import { getPricing } from "../../actions/pricingAction";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";
import pre from "../../Assests/recruiter.png";
import GPay from "../../Components/Gpay/Gpay";

function PremiumPackages2(props) {
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
        <div className="row">
          <div className="col-md-12">
            <h1
              className="font-weight-bold text-center"
              style={{ color: "#865ddd" }}
            >
              Plans and Pricing
            </h1>
            {/* <p className="font-weight-bold text-center mb-0" style={{ color: "#ffb44a" }}>30 days Promotional Offer! </p> */}
          </div>
          <div className="col-md-2 col-12"></div>
          <div className="col-md-8 col-12">
            <img
              style={{ objectFit: "contain" }}
              src={pre}
              height="70%"
              width="100%"
              className="text-center"
            />
          </div>
          <div className="col-md-2 col-12"></div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-2 mt-lg-n5"></div>
          {/* {props.pricingReducer.pricing.packages &&
          props.pricingReducer.pricing.packages.length > 0
            ? props.pricingReducer.pricing.packages.map((pri) => ( */}
          <div
            className="col-lg-4 col-md-8 shadow p-3 mt-lg-n5 mb-5"
            style={{ borderRadius: "15px" }}
          >
            <h1
              className="text-center font-weight-bold"
              style={{ color: "#707070" }}
            >
              Pricing
            </h1>
            <div className="row mt-5">
              <div className="col-md-3 p-0 m-0">
                <div className="text-right p-0 m-0">
                  <img src={RightIcon} className="p-0 m-0" />
                </div>
              </div>
              <div className="col-md-9">
                <p>Free unlimited job postings</p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-3 p-0 m-0">
                <div className="text-right p-0 m-0">
                  <img src={RightIcon} className="p-0 m-0" />
                </div>
              </div>
              <div className="col-md-9">
                <p>View unlimited video CV or resume </p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-3 p-0 m-0">
                <div className="text-right p-0 m-0">
                  <img src={RightIcon} className="p-0 m-0" />
                </div>
              </div>
              <div className="col-md-9">
                <p>Shortlist and download applicant information</p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-3 p-0 m-0">
                <div className="text-right p-0 m-0">
                  <img src={RightIcon} className="p-0 m-0" />
                </div>
              </div>
              <div className="col-md-9">
                <p>Communicate with potential applicants</p>
              </div>
            </div>
            {/* <div className="row my-3">
                  <div className="col-md-12">
                    <strike>
                      <h1 className="text-primary text-center cash-stan-main">{!localStorage.getItem("userCurrentLocation") == "PK"
                        ? "$ " + pri.price
                        : "Rs. " + "500"}
                        <small className="small-month">/month</small></h1>

                    </strike>
                  </div>
                </div> */}
            <div className="row">
              <div className="col-md-12 text-center ">
                <h1 className="cash-stan-main">
                  <div className="style-4">
                    <del>
                      {/* {localStorage.getItem("userCurrentLocation")
                        ? localStorage.getItem("userCurrentLocation") ==
                          "PK"
                          ? "PKR " + "5000"
                          : "USD " + "99.99"
                        : !pri?.is_show_usd
                        ? "PKR " + "5000"
                        : "USD " + "99.99"} */}
                      {"PKR " + "5000"}
                      {/* <small className="small-month">/month</small> */}
                    </del>
                  </div>
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-center mt-4">
                <p style={{ color: "red" }}>
                  <b>Special launch offer for 90 days</b>
                </p>
              </div>
            </div>
            {/* <div className="text-center">
                  <button className="btn btn-primary sub-con-btn w-100 create-job-home-btn">Buy Now</button>
                  <>
                    {
                      !localStorage.getItem("userCurrentLocation") == "PK" ?
                        <MStripe2 id={pri.id} amount={!localStorage.getItem("userCurrentLocation") == "PK"
                          ? pri.price
                          : pri.price_pkr} />
                        :
                        <GPay totalPrice={!localStorage.getItem("userCurrentLocation") == "PK"
                          ? pri.price
                          : pri.price_pkr} currencyCode={!localStorage.getItem("userCurrentLocation") == "PK"
                            ? "USD"
                            : "PKR"} />
                    }
                  </>
                </div> */}
          </div>
          {/* ))
            : ""}  */}
          <div className="col-lg-4 col-md-2"></div>
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
export default connect(mapStateToProps, mapDispatchToProps)(PremiumPackages2);

{
  /* <div className="container mt-5 mb-5">
      <div className="row justify-content-md-center">
        <div className="col-md-4"></div>
        <div
          className="col-md-4 shadow mt-5"
          style={{ borderRadius: "10px" }}
        >
          <h2 className="head-pack-main-premium mt-5">Standard</h2>
          <div className="row mt-5 pl-3">
            <div className="col-lg-3 col-md-2"></div>
            <div className="col-lg-1 col-md-2">
              <img src={RightIcon} alt="" />
            </div>
            <div className="col-lg-5 col-md-6">
              <p className="text-ofo-pack-prem">Contact Candidates</p>
            </div>
            <div className="col-lg-3 col-md-2"></div>
          </div>
          <div className="row mt-5 pl-3">
            <div className="col-lg-3 col-md-2"></div>
            <div className="col-lg-1 col-md-2">
              <img src={RightIcon} alt="" />
            </div>
            <div className="col-lg-5 col-md-6">
              <p className="text-ofo-pack-prem">Unlimited Profile Search</p>
            </div>
            <div className="col-lg-3 col-md-2"></div>
          </div>
          <h4 className=" price-of-premium-pack">
            $100
          </h4>
          <div className="row mt-4 mb-5">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <button className="btn btn-primary sub-con-btn w-100 create-job-home-btn">
                Buy Now
              </button>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
      </div> */
}
