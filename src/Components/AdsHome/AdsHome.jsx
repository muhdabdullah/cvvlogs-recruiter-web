import React from "react";
import "./AdsHome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PostedJobsHome from "../PostedJobsHome/PostedJobsHome";
import PackageRecr from "../PackagesRecr/PackageRecr";

function AdsHome() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-10">
          <PostedJobsHome />
          <h3 className="unlick-premkum mt-5">
            Unlock Premium features to find the suitable candidate!
          </h3>
          <PackageRecr />
        </div>
        {/* <div className="col-md-1"></div> */}
        <div className="col-md-2">
          <div className="place-ad">
            <h4>Place Ad </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdsHome;
