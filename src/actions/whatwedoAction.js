const config = require('../helpers/config.json');
export const getWhatWeDo = (userId) => {
    return (dispatch) => {
        /// get request
        fetch(`${process.env.REACT_APP_API_END_POINT}/web/a_vid.php`, {
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
            const whatwedo = response.data

            // console.log("kkkkk", response);
            dispatch({
                type: "GET_WHATWEDO",
                whatwedo: whatwedo,
                whatwedoResponse: "got it",
                loading:true,
            });
        }).catch((error) => {
            console.log("error", error);
            dispatch({
                type: "GET_WHATWEDO",
                whatwedo: {},
                whatwedoResponse: null,
                loading:true,
            });
            // alert("Please Check Your Internet Connection...")
        })

    }


}

