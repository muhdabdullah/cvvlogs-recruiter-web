import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import Otp from "./Pages/otp/otp";
import TermsAndCondition from "./Pages/TermsAndConditions/TermsAndCondition";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import Home from "./Pages/Home/Home";
import ContactUs from "./Pages/ContactUs/ContactUs";
import AboutUs from "./Pages/AboutUs/AboutUs";
import CreateAJob from "./Pages/CreateAJob/CreateAJob";
import PostedJobs from "./Pages/PostedJobs/PostedJobs";
import PostedJobsDesc from "./Pages/PostedJobsDesc/PostedJobsDesc";
import YourJobs from "./Pages/YourJobs/YourJobs";
import Applicants from "./Pages/Applicants/Applicants";
import ApplicantsVideoCv from "./Pages/ApplicantsVideoCv/ApplicantsVideoCv";
import ApplicantsProfile from "./Pages/ApplicantsProfile/ApplicantsProfile";
import ReportUserModal from "./Pages/ReportUserModal/ReportUserModal";
import BuyPremiumAlert from "./Pages/BuyPremiumAlert/BuyPremiumAlert";
import CompanyProfile from "./Pages/CompanyProfile/CompanyProfile";
import EditCompanyProfile from "./Pages/EditCompanyProfile/EditCompanyProfile";
import PremiumPackages from "./Pages/PremiumPackages/PremiumPackages";
import Messaging from "./Pages/Messaging/Messaging";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import WhatWeDo from "./Pages/WhatWeDo/WhatWeDo";
import SearchJobs from "./Pages/searchPage";
import SearchResultsLogin from "./Pages/search/searchResult";
import SearchApplicantsProfile from "./Pages/ApplicantsProfile/searchApplicantProfile";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import Feedback from "./Pages/Feedback/Feedback";
import EditJob from "./Pages/CreateAJob/editjob";
import PremiumPackages2 from "./Pages/PremiumPackages/PremiumPackages2";
import firebase from "./helpers/firebase";
import React, { useEffect } from "react";
import Addtofav from "../src/Pages/search/addtofav";
import Zendesk from "react-zendesk";
import TermsLogin from "./Components/TermsLogin";
import Privacy from "./Components/Privacy";
import DeleteOtp from "./Pages/otp/DeleteOtp";
import DisableOtp from "./Pages/otp/DisableOtp";
import { PrivateRoute } from "./Routing/Routing";
import OnPageLoadModal from "./Components/OnPageLoadModal";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import CloseJobs from "./Pages/PostedJobs/CloseJobs";
import axios from "axios";
import Premium from "./Pages/PremiumPackages/Premium";

const setting = {
  color: {
    theme: "#8A2BE2",
  },
  launcher: {
    chatLabel: {
      "en-US": "Need Help",
    },
  },
  contactForm: {
    fields: [
      { id: "description", prefill: { "*": "My pre-filled description" } },
    ],
  },
};
function App() {
  useEffect(() => {
    if (firebase.messaging.isSupported()) {
      const msg = firebase.messaging();
      msg
        .requestPermission()
        .then(() => {
          return msg.getToken();
        })
        .then((data) => {
          localStorage.setItem("dToken", data);
        })
        .catch((e) => {
          console.log("errorrrr", e);
        });
    } else {
      console.log("Not supported");
    }
  });
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_END_POINT}/web/get_ip_info.php`)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem(
            "userCurrentLocation",
            res.data.data.ip_base_country_code
          );
        }
      });
  }, []);

  return (
    <>
      {/* <Zendesk
        defer
        zendeskKey={"673870e5-9d61-4c2a-935c-a64ead66d356"}
        {...setting}
        onLoaded={() => console.log("is loaded")}
      /> */}
      <Router>
        <Switch>
          <Route path="/welcome" exact component={OnPageLoadModal} />
          <Route path="/" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/forgetpassword" exact component={ForgetPassword} />
          <PrivateRoute path="/dashboard" component={Home} />
          <PrivateRoute path="/jobs" exact component={YourJobs} />
          <PrivateRoute path="/whatwedo" exact component={WhatWeDo} />
          <Route path="/otp" exact component={Otp} />
          <PrivateRoute path="/otp-disable" exact component={DisableOtp} />
          <PrivateRoute path="/otp-delete" exact component={DeleteOtp} />
          <PrivateRoute path="/PostedJobs" exact component={PostedJobs} />
          <PrivateRoute path="/CloseJobs" exact component={CloseJobs} />
          <PrivateRoute
            path="/PostedJobsDesc"
            exact
            component={PostedJobsDesc}
          />
          <PrivateRoute
            path="/EditCompanyProfile"
            exact
            component={EditCompanyProfile}
          />
          <PrivateRoute path="/feedback" exact component={Feedback} />

          <PrivateRoute path="/CreateAJob" exact component={CreateAJob} />
          <PrivateRoute path="/EditJob/:id" exact component={CreateAJob} />
          <PrivateRoute
            path="/PremiumPackages"
            exact
            component={PremiumPackages}
          />
          <PrivateRoute path="/Premium" exact component={Premium} />
          <PrivateRoute
            path="/PremiumPackage"
            exact
            component={PremiumPackages2}
          />

          <PrivateRoute
            path="/terms-cond"
            exact
            component={TermsAndCondition}
          />
          <PrivateRoute path="/priv-pol" exact component={PrivacyPolicy} />
          <PrivateRoute path="/messages" exact component={Messaging} />
          <PrivateRoute path="/about-us" exact component={AboutUs} />
          <PrivateRoute path="/contact-us" exact component={ContactUs} />
          <PrivateRoute path="/Applicants" exact component={Applicants} />
          <PrivateRoute
            path="/ApplicantsVideoCv"
            exact
            component={ApplicantsVideoCv}
          />
          <PrivateRoute
            path="/ApplicantsProfile"
            exact
            component={ApplicantsProfile}
          />
          <PrivateRoute path="/SearchJobs" exact component={SearchJobs} />
          <PrivateRoute
            path="/SearchResultsLogin"
            exact
            component={SearchResultsLogin}
          />
          <PrivateRoute
            path="/SearchApplicantsProfile"
            exact
            component={SearchApplicantsProfile}
          />
          <PrivateRoute
            path="/CompanyProfile"
            exact
            component={CompanyProfile}
          />
          <PrivateRoute path="/ResetPassword" exact component={ResetPassword} />
          <PrivateRoute path="/EditJob" exact component={EditJob} />
          <PrivateRoute path="/Addtofav" exact component={Addtofav} />
          <PrivateRoute path="/terms-login" exact component={TermsLogin} />
          <PrivateRoute path="/privacy" exact component={Privacy} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
