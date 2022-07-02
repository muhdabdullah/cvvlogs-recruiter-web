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
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { editJob, getEditJobData } from "../../actions/editJobAction";

function CreateAJobs(props) {
  const [formData, setFormData] = useState({});
  const [loader, setLoader] = useState(true);

  let { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (id) {
      props.editJob(localStorage.getItem("auth_id1"), id, data);
    } else {
      props.createJob(localStorage.getItem("auth_id1"), data);
    }
  };
  const watchAllFields = watch();
  useEffect(() => {
    props
      .getCreateJobData(localStorage.getItem("auth_id1"))
      .then(async (res) => {
        setFormData((prev) => (prev = res));
        if (id) {
          props
            .getEditJobData(localStorage.getItem("auth_id1"), id)
            .then(async (edit_res) => {
              let { stored_values } = edit_res;
              let resetData = {
                job_title: stored_values.job_title,
                country_id: stored_values.city_by_country.country_id,
                state_id: stored_values.city_by_country.state_id,
                work_location_city: stored_values.city_by_country.city_id,
                vacancies: stored_values.vacancy,
                job_description: stored_values.job_desc,
                gender: stored_values.gender_obj.id,
                skill_by_industry: stored_values.industry.cat_id,
                functional_area: stored_values.functional_area.id,
                required_work_level: stored_values.work_level.id,
                curr_type: stored_values.currency,
                salary_type: stored_values.salary_type.id,
                salary_min: stored_values.minimum_salary,
                salary_max: stored_values.maximum_salary,
                skills: stored_values.skill,
                experience_level: stored_values.exp.id,
              };
              await getAllStatesData(resetData);
              await reset(resetData);
            });
        } else {
          await getAllStatesData({});
        }
        await setLoader(false);
      });
  }, []);
  const getAllStatesData = async (storeData) => {
    await axios
      .get(`${process.env.REACT_APP_API_END_POINT}/web/get_country_list.php`)
      .then(async (res) => {
        await setFormData((prev) => ({
          ...prev,
          countries: res.data.data.country,
        }));
        if (id) {
          await axios
            .post(
              `${process.env.REACT_APP_API_END_POINT}/web/fetch_state_list.php`,
              {
                country_id: storeData?.country_id,
              }
            )
            .then(async (res) => {
              await setFormData((prev) => ({
                ...prev,
                states: res.data.data.state_list,
              }));
              await axios
                .post(
                  `${process.env.REACT_APP_API_END_POINT}/web/fetch_city_list.php`,
                  {
                    country_id: storeData?.country_id,
                    state_id: storeData?.state_id,
                  }
                )
                .then(async (res) => {
                  await setFormData((prev) => ({
                    ...prev,
                    cities: res.data.data.city_list,
                  }));
                });
            });
        }
      });
  };
  const handleCountry = (e) => {
    if (e.target.value) {
      axios
        .post(
          `${process.env.REACT_APP_API_END_POINT}/web/fetch_state_list.php`,
          {
            country_id: e.target.value,
          }
        )
        .then((res) => {
          setFormData((prev) => ({
            ...prev,
            states: res.data.data.state_list,
          }));
        });
    }
  };
  const handleState = (e) => {
    if (e.target.value) {
      axios
        .post(
          `${process.env.REACT_APP_API_END_POINT}/web/fetch_city_list.php`,
          {
            country_id: watchAllFields.country_id,
            state_id: e.target.value,
          }
        )
        .then((res) => {
          setFormData((prev) => ({
            ...prev,
            cities: res.data.data.city_list,
          }));
        });
    }
  };

  if (loader) {
    return <FullPageLoader />;
  }
  return (
    <>
      <Nav2 />
      <div className="container">
        <h1 className="create-job-recr-head mt-5">
          {id ? "Update a Job" : "Create a Job"}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row mb-5">
            <div className="col-lg-1"></div>
            <div className="col-lg-10 col-md-12 shadow p-5 mt-2 create-job-main-recr">
              <div className="row">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-12 mt-2">
                      <label className=" salary-range-recr">Job Title</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter job title (candidate will search by this title)"
                        {...register("job_title", {
                          required: true,
                        })}
                      />
                      {errors.job_title?.type === "required" && (
                        <p className="error-message">Country is required</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <label className=" salary-range-recr">Country</label>
                      <select
                        className="form-control per-det-input"
                        aria-label="Default select example"
                        {...register("country_id", {
                          required: true,
                          onChange: (e) => handleCountry(e),
                        })}
                      >
                        <option value="">Select Country</option>
                        {formData?.countries?.map((x, i) => (
                          <option value={x.country_id} key={i}>
                            {x.country_name !== null &&
                            x.country_name !== undefined
                              ? x.country_name
                              : ""}
                          </option>
                        ))}
                      </select>
                      {errors.country_id?.type === "required" && (
                        <p className="error-message">Country is required</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <label className=" salary-range-recr">
                        State / Province
                      </label>
                      <select
                        className="form-control per-det-input"
                        aria-label="Default select example"
                        {...register("state_id", {
                          required: true,
                          onChange: (e) => handleState(e),
                        })}
                      >
                        <option value="">Select State / Province</option>
                        {formData?.states?.map((x, i) => (
                          <option value={x.state_id} key={i}>
                            {x.state_name !== null && x.state_name !== undefined
                              ? x.state_name
                              : ""}
                          </option>
                        ))}
                      </select>
                      {errors.state_id?.type === "required" && (
                        <p className="error-message">State is required</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <label className=" salary-range-recr">City</label>
                      <select
                        className="form-control"
                        aria-label="Default select example"
                        {...register("work_location_city", {
                          required: true,
                        })}
                      >
                        <option value="">Select City</option>
                        {formData?.cities?.map((x, i) => (
                          <option value={x.city_id} key={i}>
                            {x.city_name !== null && x.city_name !== undefined
                              ? x.city_name
                              : ""}
                          </option>
                        ))}
                      </select>
                      {errors.work_location_city?.type === "required" && (
                        <p className="error-message">City is required</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mt-3">
                      <label className="salary-range-recr">Job Type</label>
                      <select
                        className="form-control"
                        aria-label="Default select example"
                        {...register("required_work_level", {
                          required: true,
                        })}
                      >
                        <option value="">Select here</option>
                        {formData?.work_level?.map((x, i) => (
                          <option value={x.id} key={i}>
                            {x.work_level !== null && x.work_level !== undefined
                              ? x.work_level
                              : ""}
                          </option>
                        ))}
                      </select>
                      {errors.required_work_level?.type === "required" && (
                        <p className="error-message">Job Type is required</p>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 mt-3">
                      <label className="salary-range-recr">Industry</label>
                      <select
                        className="form-control"
                        {...register("skill_by_industry", {
                          required: true,
                        })}
                      >
                        <option value="">Select industry</option>
                        {formData?.skill_by_industry?.map((x, i) => (
                          <option value={x.cat_id} key={i}>
                            {x.cat_name !== null && x.cat_name !== undefined
                              ? x.cat_name
                              : ""}
                          </option>
                        ))}
                      </select>
                      {errors.skill_by_industry?.type === "required" && (
                        <p className="error-message">Industry is required</p>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 mt-3">
                      <label className="salary-range-recr">Skills</label>
                      <select
                        className="form-control"
                        {...register("skill", {
                          onChange: (e) => {
                            let prev = watchAllFields?.skills || [];
                            let selected = formData.skills.find(
                              (x) => x.id == e.target.value
                            );
                            setValue("skills", [...prev, selected]);
                          },
                        })}
                      >
                        <option value="">Select</option>
                        {formData?.skills?.map((x, i) => (
                          <option value={x.id} key={i}>
                            {x.label !== null && x.label !== undefined
                              ? x.label
                              : ""}
                          </option>
                        ))}
                      </select>
                      {errors.skills?.type === "required" && (
                        <p className="error-message">Skills is required</p>
                      )}
                      {watchAllFields.skills?.length > 0
                        ? watchAllFields.skills.map((x, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                let filteredData =
                                  watchAllFields?.skills?.filter(
                                    (y) => y.id != x.id
                                  );

                                setValue("skills", filteredData);
                              }}
                              className="btn btn-light mt-2 btn-color-key mx-1"
                              id="btnn"
                              type="button"
                              style={{ fontSize: "12px" }}
                            >
                              <span className="btn-label">
                                <i className="far fa-trash pr-1"></i>
                              </span>

                              {x.name}
                            </button>
                          ))
                        : null}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-12 mt-2">
                      <label className="salary-range-recr">Experience</label>
                      <select
                        className="form-control"
                        aria-label="Default select example"
                        {...register("experience_level", {
                          required: true,
                        })}
                      >
                        <option value="">Select here</option>
                        {formData?.experience_level?.map((x, i) => (
                          <option value={x.id} key={i}>
                            {x.name !== null && x.name !== undefined
                              ? x.name
                              : ""}
                          </option>
                        ))}
                      </select>
                      {errors.experience_level?.type === "required" && (
                        <p className="error-message">Experience is required</p>
                      )}
                    </div>
                  </div>
                  <p className="m-0 p-0 mt-2 salary-range-recr">Salary Range</p>
                  <div className="row">
                    <div className="col-md-12 mt-2">
                      <label className="salary-range-recr">
                        Minimum Salary
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Minimum salary"
                        {...register("salary_min", {
                          required: true,
                        })}
                      />
                      {errors.salary_min?.type === "required" && (
                        <p className="error-message">
                          Minimum Salary is required
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mt-3">
                      <label className="salary-range-recr">
                        Maximum Salary
                      </label>
                      <input
                        className="form-control"
                        placeholder="Maximum salary"
                        {...register("salary_max", {
                          required: true,
                        })}
                      />
                      {errors.salary_max?.type === "required" && (
                        <p className="error-message">
                          Maximum Salary is required
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mt-3">
                      <label className="salary-range-recr">Salary Type</label>
                      <select
                        className="form-control"
                        {...register("salary_type", {
                          required: true,
                        })}
                      >
                        <option value="">Select salary type</option>

                        {formData?.salary_types?.map((x, i) => (
                          <option value={x.id} key={i}>
                            {x.sal_type_name !== null &&
                            x.sal_type_name !== undefined
                              ? x.sal_type_name
                              : ""}
                          </option>
                        ))}
                      </select>
                      {errors.salary_type?.type === "required" && (
                        <p className="error-message">Salary Type is required</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mt-3">
                      <label className="salary-range-recr">Currency Type</label>
                      <select
                        className="form-control"
                        {...register("curr_type", {
                          required: true,
                        })}
                      >
                        <option value="">Select Currency Type</option>
                        {countries.all.map((currencies) =>
                          currencies.currencies.length ? (
                            <option value={currencies.currencies[0]}>
                              {currencies.currencies[0]}
                            </option>
                          ) : null
                        )}
                      </select>
                      {errors.job_title?.type === "required" && (
                        <p className="error-message">Country is required</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mt-3">
                      <label className="salary-range-recr">Career Level</label>
                      <select
                        className="form-control"
                        {...register("functional_area", {
                          required: true,
                        })}
                      >
                        <option value="">Select career level</option>
                        {formData?.functional_area?.map((x, i) => (
                          <option value={x.id} key={i}>
                            {x.name !== null && x.name !== undefined
                              ? x.name
                              : ""}
                          </option>
                        ))}
                      </select>
                      {errors.functional_area?.type === "required" && (
                        <p className="error-message">
                          Career Level is required
                        </p>
                      )}
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
                        {...register("vacancies", {
                          required: true,
                        })}
                      />
                      {errors.vacancies?.type === "required" && (
                        <p className="error-message">Positions is required</p>
                      )}
                    </div>
                  </div>
                  {localStorage.getItem("eco_complaince") == 0 ? (
                    <div className="row">
                      <div className="col-md-12 mt-3">
                        <label className="salary-range-recr">Gender</label>
                        <select
                          className="form-control"
                          {...register("gender", {})}
                        >
                          <option value="">Select Here</option>
                          {formData?.genders?.map((x, i) => (
                            <option value={x.id} key={i}>
                              {x.gender !== null && x.gender !== undefined
                                ? x.gender
                                : ""}
                            </option>
                          ))}
                        </select>
                        {errors.gender?.type === "required" && (
                          <p className="error-message">Gender is required</p>
                        )}
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
                  {id && !watchAllFields.job_description ? (
                    <Editor
                      onTextChange={(e) =>
                        setValue("job_description", e.htmlValue)
                      }
                      value={watchAllFields.job_description}
                      style={{ resize: "none", minHeight: "180px" }}
                      placeholder="Enter job description"
                    />
                  ) : (
                    <Editor
                      onTextChange={(e) =>
                        setValue("job_description", e.htmlValue)
                      }
                      // value={watchAllFields.job_description}
                      style={{ resize: "none", minHeight: "180px" }}
                      placeholder="Enter job description"
                    />
                  )}
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 create-job-btn-recr"
                  >
                    {id ? "Update" : "Create"}
                  </button>
                </div>
                <div className="col-md-4"></div>
              </div>
            </div>
            <div className="col-lg-1"></div>
          </div>
        </form>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  getCreateJobReducer: state.getCreateJobReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getCreateJobData: (userId) => dispatch(getCreateJobData(userId)),
  getEditJobData: (userId, id) => dispatch(getEditJobData(userId, id)),
  createJob: (userId, data) => dispatch(createJob(userId, data)),
  editJob: (userId, id, data) => dispatch(editJob(userId, id, data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateAJobs);
