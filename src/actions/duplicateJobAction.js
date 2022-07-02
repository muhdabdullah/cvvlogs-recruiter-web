export const duplicateJob = (job_id) => {
  fetch(`${process.env.REACT_APP_API_END_POINT}/web/copy_job.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      auth_id: `${localStorage.getItem("auth_id1")}`,
    },
    body: JSON.stringify({
      job_id: job_id,
    }),
  })
    .then((res) => res.json())
    .then((response) => {
      alert(response.message);
      if (response.status == 200) window.location = "/dashboard";
    })
    .catch((error) => {
      console.log("error", error);
    });
};
