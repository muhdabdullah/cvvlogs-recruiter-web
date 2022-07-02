const config = require('../helpers/config.json');
export const getPricing = (userId) => {
    return (dispatch) => {
        /// get request
        fetch(`${process.env.REACT_APP_API_END_POINT}/web/all_packages.php`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',"auth_id":`${userId}` },
            // auth_id:"215E/LqrKva/mvrc",
            // body: JSON.stringify({
            //     "data":{
            //         "company_url": companyUrl,
            //         "email": email,
            //         "password": password
            //     }
            // })
        }).then(res => res.json()).then((response) => {
            const pricing = response.data

            // console.log("kkkkk", response);
            dispatch({
                type: "GET_PRICING",
                pricing: pricing,
                pricingResponse: "got it",
                loading:true,
            });
        }).catch((error) => {
            console.log("error", error);
            dispatch({
                type: "GET_PRICING",
                pricing: {},
                pricingResponse: null,
                loading:true,
            });
            // alert("Please Check Your Internet Connection...")
        })

    }


}

