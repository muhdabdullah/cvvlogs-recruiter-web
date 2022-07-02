import React from "react";
import "./PackageRecr.css";
import RightIcon from "../../Assests/home/right-icon.svg";
import WrongIcon from "../../Assests/home/wrong-icon.svg";
import MStripe from "../../stripeBtn";
import pre from "../../Assests/promo.png"
function PackageRecr() {
  return (
    <div className="container mb-5 mt-4">
      <div className="row">
          <div className="col-md-12">
            <h1 className="font-weight-bold text-center" style={{ color: "#865ddd" }}>
              Plans and Pricing
            </h1>
  
          </div>
          <div className="col-md-2 col-12"></div>
          <div className="col-md-8 col-12"><img style={{objectFit:"contain"}} src={pre} height="70%" width="100%" className="text-center" /></div>
          <div className="col-md-2 col-12"></div>
        </div>
      <div className="row justify-content-md-center">
        {/* <div className="col-md-1"></div> */}
        <div
          className="col-md-3 shadow mt-3"
          style={{ borderRadius: "10px" }}
        >
          {/* Standard Starts here */}
          <h4 className="head-pack-main-premium mt-5">Pricing</h4>
          <div className="row mt-5 pl-3">
            <div className="col-md-2">
              <img src={RightIcon} alt="" />
            </div>
            <div className="col-md-2">
              <p className="num-ofo-pack-prem">25</p>
            </div>
            <div className="col-md-8">
              <p className="text-ofo-pack-prem">Monthly Views</p>
            </div>
          </div>
          <div className="row pl-3">
            <div className="col-md-2">
              <img src={RightIcon} alt="" />
            </div>
            <div className="col-md-2">
              <p className="num-ofo-pack-prem">5</p>
            </div>
            <div className="col-md-8">
              <p className="text-ofo-pack-prem">Monthly Shortlists</p>
            </div>
          </div>
          <div className="row pl-3">
            <div className="col-md-2">
              <img src={WrongIcon} alt="" />
            </div>
            <div className="col-md-10">
              <p className="text-ofo-pack-prem">International Hiring</p>
            </div>
          </div>
          <h4 className="mt-5 price-of-premium-pack">
            $49<span className="month-of-premium">/month</span>
          </h4>
          <div className="row mt-4 mb-5">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              {/* <button className="btn btn-primary sub-con-btn w-100 create-job-home-btn">
                Buy Now
              </button> */}
                <MStripe  amount={10} />
            </div>
            <div className="col-md-2"></div>
          </div>
          {/* Standard Ends here */}
        </div>
        <div className="col-md-1"></div>
        <div
          className="col-md-3 shadow mt-5"
          style={{ borderRadius: "10px" }}
        >
          {/* Premium Starts here */}
          <h4 className="head-pack-main-premium mt-5">Premium</h4>
          <div className="row mt-5 pl-3">
            <div className="col-md-2">
              <img src={RightIcon} alt="" />
            </div>
            <div className="col-md-2">
              <p className="num-ofo-pack-prem">50</p>
            </div>
            <div className="col-md-8">
              <p className="text-ofo-pack-prem">Monthly Views</p>
            </div>
          </div>
          <div className="row pl-3">
            <div className="col-md-2">
              <img src={RightIcon} alt="" />
            </div>
            <div className="col-md-2">
              <p className="num-ofo-pack-prem">10</p>
            </div>
            <div className="col-md-8">
              <p className="text-ofo-pack-prem">Monthly Shortlists</p>
            </div>
          </div>
          <div className="row pl-3">
            <div className="col-md-2">
              <img src={RightIcon} alt="" />
            </div>
            <div className="col-md-10">
              <p className="text-ofo-pack-prem">International Hiring</p>
            </div>
          </div>
          <h4 className="mt-5 price-of-premium-pack">
            $99<span className="month-of-premium">/month</span>
          </h4>
          <div className="row mt-4 mb-5">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              {/* <button className="btn btn-primary w-100 sub-con-btn create-job-home-btn">
                Buy Now
              </button> */}
              <MStripe  amount={10} />
            </div>
            <div className="col-md-2"></div>
          </div>
          {/* Premium Ends here */}
        </div>
        <div className="col-md-1"></div>
        <div
          className="col-md-3 shadow mt-5"
          style={{ borderRadius: "10px" }}
        >
          {/* Enterprise Starts here */}
          <h4 className="head-pack-main-premium mt-5">Enterprise</h4>
          <div className="row mt-5 pl-3">
            <div className="col-md-2">
              <img src={RightIcon} alt="" />
            </div>
            <div className="col-md-2">
              <p className="num-ofo-pack-prem">1000</p>
            </div>
            <div className="col-md-8">
              <p className="text-ofo-pack-prem">Monthly Views</p>
            </div>
          </div>
          <div className="row pl-3">
            <div className="col-md-2">
              <img src={RightIcon} alt="" />
            </div>
            <div className="col-md-2">
              <p className="num-ofo-pack-prem">100</p>
            </div>
            <div className="col-md-8">
              <p className="text-ofo-pack-prem">Monthly Shortlists</p>
            </div>
          </div>
          <div className="row pl-3">
            <div className="col-md-2">
              <img src={RightIcon} alt="" />
            </div>
            <div className="col-md-10">
              <p className="text-ofo-pack-prem">International Hiring</p>
            </div>
          </div>
          <h4 className="mt-5 price-of-premium-pack">
            $999<span className="month-of-premium">/month</span>
          </h4>
          <div className="row mt-4 mb-5">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              {/* <button className="btn btn-primary sub-con-btn w-100 create-job-home-btn">
                Buy Now
              </button> */}
              <MStripe  amount={10} />
            </div>
            <div className="col-md-2"></div>
          </div>
          {/* EnterPrise End */}
        </div>
      </div>
    </div>
  );
}

export default PackageRecr;
