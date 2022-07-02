const config = require("../helpers/config.json");
export const createStatus = (userId, job_app_id, status) => {
  console.log(userId, job_app_id, status);
  return (dispatch) => {
    dispatch({
      type: "SETSTATUS_RESET",
      loading: true,
    });
    var data = {
      userId: userId,
      job_app_id: job_app_id,
      status: status,
    };

    console.log("wwww", data);
    /// post request
    fetch(`${process.env.REACT_APP_API_END_POINT}/web/update_status.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json", auth_id: `${userId}` },
      body: JSON.stringify({
        job_app_id: job_app_id !== null ? Number(job_app_id) : job_app_id,
        status: status !== null ? Number(status) : status,
      }),
    })
      .then((res) => {
        console.log("res aqib", res);
        // if (res.status !== 200) {
        //     alert("EMAIL OR NUMBER ALREADY REGISTERED");
        // }
        return res.json();
      })
      .then((response) => {
        console.log("pppppp", response);
        dispatch({
          type: "SETSTATUS_SUCCESS",
          setstatusResponse: response,
          pushed: response.status,
          loading: false,
        });
        if (response.status == 404) {
          alert(response.message);
        }
        if (response.status == 200) {
          window.location.reload(false);
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: "SETSTATUS_FAIL",
          setstatusResponse: "creation failed",
          pushed: true,
          loading: false,
          //pageName: PGN.COLORS_PAGE_NAME
        });
        alert("Please Check Your Internet Connection...");
      });
  };
};

export const createprogress = (userId, job_app_id, status) => {
  console.log(userId, job_app_id, status);
  return (dispatch) => {
    dispatch({
      type: "SETSTATUS_RESET",
      loading: true,
    });
    var data = {
      userId: userId,
      job_app_id: job_app_id,
      status: status,
    };

    console.log("wwww", data);
    /// post request
    fetch(`${process.env.REACT_APP_API_END_POINT}/web/update_status.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json", auth_id: `${userId}` },
      body: JSON.stringify({
        job_app_id: job_app_id !== null ? Number(job_app_id) : job_app_id,
        status: status !== null ? Number(status) : status,
      }),
    })
      .then((res) => {
        console.log("res aqib", res);
        // if (res.status !== 200) {
        //     alert("EMAIL OR NUMBER ALREADY REGISTERED");
        // }
        return res.json();
      })
      .then((response) => {
        console.log("pppppp", response);
        dispatch({
          type: "SETSTATUS_SUCCESS",
          setstatusResponse: response,
          pushed: response.status,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: "SETSTATUS_FAIL",
          setstatusResponse: "creation failed",
          pushed: true,
          loading: false,
          //pageName: PGN.COLORS_PAGE_NAME
        });
        alert("Please Check Your Internet Connection...");
      });
  };
};
