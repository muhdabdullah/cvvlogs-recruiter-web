const config = require("../helpers/config.json");
export const getAllJobs = (userId) => {
  return (dispatch) => {
    /// get request
    fetch(`${process.env.REACT_APP_API_END_POINT}/web/posted_jobs.php`, {
      method: "GET",
      headers: { "Content-Type": "application/json", auth_id: `${userId}` },
      // body: JSON.stringify({
      //     "data":{
      //         "company_url": companyUrl,
      //         "email": email,
      //         "password": password
      //     }
      // })
    })
      .then((res) => res.json())
      .then((response) => {
        const alljobs = response.data;
        console.log(alljobs);

        // console.log("kkkkk", response);
        dispatch({
          type: "GET_ALLJOBS",
          alljobs: alljobs,
          alljobsResponse: "got it",
          loading: true,
        });
      })
      .catch((error) => {
        console.log("error", error);
        dispatch({
          type: "GET_ALLJOBS",
          alljobs: {},
          alljobsResponse: null,
          loading: true,
        });
        // alert("Please Check Your Internet Connection...")
      });
  };
};

export const getClosedJobs = (userId) => {
  return (dispatch) => {
    /// get request
    fetch(`${process.env.REACT_APP_API_END_POINT}/web/get_closed_jobs.php`, {
      method: "GET",
      headers: { "Content-Type": "application/json", auth_id: `${userId}` },
    })
      .then((res) => res.json())
      .then((response) => {
        const alljobs = response.data;
        dispatch({
          type: "GET_ALLJOBS",
          alljobs: alljobs,
          alljobsResponse: "got it",
          loading: true,
        });
      })
      .catch((error) => {
        console.log("error", error);
        dispatch({
          type: "GET_ALLJOBS",
          alljobs: {},
          alljobsResponse: null,
          loading: true,
        });
      });
  };
};
