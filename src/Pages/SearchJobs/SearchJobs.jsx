import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import RecentSearches from "../../Assests/rcentSearches.svg";
import "./SearchJobs.css";
import SearchIcon from "../../Assests/Search.svg";
import LocationIcon from "../../Assests/Location.svg";
import Briefcase from "../../Assests/topmanagment/briefcase.svg";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import FooterTwo from "../../Components/Footer/Footer2";
import { createSearch, getSearch } from "../../actions/SearchAction";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";
import { connect } from "react-redux";

function SearchJobs(props) {
  const [keyword, setJobTitle] = useState("");
  const [city, setLocation] = useState("");
  const [ind, setIndustry] = useState("");
  const [exp, setWorkExperience] = useState("");

  useEffect(() => {
    loadGetSearch();
  }, []);

  const loadGetSearch = async () => {
    await props.getSearch();
    // return null;
  };

  const addnewSearch = async () => {
    await props.createSearch(keyword, ind, city, exp);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row mt-5">
          <h1 style={{ color: "#865ddd", fontWeight: "bold" }}>
            Search for Jobs
          </h1>
          <p style={{ color: "#011F95", fontWeight: "bold" }}>
            Enter the following info to get the most suitable jobs
          </p>
        </div>
        {/* Start   */}
        <div className="row pt-3 mb-5">
          <div className="col-lg-3 col-md-6 mr-lg-0 pr-lg-0  mr-md-0 pr-md-0 ">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text bg-white">
                  <img src={SearchIcon} />
                </span>
              </div>
              <input
                type="text"
                className="form-control border-left-0 pl-0"
                placeholder="Job Title"
                onChange={(e) => setJobTitle(e.target.value)}
                style={{
                  color: "#c8c8c8",
                }}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-6 ml-lg-0 pl-lg-0 ml-md-0 pl-md-0 pr-md-0 pr-lg-0">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text bg-white">
                  {" "}
                  <img src={LocationIcon} />
                </span>
              </div>
              <select
                className="form-select"
                onChange={(e) => setLocation(e.target.value)}
                style={{ color: "#c8c8c8", borderLeftColor: "#fff" }}
              >
                <option>Location</option>
                {props.SearchReducer.Search.state &&
                props.SearchReducer.Search.state.length > 0 ? (
                  props.SearchReducer.Search.state.map((loc) => (
                    <option value={loc.state_id}>
                      {loc.state_name !== null && loc.state_name !== undefined
                        ? loc.state_name
                        : "load"}
                    </option>
                  ))
                ) : (
                  <div>
                    <div
                      className="spinner-border text-secondary"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                )}
              </select>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 ml-lg-0 pl-lg-0 pr-md-0 pr-lg-0">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text bg-white">
                  {" "}
                  <img src={LocationIcon} />
                </span>
              </div>
              <select
                className="form-select"
                onChange={(e) => setIndustry(e.target.value)}
                style={{ color: "#c8c8c8", borderLeftColor: "#fff" }}
              >
                <option>Industry</option>
                {props.SearchReducer.Search.industries &&
                props.SearchReducer.Search.industries.length > 0
                  ? props.SearchReducer.Search.industries.map((ind) => (
                      <option value={ind.id}>
                        {ind.name !== null && ind.name !== undefined
                          ? ind.name
                          : "load"}
                      </option>
                    ))
                  : "Loading"}
              </select>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 ml-lg-0 pl-lg-0 ml-md-0 pr-md-0 pl-md-0">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text bg-white">
                  {" "}
                  <img src={Briefcase} />
                </span>
              </div>
              <select
                className="form-select"
                onChange={(e) => setWorkExperience(e.target.value)}
                style={{ color: "#c8c8c8", borderLeftColor: "#fff" }}
              >
                <option>Experience</option>
                {props.SearchReducer.Search.experiences &&
                props.SearchReducer.Search.experiences.length > 0
                  ? props.SearchReducer.Search.experiences.map((exp) => (
                      <option value={exp.id}>
                        {exp.name !== null && exp.name !== undefined
                          ? exp.name
                          : "load"}
                      </option>
                    ))
                  : "Loading"}
              </select>
              <div
                className="input-group-append"
                style={{
                  backgroundColor: "#865ddd !important",
                  borderColor: "#865ddd !important",
                  cursor: "pointer",
                }}
              >
                {props.SearchReducer.searchData ? (
                  <Link
                    to=""
                    to={`/search-result?key=${keyword}`}
                    className="link-tag-home"
                  >
                    <span
                      className="input-group-text text-white font-weight-bold"
                      onClick={() => addnewSearch()}
                      style={{
                        backgroundColor: "#865ddd !important",
                        borderColor: "#865ddd !important",
                        cursor: "pointer",
                      }}
                    >
                      SEARCH
                    </span>
                  </Link>
                ) : (
                  <Link className="link-tag-home">
                    <button
                      className="input-group-text text-white"
                      onClick={() => addnewSearch()}
                      style={{
                        backgroundColor: "#865ddd !important",
                        borderColor: "#865ddd !important",
                        fontWeight: "bold !important",
                        cursor: "pointer",
                      }}
                    >
                      SEARCH
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* end   */}
        {/* <div className="row mt-5">
          <p style={{ color: "#011f95", fontWeight: "bold" }}>
            
          </p>
        </div> */}

        <div className="row mb-5">
          {props.SearchReducer.Search.previous_searches &&
          props.SearchReducer.Search.previous_searches.length > 0
            ? props.SearchReducer.Search.previous_searches.map((pre) => (
                <div className="col-md-12">
                  <img src={RecentSearches} alt="" />
                  <span className="ml-4" style={{ color: "#707070" }}>
                    {pre.keyword !== null && pre.keyword !== undefined
                      ? pre.keyword
                      : ""}
                  </span>
                </div>
              ))
            : ""}
        </div>
        {props.getSearchReducer.loading == false ? <FullPageLoader /> : null}
      </div>
      <FooterTwo />
    </>
  );
}

const mapStateToProps = (state) => ({
  SearchReducer: state.SearchReducer,
  getSearchReducer: state.getSearchReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getSearch: () => dispatch(getSearch()),
  createSearch: (keyword, ind, city, exp) =>
    dispatch(createSearch(keyword, ind, city, exp)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchJobs);
