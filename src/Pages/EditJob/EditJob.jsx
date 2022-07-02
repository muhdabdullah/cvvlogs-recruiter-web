import React from "react";
import "./EditJob.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav2 from "../../Components/Nav2/Nav2";
import Footer from "../../Components/Footer/Footer";

function EditJob() {
  return (
    <>
    <Nav2/>
      <div className="container">
        <h1 className="create-job-recr-head mt-5">Edit Job</h1>
        <div className="row mb-5">
          <div className="col-md-2"></div>
          <div className="col-md-8 shadow p-5 mt-2 create-job-main-recr">
            <div className="row">
              {/* Row 1 For Forms STarts here */}
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-12 mt-2">
                    <label className="label-create-job-recr">Job Title</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter job title"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mt-3">
                    <label className="label-create-job-recr">
                      Work Location
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter work Location"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mt-3">
                    <label className="label-create-job-recr">Job Type</label>
                    <select
                      className="form-control recr-craete-job-select"
                      aria-label="Default select example"
                    >
                      <option selected>Select here</option>
                      <option value={1}>One</option>
                      <option value={2}>Two</option>
                      <option value={3}>Three</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mt-3">
                    <label className="label-create-job-recr">
                      Job Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter job description (Please mention the city where the job is being offered)"
                    />
                  </div>
                </div>
              </div>
              {/* Row 1 For Forms ENds here */}

              {/* Row 2 For Forms STarts here */}
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-12 mt-2">
                    <label className="label-create-job-recr">Experience</label>
                    <select
                      className="form-control recr-craete-job-select"
                      aria-label="Default select example"
                    >
                      <option selected>Select here</option>
                      <option value={1}>One</option>
                      <option value={2}>Two</option>
                      <option value={3}>Three</option>
                    </select>
                  </div>
                </div>
                <p className="m-0 p-0 mt-2 salary-range-recr">Salary Range</p>
                <div className="row">
                  <div className="col-md-12 mt-2">
                    {/* <label className="label-create-job-recr">
                      Minimum Salary
                    </label> */}
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter minimum salary (optional)"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 mt-3">
                    {/* <label className="label-create-job-recr">
                      Maximum Salary
                    </label> */}
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter maximum salary (optional)"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mt-3">
                    <label className="label-create-job-recr">
                      International Hiring
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter country name"
                    />
                  </div>
                </div>
              </div>
              {/* Row 2 For Forms ENds here */}
            </div>
            <div className="row mt-5">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <button className="btn btn-primary w-100 create-job-btn-recr">
                  Update
                </button>
              </div>
              <div className="col-md-4"></div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default EditJob;
