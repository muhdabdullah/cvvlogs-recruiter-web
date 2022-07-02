import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import RecentSearches from "../../Assests/rcentSearches.svg";
import "./SearchJobs.css";
import SearchIcon from "../../Assests/Search.svg";
import LocationIcon from "../../Assests/Location.svg";
import Briefcase from "../../Assests/topmanagment/briefcase.svg";
import { Link } from "react-router-dom";
import Nav2 from "../../Components/Nav2/Nav2";
import FooterTwo from "../../Components/Footer/Footer2";
import { createSearchLogin, getSearchLogin } from "../../actions/SearchLoginAction";
import { connect } from "react-redux";

function SearchLoginJobs(props) {
    const [keyword, setJobTitle] = useState("");
    const [city, setLocation] = useState("");
    const [ind, setIndustry] = useState("");
    const [exp, setWorkExperience] = useState("");

    useEffect(() => {
        loadGetSearch(localStorage.getItem("auth_id1"));
    });

    const loadGetSearch = async (userId) => {
        await props.getSearchLogin(userId);
        // return null;
    };

    const addnewSearch = async () => {
        await props.createSearchLogin(localStorage.getItem("auth_id1"), keyword, ind, city, exp);
    };

    return (
        <>
            <Nav2 />
            <div className="container">
                <div className="row mt-5">
                    <h1 style={{ color: "#865ddd", fontWeight: "bold" }}>
                        Search for Jobs
                    </h1>
                    <p style={{ color: "#011f95", fontWeight: "bold" }}>
                        Enter the following info to get the most suitable jobs
                    </p>
                </div>

                {/* Start   */}
                <div className="row pt-3">
                    <div className="col-md-3 mr-lg-0 pr-lg-0  mr-md-0 pr-md-0 ">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-white">
                                    <img src={SearchIcon} />
                                </span>
                            </div>
                            <input
                                type="text"
                                className="form-control border-left-0 border-right-0 pl-0"
                                placeholder="Job Title"
                                onChange={(e) => setJobTitle(e.target.value)}
                                style={{
                                    borderTopRightRadius: "0px",
                                    borderBottomRightRadius: "0px",
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-md-3 ml-lg-0 pl-lg-0 ml-md-0 pl-md-0 pr-0">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-white">
                                    {" "}
                                    <img src={LocationIcon} />
                                </span>
                            </div>
                            <select
                                className="form-control"
                                onChange={(e) => setLocation(e.target.value)}
                                style={{ color: "#c8c8c8" }}
                                style={{ color: "#c8c8c8", borderLeftColor: "#fff" }}
                            >
                                <option>Location</option>
                                {props.SearchLoginReducer.Searchlogin.state &&
                                    props.SearchLoginReducer.Searchlogin.state.length > 0
                                    ? props.SearchLoginReducer.Searchlogin.state.map((loc) => (
                                        <option value={loc.state_id}>
                                            {loc.state_name !== null && loc.state_name !== undefined
                                                ? loc.state_name
                                                : "load"}
                                        </option>
                                    ))
                                    : "Loading"}
                            </select>
                        </div>
                    </div>
                    <div className="col-md-3 ml-lg-0 pl-lg-0 ml-md-0 pl-md-0 pr-0">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-white">
                                    {" "}
                                    <img src={LocationIcon} />
                                </span>
                            </div>
                            <select
                                className="form-control"
                                onChange={(e) => setIndustry(e.target.value)}
                                style={{ color: "#c8c8c8", borderLeftColor: "#fff" }}
                            >
                                <option>Industry</option>
                                {props.SearchLoginReducer.Searchlogin.industries &&
                                    props.SearchLoginReducer.Searchlogin.industries.length > 0
                                    ? props.SearchLoginReducer.Searchlogin.industries.map((ind) => (
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
                    <div className="col-md-3 ml-lg-0 pl-lg-0 ml-md-0 pl-md-0">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text bg-white">
                                    {" "}
                                    <img src={Briefcase} />
                                </span>
                            </div>
                            <select
                                className="form-control"
                                onChange={(e) => setWorkExperience(e.target.value)}
                                style={{ color: "#c8c8c8", borderLeftColor: "#fff" }}
                            >
                                <option>Experience</option>
                                {props.SearchLoginReducer.Searchlogin.experiences &&
                                    props.SearchLoginReducer.Searchlogin.experiences.length > 0
                                    ? props.SearchLoginReducer.Searchlogin.experiences.map((exp) => (
                                        <option value={exp.id}>
                                            {exp.name !== null && exp.name !== undefined
                                                ? exp.name
                                                : "load"}
                                        </option>
                                    ))
                                    : "Loading"}
                            </select>
                            <div className="input-group-append">
                                {
                                    props.SearchLoginReducer.searchData ?
                                        <Link to="" to={`/search-results?key=${keyword}`} className="link-tag-home">
                                            <span
                                                className="input-group-text text-white font-weight-bold"
                                                onClick={() => addnewSearch()}
                                                style={{
                                                    backgroundColor: "#FFB44A",
                                                    borderColor: "#FFB44A",
                                                    fontWeight: "bold !important",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                SEARCH
                                            </span>
                                        </Link>
                                        :
                                        <Link >
                                            <span
                                                className="input-group-text text-white"
                                                onClick={() => addnewSearch()}
                                                style={{
                                                    backgroundColor: "#FFB44A",
                                                    borderColor: "#FFB44A",
                                                    fontWeight: "bold !important",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                SEARCH
                                            </span>
                                        </Link>

                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* end   */}
                <div className="row">
                    <p style={{ color: "#011f95", fontWeight: "bold" }}>
                        Recent Searches:
                    </p>
                </div>
                <div className="row mb-5">
                    {props.SearchLoginReducer.Searchlogin.previous_searches &&
                        props.SearchLoginReducer.Searchlogin.previous_searches.length > 0
                        ? props.SearchLoginReducer.Searchlogin.previous_searches.map((pre) => (
                            <div className="col-md-12">
                                <img src={RecentSearches} alt="" />
                                <span className="ml-4" style={{ color: "#707070" }}>
                                    {pre.keyword !== null && pre.keyword !== undefined
                                        ? pre.keyword
                                        : ""}
                                </span>
                            </div>
                        ))
                        : (<p>No Recent Searches Availeble</p>)}
                </div>
            </div>
            <FooterTwo />
        </>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    SearchLoginReducer: state.SearchLoginReducer,
});

const mapDispatchToProps = (dispatch) => ({
    getSearchLogin: (userId) => dispatch(getSearchLogin(userId)),
    createSearchLogin: (userId, keyword, ind, city, exp) =>
        dispatch(createSearchLogin(userId, keyword, ind, city, exp)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchLoginJobs);
