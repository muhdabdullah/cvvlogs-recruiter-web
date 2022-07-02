const initState = {
    editcompany: {},
    editcompanyResponse: null,
    loading:false,

}

const editcompanyReducer = (state = initState, action) => {
    
    if (action.type === 'GET_EDITCOMPANY') {
        return {
            ...state,
            editcompany: action.editcompany,
            editcompanyResponse: action.editcompanyResponse,
            loading:action.loading,
        }
    }
    // /// THESE ARE GENERAL APPLICABLE TO ALL API's
    else if (action.type === 'EDITCOMPANY_RESET') {
        return {
            ...state,
            editcompanyResponse: null,
            loading:action.loading,

        }
    }
    else if (action.type === 'EDITCOMPANY_SUCCESS') {
        return {
            ...state,
            editcompanyResponse: action.editcompanyResponse,
            loading:action.loading,
        }
    }
    else if (action.type === 'EDITCOMPANY_FAIL') {
        return {
            ...state,
            editcompanyResponse: action.editcompanyResponse,
            loading:action.loading,
        }
    }

    return state;
}
export default editcompanyReducer;