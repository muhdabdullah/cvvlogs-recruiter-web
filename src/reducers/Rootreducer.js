import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import authReducer from "./authReducer";
import registerReducer from "./registerReducer";
import otpReducer from "./otpReducer";
import dashboardReducer from "./dashboardReducer";
import getCreateJobReducer from "./getCraeteJobReducer";
import alljobsReducer from "./alljobsReducer";
import jobdescriptionReducer from "./jobdescriptionReducer";
import allapplicantsReducer from "./allapplicantsReducer";
import singleapplicantReducer from "./singleApplicantReducer";
import applicantprofileReducer from "./applicantProfileReducer";
import deletejobReducer from "./deleteJobReducer";
import setstatusReducer from "./setStatusReducer";
import getSearchReducer from "./getsearchReducer";
import companyinfoReducer from "./companyinfoReducer";
import userprofileReducer from "./userprofileReducer";
import editcompanyReducer from "./editcompanygetReducer";
import forgetPasswordReducer from "./forgetPasswordReducer";
import resetReducer from "./resetPassReducer";
import pricingReducer from "./pricingReducer";
import editjobReducer from "./editJobReducer";
import contactusReducer from "./contactusReducer";
import whatwedoReducer from "./whatwedoReducer";
import addtofavReducer from "./addtofavReducer";
import getCountriesDataReducer from "./getCountriesDataReducer";
import feedbackModalReducer from "./feedbackModalReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};
const mainReducer = combineReducers({
  auth: authReducer,
  registerReducer: registerReducer,
  otpReducer: otpReducer,
  dashboardReducer: dashboardReducer,
  getCreateJobReducer: getCreateJobReducer,
  alljobsReducer: alljobsReducer,
  jobdescriptionReducer: jobdescriptionReducer,
  allapplicantsReducer: allapplicantsReducer,
  singleapplicantReducer: singleapplicantReducer,
  applicantprofileReducer: applicantprofileReducer,
  deletejobReducer: deletejobReducer,
  setstatusReducer: setstatusReducer,
  getSearchReducer: getSearchReducer,
  companyinfoReducer: companyinfoReducer,
  userprofileReducer: userprofileReducer,
  editcompanyReducer: editcompanyReducer,
  forgetPasswordReducer: forgetPasswordReducer,
  resetReducer: resetReducer,
  pricingReducer: pricingReducer,
  editjobReducer: editjobReducer,
  contactusReducer: contactusReducer,
  whatwedoReducer: whatwedoReducer,
  addtofavReducer: addtofavReducer,
  getCountriesDataReducer: getCountriesDataReducer,
  feedbackModalReducer: feedbackModalReducer,
});

export default persistReducer(persistConfig, mainReducer);
