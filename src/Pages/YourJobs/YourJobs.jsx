import React , {useEffect,useState} from "react";
import "./YourJobs.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Briefcase from "../../Assests/posted-jobs/Briefcase.svg";
import Location from "../../Assests/posted-jobs/location.svg";
import Pen from "../../Assests/posted-jobs/Pen.svg";
import { connect } from "react-redux";
import {Link} from "react-router-dom"
import { getAllJobs } from "../../actions/alljobsAction";

function YourJobs(props) {
  useEffect(() => {
    jobData(localStorage.getItem("auth_id1"))
  }, []);

  const jobData = async (userId) => {
    await props.getAllJobs(userId)
    return null;
  }
  return (
    <>
      <Navbar />
      <div className="container container-bottom padder">
        <div className="row mb-3">
          <div className="col-md-12">
            <h1 className="posted-jobs-rexr-head">Your Jobs</h1>
            <h6 className="posted-jobs-rexr-para">
              These {props.alljobsReducer.alljobs.jobs?props.alljobsReducer.alljobs.jobs.length:"0"} jobs that you have posted
            </h6>
          </div>
        </div>
        <div className="row">
          {/* <button onClick={()=>console.log("fff",props.alljobsReducer.alljobs.jobs)}>ggggg</button> */}
          <div className="col-md-9">
            {
              props.alljobsReducer.alljobs.jobs&&props.alljobsReducer.alljobs.jobs.length>0?
              props.alljobsReducer.alljobs.jobs.map(alljobs=>(
                <div className="job_result">
                <div className="row">
                  <div className="col-md-6">
                    <h4 className="text-color m-0 p-0">{alljobs.job_title!==null&&alljobs.job_title!==undefined?alljobs.job_title:""}</h4>
                  </div>
                  <div className="col-md-6">
                    <p className="closed-color-of-jobs">{alljobs.status!==null&&alljobs.status!==undefined?alljobs.status:""}</p>
                  </div>
                </div>
                <p className="text-disabled pt-1">{alljobs.rec!==null&&alljobs.rec!==undefined?alljobs.rec:""}</p>
                <div className="info-tags">
                  <span className="ml-0 text-disabled-02">
                    <img src={Briefcase} alt="" />
                    {`  `} {alljobs.exp!==null&&alljobs.exp!==undefined?alljobs.exp:""}
                  </span>
                  <span className="text-disabled-02">
                    <img src={Location} alt="" />
                    {`  `}{alljobs.city!==null&&alljobs.city!==undefined?alljobs.city:""} , {alljobs.country!==null&&alljobs.country!==undefined?alljobs.country:""}
                  </span>
                  <span className="text-disabled-02">
                    <img src={Pen} alt="" />
                    {`  `}{alljobs.func!==null&&alljobs.func!==undefined?alljobs.func:""}
                  </span>
                </div>
                <p className="text-disabled-02">
                {alljobs.description!==null&&alljobs.description!==undefined?alljobs.description:""}
                </p>
                <div className="row">
                  <div className="col-md-12">
                    <p className="posted-today-text-rexr-o1">{alljobs.ago!==null&&alljobs.ago!==undefined?alljobs.ago:""}</p>
                  </div>
                </div>
              </div>
              )):"no jobs"
            }
        
         
            {/* Apis Ends here */}
          </div>
          <div className="col-md-3">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle default-drop-btn shadow w-100"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Sort by
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}



const mapStateToProps = (state) => ({
  alljobsReducer: state.alljobsReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getAllJobs: (userId) => dispatch(getAllJobs(userId)),


});
export default connect(mapStateToProps, mapDispatchToProps)(YourJobs);
