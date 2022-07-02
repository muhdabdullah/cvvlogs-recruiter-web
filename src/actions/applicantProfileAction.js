const config = require('../helpers/config.json');
export const getApplicantProfile = (userId,id) => {
    return (dispatch) => {
        /// get request
        fetch(`${process.env.REACT_APP_API_END_POINT}/web/applicant_profile.php?application_id=${id}`, {
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
            const applicantprofile = response.data

            // console.log("kkkkk", response);
            dispatch({
                type: "GET_APPLICANTPROFILE",
                applicantprofile: applicantprofile,
                applicantprofileResponse: "got it",
                loading:true
            });
        }).catch((error) => {
            console.log("error", error);
            dispatch({
                type: "GET_APPLICANTPROFILE",
                applicantprofile: {},
                applicantprofileResponse: null,
                loading:true
            });
            // alert("Please Check Your Internet Connection...")
        })

    }


}

