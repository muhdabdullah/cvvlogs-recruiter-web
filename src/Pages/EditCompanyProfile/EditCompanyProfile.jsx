import React, { useEffect, useState } from "react";
import "./EditCompanyProfile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav2 from "../../Components/Nav2/Nav2";
import place from "../../Assests/placeholderbuilding.svg";
import Footer from "../../Components/Footer/Footer";
import { connect } from "react-redux";
import { countries } from "country-data";
import { getEditCompany } from "../../actions/editcompanygetAction";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";
import axios from "axios";
import "../CreateAJob/CreateAJob.css";
import { getCountriesData } from "../../actions/getCountriesDataAction";
import Modal from "react-modal";
import IntlTelInput from "react-intl-tel-input";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

function EditCompanyProfile(props) {
  const [formData, setFormData] = useState({});
  const [loader, setLoader] = useState(true);
  const [numberChangeModal, setNumberChangeModal] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("");

  let param = useLocation().search;
  param = param.split("=");
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    let formData = new FormData();
    formData.append("file", watchAllFields.file);
    formData.append("host_name", watchAllFields.host_name);
    formData.append("host_email", watchAllFields.host_email);
    formData.append("name", watchAllFields.name);
    formData.append("tag_line", watchAllFields.tag_line);
    formData.append("website", watchAllFields.website);
    formData.append("number", watchAllFields.number);
    formData.append("num_code", watchAllFields.num_code);
    formData.append("description", watchAllFields.description);
    formData.append("category", watchAllFields.category);
    formData.append("state_id", watchAllFields.state_id);
    formData.append("city_id", watchAllFields.city_id);
    formData.append("country_id", watchAllFields.country_id);
    formData.append("size", watchAllFields.size);
    formData.append("type", watchAllFields.type);
    formData.append("founded", watchAllFields.founded);
    formData.append("eco_complaince", watchAllFields.eco_complaince ? 1 : 0);

    fetch(`${process.env.REACT_APP_API_END_POINT}/web/edit_company.php`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        auth_id: localStorage.getItem("auth_id1"),
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status != 200) {
          alert(response.message);
          return;
        }
        window.location = "/CompanyProfile";
      })
      .catch((error) => {});
  };
  const watchAllFields = watch();
  useEffect(() => {
    props.getEditCompany(localStorage.getItem("auth_id1")).then(async (res) => {
      setFormData((prev) => (prev = res));
      let { stored_values } = res;
      let resetData = {
        file: stored_values.dp,
        fileData: stored_values.dp,
        host_name: stored_values.host_name,
        host_email: stored_values.host_email,
        name: stored_values.name,
        tag_line: stored_values.tagline,
        website: stored_values.website,
        description: stored_values.desc,
        size: stored_values.size,
        number: stored_values.number,
        num_code: stored_values.num_code,
        founded: stored_values.founded,
        country_id: stored_values.location.country_id,
        state_id: stored_values.location.state_id,
        city_id: stored_values.location.city_id,
        category: stored_values.industry.cat_id,
        type: stored_values.company_type.id,
        eco_complaince: stored_values.eco_complaince,
      };
      await getAllStatesData(resetData);
      await reset(resetData);
      await setSelectedCountryCode(
        (prev) =>
          (prev = countries.all
            .find(
              (x) =>
                x.countryCallingCodes[0] ==
                props?.personalloginReducer?.personal?.stored_values?.num_code
            )
            ?.alpha2?.toLowerCase())
      );
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
        await axios
          .post(
            `${process.env.REACT_APP_API_END_POINT}/web/fetch_state_list.php`,
            {
              country_id: storeData.country_id,
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
                  country_id: storeData.country_id,
                  state_id: storeData.state_id,
                }
              )
              .then(async (res) => {
                await setFormData((prev) => ({
                  ...prev,
                  cities: res.data.data.city_list,
                }));
              });
          });
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
  const newNumberVerify = () => {
    if (!watchAllFields.number) {
      alert("Enter Mobile Number");
      return;
    }
    fetch(
      `${process.env.REACT_APP_API_END_POINT}/web/send_change_number_otp.php`,
      {
        method: "POST",
        body: JSON.stringify({
          number: watchAllFields.number,
          num_code: watchAllFields.num_code,
        }),
        headers: {
          auth_id: localStorage.getItem("auth_id1"),
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        localStorage.setItem(
          "newNumber",
          JSON.stringify({
            number: watchAllFields.number,
            code: watchAllFields.num_code,
          })
        );
        window.location = "/otp?type=numberChanged";
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  if (loader) {
    return <FullPageLoader />;
  }
  return (
    <>
      <Nav2 />
      <div className="container mt-5">
        <h1 className="edit-prof-head-main">Edit Profile</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            className="row shadow p-5 mt-3 mb-5"
            style={{ borderRadius: "15px" }}
          >
            <div className="col-md-12 d-flex justify-content-center">
              <input
                type="file"
                id="image"
                className="inputs"
                accept="image/png, image/gif, image/jpeg"
                {...register("file", {
                  onChange: (e) => {
                    if (e.target.files[0]) {
                      setValue("file", e.target.files[0]);
                      const reader = new FileReader();
                      reader.addEventListener("load", () => {
                        setValue("fileData", reader.result);
                      });
                      reader.readAsDataURL(e.target.files[0]);
                    }
                  },
                })}
              />
              {watchAllFields?.fileData ? (
                <img
                  className="p-3 rounded"
                  src={watchAllFields?.fileData}
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "200px",
                  }}
                />
              ) : (
                <img
                  style={{ objectFit: "cover" }}
                  className="border p-3 rounded "
                  width="100px"
                  height="100px"
                  src={place}
                />
              )}
            </div>
            <div className="col-md-6">
              <label className="input-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Type your name"
                {...register("host_name", {
                  required: true,
                  maxLength: 20,
                })}
              />
              {errors.host_name?.type === "required" && (
                <p className="error-message">Name is required</p>
              )}
            </div>
            <div className="col-md-6">
              <label className="input-label">Company Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Type your company name"
                {...register("name", {
                  required: true,
                  maxLength: 20,
                })}
              />
              {errors.name?.type === "required" && (
                <p className="error-message">Company Name is required</p>
              )}
            </div>
            <div className="col-md-6">
              <label className="input-label">Email</label>
              <input
                type="text"
                className="form-control"
                placeholder="Type your company name"
                {...register("host_email", {
                  required: true,
                  maxLength: 20,
                })}
              />
              {errors.host_email?.type === "required" && (
                <p className="error-message">Email is required</p>
              )}
            </div>
            <div className="col-md-6">
              <label className="input-label">Phone Number</label>
              <div className="row">
                <div className="col-3">
                  <select
                    className="form-control per-det-input"
                    aria-label="Default select example"
                    disabled
                    {...register("num_code", {
                      required: true,
                    })}
                  >
                    <option value="">Select Country code</option>
                    {countries.all.map((exp) =>
                      exp.countryCallingCodes.length ? (
                        <option value={exp.countryCallingCodes[0]}>
                          {exp.countryCallingCodes[0]}
                        </option>
                      ) : null
                    )}
                  </select>
                </div>
                <div className="col-9" style={{ paddingLeft: 0 }}>
                  <input
                    onClick={() => setNumberChangeModal(true)}
                    readOnly
                    type="text"
                    placeholder="Type your Phone Number here"
                    className="form-control"
                    {...register("number", {
                      required: true,
                    })}
                  />
                </div>
                {errors.host_name?.type === "required" && (
                  <p className="error-message">Name is required</p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <label className="input-label">Industry</label>
              <select
                className="form-control"
                {...register("category", {
                  required: true,
                })}
              >
                <option value="">Select Industry</option>
                {formData?.industries?.map((x, i) => (
                  <option value={x.id} key={i}>
                    {x.ind_name !== null && x.ind_name !== undefined
                      ? x.ind_name
                      : ""}
                  </option>
                ))}
              </select>
              {errors.category?.type === "required" && (
                <p className="error-message">Industry is required</p>
              )}
            </div>
            <div className="col-md-6">
              <label className="input-label">Website</label>
              <input
                type="text"
                className="form-control"
                placeholder="Type your website here"
                {...register("website", {
                  required: true,
                })}
              />
              {errors.website?.type === "required" && (
                <p className="error-message">Website is required</p>
              )}
            </div>
            <div className="col-md-6">
              <label className="input-label">Company Type</label>
              <select
                className="form-control"
                {...register("type", {
                  required: true,
                })}
              >
                <option value="">Select Company Type</option>
                {formData?.company_type?.map((x, i) => (
                  <option value={x.id} key={i}>
                    {x.type !== null && x.type !== undefined ? x.type : ""}
                  </option>
                ))}
              </select>
              {errors.type?.type === "required" && (
                <p className="error-message">Company Type is required</p>
              )}
            </div>
            <div className="col-md-6">
              <label className="input-label">Country</label>
              <select
                className="form-control"
                aria-label="Default select example"
                {...register("country_id", {
                  required: true,
                  onChange: (e) => handleCountry(e),
                })}
              >
                <option value="">Select Your Country</option>
                {formData?.countries?.map((x, i) => (
                  <option value={x.country_id} key={i}>
                    {x.country_name !== null && x.country_name !== undefined
                      ? x.country_name
                      : ""}
                  </option>
                ))}
              </select>
              {errors.country_id?.type === "required" && (
                <p className="error-message">Country is required</p>
              )}
            </div>
            <div className="col-md-6">
              <label className="input-label">Company Size</label>
              <input
                type="text"
                className="form-control"
                placeholder="Type your company size here"
                {...register("size", {
                  required: true,
                })}
              />
              {errors.size?.type === "required" && (
                <p className="error-message">Company size is required</p>
              )}
            </div>

            <div className="col-md-6">
              <label className="input-label">State / Province</label>
              <select
                className="form-control per-det-input"
                aria-label="Default select example"
                {...register("state_id", {
                  required: true,
                  onChange: (e) => handleState(e),
                })}
              >
                <option value="">Select Your State / Province</option>
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
            <div className="col-md-6">
              <label className="input-label">Founding Year</label>
              <input
                type="text"
                className="form-control"
                placeholder="Type your founding year"
                {...register("founded", {
                  required: true,
                })}
              />
              {errors.founded?.type === "required" && (
                <p className="error-message">Founding year is required</p>
              )}
            </div>
            <div className="col-md-6">
              <label className="input-label">City</label>
              <select
                className="form-control"
                aria-label="Default select example"
                {...register("city_id", {
                  required: true,
                })}
              >
                <option value="">Select Your City</option>
                {formData?.cities?.map((x, i) => (
                  <option value={x.city_id} key={i}>
                    {x.city_name !== null && x.city_name !== undefined
                      ? x.city_name
                      : ""}
                  </option>
                ))}
              </select>
              {errors.city_id?.type === "required" && (
                <p className="error-message">City is required</p>
              )}
            </div>

            <div className="col-md-12">
              <label className="input-label">Short Description</label>
              <input
                type="text"
                className="form-control"
                placeholder="Type your tagline name"
                {...register("tag_line", {
                  required: true,
                  maxLength: 100,
                })}
              />
              {errors.tag_line?.type === "required" && (
                <p className="error-message">Short Description is required</p>
              )}
            </div>

            <div className="col-md-12">
              <label className="input-label">Company Description</label>
              <textarea
                type="text"
                className="form-control text-area-des-edit-prof"
                placeholder="Type your industry here"
                {...register("description", {
                  required: true,
                })}
              />
              {errors.description?.type === "required" && (
                <p className="error-message">Description is required</p>
              )}
            </div>
            <div className="col-md-12">
              <input
                type="checkbox"
                className="mr-3"
                checked={watchAllFields.eco_complaince == 1 ? true : false}
                {...register("eco_complaince")}
              />
              <label className="input-label">
                EEOC Compliance Policy{" "}
                <i
                  className="fas fa-info-circle pl-2"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="To be U.S. EEOC (Equal employment opportunity commission) compliant, Employer will not have access to candidates gender, age or nationality.

At cvvlogs.com, we do not inquire about candidates race, color, religion, pregnancy status, any disability or genetic information.

Please consult with your legal counsel about specific requirements that are applicable to your organization."
                ></i>
              </label>
            </div>

            <div className="col-md-12 d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-primary  btn-of-edit-comp-prof"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
      <Modal
        isOpen={numberChangeModal}
        onRequestClose={() => setNumberChangeModal(false)}
        className="shadow"
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
          content: {
            background: "#fff",
            border: "0",
            position: "absolute",
            zIndex: 1000,
            margin: "0 auto",
            width: "525px",
            minHeight: "230px",
            height: "230px",
            top: "220px",
            left: "0",
            right: "0",
            bottom: "50px",
            WebkitOverflowScrolling: "touch",
            outline: "none",
            padding: "30px 0px",
            borderRadius: "20px",
          },
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <label className="input-label">Phone Number</label>
            </div>
            <div className="col-12">
              <IntlTelInput
                preferredCountries={["pk"]}
                inputClassName="form-control"
                value={watchAllFields.number}
                defaultCountry={selectedCountryCode}
                onPhoneNumberChange={(status, phoneNumber, country) => {
                  setValue("num_code", country.dialCode);
                  setValue("number", phoneNumber);
                }}
              />
            </div>
            <div className="col-6">
              <button
                className="btn btn-primary w-100 btn-of-edit-comp-prof"
                onClick={() => newNumberVerify()}
              >
                Change
              </button>
            </div>
            <div className="col-6">
              <button
                className="btn btn-primary w-100 btn-of-edit-comp-prof"
                onClick={() => setNumberChangeModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => ({
  editcompanyReducer: state.editcompanyReducer,
  getCountriesDataReducer: state.getCountriesDataReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getEditCompany: (userId) => dispatch(getEditCompany(userId)),
  getCountriesData: () => dispatch(getCountriesData()),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditCompanyProfile);
