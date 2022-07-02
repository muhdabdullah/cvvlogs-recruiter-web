import React from "react";
import "./PostedJobsHome.css";
import Location from "../../Assests/PostedJobsHome/Location.svg";

function PostedJobsHome() {
  return (
    <>
      <div className="container">
        <div className="row">
        <div className="col-md-12 shadow" style={{borderRadius:"15px"}}>
          <h4 className="pited-job-main mt-3 ml-5">Posted Jobs</h4>
          <div className="row">
            <div className="col-md-3 mt-3 shadow p-2 pl-3 ml-5" style={{borderRadius:"10px"}}>
              <h6 className="pt-2 m-0 p-0 head-color-of-posr">Graphic Designer</h6>
              <p className="technsym-text-comp">Technysm</p>
              
              <p className="para-loc-text"><img src={Location} alt="" /> Karachi, Pakistan</p>
            </div>
            {/* <div className="col-md-1"></div> */}
            <div className="col-md-3 mt-3 shadow p-2 pl-3 ml-5" style={{borderRadius:"10px"}}>
              <h6 className="pt-2 m-0 p-0 head-color-of-posr">Graphic Designer</h6>
              <p className="technsym-text-comp">Technysm</p>
              
              <p className="para-loc-text"><img src={Location} alt="" /> Karachi, Pakistan</p>
            </div>
            {/* <div className="col-md-1"></div> */}
            <div className="col-md-3 mt-3 shadow p-2 pl-3 ml-5" style={{borderRadius:"10px"}}>
              <h6 className="pt-2 m-0 p-0 head-color-of-posr">Graphic Designer</h6>
              <p className="technsym-text-comp">Technysm</p>
              
              <p className="para-loc-text"><img src={Location} alt="" /> Karachi, Pakistan</p>
            </div>
          </div>
          <div className="row">
          <div className="col-md-3 mt-3 shadow p-2 pl-3 ml-5" style={{borderRadius:"10px"}}>
              <h6 className="pt-2 m-0 p-0 head-color-of-posr">Graphic Designer</h6>
              <p className="technsym-text-comp">Technysm</p>
              
              <p className="para-loc-text"><img src={Location} alt="" /> Karachi, Pakistan</p>
            </div>
            {/* <div className="col-md-1"></div> */}
            <div className="col-md-3 mt-3 shadow p-2 pl-3 ml-5" style={{borderRadius:"10px"}}>
              <h6 className="pt-2 m-0 p-0 head-color-of-posr">Graphic Designer</h6>
              <p className="technsym-text-comp">Technysm</p>
              
              <p className="para-loc-text"><img src={Location} alt="" /> Karachi, Pakistan</p>
            </div>
            {/* <div className="col-md-1"></div> */}
            <div className="col-md-3 mt-3 shadow p-2 pl-3 ml-5" style={{borderRadius:"10px"}}>
              <h6 className="pt-2 m-0 p-0 head-color-of-posr">Graphic Designer</h6>
              <p className="technsym-text-comp">Technysm</p>
              
              <p className="para-loc-text"><img src={Location} alt="" /> Karachi, Pakistan</p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <p className="view-more-pofts-jkbs">View more{`>>`}</p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default PostedJobsHome;


{/* <div className="row">
              <div className="col-md-3 shadow">ad</div>
              <div className="col-md-3 shadow">asd</div>
              <div className="col-md-3 shadow">asd</div>
            </div> */}