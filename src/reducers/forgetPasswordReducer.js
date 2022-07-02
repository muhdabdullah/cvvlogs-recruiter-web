const initState = {
    forgetPassword: {},
    forgetPasswordResponse: null,
    loading:false

}

const forgetPasswordReducer = (state = initState, action) => {
    if (action.type === 'GET_FORGETPASSWORD') {
        return {
            ...state,
            forgetPassword: action.forgetPassword,
            forgetPasswordResponse: action.forgetPasswordResponse,
            loading:action.loading,
        }
    }
    // /// THESE ARE GENERAL APPLICABLE TO ALL API's
    else if (action.type === 'FORGETPASSWORD_RESET') {
        return {
            ...state,
            forgetPasswordResponse: null,
            loading:action.loading,

        }
    }
    else if (action.type === 'FORGETPASSWORD_SUCCESS') {
        return {
            ...state,
            forgetPasswordResponse: action.forgetPasswordResponse,
            loading:action.loading,
        }
    }
    else if (action.type === 'FORGETPASSWORD_FAIL') {
        return {
            ...state,
            forgetPasswordResponse: action.forgetPasswordResponse,
            loading:action.loading,
        }
    }

    return state;
}
export default forgetPasswordReducer;