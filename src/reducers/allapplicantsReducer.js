const initState = {
    allapplicants: {},
    allapplicantsResponse: null,
    loading:false

}

const allapplicantsReducer = (state = initState, action) => {
    if (action.type === 'GET_ALLAPPLICANTS') {
        return {
            ...state,
            allapplicants: action.allapplicants,
            allapplicantsResponse: action.allapplicantsResponse,
            loading:action.loading,
        }
    }
    // /// THESE ARE GENERAL APPLICABLE TO ALL API's
    else if (action.type === 'ALLAPPLICANTS_RESET') {
        return {
            ...state,

            allapplicantsResponse: null,
            loading:action.loading,

        }
    }
    else if (action.type === 'ALLAPPLICANTS_SUCCESS') {
        return {
            ...state,

            allapplicantsResponse: action.allapplicantsResponse,
            loading:action.loading,
        }
    }
    else if (action.type === 'ALLAPPLICANTS_FAIL') {
        return {
            ...state,

            allapplicantsResponse: action.allapplicantsResponse,
            loading:action.loading,
        }
    }

    return state;
}
export default allapplicantsReducer;