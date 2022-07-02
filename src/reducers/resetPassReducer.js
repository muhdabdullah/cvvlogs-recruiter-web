const initState = {
    reset: {},
    resetResponse: null,
}

const resetReducer = (state = initState, action) => {
    if (action.type === 'GET_RESET') {
        return {
            ...state,
            reset: action.reset,
            // searchData: action.searchData,
            resetResponse: action.resetResponse
        }
    }
    // /// THESE ARE GENERAL APPLICABLE TO ALL API's
    else if (action.type === 'RESET_RESET') {
        return {
            ...state,
            resetResponse: null,

        }
    }
    else if (action.type === 'RESET_SUCCESS') {
        return {
            ...state,
            resetResponse: action.resetResponse,
        }
    }
    else if (action.type === 'RESETL_FAIL') {
        return {
            ...state,
            resetResponse: action.resetResponse,
        }
    }

    return state;
}
export default resetReducer;