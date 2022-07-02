import { signOut } from "./authAction";
const config = require("../helpers/config.json");
export const DisableOtpAction = (userId, code) => {
  return (dispatch) => {
    dispatch({
      type: "OTP_RESET",
      loading: true,
    });

    /// post request
    fetch(`${process.env.REACT_APP_API_END_POINT}/web/confirm_disable.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json", auth_id: `${userId}` },
      body: JSON.stringify({
        code: code,
      }),
    })
      .then((r) => {
        return r.json();
      })
      .then((response) => {
        if (response.status == 200) {
          dispatch({
            type: "OTP_SUCCESS",
            otpResponse: response,
            pushed: response.status,
            loading: false,
          });
          alert(response.message);
          signOut();
        } else {
          alert(response.message);
        }
      })
      .catch((error) => {
        dispatch({
          type: "OTP_FAIL",
          otpResponse: "creation failed",
          pushed: true,
          loading: false,
        });
        alert("Please Check Your Internet Connection...");
      });
  };
};
