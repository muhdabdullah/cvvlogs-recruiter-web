export const getEditJobData = (userId, id) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      fetch(
        `${process.env.REACT_APP_API_END_POINT}/web/edit_job_get.php?job_id=${id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json", auth_id: `${userId}` },
        }
      )
        .then((res) => res.json())
        .then((response) => {
          const editjob = response.data;
          resolve(editjob);
          dispatch({
            type: "GET_EDITJOB",
            editjob: editjob,
            editjobResponse: "got it",
            loading: true,
          });
        })
        .catch((error) => {
          reject(error);
          dispatch({
            type: "GET_EDITJOB",
            editjob: {},
            editjobResponse: null,
            loading: true,
          });
        });
    });
  };
};

export const editJob = (userId, id, data) => {
  return (dispatch) => {
    dispatch({
      type: "EDITJOB_RESET",
      loading: false,
    });
    fetch(`${process.env.REACT_APP_API_END_POINT}/web/edit_job_post.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json", auth_id: `${userId}` },
      body: JSON.stringify({
        job_id: Number(id),
        job_title: data.job_title,
        country_id:
          data.country_id !== 0 ? Number(data.country_id) : data.country_id,
        state_id: data.state_id !== 0 ? Number(data.state_id) : data.state_id,
        work_location_city:
          data.work_location_city !== 0
            ? Number(data.work_location_city)
            : data.work_location_city,
        gender: data.gender,
        vacancies:
          data.vacancies !== 0 ? Number(data.vacancies) : data.vacancies,
        job_description: data.job_description,
        skill_by_industry:
          data.skill_by_industry !== 0
            ? Number(data.skill_by_industry)
            : data.skill_by_industry,
        functional_area:
          data.functional_area !== 0
            ? Number(data.functional_area)
            : data.functional_area,
        required_work_level:
          data.required_work_level !== 0
            ? Number(data.required_work_level)
            : data.required_work_level,
        curr_type: data.curr_type,
        salary_type:
          data.salary_type !== 0 ? Number(data.salary_type) : data.salary_type,
        salary_min: data.salary_min,
        salary_max: data.salary_max,
        experience_level:
          data.experience_level !== 0
            ? Number(data.experience_level)
            : data.experience_level,
        skills: data.skills,
        international_recruiting: 0,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: "EDITJOB_SUCCESS",
            editjobResponse: response,
            loading: true,
          });
          // window.location = `/PostedJobsDesc?id=${id}`;
        } else if (response.status != 200) {
          alert(response.message);
          dispatch({
            loading: true,
          });
          return;
        }
      })
      .catch((error) => {
        dispatch({
          type: "EDITJOB_FAIL",
          editjobResponse: "creation failed",
          loading: true,
        });
      });
  };
};
