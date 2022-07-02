import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CreateAJob.css";
import Nav2 from "../../Components/Nav2/Nav2";
import Creatable, { makeCreatableSelect } from "react-select/creatable";
import { components } from "react-select";
import { connect, useStore } from "react-redux";
import { Link, useLocation, useHistory } from "react-router-dom";
import { getEditJobData, editJob } from "../../actions/editJobAction";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";
import axios from "axios";
import { countries } from "country-data";
import { Editor } from "primereact/editor";

function EditJob(props) {
  const search = useLocation().search;
  const compIds = new URLSearchParams(search).get("id");
  const [multilanguage, setMultiLanguage] = useState([]);
  const [checkId, setCheckId] = useState([]);
  const [simpleArray, setSimpleArray] = useState([]);
  const [lingo, setLingo] = useState([]);
  const [lingCounter, setLingCounter] = useState(0);
  const [job_id, setjob_id] = useState(compIds);
  const [job_title, setjob_title] = useState();
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [numberOfPOstion, setNumberOfPosition] = useState();
  const [gender, setGender] = useState();
  const [job_description, setjob_description] = useState();
  const [skill_by_industry, setskill_by_industry] = useState();
  const [functional_area, setfunctional_area] = useState();
  const [required_work_level, setrequired_work_level] = useState();
  const [curr_type, setcurr_type] = useState();
  const [salary_type, setsalary_type] = useState();
  const [minimum_salary, setsalary_min] = useState();
  const [maximum_salary, setsalary_max] = useState();
  const [experience_level, setexperience_level] = useState();
  const [international_recruiting, setinternational_recruiting] = useState(0);
  const [dataStates, setDataStates] = useState([]);
  const [selectedCountryStatesCity, setSelectedCountryStatesCity] = useState(
    []
  );
  const [loader, setLoader] = useState(true);
  const [selectedCountryStates, setSelectedCountryStates] = useState([]);
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  useEffect(async () => {
    await jobData(localStorage.getItem("auth_id1"), compIds);
  }, []);
  useEffect(async () => {
    await getAllStatesData();
    setjob_title(props?.editjobReducer?.editjob?.stored_values?.job_title);
    setCountry(
      props?.editjobReducer?.editjob?.stored_values?.city_by_country?.country_id
    );
    setState(
      props?.editjobReducer?.editjob?.stored_values?.city_by_country?.state_id
    );
    setCity(
      props?.editjobReducer?.editjob?.stored_values?.city_by_country?.city_id
    );
    setNumberOfPosition(props?.editjobReducer?.editjob?.stored_values?.vacancy);
    setGender(props?.editjobReducer?.editjob?.stored_values?.gender_obj?.id);
    setjob_description(props?.editjobReducer?.editjob?.stored_values?.job_desc);
    setskill_by_industry(
      props?.editjobReducer?.editjob?.stored_values?.industry?.cat_id
    );
    setfunctional_area(
      props?.editjobReducer?.editjob?.stored_values?.functional_area?.id
    );
    setrequired_work_level(
      props?.editjobReducer?.editjob?.stored_values?.work_level?.id
    );
    setcurr_type(props?.editjobReducer?.editjob?.stored_values?.currency);
    setsalary_type(
      props?.editjobReducer?.editjob?.stored_values?.salary_type?.id
    );
    setsalary_min(
      props?.editjobReducer?.editjob?.stored_values?.minimum_salary
    );
    setsalary_max(
      props?.editjobReducer?.editjob?.stored_values?.maximum_salary
    );
    setLingo(props?.editjobReducer?.editjob?.stored_values?.skill);
    setexperience_level(props?.editjobReducer?.editjob?.stored_values?.exp?.id);
  }, [props.editjobReducer.editjob.stored_values]);
  const jobData = async (userId, id) => {
    await props.getEditJobData(userId, id);
  };

  const getAllStatesData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_END_POINT}/web/get_country_list.php`)
      .then((res) => {
        setDataStates(res.data.data);
        axios
          .post(
            `${process.env.REACT_APP_API_END_POINT}/web/fetch_state_list.php`,
            {
              country_id:
                props?.editjobReducer?.editjob?.stored_values?.city_by_country
                  ?.country_id,
            }
          )
          .then((res) => {
            setSelectedCountryStates(res.data.data.state_list);
            axios
              .post(
                `${process.env.REACT_APP_API_END_POINT}/web/fetch_city_list.php`,
                {
                  country_id:
                    props?.editjobReducer?.editjob?.stored_values
                      ?.city_by_country?.country_id,
                  state_id:
                    props?.editjobReducer?.editjob?.stored_values
                      ?.city_by_country?.state_id,
                }
              )
              .then((res) => {
                setSelectedCountryStatesCity(res.data.data.city_list);
                setLoader(true);
              });
          });
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
    setSimpleArray(props.editjobReducer.editjob.skills.map((e) => e.name));
  };
  const CreateJob = async () => {
    let list = [...props.editjobReducer.editjob.stored_values.skill];
    let list1 = [];
    if (lingCounter == 0 && lingo.length == 0) {
      for (let i = 0; i < list.length; i++) {
        list1.push(Number(list[i].id));
      }
    }

    await props.editJob(
      localStorage.getItem("auth_id1"),
      job_id,
      job_title,
      country,
      state,
      city,
      gender,
      numberOfPOstion,
      job_description,
      skill_by_industry,
      functional_area,
      required_work_level,
      curr_type,
      salary_type,
      minimum_salary,
      maximum_salary,
      experience_level,
      lingCounter == 0 && lingo.length == 0 ? list1 : lingo,
      international_recruiting
    );
  };

  let handleAddSkill = (e) => {
    let isSelectedSkill = lingo.find((x) => x.id == e);
    if (isSelectedSkill?.id) return;

    let selectedSkill = props.editjobReducer.editjob.skills.find(
      (x) => x.id == e
    );
    let skils = [...lingo, selectedSkill];

    setLingo((prev) => (prev = skils));
  };

  const deleteKeySkills = (id) => {
    let skils = lingo.filter((x) => x.id != id);
    setLingo((prev) => (prev = skils));
  };

  if (!props.editjobReducer.loading || !loader) {
    return <FullPageLoader />;
  }
  return (
    <>
      <Nav2 />
      <div className="container">
        <h1 className="create-job-recr-head mt-5">Edit Job</h1>
        <div className="row mb-5">
          <div className="col-lg-1"></div>
          <div className="col-lg-10 col-md-12 shadow p-5 mt-2 create-job-main-recr">
            <div className="row">
              {/* Row 1 For Forms STarts here */}
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-12 mt-2">
                    <label className="salary-range-recr">Job Title</label>
                    <input
                      onChange={(e) => setjob_title(e.target.value)}
                      value={job_title}
                      type="text"
                      className="form-control"
                      placeholder="Enter job title"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <label className="input-label">Country</label>
                    <select
                      onChange={handleCountry}
                      value={country}
                      className="form-control per-det-input"
                      aria-label="Default select example"
                      required
                    >
                      <option>Select Country</option>

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
                    <label className="input-label">State / Province</label>
                    <select
                      onChange={handleState}
                      value={state}
                      className="form-control per-det-input"
                      aria-label="Default select example"
                      required
                    >
                      <option>Select State / Province</option>

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
                    <label className="input-label">City</label>
                    <select
                      value={city}
                      onChange={handleCity}
                      className="form-control"
                      aria-label="Default select example"
                      required
                    >
                      <option>Select City</option>

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
                      value={required_work_level}
                      className="form-control "
                      aria-label="Default select example"
                    >
                      <option>Select Work Level</option>
                      {props.editjobReducer.editjob.work_level &&
                      props.editjobReducer.editjob.work_level.length > 0
                        ? props.editjobReducer.editjob.work_level.map(
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
                      value={skill_by_industry}
                      className="form-control"
                    >
                      <option>Select Industry</option>
                      {props.editjobReducer.editjob.skill_by_industry &&
                      props.editjobReducer.editjob.skill_by_industry.length > 0
                        ? props.editjobReducer.editjob.skill_by_industry.map(
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
                      <option>Select Skills</option>
                      {props.editjobReducer.editjob.skills
                        ? props.editjobReducer.editjob.skills &&
                          props.editjobReducer.editjob.skills.length > 0
                          ? props.editjobReducer.editjob.skills.map((l) => (
                              <>
                                <option value={l.id} key={l.id}>
                                  {l.name}
                                </option>
                                <br />
                              </>
                            ))
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
                  <div className="col-md-12 mt-3">
                    <label className="salary-range-recr">Experience</label>
                    <select
                      onChange={(e) => setexperience_level(e.target.value)}
                      value={experience_level}
                      className="form-control "
                      aria-label="Default select example"
                    >
                      <option>Select Experience</option>
                      {props.editjobReducer.editjob.experience_level &&
                      props.editjobReducer.editjob.experience_level.length > 0
                        ? props.editjobReducer.editjob.experience_level.map(
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
                      value={minimum_salary}
                      className="form-control"
                      onChange={(e) => setsalary_min(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 mt-3">
                    <label className="salary-range-recr">Maximum Salary</label>
                    <input
                      value={maximum_salary}
                      className="form-control"
                      onChange={(e) => setsalary_max(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mt-3">
                    <label className="salary-range-recr">Currency Type</label>
                    <select
                      onChange={(e) => setcurr_type(e.target.value)}
                      value={curr_type}
                      className="form-control"
                    >
                      <option>Select Currency Type</option>
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
                    <label className="salary-range-recr">Salary Type</label>
                    <select
                      onChange={(e) => setsalary_type(e.target.value)}
                      value={salary_type}
                      className="form-control"
                    >
                      <option>Select Salary Type</option>
                      {props.editjobReducer.editjob.salary_types &&
                      props.editjobReducer.editjob.salary_types.length > 0
                        ? props.editjobReducer.editjob.salary_types.map(
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

                {localStorage.getItem("eco_complaince") == 0 ? (
                  <div className="row">
                    <div className="col-md-12 mt-3">
                      <label className="salary-range-recr">Gender</label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="form-control"
                      >
                        <option>Select Gender</option>
                        {props.editjobReducer.editjob.genders
                          ? props.editjobReducer.editjob.genders.map(
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
                <div className="row">
                  <div className="col-md-12 mt-3">
                    <label className="salary-range-recr">
                      Total no of positions
                    </label>
                    <input
                      className="form-control"
                      placeholder="Maximum salary"
                      // type={Number}
                      value={numberOfPOstion}
                      onChange={(e) => setNumberOfPosition(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 mt-3">
                    <label className="salary-range-recr">Career Level</label>
                    <select
                      onChange={(e) => setfunctional_area(e.target.value)}
                      value={functional_area}
                      className="form-control"
                    >
                      <option>Select Career Level</option>
                      {props.editjobReducer.editjob.functional_area &&
                      props.editjobReducer.editjob.functional_area.length > 0
                        ? props.editjobReducer.editjob.functional_area.map(
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
                <Editor
                  onTextChange={(e) => {
                    setjob_description((prev) => (prev = e.htmlValue));
                  }}
                  value={job_description}
                  style={{ resize: "none", minHeight: "180px" }}
                  placeholder="Enter job description"
                />
              </div>
              {/* Row 2 For Forms ENds here */}
            </div>
            <div className="row mt-5">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <button
                  onClick={() => CreateJob()}
                  className="btn btn-primary w-100 create-job-btn-recr"
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
                    !minimum_salary === false &&
                    !maximum_salary === false &&
                    !curr_type === false &&
                    !experience_level === false &&
                    lingo.length > 0
                      ? false
                      : true
                  }
                >
                  Update
                </button>
              </div>
              <div className="col-md-4"></div>
            </div>
          </div>
          <div className="col-lg-1"></div>
        </div>
        {props.editjobReducer.loading == false ? <FullPageLoader /> : null}
        {loader == false ? <FullPageLoader /> : null}
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  editjobReducer: state.editjobReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getEditJobData: (userId, id) => dispatch(getEditJobData(userId, id)),
  editJob: (
    userId,
    id,
    job_title,
    country,
    state,
    city,
    gender,
    numberOfPOstion,
    job_description,
    skill_by_industry,
    functional_area,
    required_work_level,
    curr_type,
    salary_type,
    minimum_salary,
    maximum_salary,
    experience_level,
    skills,
    international_recruiting
  ) =>
    dispatch(
      editJob(
        userId,
        id,
        job_title,
        country,
        state,
        city,
        gender,
        numberOfPOstion,
        job_description,
        skill_by_industry,
        functional_area,
        required_work_level,
        curr_type,
        salary_type,
        minimum_salary,
        maximum_salary,
        experience_level,
        skills,
        international_recruiting
      )
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditJob);
