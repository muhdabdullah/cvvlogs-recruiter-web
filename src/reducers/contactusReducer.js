const initState = {
    contactus: {},
    contactusResponse: null,
    loading:false

}

const contactusReducer = (state = initState, action) => {
    if (action.type === 'GET_CONTACTUS') {
        return {
            ...state,
            contactus: action.contactus,
            contactusResponse: action.contactusResponse,
            loading:action.loading,
        }
    }
    // /// THESE ARE GENERAL APPLICABLE TO ALL API's
    else if (action.type === 'CONTACTUS_RESET') {
        return {
            ...state,

            contactusResponse: null,
            loading:action.loading,

        }
    }
    else if (action.type === 'CONTACTUS_SUCCESS') {
        return {
            ...state,

            contactusResponse: action.contactusResponse,
            loading:action.loading,
        }
    }
    else if (action.type === 'CONTACTUS_FAIL') {
        return {
            ...state,

            contactusResponse: action.contactusResponse,
            loading:action.loading,
        }
    }

    return state;
}
export default contactusReducer;