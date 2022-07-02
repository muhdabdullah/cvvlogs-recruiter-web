const config = require("../helpers/config.json");
export const createContact = (userId, name, email, message) => {
  console.log(userId, name, email, message);
  return (dispatch) => {
    dispatch({
      type: "CONTACTUS_RESET",
      loading: true,
    });
    var data = {
      userId: userId,
      name: name,
      email: email,
      message: message,
    };

    console.log("wwww", data);
    /// post request
    fetch(`${process.env.REACT_APP_API_END_POINT}/web/contact_us.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json", auth_id: `${userId}` },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message,
      }),
    })
      .then((response) => {
        console.log("pppppp", response);
        dispatch({
          type: "CONTACTUS_SUCCESS",
          contactusResponse: response,
          loading: false,
        });
        if (response.status == 404) {
          alert("User Not Logged In...");
        }
        if (response.status == 200) {
          window.location = "/dashboard";
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: "CONTACTUS_FAIL",
          contactusResponse: "creation failed",
          loading: false,
          //pageName: PGN.COLORS_PAGE_NAME
        });
        alert("Please Check Your Internet Connection...");
      });
  };
};
