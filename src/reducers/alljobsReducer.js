const initState = {
    alljobs: {},
    alljobsResponse: null,
    loading:false

}

const alljobsReducer = (state = initState, action) => {
    if (action.type === 'GET_ALLJOBS') {
        return {
            ...state,
            alljobs: action.alljobs,
            alljobsResponse: action.alljobsResponse,
            loading:action.loading,
        }
    }
    // /// THESE ARE GENERAL APPLICABLE TO ALL API's
    else if (action.type === 'ALLJOBS_RESET') {
        return {
            ...state,

            alljobsResponse: null,
            loading:action.loading,

        }
    }
    else if (action.type === 'ALLJOBS_SUCCESS') {
        return {
            ...state,

            alljobsResponse: action.alljobsResponse,
            loading:action.loading,
        }
    }
    else if (action.type === 'ALLJOBS_FAIL') {
        return {
            ...state,

            alljobsResponse: action.alljobsResponse,
            loading:action.loading,
        }
    }

    return state;
}
export default alljobsReducer;