const config = require("../helpers/config.json");
export const getUserProfile = (userId, id) => {
  return (dispatch) => {
    /// get request
    fetch(
      `${process.env.REACT_APP_API_END_POINT}/web/user_profile.php?user_id=${id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json", auth_id: `${userId}` },
        // body: JSON.stringify({
        //     "data":{
        //         "company_url": companyUrl,
        //         "email": email,
        //         "password": password
        //     }
        // })
      }
    )
      .then((res) => res.json())
      .then((response) => {
        const userprofile = response.data;
        // console.log("kkkkk", response);
        dispatch({
          type: "GET_USERPROFILE",
          userprofile: userprofile,
          userprofileResponse: "got it",
          loading: true,
        });
      })
      .catch((error) => {
        console.log("error", error);
        dispatch({
          type: "GET_USERPROFILE",
          userprofile: {},
          userprofileResponse: null,
          loading: true,
        });
        // alert("Please Check Your Internet Connection...")
      });
  };
};
