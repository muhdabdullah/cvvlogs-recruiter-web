import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreateAJob.css";
import Nav2 from "../../Components/Nav2/Nav2";
import { connect } from "react-redux";
import { getCreateJobData, createJob } from "../../actions/getcreatejobAction";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";
import { countries } from "country-data";
import { Editor } from "primereact/editor";

function CreateAJobs(props) {
  const [multilanguage, setMultiLanguage] = useState([]);
  const [checkId, setCheckId] = useState([]);
  const [simpleArray, setSimpleArray] = useState([]);
  const [checkString, setCheckStrings] = useState([]);
  const [lingo, setLingo] = useState([]);
  const [lingCounter, setLingCounter] = useState(0);

  const [job_title, setjob_title] = useState("");
  const [job_description, setjob_description] = useState("");
  const [skill_by_industry, setskill_by_industry] = useState(null);
  const [functional_area, setfunctional_area] = useState(null);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [numberOfPOstion, setNumberOfPosition] = useState("");
  const [gender, setGender] = useState("");
  const [selectedCountryStates, setSelectedCountryStates] = useState([]);
  const [required_work_level, setrequired_work_level] = useState(null);
  const [curr_type, setcurr_type] = useState(2);
  const [salary_type, setsalary_type] = useState(null);
  const [salary_min, setsalary_min] = useState("");
  const [salary_max, setsalary_max] = useState("");
  const [dataStates, setDataStates] = useState([]);
  const [selectedCountryStatesCity, setSelectedCountryStatesCity] = useState(
    []
  );
  const [experience_level, setexperience_level] = useState(null);
  const [international_recruiting, setinternational_recruiting] = useState(0);
  const [defaultCurrency, setdefaultCurrency] = useState();
  const [loader, setLoader] = useState(true);

  useEffect(async () => {
    await jobData(localStorage.getItem("auth_id1"));
    await getAllStatesData();
    let defCurrency = countries.all.find(
      (x) => x.name == localStorage.getItem("userCurrentLocation")
    );
    setdefaultCurrency(defCurrency);
    setcurr_type(defCurrency?.currencies?.[0]);
  }, []);

  const jobData = async (userId) => {
    await props.getCreateJobData(userId);
  };

  const getAllStatesData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_END_POINT}/web/get_country_list.php`)
      .then((res) => {
        setDataStates(res.data.data);
        setLoader(true);
      });
  };
  const handleCountry = (e) => {
    setCountry(e.target.value);
    if (e.target.value) {
      axios
        .post(
          `${process.env.REACT_APP_API_END_POINT}/web/fetch_state_list.php`,
          {
            country_id: e.target.value,
          }
        )
        .then((res) => {
          setSelectedCountryStates(res.data.data.state_list);
        });
    }
  };

  const handleState = (e) => {
    setState(e.target.value);
    if (e.target.value) {
      axios
        .post(
          `${process.env.REACT_APP_API_END_POINT}/web/fetch_city_list.php`,
          {
            country_id: country,
            state_id: e.target.value,
          }
        )
        .then((res) => {
          setSelectedCountryStatesCity(res.data.data.city_list);
        });
    }
  };
  const handleCity = (e) => {
    setCity(e.target.value);
  };

  let handleMultiLanguage = (e) => {
    setMultiLanguage(Array.isArray(e) ? e.map((x) => x.label) : []);
    setCheckId(
      Array.isArray(e) ? e.map((x) => x.id).filter((f) => f != null) : []
    );
    setSimpleArray(
      props.getCreateJobReducer.getcreatejob.skills.map((e) => e.name)
    );
  };
  const CreateJob = async () => {
    let data = {
      userId: localStorage.getItem("auth_id1"),
      job_title: job_title,
      state: state,
      country: country,
      city: city,
      gender: gender,
      numberOfPostion: numberOfPOstion,
      job_description: job_description,
      skill_by_industry: skill_by_industry,
      functional_area: functional_area,
      required_work_level: required_work_level,
      curr_type: curr_type,
      salary_type: salary_type,
      salary_min: salary_min,
      salary_max: salary_max,
      experience_level: experience_level,
      lingo: lingo,
      international_recruiting: international_recruiting,
    };
    await props.createJob(data);
  };

  let handleAddSkill = (e) => {
    let isSelectedSkill = lingo.find((x) => x.id == e);
    if (isSelectedSkill?.id) return;

    let selectedSkill = props.getCreateJobReducer.getcreatejob.skills.find(
      (x) => x.id == e
    );
    let skils = [...lingo, selectedSkill];

    setLingo((prev) => (prev = skils));
  };

  const deleteKeySkills = (id) => {
    let skils = lingo.filter((x) => x.id != id);
    setLingo((prev) => (prev = skils));
  };
  if (!props.getCreateJobReducer.loading || !loader) {
    return <FullPageLoader />;
  }
  return (
    <>
      <Nav2 />
      <div className="container">
        <h1 className="create-job-recr-head mt-5">Create a Job</h1>
        <div className="row mb-5">
          <div className="col-lg-1"></div>
          <div className="col-lg-10 col-md-12 shadow p-5 mt-2 create-job-main-recr">
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-12 mt-2">
                    <label className=" salary-range-recr">Job Title</label>
                    <input
                      onChange={(e) => setjob_title(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Enter job title (candidate will search by this title)"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <label className=" salary-range-recr">Country</label>
                    <select
                      onChange={handleCountry}
                      value={country}
                      className="form-control per-det-input"
                      aria-label="Default select example"
                      required
                    >
                      <option selected>Select Country</option>
                      {dataStates.country && dataStates.country.length > 0 ? (
                        dataStates.country.map((con) => (
                          <option value={con.country_id}>
                            {con.country_name !== null &&
                            con.country_name !== undefined ? (
                              con.country_name
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
                <div className="row">
                  <div className="col-md-12">
                    <label className=" salary-range-recr">
                      State / Province
                    </label>
                    <select
                      onChange={handleState}
                      value={state}
                      className="form-control per-det-input"
                      aria-label="Default select example"
                      required
                    >
                      <option selected>Select State / Province</option>
                      {selectedCountryStates && selectedCountryStates.length > 0
                        ? selectedCountryStates.map((f) => (
                            <option value={f.state_id}>{f.state_name}</option>
                          ))
                        : ""}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <label className=" salary-range-recr">City</label>
                    <select
                      value={city}
                      onChange={handleCity}
                      className="form-control"
                      aria-label="Default select example"
                      required
                    >
                      <option selected>Select City</option>
                      {selectedCountryStatesCity &&
                      selectedCountryStatesCity.length > 0
                        ? selectedCountryStatesCity.map((f) => (
                            <option value={f.city_id}>{f.city_name}</option>
                          ))
                        : ""}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mt-3">
                    <label className="salary-range-recr">Job Type</label>
                    <select
                      onChange={(e) => setrequired_work_level(e.target.value)}
                      className="form-control"
                      aria-label="Default select example"
                    >
                      <option selected>Select here</option>
                      {props.getCreateJobReducer.getcreatejob.work_level &&
                      props.getCreateJobReducer.getcreatejob.work_level.length >
                        0
                        ? props.getCreateJobReducer.getcreatejob.work_level.map(
                            (work_level) => (
                              <option value={work_level.id}>
                                {work_level.work_level !== null &&
                                work_level.work_level !== undefined
                                  ? work_level.work_level
                                  : ""}
                              </option>
                            )
                          )
                        : ""}
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 mt-3">
                    <label className="salary-range-recr">Industry</label>
                    <select
                      onChange={(e) => setskill_by_industry(e.target.value)}
                      className="form-control"
                    >
                      <option selected>Select industry</option>
                      {props.getCreateJobReducer.getcreatejob
                        .skill_by_industry &&
                      props.getCreateJobReducer.getcreatejob.skill_by_industry
                        .length > 0
                        ? props.getCreateJobReducer.getcreatejob.skill_by_industry.map(
                            (skill_by_industry) => (
                              <option value={skill_by_industry.cat_id}>
                                {skill_by_industry.cat_name !== null &&
                                skill_by_industry.cat_name !== undefined
                                  ? skill_by_industry.cat_name
                                  : ""}
                              </option>
                            )
                          )
                        : ""}
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 mt-3">
                    <label className="salary-range-recr">Skills</label>

                    <select
                      className="form-control"
                      onChange={(e) => handleAddSkill(e.target.value)}
                    >
                      <option selected>Select</option>
                      {props.getCreateJobReducer.getcreatejob.skills
                        ? props.getCreateJobReducer.getcreatejob.skills &&
                          props.getCreateJobReducer.getcreatejob.skills.length >
                            0
                          ? props.getCreateJobReducer.getcreatejob.skills.map(
                              (l) => (
                                <>
                                  <option value={l.id} key={l.id}>
                                    {l.label}
                                  </option>
                                  <br />
                                </>
                              )
                            )
                          : ""
                        : ""}
                    </select>

                    {lingo?.length > 0 ? (
                      lingo.map((lang, i) => (
                        <button
                          onClick={() => deleteKeySkills(lang.id)}
                          key={i}
                          className="btn btn-light mt-2 btn-color-key mx-1"
                          id="btnn"
                          style={{ fontSize: "12px" }}
                        >
                          <span className="btn-label">
                            <i className="far fa-trash pr-1"></i>
                          </span>

                          {lang !== null && lang !== undefined ? lang.name : ""}
                        </button>
                      ))
                    ) : (
                      <b>add skills</b>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-12 mt-2">
                    <label className="salary-range-recr">Experience</label>
                    <select
                      onChange={(e) => setexperience_level(e.target.value)}
                      className="form-control"
                      aria-label="Default select example"
                    >
                      <option selected>Select here</option>
                      {props.getCreateJobReducer.getcreatejob
                        .experience_level &&
                      props.getCreateJobReducer.getcreatejob.experience_level
                        .length > 0
                        ? props.getCreateJobReducer.getcreatejob.experience_level.map(
                            (experience_level) => (
                              <option value={experience_level.id}>
                                {experience_level.name !== null &&
                                experience_level.name !== undefined
                                  ? experience_level.name
                                  : ""}
                              </option>
                            )
                          )
                        : ""}
                    </select>
                  </div>
                </div>
                <p className="m-0 p-0 mt-2 salary-range-recr">Salary Range</p>
                <div className="row">
                  <div className="col-md-12 mt-2">
                    <label className="salary-range-recr">Minimum Salary</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Minimum salary"
                      onChange={(e) => setsalary_min(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mt-3">
                    <label className="salary-range-recr">Maximum Salary</label>
                    <input
                      className="form-control"
                      placeholder="Maximum salary"
                      onChange={(e) => setsalary_max(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mt-3">
                    <label className="salary-range-recr">Salary Type</label>
                    <select
                      onChange={(e) => setsalary_type(e.target.value)}
                      className="form-control"
                    >
                      <option selected>Select salary type</option>
                      {props.getCreateJobReducer.getcreatejob.salary_types
                        ? props.getCreateJobReducer.getcreatejob.salary_types.map(
                            (salary_types) => (
                              <option value={salary_types.id}>
                                {salary_types.sal_type_name !== null &&
                                salary_types.sal_type_name !== undefined
                                  ? salary_types.sal_type_name
                                  : ""}
                              </option>
                            )
                          )
                        : ""}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mt-3">
                    <label className="salary-range-recr">Currency Type</label>
                    <select
                      onChange={(e) => setcurr_type(e.target.value)}
                      className="form-control"
                    >
                      <option selected>{defaultCurrency?.currencies[0]}</option>
                      {countries.all.map((currencies) =>
                        currencies.currencies.length ? (
                          <option value={currencies.currencies[0]}>
                            {currencies.currencies[0]}
                          </option>
                        ) : null
                      )}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mt-3">
                    <label className="salary-range-recr">Career Level</label>
                    <select
                      onChange={(e) => setfunctional_area(e.target.value)}
                      className="form-control"
                    >
                      <option selected>Select career level</option>
                      {props.getCreateJobReducer.getcreatejob.functional_area &&
                      props.getCreateJobReducer.getcreatejob.functional_area
                        .length > 0
                        ? props.getCreateJobReducer.getcreatejob.functional_area.map(
                            (functional_area) => (
                              <option value={functional_area.id}>
                                {functional_area.name !== null &&
                                functional_area.name !== undefined
                                  ? functional_area.name
                                  : ""}
                              </option>
                            )
                          )
                        : ""}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mt-3">
                    <label className="salary-range-recr">
                      Total no of positions
                    </label>
                    <input
                      className="form-control"
                      placeholder="Number of postion"
                      // type={Number}
                      onChange={(e) => setNumberOfPosition(e.target.value)}
                    />
                  </div>
                </div>
                {localStorage.getItem("eco_complaince") == 0 ? (
                  <div className="row">
                    <div className="col-md-12 mt-3">
                      <label className="salary-range-recr">Gender</label>
                      <select
                        onChange={(e) => setGender(e.target.value)}
                        defaultValue={gender}
                        className="form-control"
                      >
                        <option selected>Select Here</option>
                        {props.getCreateJobReducer.getcreatejob.genders &&
                        props.getCreateJobReducer.getcreatejob.genders.length >
                          0
                          ? props.getCreateJobReducer.getcreatejob.genders.map(
                              (genders) => (
                                <option value={genders.id}>
                                  {genders.gender !== null &&
                                  genders.gender !== undefined
                                    ? genders.gender
                                    : ""}
                                </option>
                              )
                            )
                          : ""}
                      </select>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="col-12">
                <label className="salary-range-recr">
                  Job Description
                  <i
                    className="fas fa-info-circle pl-2"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title="If you want candidate to respond to certain questions, please highlight and list those questions individually in the job description."
                  ></i>
                </label>
                {/* <textarea
                  onChange={(e) => setjob_description(e.target.value)}
                  style={{ resize: "none", minHeight: "180px" }}
                  className="form-control h-75"
                  placeholder="Enter job description"
                ></textarea> */}
                <Editor
                  // style={{ height: "320px" }}
                  onTextChange={(e) => setjob_description(e.htmlValue)}
                  style={{ resize: "none", minHeight: "180px" }}
                  placeholder="Enter job description"
                />
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <button
                  onClick={() => CreateJob()}
                  disabled={
                    !job_title === false &&
                    !country === false &&
                    !state === false &&
                    !city === false &&
                    !numberOfPOstion === false &&
                    // !gender === false &&
                    !job_description === false &&
                    !skill_by_industry === false &&
                    !functional_area === false &&
                    !required_work_level === false &&
                    !salary_type === false &&
                    !salary_max === false &&
                    !salary_min === false &&
                    !curr_type === false &&
                    !experience_level === false &&
                    lingo.length > 0
                      ? false
                      : true
                  }
                  className="btn btn-primary w-100 create-job-btn-recr"
                >
                  Create
                </button>
              </div>
              <div className="col-md-4"></div>
            </div>
          </div>
          <div className="col-lg-1"></div>
        </div>
        {props.getCreateJobReducer.loading == false ? <FullPageLoader /> : null}
        {loader == false ? <FullPageLoader /> : null}
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  getCreateJobReducer: state.getCreateJobReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getCreateJobData: (userId) => dispatch(getCreateJobData(userId)),
  createJob: (data) => dispatch(createJob(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateAJobs);
