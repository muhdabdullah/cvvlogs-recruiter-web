import React, { useEffect, useState } from "react";
import "./EditCompanyProfile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav2 from "../../Components/Nav2/Nav2";
import place from "../../Assests/placeholderbuilding.svg";
import Footer from "../../Components/Footer/Footer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { countries } from "country-data";
import { getEditCompany } from "../../actions/editcompanygetAction";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";
import axios from "axios";
import "../CreateAJob/CreateAJob.css";
import { getCountriesData } from "../../actions/getCountriesDataAction";
import Modal from "react-modal";
import { Dropdown } from "primereact/dropdown";
import IntlTelInput from "react-intl-tel-input";

function EditCompanyProfile(props) {
  const [loader, setLoader] = useState(false);
  const [numberChangeModal, setNumberChangeModal] = useState(false);
  const [file, setfile] = useState("");
  const [host_name, sethost_name] = useState("");
  const [host_email, sethost_email] = useState("");
  const [name, setname] = useState("");
  const [tag_line, settag_line] = useState("");
  const [website, setwebsite] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");
  const [size, setsize] = useState("");
  const [number, setNumber] = useState("");
  const [code, setCode] = useState("");
  const [type, settype] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [founded, setfounded] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [dataStates, setDataStates] = useState([]);
  const [selectedCountryStates, setSelectedCountryStates] = useState([]);
  const [selectedCountryStatesCity, setSelectedCountryStatesCity] = useState(
    []
  );
  const [defaultCountryCode, setdefaultCountryCode] = useState("");
  const [imgData, setImgData] = useState();
  const [countriesCode, setCountriesCode] = useState([]);
  const [ecoComplaince, setEcoComplaince] = useState(0);

  useEffect(async () => {
    setLoader(true);
    await props.getCountriesData();
    await jobData(localStorage.getItem("auth_id1"));
    let defaultCountryCode = countries.all.find(
      (x) => x.name == localStorage.getItem("userCurrentLocation")
    );
    setdefaultCountryCode(defaultCountryCode);

    let codes = [];
    countries.all.forEach((x) => {
      if (x.countryCallingCodes[0]) {
        let object = {
          name: x.name + " " + x.countryCallingCodes[0],
          value: x.countryCallingCodes[0],
        };
        codes.push(object);
      }
    });
    setCountriesCode((prev) => (prev = codes));
  }, []);

  useEffect(async () => {
    await getAllStatesData();
    setfile(props?.editcompanyReducer?.editcompany?.stored_values?.dp);
    sethost_name(
      props?.editcompanyReducer?.editcompany?.stored_values?.host_name
    );
    sethost_email(
      props?.editcompanyReducer?.editcompany?.stored_values?.host_email
    );
    setname(props?.editcompanyReducer?.editcompany?.stored_values?.name);
    settag_line(props?.editcompanyReducer?.editcompany?.stored_values?.tagline);
    setwebsite(props?.editcompanyReducer?.editcompany?.stored_values?.website);
    setdescription(props?.editcompanyReducer?.editcompany?.stored_values?.desc);
    setsize(props?.editcompanyReducer?.editcompany?.stored_values?.size);
    setNumber(props?.editcompanyReducer?.editcompany?.stored_values?.number);
    setCode(props?.editcompanyReducer?.editcompany?.stored_values?.num_code);
    setfounded(props?.editcompanyReducer?.editcompany?.stored_values?.founded);
    setCountry(
      props?.editcompanyReducer?.editcompany?.stored_values?.location
        ?.country_id
    );
    setState(
      props?.editcompanyReducer?.editcompany?.stored_values?.location?.state_id
    );
    setCity(
      props?.editcompanyReducer?.editcompany?.stored_values?.location?.city_id
    );
    setcategory(
      props?.editcompanyReducer?.editcompany?.stored_values?.industry?.cat_id
    );
    settype(
      props?.editcompanyReducer?.editcompany?.stored_values?.company_type?.id
    );
    setEcoComplaince(
      props?.editcompanyReducer?.editcompany?.stored_values?.eco_complaince
    );
    setSelectedCountryCode(
      (prev) =>
        (prev = countries.all
          .find(
            (x) =>
              x.countryCallingCodes[0] ==
              props?.editcompanyReducer?.editcompany?.stored_values?.num_code
          )
          .alpha2.toLowerCase())
    );
  }, [props?.editcompanyReducer?.editcompany?.stored_values]);
  const jobData = async (userId) => {
    await props.getEditCompany(userId);
    await setLoader(false);
  };

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      setfile(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
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
                props?.editcompanyReducer?.editcompany?.stored_values?.location
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
                    props?.editcompanyReducer?.editcompany?.stored_values
                      ?.location?.country_id,
                  state_id:
                    props?.editcompanyReducer?.editcompany?.stored_values
                      ?.location?.state_id,
                }
              )
              .then((res) => {
                setSelectedCountryStatesCity(res.data.data.city_list);
                setLoader(false);
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
            country_id: country || localStorage.getItem("country"),
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

  const handleFile = async (e) => {
    if (number && number.toString().length < 7) {
      alert("Mobile Number is Invalid");
      return;
    }
    const reg =
      /^([a-zA-Z0-9~`!@#\$%\^&\*\(\)_\-\+={\[\}\]\|\\:;"'<,>\.\?\/  ]*)@([a-zA-Z]+)\.([a-zA-Z]+).([a-zA-Z]+)$/;
    if (host_email && reg.test(host_email) == false) {
      alert("Email is invalid");
      return;
    }
    if (!host_name) {
      alert("Host name is empty");
      return;
    }
    if (!host_email) {
      alert("Host email is empty");
      return;
    }
    if (!name) {
      alert("Company name is empty");
      return;
    }
    if (!tag_line) {
      alert("Short Description is empty");
      return;
    }
    if (!website) {
      alert("Website is empty");
      return;
    }
    if (!description) {
      alert("Description is empty");
      return;
    }
    if (!category) {
      alert("Select Industry");
      return;
    }
    if (!size) {
      alert("Company Size is empty");
      return;
    }
    if (!number) {
      alert("Phone Number is empty");
      return;
    }
    if (!code) {
      alert("Select Country Code");
      return;
    }
    if (!type) {
      alert("Select Company Type");
      return;
    }
    if (!founded) {
      alert("Founding Year is emply");
      return;
    }
    if (!country) {
      alert("Select Country");
      return;
    }
    if (!state) {
      alert("Select State / Province");
      return;
    }
    if (!city) {
      alert("Select City");
      return;
    }
    setLoader(true);

    let formData = new FormData();
    formData.append("file", file);
    formData.append("host_name", host_name);
    formData.append("host_email", host_email);
    formData.append("name", name);
    formData.append("tag_line", tag_line);
    formData.append("website", website);
    formData.append("number", number);
    formData.append("num_code", code);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("state_id", state);
    formData.append("city_id", city);
    formData.append("country_id", country);
    formData.append("size", size);
    formData.append("type", type);
    formData.append("founded", founded);
    formData.append("eco_complaince", ecoComplaince);

    fetch(`${process.env.REACT_APP_API_END_POINT}/web/edit_company.php`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        auth_id: localStorage.getItem("auth_id1"),
      },
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("name", name);
          localStorage.setItem("eco_complaince", ecoComplaince);
          window.location = "/CompanyProfile";
        } else alert(res.message);
        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
      });
  };
  const newNumberVerifyModal = () => {
    setNumberChangeModal(true);
  };
  const newNumberVerify = () => {
    if (!number) {
      alert("Enter Mobile Number");
      return;
    }
    fetch(
      `${process.env.REACT_APP_API_END_POINT}/web/send_change_number_otp.php`,
      {
        method: "POST",
        body: JSON.stringify({
          number: number,
          num_code: code,
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
          JSON.stringify({ number: number, code: code })
        );
        window.location = "/otp?type=numberChanged";
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const disableNewNumber = () => {
    if (props?.editcompanyReducer?.editcompany?.stored_values?.number != number)
      return true;
    return false;
  };
  if (!props.editcompanyReducer.loading || loader) {
    return <FullPageLoader />;
  }
  return (
    <>
      <Nav2 />
      <div className="container mt-5">
        <h1 className="edit-prof-head-main">Edit Profile</h1>
        <div
          className="row shadow p-5 mt-3 mb-5"
          style={{ borderRadius: "15px" }}
        >
          <div className="col-md-12 d-flex justify-content-center">
            <input
              type="file"
              className="form-control inputs"
              onChange={(e) => onChangePicture(e)}
              accept="image/png, image/gif, image/jpeg"
            />
            {!imgData ? (
              props?.editcompanyReducer?.editcompany?.stored_values?.dp ? (
                <img
                  style={{ objectFit: "cover" }}
                  className="border p-3 rounded "
                  width="100px"
                  height="100px"
                  src={
                    props?.editcompanyReducer?.editcompany?.stored_values?.dp
                  }
                />
              ) : (
                <img
                  style={{ objectFit: "cover" }}
                  className="border p-3 rounded "
                  width="100px"
                  height="100px"
                  src={place}
                />
              )
            ) : (
              <img
                className="border p-3 rounded "
                src={imgData}
                style={{ objectFit: "cover" }}
                width="100px"
                height="100px"
              />
            )}
          </div>
          <div className="col-md-6">
            <label className="input-label">Name</label>
            <input
              onChange={(e) => {
                sethost_name(e.target.value);
              }}
              value={host_name}
              type="text"
              className="form-control"
              placeholder="Type your name"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="input-label">Company Name</label>
            <input
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
              type="text"
              className="form-control"
              placeholder="Type your company name"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="input-label">Email</label>
            <input
              value={host_email}
              onChange={(e) => {
                sethost_email(e.target.value);
              }}
              type="text"
              className="form-control"
              placeholder="Type your company name"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="input-label">Phone Number</label>
            <div className="row">
              <div className="col-3">
                <select
                  onChange={(e) => setCode(e.target.value)}
                  className="form-control per-det-input"
                  aria-label="Default select example"
                  required
                  style={{ paddingRight: 0 }}
                  value={
                    props?.editcompanyReducer?.editcompany?.stored_values
                      ?.num_code
                  }
                  disabled
                >
                  <option>Select Country code</option>
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
                  onChange={(e) => setNumber(e.target.value)}
                  onClick={newNumberVerifyModal}
                  value={
                    props?.editcompanyReducer?.editcompany?.stored_values
                      ?.number
                  }
                  readOnly
                  type="text"
                  placeholder="Type your Phone Number here"
                  className="form-control"
                  required
                />
              </div>
              {/* <div className="col-1 p-0">
                <button
                  type="button"
                  onClick={newNumberVerifyModal}
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                  }}
                >
                  <i
                    className="fas fa-external-link-alt"
                    style={{ color: "#865ddd" }}
                  ></i>
                </button>
              </div> */}
            </div>
          </div>
          <div className="col-md-6">
            <label className="input-label">Industry</label>
            <select
              onChange={(e) => {
                setcategory(e.target.value);
              }}
              value={category}
              className="form-control"
              required
            >
              <option>Select Industry</option>
              {props.editcompanyReducer.editcompany.industries &&
              props.editcompanyReducer.editcompany.industries.length > 0
                ? props.editcompanyReducer.editcompany.industries.map((ind) => (
                    <option value={ind.id}>
                      {ind.ind_name !== null && ind.ind_name !== undefined
                        ? ind.ind_name
                        : ""}
                    </option>
                  ))
                : ""}
            </select>
          </div>
          <div className="col-md-6">
            <label className="input-label">Website</label>
            <input
              onChange={(e) => {
                setwebsite(e.target.value);
              }}
              value={website}
              type="text"
              className="form-control"
              placeholder="Type your website here"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="input-label">Company Type</label>
            <select
              onChange={(e) => {
                settype(e.target.value);
              }}
              value={type}
              className="form-control"
              required
            >
              <option>Select Company Type</option>
              {props.editcompanyReducer.editcompany.company_type &&
              props.editcompanyReducer.editcompany.company_type.length > 0
                ? props.editcompanyReducer.editcompany.company_type.map(
                    (type) => (
                      <option value={type.id}>
                        {type.type !== null && type.type !== undefined
                          ? type.type
                          : ""}
                      </option>
                    )
                  )
                : ""}
            </select>
          </div>
          <div className="col-md-6">
            <label className="input-label">Country</label>
            <select
              value={country}
              onChange={handleCountry}
              className="form-control"
              aria-label="Default select example"
              required
            >
              <option>Select Your Country</option>
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
                  <div className="spinner-border text-secondary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
            </select>
          </div>
          <div className="col-md-6">
            <label className="input-label">Company Size</label>
            <input
              onChange={(e) => {
                setsize(e.target.value);
              }}
              value={size}
              type="text"
              className="form-control"
              placeholder="Type your company size here"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="input-label">State / Province</label>
            <select
              onChange={handleState}
              value={state}
              className="form-control per-det-input"
              aria-label="Default select example"
              required
            >
              <option selected>Select Your State / Province</option>
              {selectedCountryStates && selectedCountryStates.length > 0
                ? selectedCountryStates.map((f) => (
                    <option value={f.state_id}>{f.state_name}</option>
                  ))
                : ""}
            </select>
          </div>
          <div className="col-md-6">
            <label className="input-label">Founding Year</label>
            <input
              onChange={(e) => {
                setfounded(e.target.value);
              }}
              value={founded}
              type="text"
              className="form-control"
              placeholder="Type your founding year"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="input-label">City</label>
            <select
              value={city}
              onChange={handleCity}
              className="form-control"
              aria-label="Default select example"
              required
            >
              <option selected>Select Your City</option>
              {selectedCountryStatesCity && selectedCountryStatesCity.length > 0
                ? selectedCountryStatesCity.map((f) => (
                    <option value={f.city_id}>{f.city_name}</option>
                  ))
                : ""}
            </select>
          </div>

          <div className="col-md-12">
            <label className="input-label">Short Description</label>
            <input
              onChange={(e) => {
                settag_line(e.target.value);
              }}
              value={tag_line}
              type="text"
              className="form-control"
              placeholder="Type your tagline name"
              maxLength="100"
              required
            />
          </div>

          <div className="col-md-12">
            <label className="input-label">Company Description</label>
            <textarea
              onChange={(e) => {
                setdescription(e.target.value);
              }}
              value={description}
              type="text"
              className="form-control text-area-des-edit-prof"
              placeholder="Type your industry here"
              required
            />
          </div>
          <div className="col-md-12">
            <input
              onChange={() =>
                setEcoComplaince((prev) =>
                  prev === 0 ? (prev = 1) : (prev = 0)
                )
              }
              type="checkbox"
              className="mr-3"
              checked={ecoComplaince == 1}
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
              onClick={() => handleFile()}
              className="btn btn-primary  btn-of-edit-comp-prof"
            >
              Save Changes
            </button>
          </div>
        </div>
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
              {/* <select
                onChange={(e) => setCode(e.target.value)}
                className="form-control per-det-input"
                aria-label="Default select example"
                required
                style={{ paddingRight: 0 }}
                value={code}
              >
                <option>Select Country code</option>
                {countries.all.map((exp) =>
                  exp.countryCallingCodes.length ? (
                    <option value={exp.countryCallingCodes[0]}>
                      {exp.countryCallingCodes[0]}
                    </option>
                  ) : null
                )}
              </select> */}
              {/* <Dropdown
                value={code}
                options={countriesCode}
                onChange={(e) => setCode(e.target.value)}
                optionLabel="name"
                filter
                placeholder="Select a Country Code"
              /> */}
              <IntlTelInput
                preferredCountries={["pk"]}
                value={number}
                inputClassName="form-control"
                defaultCountry={selectedCountryCode}
                onPhoneNumberChange={(status, phoneNumber, country) => {
                  setCode("+" + country.dialCode);
                  setNumber(phoneNumber);
                }}
              />
            </div>
            {/* <div className="col-9" style={{ paddingLeft: 0 }}>
              <input
                onChange={(e) => setNumber(e.target.value)}
                value={number}
                type="text"
                placeholder="Type your Phone Number here"
                className="form-control"
              />
            </div> */}
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
