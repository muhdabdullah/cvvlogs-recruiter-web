const initState = {
    companyinfo: {},
    companyinfoResponse: null,
    loading:false

}

const companyinfoReducer = (state = initState, action) => {
    if (action.type === 'GET_COMPANYINFO') {
        return {
            ...state,
            companyinfo: action.companyinfo,
            companyinfoResponse: action.companyinfoResponse,
            loading:action.loading,
        }
    }
    // /// THESE ARE GENERAL APPLICABLE TO ALL API's
    else if (action.type === 'COMPANYINFO_RESET') {
        return {
            ...state,

            companyinfoResponse: null,
            loading:action.loading,

        }
    }
    else if (action.type === 'COMPANYINFO_SUCCESS') {
        return {
            ...state,

            companyinfoResponse: action.companyinfoResponse,
            loading:action.loading,
        }
    }
    else if (action.type === 'COMPANYINFO_FAIL') {
        return {
            ...state,

            companyinfoResponse: action.companyinfoResponse,
            loading:action.loading,
        }
    }

    return state;
}
export default companyinfoReducer;