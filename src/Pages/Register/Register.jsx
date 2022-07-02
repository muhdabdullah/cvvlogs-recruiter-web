import React, { useEffect, useState } from "react";
import { countries } from "country-data";
import "./Register.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../../Components/Footer/Footer";
import { createRegister } from "../../actions/registerAction";
import { getCountriesData } from "../../actions/getCountriesDataAction";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";
import { Dropdown } from "primereact/dropdown";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";

function RegisterUser(props) {
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [company_name, setcompany_name] = useState("");
  const [email, setemail] = useState("");
  const [number, setnumber] = useState("");
  const [code, setCode] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [termsCheck, settermsCheck] = useState(false);
  const [ecoComplaince, setEcoComplaince] = useState(0);
  const [defaultCountryCode, setdefaultCountryCode] = useState("");
  const [countriesCode, setCountriesCode] = useState([]);

  const AddRegister = async () => {
    const reg =
      /^([a-zA-Z0-9~`!@#\$%\^&\*\(\)_\-\+={\[\}\]\|\\:;"'<,>\.\?\/  ]*)@([a-zA-Z]+)\.([a-zA-Z]+).([a-zA-Z]+)$/;
    if (first_name == "") {
      alert("Enter first name");
    } else if (last_name == "") {
      alert("Enter last name");
    } else if (email == "") {
      alert("Email required");
    } else if (reg.test(email) === false) {
      alert("Email is invalid");
    } else if (company_name == "") {
      alert("Company name is required");
    } else if (password == "") {
      alert("Password required");
    } else if (password.length < 6) {
      alert("Password should be at least 6 characters");
    } else if (confirmPassword == "") {
      alert("Confirm password is required");
    } else if (confirmPassword !== password) {
      alert("Passwords didn't match");
    } else if (number == "") {
      alert("Cellphone number is required");
    } else if (!termsCheck) {
      alert("Kindly agree to terms and conditions");
    } else {
      await props.createRegister(
        first_name,
        last_name,
        company_name,
        email,
        number,
        code,
        password,
        ecoComplaince
      );
    }
  };
  useEffect(async () => {
    let defaultCountryCode = countries.all.find(
      (x) => x.name == localStorage.getItem("userCurrentLocation")
    );
    setdefaultCountryCode(defaultCountryCode);
    setCode(defaultCountryCode?.countryCallingCodes?.[0]);

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
  return (
    <>
      {/* <Navbar /> */}
      <div className="container-fluid back-img-reg d-lg-block d-md-block d-none">
        <div className="container">
          {/* Register Main div Starts */}
          <div className="row">
            <div className="col-lg-8 col-md-12 main-reg p-5 shadow mb-5">
              {/* Heading Starts */}
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <h1 className="reg-head">Register</h1>
                </div>
                <div className="col-md-4"></div>
              </div>
              {/* Heading Ends */}
              {/* Reg form 01 Starts */}
              <div className="row">
                <div className="col-md-6">
                  <label className="label-reg mt-2">First name</label>
                  <input
                    onChange={(e) => setfirst_name(e.target.value)}
                    type="text"
                    className="form-control"
                    id="input-reg"
                    placeholder="Type your name here"
                    style={{ color: "#000" }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="label-reg mt-2">Last name</label>
                  <input
                    onChange={(e) => setlast_name(e.target.value)}
                    type="text"
                    className="form-control"
                    id="input-reg"
                    placeholder="Type your name here"
                    style={{ color: "#000" }}
                  />
                </div>
              </div>
              {/* Reg form 01 Ends */}
              {/* Reg form 02 Starts */}
              <div className="row">
                <div className="col-md-6">
                  <label className="label-reg mt-2">Email</label>
                  <input
                    onChange={(e) => setemail(e.target.value)}
                    type="email"
                    className="form-control"
                    id="input-reg"
                    placeholder="Type your email here"
                    style={{ color: "#000" }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="label-reg mt-2">Phone Number</label>
                  <div className="row">
                    <div className="col-12">
                      {/* <select
                        style={{
                          color: "#000",
                          paddingRight: 0,
                          width: "100%",
                          height: "100%",
                        }}
                        id="input-reg"
                        onChange={(e) => setCode(e.target.value)}
                        value={code}
                      >
                        {localStorage.getItem("userCurrentLocation") ? (
                          <option
                            value={defaultCountryCode?.countryCallingCodes?.[0]}
                            select
                          >
                            {defaultCountryCode?.countryCallingCodes?.[0]}
                          </option>
                        ) : null}
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
                        style={{
                          borderRadius: 0,
                          border: "none",
                          borderBottom: "1px solid #c8c8c8",
                        }}
                      /> */}
                      <IntlTelInput
                        preferredCountries={["pk"]}
                        inputClassName="form-control input-reg"
                        onPhoneNumberChange={(status, phoneNumber, country) => {
                          setCode("+" + country.dialCode);
                          setnumber(phoneNumber);
                        }}
                      />
                    </div>

                    {/* <div className="col-8" style={{ paddingLeft: 0 }}>
                      <input
                        onChange={(e) => setnumber(e.target.value)}
                        type="text"
                        className="form-control"
                        id="input-reg"
                        placeholder="Type your Phone Number here"
                        style={{ color: "#000" }}
                      />
                    </div> */}
                  </div>
                </div>
              </div>
              {/* Reg form 02 Ends */}
              {/* Reg form 03 Starts */}
              <div className="row">
                {/* Password Starts */}
                <div className="col-md-6">
                  <label className="label-reg mt-2">Password</label>
                  <input
                    onChange={(e) => setpassword(e.target.value)}
                    type="password"
                    className="form-control"
                    id="input-reg"
                    placeholder="Type your password here"
                    style={{ color: "#000" }}
                  />
                </div>
                {/* Password ends */}
                <div className="col-md-6">
                  <label className="label-reg mt-2">Company name</label>
                  <input
                    onChange={(e) => setcompany_name(e.target.value)}
                    type="text"
                    className="form-control"
                    id="input-reg"
                    placeholder="Type your company name here"
                    style={{ color: "#000" }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="label-reg mt-2">Confirm Password</label>
                  <input
                    onChange={(e) => setconfirmPassword(e.target.value)}
                    type="password"
                    className="form-control"
                    id="input-reg"
                    placeholder="Type your password again here"
                    style={{ color: "#000" }}
                  />
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-3"></div>
                <div className="col-md-6 p-0 m-0 d-flex justify-content-center align-items-start">
                  <div className="mr-2">
                    <input
                      onChange={() =>
                        setEcoComplaince((prev) =>
                          prev === 0 ? (prev = 1) : (prev = 0)
                        )
                      }
                      type="checkbox"
                    />
                  </div>
                  <div>
                    <p className="recr-text-reg m-0">
                      EEOC Compliance Policy.
                      <i
                        className="fas fa-info-circle pl-2"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="To be U.S. EEOC (Equal employment opportunity commission) compliant, Employer will not have access to candidates gender, age or nationality.

At cvvlogs.com, we do not inquire about candidates race, color, religion, pregnancy status, any disability or genetic information.

Please consult with your legal counsel about specific requirements that are applicable to your organization."
                      ></i>
                    </p>
                  </div>
                </div>
                <div className="col-md-3"></div>
              </div>

              <div className="row mt-3">
                <div className="col-md-3"></div>
                <div className="col-md-6 p-0 m-0 d-flex justify-content-center align-items-start">
                  <div>
                    <input
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          AddRegister();
                        }
                      }}
                      onChange={() => settermsCheck(true)}
                      type="checkbox"
                    />
                  </div>
                  <div>
                    <p className="recr-text-reg">
                      By clicking "Register" you agree to our{" "}
                      <Link to="/terms-cond">
                        <span className="term-priv-reg">
                          Terms {`&`} Conditions
                        </span>
                      </Link>{" "}
                      as well as our{" "}
                      <Link to="/priv-pol">
                        <span className="term-priv-reg">Privacy Policy</span>
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="col-md-3"></div>
              </div>
              {/* Terms and cond text Ends */}

              {/* Register Button Starts */}
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <button
                    className="btn btn-primary w-100 reg-btn-main"
                    onClick={() => AddRegister()}
                    // disabled={
                    //   !first_name === false &&
                    //   !last_name === false &&
                    //   !company_name === false &&
                    //   !email === false &&
                    //   !number === false &&
                    //   !password === false &&
                    //   !confirmPassword === false &&
                    //   !termsCheck === false
                    //     ? false
                    //     : true
                    // }
                  >
                    Register
                  </button>
                </div>
                <div className="col-md-4"></div>
              </div>
              {/* Register Button Ends */}

              {/* Already Apply Starts */}
              <div className="row mt-2">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <p className="recr-text-reg">
                    Already have an account?{" "}
                    <Link to="/">
                      <span className="term-priv-reg">Login here</span>
                    </Link>
                  </p>
                </div>
                <div className="col-md-3"></div>
              </div>
              {/* Already Apply Ends */}
            </div>
            <div className="col-lg-4"></div>
          </div>
          {/* Register Main div Ends */}
        </div>
        {props.auth.loading == false ? <FullPageLoader /> : null}
      </div>

      <div className="container-fluid back-img-regs d-lg-none d-md-none d-block">
        <div className="container">
          {/* Register Main div Starts */}
          <div className="row">
            <div className="col-lg-8 col-md-12 main-reg p-5 shadow mb-5">
              {/* Heading Starts */}
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <h1 className="reg-head">Register</h1>
                </div>
                <div className="col-md-4"></div>
              </div>
              {/* Heading Ends */}
              {/* Reg form 01 Starts */}
              <div className="row">
                <div className="col-md-6">
                  <label className="label-reg mt-2">First name</label>
                  <input
                    onChange={(e) => setfirst_name(e.target.value)}
                    type="text"
                    className="form-control"
                    id="input-reg"
                    placeholder="Type your name here"
                    style={{ color: "#000" }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="label-reg mt-2">Last name</label>
                  <input
                    onChange={(e) => setlast_name(e.target.value)}
                    type="text"
                    className="form-control"
                    id="input-reg"
                    placeholder="Type your name here"
                    style={{ color: "#000" }}
                  />
                </div>
              </div>
              {/* Reg form 01 Ends */}
              <div className="row">
                <div className="col-md-6">
                  <label className="label-reg mt-2">Phone Number</label>
                  <div className="row">
                    <div className="col-12 col-sm-12 d-flex">
                      {/* <select
                        style={{
                          color: "#000",
                          paddingRight: 0,
                          width: "100%",
                        }}
                        id="input-reg"
                        onChange={(e) => setCode(e.target.value)}
                        value={code}
                      >
                        {localStorage.getItem("userCurrentLocation") ? (
                          <option
                            value={defaultCountryCode?.countryCallingCodes?.[0]}
                            select
                          >
                            {defaultCountryCode?.countryCallingCodes?.[0]}
                          </option>
                        ) : null}

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
                        style={{
                          borderRadius: 0,
                          border: "none",
                          borderBottom: "1px solid #c8c8c8",
                        }}
                      /> */}
                      <IntlTelInput
                        preferredCountries={["pk"]}
                        onPhoneNumberChange={(status, phoneNumber, country) => {
                          setCode("+" + country.dialCode);
                          setnumber(phoneNumber);
                        }}
                      />
                    </div>

                    {/* <div
                      className="d-flex col-sm-10 col-8"
                      style={{ paddingLeft: 0 }}
                    >
                      <input
                        onChange={(e) => setnumber(e.target.value)}
                        type="text"
                        className="form-control"
                        id="input-reg"
                        placeholder="Type your Phone Number here"
                        style={{ color: "#000" }}
                      />
                    </div> */}
                  </div>
                </div>
              </div>
              {/* Reg form 02 Starts */}
              <div className="row">
                <div className="col-md-6">
                  <label className="label-reg mt-2">Email</label>
                  <input
                    onChange={(e) => setemail(e.target.value)}
                    type="email"
                    className="form-control"
                    id="input-reg"
                    placeholder="Type your email here"
                    style={{ color: "#000" }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="label-reg mt-2">Company name</label>
                  <input
                    onChange={(e) => setcompany_name(e.target.value)}
                    type="text"
                    className="form-control"
                    id="input-reg"
                    placeholder="Type your company name here"
                    style={{ color: "#000" }}
                  />
                </div>
              </div>
              {/* Reg form 02 Ends */}

              {/* Reg form 03 Starts */}
              <div className="row">
                {/* Password Starts */}
                <div className="col-md-6">
                  <label className="label-reg mt-2">Password</label>
                  <input
                    onChange={(e) => setpassword(e.target.value)}
                    type="password"
                    className="form-control"
                    id="input-reg"
                    placeholder="Type your password here"
                    style={{ color: "#000" }}
                  />
                </div>
                {/* Password ends */}
                <div className="col-md-6">
                  <label className="label-reg mt-2">Confirm Password</label>
                  <input
                    onChange={(e) => setconfirmPassword(e.target.value)}
                    type="password"
                    className="form-control"
                    id="input-reg"
                    placeholder="Type your password again here"
                    style={{ color: "#000" }}
                  />
                </div>
              </div>
              {/* Reg form 03 Ends */}
              {/* Reg form 04 Starts */}

              {/* Reg form 04 Ends */}
              {/* Terms and cond text Starts */}
              <div className="row mt-3">
                <div className="col-md-3"></div>
                <div className="col-md-6 p-0 m-0 d-flex justify-content-center align-items-start">
                  <div className="mr-2">
                    <input
                      onChange={() =>
                        setEcoComplaince((prev) =>
                          prev === 0 ? (prev = 1) : (prev = 0)
                        )
                      }
                      type="checkbox"
                    />
                  </div>
                  <div>
                    <p className="recr-text-reg m-0">
                      EEOC Compliance Policy.
                      <i
                        className="fas fa-info-circle pl-2"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="To be U.S. EEOC (Equal employment opportunity commission) compliant, Employer will not have access to candidates gender, age or nationality.

At cvvlogs.com, we do not inquire about candidates race, color, religion, pregnancy status, any disability or genetic information.

Please consult with your legal counsel about specific requirements that are applicable to your organization."
                      ></i>
                    </p>
                  </div>
                </div>
                <div className="col-md-3"></div>
              </div>
              <div className="row mt-3">
                <div className="col-md-3"></div>
                <div className="col-md-6 p-0 m-0 d-flex justify-content-center align-items-start">
                  <div>
                    <input
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          AddRegister();
                        }
                      }}
                      onChange={() => settermsCheck(true)}
                      type="checkbox"
                    />
                  </div>
                  <div>
                    <p className="recr-text-reg">
                      By clicking "Register" you agree to our{" "}
                      <Link to="/terms-cond">
                        <span className="term-priv-reg">
                          Terms {`&`} Conditions
                        </span>
                      </Link>{" "}
                      as well as our{" "}
                      <Link to="/priv-pol">
                        <span className="term-priv-reg">Privacy Policy</span>
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="col-md-3"></div>
              </div>
              {/* Terms and cond text Ends */}

              {/* Register Button Starts */}
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <button
                    className="btn btn-primary w-100 reg-btn-main"
                    onClick={() => AddRegister()}
                    disabled={
                      !first_name === false &&
                      !last_name === false &&
                      !company_name === false &&
                      !email === false &&
                      !number === false &&
                      !password === false &&
                      !confirmPassword === false &&
                      !termsCheck === false
                        ? false
                        : true
                    }
                  >
                    Register
                  </button>
                </div>
                <div className="col-md-4"></div>
              </div>
              {/* Register Button Ends */}

              {/* Already Apply Starts */}
              <div className="row mt-2">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <p className="recr-text-reg">
                    Already have an account?{" "}
                    <Link to="/">
                      <span className="term-priv-reg">Login here</span>
                    </Link>
                  </p>
                </div>
                <div className="col-md-3"></div>
              </div>
              {/* Already Apply Ends */}
            </div>
            <div className="col-lg-4"></div>
          </div>
          {/* Register Main div Ends */}
        </div>
        {props.auth.loading == false ? <FullPageLoader /> : null}
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  // getCountriesDataReducer: state.getCountriesDataReducer,
});

const mapDispatchToProps = (dispatch) => ({
  // getCountriesData: () => dispatch(getCountriesData()),
  createRegister: (
    first_name,
    last_name,
    company_name,
    email,
    number,
    code,
    password,
    ecoComplaince
  ) =>
    dispatch(
      createRegister(
        first_name,
        last_name,
        company_name,
        email,
        number,
        code,
        password,
        ecoComplaince
      )
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser);

{
  /* reg Heading Startss */
}

{
  /* reg Heading Ends */
}
