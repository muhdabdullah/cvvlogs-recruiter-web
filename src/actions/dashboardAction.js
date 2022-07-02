const config = require('../helpers/config.json');
export const getDashboard = (userId) => {
    return (dispatch) => {
        /// get request
        fetch(`${process.env.REACT_APP_API_END_POINT}/web/recruiter_dashboard.php`, {
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
            const dashboard = response.data
            console.log(response)

            // console.log("kkkkk", response);
            dispatch({
                type: "GET_DASHBOARD",
                dashboard: dashboard,
                dashboardResponse: "got it",
                loading:true,
            });
        }).catch((error) => {
            console.log("error", error);
            dispatch({
                type: "GET_PERSONAL",
                dashboard: {},
                dashboardResponse: null,
                loading:true,
            });
            // alert("Please Check Your Internet Connection...")
        })

    }


}

