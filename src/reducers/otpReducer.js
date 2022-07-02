const initState = {
    otp: {},
    otpResponse: null,
    pushed:null,
    loading:false,

}

const otpReducer = (state = initState, action) => {
    if (action.type === 'GET_OTP') {
        return {
            ...state,
            otp: action.otp,
            otpResponse: action.otpResponse,
            loading:action.loading
        }
    }
    // /// THESE ARE GENERAL APPLICABLE TO ALL API's
    else if (action.type === 'OTP_RESET') {
        return {
            ...state,
            pushed:action.pushed,
            otpResponse: null,
            loading:action.loading

        }
    }
    else if (action.type === 'OTP_SUCCESS') {
        return {
            ...state,
            pushed:action.pushed,
            otpResponse: action.otpResponse,
            loading:action.loading
        }
    }
    else if (action.type === 'OTP_FAIL') {
        return {
            ...state,
            pushed:action.pushed,
            otpResponse: action.otpResponse,
            loading:action.loading
        }
    }

    return state;
}
export default otpReducer;