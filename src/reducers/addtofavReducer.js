const initState = {
    addtofav: [],
    addtofavResponse: null,
    loading:false,
    loading1:false

}

const addtofavReducer = (state = initState, action) => {
    if (action.type === 'GET_ADDTOFAV') {
        return {
            ...state,
            addtofav: action.addtofav,
            addtofavResponse: action.addtofavResponse,
            loading:action.loading,
            loading1:action.loading1,
        }
    }
    // /// THESE ARE GENERAL APPLICABLE TO ALL API's
    else if (action.type === 'ADDTOFAV_RESET') {
        return {
            ...state,

            addtofavResponse: null,
            loading:action.loading,
            loading1:action.loading1,

        }
    }
    else if (action.type === 'ADDTOFAV_SUCCESS') {
        return {
            ...state,

            addtofavResponse: action.addtofavResponse,
            loading:action.loading,
            loading1:action.loading1,
        }
    }
    else if (action.type === 'ADDTOFAV_FAIL') {
        return {
            ...state,

            addtofavResponse: action.addtofavResponse,
            loading:action.loading,
            loading1:action.loading1,
        }
    }

    return state;
}
export default addtofavReducer;