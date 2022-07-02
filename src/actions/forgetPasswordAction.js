const config = require('../helpers/config.json');

export const createForgetPassword = (email) => {
    return (dispatch) => {
        dispatch({
            type: "FORGETPASSWORD_RESET",
            loading:true
        });
        // var data = [
        //     {
        //         "email": email,
        //     }
        // ];
        // console.log(data)
        /// post request
        fetch(`${process.env.REACT_APP_API_END_POINT}/web/forget_password.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": email,
            })
        }).then(res => res.json()).then((response) => {
            console.log("res", response);
            if(response.status == 200){
                dispatch({
                    type: "FORGETPASSWORD_SUCCESS",
                    forgetPasswordResponse: response,
                    loading:false
                });
                alert("Email sent successfully")
                window.location = "/"
            }
            if(response.status != 200){
                dispatch({
                    type: "FORGETPASSWORD_FAIL",
                    forgetPasswordResponse: "creation failed",
                    loading:false
                });
                alert("Email not Found")
                window.location = "/"
            }
        }).catch((error) => {
            console.log(error)
            dispatch({
                type: "FORGETPASSWORD_FAIL",
                forgetPasswordResponse: "creation failed",
                loading:false
            });
            // alert("Please Check Your Internet Connection...")
        })
    }
}

