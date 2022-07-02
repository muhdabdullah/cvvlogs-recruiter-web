import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AppliedCandidates.css";
import Profile from "../../Assests/pos-job-desc/profile.png";

function AppliedCandidates() {
  return (
    <div className="container">
      <div className="row flex-nowrap main-row-app-cand p-2">
        {/* Api Starts Here */}
        <div className="col-md-6 shadow profile-card-user-one">
          <div className="row">
            <div className="col-md-3">
              <img src={Profile} alt="" className="img-comp-app-can" />
            </div>
            <div className="col-md-9">
              <h5 className="can-name-app-can m-0 p-0 ml-2">David Young</h5>
              <p className="can-loc-app-can ml-2">Sydney, Australia</p>
              <h6 className="skill-app-cen m-0 p-0 ml-2">Key Skills</h6>
              <p className="user-desc-prof-card ml-2">
                Graphic design, Video editing, Social media management
              </p>
            </div>
          </div>
        </div>
        {/* Api Starts Here */}
        {/* Api Starts Here */}
        <div className="col-md-6 shadow profile-card-user-one">
          <div className="row">
            <div className="col-md-3">
              <img src={Profile} alt="" className="img-comp-app-can" />
            </div>
            <div className="col-md-9">
              <h5 className="can-name-app-can m-0 p-0 ml-2">David Young</h5>
              <p className="can-loc-app-can ml-2">Sydney, Australia</p>
              <h6 className="skill-app-cen m-0 p-0 ml-2">Key Skills</h6>
              <p className="user-desc-prof-card ml-2">
                Graphic design, Video editing, Social media management
              </p>
            </div>
          </div>
        </div>
        {/* Api Starts Here */}
        {/* Api Starts Here */}
        <div className="col-md-6 shadow profile-card-user-one">
          <div className="row">
            <div className="col-md-3">
              <img src={Profile} alt="" className="img-comp-app-can" />
            </div>
            <div className="col-md-9">
              <h5 className="can-name-app-can m-0 p-0 ml-2">David Young</h5>
              <p className="can-loc-app-can ml-2">Sydney, Australia</p>
              <h6 className="skill-app-cen m-0 p-0 ml-2">Key Skills</h6>
              <p className="user-desc-prof-card ml-2">
                Graphic design, Video editing, Social media management
              </p>
            </div>
          </div>
        </div>
        {/* Api Starts Here */}
      </div>
    </div>
  );
}

export default AppliedCandidates;

{
  /* <div className="container">
      <div className="row mt-5">
        <div className="col-md-12 card-main-app-can">
          <div className="row">
            <h1>sdj</h1>
            <div className="col-md-6 shadow profile-card-user-one">
              <div className="row">
                <div className="col-md-3">
                  <img src={Profile} alt="" className="img-comp-app-can" />
                </div>
                <div className="col-md-9">
                  <h5 className="can-name-app-can m-0 p-0">David Young</h5>
                  <p className="can-loc-app-can">Sydney, Australia</p>
                  <h6 className="skill-app-cen m-0 p-0">Key Skills</h6>
                  <p className="user-desc-prof-card">
                    Graphic design, Video editing, Social media management
                  </p>
                </div>
              </div>
            </div>
            <h1>sdj</h1>
            <div className="col-md-6"></div>
          </div>
        </div>
      </div>
    </div> */
}
