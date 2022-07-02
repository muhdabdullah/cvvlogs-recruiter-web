const initState = {
    jobdescription: {},
    jobdescriptionResponse: null,
    loading:false

}

const jobdescriptionReducer = (state = initState, action) => {
    if (action.type === 'GET_JOBDESCRIPTION') {
        return {
            ...state,
            jobdescription: action.jobdescription,
            jobdescriptionResponse: action.jobdescriptionResponse,
            loading:action.loading,
        }
    }
    // /// THESE ARE GENERAL APPLICABLE TO ALL API's
    else if (action.type === 'JOBDESCRIPTION_RESET') {
        return {
            ...state,

            jobdescriptionResponse: null,
            loading:action.loading,

        }
    }
    else if (action.type === 'JOBDESCRIPTION_SUCCESS') {
        return {
            ...state,

            jobdescriptionResponse: action.jobdescriptionResponse,
            loading:action.loading,
        }
    }
    else if (action.type === 'JOBDESCRIPTION_FAIL') {
        return {
            ...state,

            jobdescriptionResponse: action.jobdescriptionResponse,
            loading:action.loading,
        }
    }

    return state;
}
export default jobdescriptionReducer;