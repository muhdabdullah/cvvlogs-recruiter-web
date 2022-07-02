const initState = {
    singleapplicant: {},
    singleapplicantResponse: null,
    loading:false

}

const singleapplicantReducer = (state = initState, action) => {
    if (action.type === 'GET_SINGLEAPPLICANT') {
        return {
            ...state,
            singleapplicant: action.singleapplicant,
            singleapplicantResponse: action.singleapplicantResponse,
            loading:action.loading,
        }
    }
    // /// THESE ARE GENERAL APPLICABLE TO ALL API's
    else if (action.type === 'SINGLEAPPLICANT_RESET') {
        return {
            ...state,

            singleapplicantResponse: null,
            loading:action.loading,

        }
    }
    else if (action.type === 'SINGLEAPPLICANT_SUCCESS') {
        return {
            ...state,

            singleapplicantResponse: action.singleapplicantResponse,
            loading:action.loading,
        }
    }
    else if (action.type === 'SINGLEAPPLICANT_FAIL') {
        return {
            ...state,

            singleapplicantResponse: action.singleapplicantResponse,
            loading:action.loading,
        }
    }

    return state;
}
export default singleapplicantReducer;