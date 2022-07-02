import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import RecentSearches from "../Assests/rcentSearches.svg";
import "./searchPage.css";
import Pen from "../Assests/pos-job-desc/Pen.svg";
import Skills from "../Assests/keyskills1.svg";
import SearchIcon from "../Assests/Search.svg";
import LocationIcon from "../Assests/pinn.svg";
import Briefcase from "../Assests/briefcase.svg";
import { Link } from "react-router-dom";
import Nav2 from "../Components/Nav2/Nav2";
import Footer from "../Components/Footer/Footer";
import { getSearch, createSearch } from "../actions/getsearchAction";
import { connect } from "react-redux";
import Creatable, { makeCreatableSelect } from "react-select/creatable";
import { components } from "react-select";

function SearchJobs(props) {
  const [keyword, setJobTitle] = useState("");
  // const [state, setLocation] = useState("");
  const [state, setState] = useState("");
  const [selectedCountryStatesCity, setSelectedCountryStatesCity] = useState(
    []
  );
  const [city, setCity] = useState("");
  const [ind, setIndustry] = useState("");
  const [skill, setSkill] = useState("");
  const [exp, setWorkExperience] = useState("");

  const [multilanguage, setMultiLanguage] = useState([]);
  const [checkId, setCheckId] = useState([]);
  const [simpleArray, setSimpleArray] = useState([]);
  const [checkString, setCheckStrings] = useState([]);

  useEffect(() => {
    loadGetSearch(localStorage.getItem("auth_id1"));
  }, []);

  const loadGetSearch = async (userId) => {
    await props.getSearch(userId);
    return null;
  };

  const addnewSearch = async () => {
    let data = {
      userId: localStorage.getItem("auth_id1"),
      keyword,
      state,
      city,
      ind,
      exp,
      skill,
    };
    await props.createSearch(data);
  };
  const stateChangeHandler = (e) => {
    setState(e.target.value);

    let selectedState = props.getSearchReducer.search.location.find(
      (c) => c.state_id === e.target.value
    );
    if (selectedState) {
      let city = selectedState.cities;
      setSelectedCountryStatesCity(city);
    } else {
      setSelectedCountryStatesCity([]);
    }
  };

  let handleMultiLanguage = (e) => {
    setMultiLanguage(Array.isArray(e) ? e.map((x) => x.label) : []);
    // setMultiLanguage(e.map((x) => x.label));
    setCheckId(
      Array.isArray(e) ? e.map((x) => x.id).filter((f) => f != null) : []
    );
    // setSimpleArray(props.getCreateJobReducer.getcreatejob.skills.map((e) => e.name));
    // setCheckStrings(
    //   Array.isArray(e)
    //     ? e.map((x) => x.label).filter((f) => !simpleArray.includes(f))
    //     : []
    // );
  };

  return (
    <>
      <Nav2 />
      <div className="container">
        <div className="row mt-5">
          <h1 style={{ color: "#865ddd", fontWeight: "bold" }}>
            Search For Candidates
          </h1>
          <p style={{ color: "#011F95", fontWeight: "bold" }}>
            Enter the following info to get the most suitable candidates
          </p>
        </div>
        {/* Start   */}
        <div className="row">
          <div className="col-12 mr-lg-0 pr-lg-0  mr-md-0 pr-md-0 ">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text bg-white">
                  <img src={SearchIcon} />
                </span>
              </div>
              <input
                type="text"
                className="form-control border-left-0 pl-0"
                placeholder="Designation"
                onChange={(e) => setJobTitle(e.target.value)}
                style={{
                  color: "#c8c8c8",
                }}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-sm-12 mr-lg-0 pr-lg-0 mr-md-0 pr-md-0 ">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text bg-white pr-2">
                  <img src={Skills} width="15px" height="23px" />
                </span>
              </div>
              <select
                className="form-select"
                onChange={(e) => setSkill(e.target.value)}
                style={{ color: "#c8c8c8", borderLeftColor: "#fff" }}
              >
                <option>Skill</option>
                {props.getSearchReducer.search.skills &&
                props.getSearchReducer.search.skills.length > 0
                  ? props.getSearchReducer.search.skills.map((ci) => (
                      <option value={ci.id}>
                        {ci.skill_name !== null && ci.skill_name !== undefined
                          ? ci.skill_name
                          : ""}
                      </option>
                    ))
                  : ""}
              </select>
            </div>
          </div>
          <div className="col-md-4 col-sm-12 mr-lg-0 pr-lg-0 mr-md-0 pr-md-0 ">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text bg-white pr-2">
                  <img src={LocationIcon} width="15px" height="23px" />
                </span>
              </div>
              <select
                className="form-control"
                onChange={(e) => stateChangeHandler(e)}
                style={{ color: "#c8c8c8", borderLeftColor: "#fff" }}
                // value={state}
              >
                <option>State / Province</option>
                {props.getSearchReducer.search.location &&
                props.getSearchReducer.search.location.length > 0
                  ? props.getSearchReducer.search.location.map((exp) => (
                      <option value={exp.state_id}>
                        {exp.name !== null && exp.state_name !== undefined
                          ? exp.state_name
                          : ""}
                      </option>
                    ))
                  : "Loading"}
              </select>
            </div>
          </div>
          <div className="col-md-4 col-sm-12 mr-lg-0 pr-lg-0 mr-md-0 pr-md-0 ">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text bg-white pr-2">
                  <img src={LocationIcon} width="15px" height="23px" />
                </span>
              </div>
              <select
                className="form-control"
                onChange={(e) => setCity(e.target.value)}
                style={{ color: "#c8c8c8", borderLeftColor: "#fff" }}
              >
                <option>City</option>
                {selectedCountryStatesCity &&
                selectedCountryStatesCity.length > 0 ? (
                  selectedCountryStatesCity.map((loc) => (
                    <option value={loc.city_id}>
                      {loc.city_name !== null && loc.city_name !== undefined
                        ? loc.city_name
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
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-6 mr-lg-0 pr-lg-0  mr-md-0 pr-md-0 ">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text bg-white">
                  {" "}
                  <img src={Pen} />
                </span>
              </div>
              <select
                className="form-select"
                onChange={(e) => setIndustry(e.target.value)}
                style={{ color: "#c8c8c8", borderLeftColor: "#fff" }}
              >
                <option>Industry</option>
                {props.getSearchReducer.search.industries &&
                props.getSearchReducer.search.industries.length > 0
                  ? props.getSearchReducer.search.industries.map((ind) => (
                      <option value={ind.id}>
                        {ind.name !== null && ind.name !== undefined
                          ? ind.name
                          : ""}
                      </option>
                    ))
                  : ""}
              </select>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 mr-lg-0 pr-lg-0  mr-md-0 pr-md-0 ">
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
                {props.getSearchReducer.search.experiences &&
                props.getSearchReducer.search.experiences.length > 0
                  ? props.getSearchReducer.search.experiences.map((exp) => (
                      <option value={exp.id}>
                        {exp.name !== null && exp.name !== undefined
                          ? exp.name
                          : ""}
                      </option>
                    ))
                  : ""}
              </select>
              {
                <Link
                  to={`/SearchResultsLogin?keyword=${keyword}&&skill=${skill}&&state=${state}&&industry=${ind}&&experience=${exp}&&city=${city}`}
                >
                  <div className="input-group-append">
                    <button
                      className="input-group-text text-white font-weight-bold"
                      // onClick={() => addnewSearch()}
                      style={{
                        backgroundColor: "#865ddd",
                        borderColor: "#865ddd",
                        cursor: "pointer",
                      }}
                      // disabled={!keyword === false ? false : true}
                    >
                      SEARCH
                    </button>
                  </div>
                </Link>
              }
            </div>
          </div>
        </div>

        <div className="row mb-5">
          <h5>Recent Searches</h5>
          {props.getSearchReducer.search.previous_searches &&
          props.getSearchReducer.search.previous_searches.length > 0
            ? props.getSearchReducer.search.previous_searches.map((pre) => (
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
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({
  getSearchReducer: state.getSearchReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getSearch: (userId) => dispatch(getSearch(userId)),
  createSearch: (data) => dispatch(createSearch(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchJobs);
