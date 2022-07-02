export const createOtp = (userId, code) => {
  console.log(userId, code);
  return (dispatch) => {
    dispatch({
      type: "OTP_RESET",
      loading: true,
    });

    /// post request
    fetch(`${process.env.REACT_APP_API_END_POINT}/web/otp_suc.php`, {
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
        dispatch({
          type: "OTP_SUCCESS",
          otpResponse: response,
          pushed: response.status,
          loading: false,
        });
        if (response.status == 404) {
          alert("Invalid Token...");
        }
        if (response.status == 200) {
          window.location = "/EditCompanyProfile";
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: "OTP_FAIL",
          otpResponse: "creation failed",
          pushed: true,
          loading: false,
          //pageName: PGN.COLORS_PAGE_NAME
        });
        alert("Please Check Your Internet Connection...");
      });
  };
};
