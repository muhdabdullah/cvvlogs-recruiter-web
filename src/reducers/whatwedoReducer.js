const initState = {
    whatwedo: {},
    whatwedoResponse: null,
    loading:false,

}

const whatwedoReducer = (state = initState, action) => {
    if (action.type === 'GET_WHATWEDO') {
        return {
            ...state,
            whatwedo: action.whatwedo,
            whatwedoResponse: action.whatwedoResponse,
            loading:action.loading,
        }
    }
    // /// THESE ARE GENERAL APPLICABLE TO ALL API's
    else if (action.type === 'WHATWEDO_RESET') {
        return {
            ...state,

            whatwedoResponse: null,
            loading:action.loading,

        }
    }
    else if (action.type === 'WHATWEDO_SUCCESS') {
        return {
            ...state,

            whatwedoResponse: action.whatwedoResponse,
            loading:action.loading,
        }
    }
    else if (action.type === 'WHATWEDO_FAIL') {
        return {
            ...state,

            whatwedoResponse: action.whatwedoResponse,
            loading:action.loading,
        }
    }

    return state;
}
export default whatwedoReducer;