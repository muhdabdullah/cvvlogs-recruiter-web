const initState = {
    deletejob: {},
    deletejobResponse: null,
    loading:true,

}

const deletejobReducer = (state = initState, action) => {
    if (action.type === 'GET_DELETEJOB') {
        return {
            ...state,
            deletejob: action.deletejob,
            deletejobResponse: action.deletejobResponse,
            loading:action.loading,
        }
    }
    // /// THESE ARE GENERAL APPLICABLE TO ALL API's
    else if (action.type === 'DELETEJOB_RESET') {
        return {
            ...state,

            deletejobResponse: null,
            loading:action.loading,

        }
    }
    else if (action.type === 'DELETEJOB_SUCCESS') {
        return {
            ...state,

            deletejobResponse: action.deletejobResponse,
            loading:action.loading,
        }
    }
    else if (action.type === 'DELETEJOB_FAIL') {
        return {
            ...state,

            deletejobResponse: action.deletejobResponse,
            loading:action.loading,
        }
    }

    return state;
}
export default deletejobReducer;