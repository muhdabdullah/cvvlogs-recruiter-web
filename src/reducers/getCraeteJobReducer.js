const initState = {
    getcreatejob: {},
    getcreatejobResponse: null,
    loading:false,

}

const getCreateJobReducer = (state = initState, action) => {
    if (action.type === 'GET_CREATEJOBS') {
        return {
            ...state,
            getcreatejob: action.getcreatejob,
            getcreatejobResponse: action.getcreatejobResponse,
            loading:action.loading,
        }
    }
    // /// THESE ARE GENERAL APPLICABLE TO ALL API's
    else if (action.type === 'CREATEJOBS_RESET') {
        return {
            ...state,

            getcreatejobResponse: null,
            loading:action.loading,

        }
    }
    else if (action.type === 'CREATEJOBS_SUCCESS') {
        return {
            ...state,

            getcreatejobResponse: action.getcreatejobResponse,
            loading:action.loading,
        }
    }
    else if (action.type === 'CREATEJOBS_FAIL') {
        return {
            ...state,

            getcreatejobResponse: action.getcreatejobResponse,
            loading:action.loading,
        }
    }

    return state;
}
export default getCreateJobReducer;