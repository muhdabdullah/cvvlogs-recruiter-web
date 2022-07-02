const initState = {
    search: {},
    searchResponse: null,
    sData:{},
    loading:false,

}

const getSearchReducer = (state = initState, action) => {
    
    if (action.type === 'GET_SEARCH') {
        return {
            ...state,
            search: action.search,
            searchResponse: action.searchResponse,
            loading:action.loading,
        }
    }
    // /// THESE ARE GENERAL APPLICABLE TO ALL API's
    else if (action.type === 'SEARCH_RESET') {
        return {
            ...state,
            sData:action.sData,
            searchResponse: null,
            loading:action.loading,

        }
    }
    else if (action.type === 'SEARCH_SUCCESS') {
        return {
            ...state,
            sData:action.sData,
            searchResponse: action.searchResponse,
            loading:action.loading,
        }
    }
    else if (action.type === 'SEARCH_FAIL') {
        return {
            ...state,
            sData:{},
            searchResponse: action.searchResponse,
            loading:action.loading,
        }
    }

    return state;
}
export default getSearchReducer;