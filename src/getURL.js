

import React, { Component } from 'react';

import { LinkedIn } from 'react-linkedin-login-oauth2';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png'
import Linked from "../src/Assests/linked-in-register.svg";

class LinkedInPage extends Component {
  state = {
    code: '',
    errorMessage: '',
  };


  handleSuccess = (data) => {
    this.setState({
      code: data.code,
      errorMessage: '',
    });
  }

  handleFailure = (error) => {
    this.setState({
      code: '',
      errorMessage: error.errorMessage,
    });
  }
  render() {
    const { code, errorMessage } = this.state;
    return (
      <div>
        <LinkedIn
          redirectUri={`${window.location.origin}/linkedin`}
          clientId="77ul9euvdop3a4"
          scope={["r_liteprofile", "r_emailaddress"]}
          state="34232423"
          onFailure={this.handleFailure}
          onSuccess={this.handleSuccess}
          supportIE
          redirectPath='/linkedin'
          text=""
        >
          <img src={Linked} alt="Log in with Linked In" style={{ maxWidth: '180px' }} />
        </LinkedIn>
        {!code && ""}
        {code && <div>Code: {code}</div>}
        {errorMessage && <div>{errorMessage}</div>}
      </div>
    );
  }
}

export default LinkedInPage;


// import React from "react";
// import LinkedIn from "linkedin-login-for-react";
// import "./Components/Register/Register.css"
// import Linked from "../src/Assests/linked-in-register.svg";


// // export default (clientId, state, scope) => {
// //     const current = encodeURIComponent(window.location.href);
// //     const base =
// //       "https://www.linkedin.com/oauth/v2/authorization?response_type=code&";

// //     const fullScope =
// //       scope && scope.length
// //         ? `&scope=${encodeURIComponent(scope.join(" "))}`
// //         : "";

// //     return `${base}client_id=${clientId}&redirect_uri=${current}&state=${state}${fullScope}`;
// //   };





// // import React, { Component } from "react";
// // import getURL from "./getURL";
// // import PropTypes from "prop-types";
// // import React from "react";
// // import Webcam2 from "./Components/WebCam/Webcam2";
// // import Routing from "./Routing/Routing";
// // import DisabledButton from "./Components/DisabledButton";
// // import PersonalDetails from "./Pages/PersonalDetails/PersonalDetails";
// // import KeySkills from "./Pages/KeySkills/KeySkills";
// // import React, { useEffect } from "react"
// // import LinkedIn from "linkedin-login-for-react";
// // import styles from "./styles.css";
// // function App() {
// //   return (
// //     <div>
// //       <Routing />

// //     </div>
// //   );
// // }

// // export default App;



// {/* <Routing/> */ }
// {/* <Dashboard/> */ }
// {/* <KeySkills/> */ }
// {/* <ProfessionalDetails/> */ }
// {/* <Headlines/> */ }
// {/* <QualifcicationDetails/> */ }
// {/* <PersonalDetails/>  */ }
// {/* <GetPremium/> */ }
// {/* <JobAlert/> */ }
// {/* <SearchJobs/> */ }
// {/* <CompanyProfile/> */ }
// {/* <JobsDetail/> */ }
// {/* <UploadCv/> */ }
// {/* <AppliedSuccess/> */ }
// {/* <DashboardProfileCard/> */ }



// // import styles from "./styles.css";

// class LoginWithLinkedin extends React.Component {
//   static propTypes = {};

//   /*
//     ** @code = authorization code from linkedin api
//     ** @redirectUri = redirect uri from linkedin api
//     ** @error = error message sign in failed
//     */
//   callbackLinkedIn = (error, code, redirectUri) => {
//     if (error) {
//       // signin failed
//     } else {
//       // Obtain authorization token from linkedin api
//       // see https://developer.linkedin.com/docs/oauth2 for more info

//     //   redirectUri="http://18.118.144.77/cv-tube/auth.php"
//     }
//   };

//   render() {
//     return (

//       // <LinkedIn
//       //   clientId="77ul9euvdop3a4"
//       //   callback={this.callbackLinkedIn}
//       //   className="m-0 p-0 icon-reg-btn"
//       //   scope={["r_liteprofile","r_emailaddress"]}
//       //   text={<i class="fas fa-linkedin" aria-hidden="true"></i>}
//       //   />

//       <button
//       clientId="77ul9euvdop3a4"
//       callback={this.callbackLinkedIn}
//       scope={["r_liteprofile","r_emailaddress"]}
//       >ffff</button>
//             // {/* <img src={Linked} alt="" /> */}
//         // {/* </LinkedIn> */}
//     );
//   }
// }

// export default LoginWithLinkedin;






// class LinkedIn extends Component {
//   componentDidMount() {
//     this.restart();
//   }

//   restart = () => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const redirectUri = localStorage.linkedInReactRedirectUri;
//     const previousState = localStorage.linkedInReactState;

//     localStorage.linkedInReactState = "";
//     localStorage.linkedInReactRedirectUri = "";

//     const newState = urlParams.get("state");
//     const code = urlParams.get("code");
//     const error = urlParams.get("error");

//     let newURL = window.location.pathname;
//     urlParams.delete("state");
//     urlParams.delete("error");
//     urlParams.delete("error_description");
//     urlParams.delete("code");
//     if (urlParams.toString()) {
//       newURL = newURL + "?" + urlParams.toString();
//     }

//     window.history.replaceState(null, null, newURL);

//     if (error) {
//       this.props.callback(error, null, null);
//     } else if (redirectUri && code && previousState === newState) {
//       this.props.callback(null, code, redirectUri);
//     }
//   };

//   start = () => {
//     const { clientId, scope } = this.props;
//     const state = Math.random()
//       .toString(36)
//       .substring(7);
//     localStorage.linkedInReactState = state;
//     localStorage.linkedInReactRedirectUri = window.location.href;
//     window.location.href = getURL(clientId, state, scope); // build url out of clientid, scope and state
//   };

//   render() {
//     return (
//       <button className={this.props.className} onClick={this.start}>
//        Linked In Login
//       </button>
//     );
//   }
// }

// LinkedIn.propTypes = {
//   clientId: PropTypes.string,
//   callback: PropTypes.func.isRequired,
//   className: PropTypes.string,
//   // text: PropTypes.node,
//   scope: PropTypes.arrayOf(PropTypes.string)
// };

// export default LinkedIn;