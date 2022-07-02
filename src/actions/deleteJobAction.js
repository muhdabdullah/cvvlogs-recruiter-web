const config = require('../helpers/config.json');
export const getDeleteJob = (userId,id) => {
    return (dispatch) => {
        /// get request
        fetch(`${process.env.REACT_APP_API_END_POINT}/web/delete_job.php?job_id=${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',"auth_id":`${userId}` },
            // body: JSON.stringify({
            //     "data":{
            //         "company_url": companyUrl,
            //         "email": email,
            //         "password": password
            //     }
            // })
        }).then(res => res.json()).then((response) => {
            const deletejob = response.data

            console.log("kkkkk", response);
            dispatch({
                type: "GET_DELETEJOB",
                deletejob: deletejob,
                deletejobResponse: "got it",
                loading:false,
            });
            window.location.reload(false)
        }).catch((error) => {
            console.log("error", error);
            dispatch({
                type: "GET_DELETEJOB",
                deletejob: {},
                deletejobResponse: null,
                loading:false,
            });
            // alert("Please Check Your Internet Connection...")
        })

    }


}

