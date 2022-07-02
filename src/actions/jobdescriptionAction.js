const config = require("../helpers/config.json");
export const getJobDescription = (userId, id) => {
  return (dispatch) => {
    /// get request
    fetch(
      `${process.env.REACT_APP_API_END_POINT}/web/single_job.php?job_id=${id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json", auth_id: `${userId}` },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        const jobdescription = response.data;
        dispatch({
          type: "GET_JOBDESCRIPTION",
          jobdescription: jobdescription,
          jobdescriptionResponse: "got it",
          loading: true,
        });
      })
      .catch((error) => {
        console.log("error", error);
        dispatch({
          type: "GET_JOBDESCRIPTION",
          jobdescription: {},
          jobdescriptionResponse: null,
          loading: true,
        });
        // alert("Please Check Your Internet Connection...")
      });
  };
};
