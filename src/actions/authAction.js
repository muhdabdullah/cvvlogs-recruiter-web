import firebase from ".././helpers/firebase";
// import useFullPageLoader from "../../src/Components/fullpageloader/hooks/useFullPageLoader";

// import  firebase from "firebase/app"
// import "firebase/auth"
// import firebase from '@firebase/app';
// require('firebase/auth');
// import  firebase from "firebase/app"
const config = require(".././helpers/config.json");

// var firebaseConfig = {
//     apiKey: "AIzaSyA7M7RghcvHvFSzsXhpmz73XCzOYzs50rk",
//     authDomain: "cv-tube-web-candidiate.firebaseapp.com",
//     projectId: "cv-tube-web-candidiate",
//     storageBucket: "cv-tube-web-candidiate.appspot.com",
//     messagingSenderId: "3621460259",
//     appId: "1:3621460259:web:8aeafde1da8b8bdc38d496",
//     measurementId: "G-M88881C11Z"
//   };
//   // Initialize Firebase

// firebase.initializeApp(firebaseConfig);

// import Axios from "axios";
//////////////////////////////////////////////////////////////////////////////////////////////
/// README: SECTION 1 => HANDLE THE AUTH
///
export const SignIn = (username, password) => {
  return (dispatch) => {
    dispatch({
      type: "RESET_AUTH_MESSAGE",
      loading: false,
    });
    fetch(`${process.env.REACT_APP_API_END_POINT}/web/login.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        device_token: localStorage.getItem("dToken"),
        username: username,
        password: password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        if (response.data.blocked == 1) {
          alert("Your Account is Disabled");
          dispatch({
            loading: true,
          });
          return;
        } else if (response.data.is_verified == 0 && response.status === 404) {
          alert(response.message);
          window.location = `/otp?auth=${response.data.auth_id}`;
          dispatch({
            loading: true,
          });
          return;
        } else if (
          Object.keys(response.data).length === 0 &&
          response.status != 200
        ) {
          alert(response.message);
          dispatch({
            loading: true,
          });
          return;
        } else if (
          Object.keys(response.data).length > 0 &&
          response.status === 200
        ) {
          const auth_id = response.data.auth_id;
          const empId = response.data.id;
          const premium = response.data.premium;
          const first_name = response.data.company_name.split(" ")[0];
          const eco_complaince = response.data.eco_complaince;
          const isFirstLogin = response.data.first_time_login;
          dispatch({
            type: "SIGN_IN",
            authError: null,
            auth_id,
            employee_id: empId,
            authMessage: "Signing you in...",
            loading: true,
          });
          localStorage.setItem("auth_id1", auth_id);
          localStorage.setItem("name", first_name);
          localStorage.setItem("eco_complaince", eco_complaince);
          localStorage.setItem("isFirstLogin", isFirstLogin);
          window.location = "/dashboard";
        }
      })
      .catch((error) => {
        const authError = JSON.stringify(error);
        console.log(authError);
        dispatch({
          type: "SIGN_IN",
          authError,
          auth_id: null,
          employee_id: null,
          authMessage: null,
          loading: true,
        });
      });
  };
};
export const signOut = (props) => {
  localStorage.removeItem("auth_id1");
  localStorage.removeItem("name");
  localStorage.removeItem("dToken");
  //  props.history.push("/login")
  window.location = "/";
  // window.open("/")
  return {
    type: "SIGN_OUT",
  };
};

// export const resetAuthMessage = () => {
//     return {
//         type: "RESET_AUTH_MESSAGE",
//     };
// };

export const facebookLogin = () => {
  return (dispatch) => {
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
        console.log("ffff", user);
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log("ffff", errorMessage);
      });
  };
};

export const googleLogin = () => {
  return (dispatch) => {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
        var first = user.displayName.split(" ")[0];
        var last = user.displayName.split(" ")[1];
        console.log(
          "ffff",
          user,
          user.l,
          user.displayName,
          user.email,
          first,
          last
        );
        var data = {
          type: 1,
          email: user.email,
          first_name: first,
          last_name: last,
          num: "000000",
          token: user.l,
          device_token: "qwer123rfadf45",
        };
        console.log("gggggggg", data);

        fetch(`${process.env.REACT_APP_API_END_POINT}/user/social_login.php`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: 1,
            email: user.email,
            first_name: first,
            last_name: last,
            num: "000000",
            token: user.l,
            device_token: localStorage.getItem("dToken"),
          }),
        })
          .then((res) => {
            console.log("res aqib", res);
            if (res.status !== 200) {
              alert("Incorrect Email Or Password...");
            }
            return res.json();
          })
          .then((response) => {
            console.log("data", response);
            const auth_id = response.data.auth_id;

            if (auth_id !== "" && auth_id !== null && auth_id !== undefined) {
              window.location = "/dashboard";
            } else {
              alert("email or password is incorrect...");
            }
            localStorage.setItem("auth_id1", auth_id);
            // window.location.reload(false)
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log("ffff", errorMessage);
      });
  };
};
