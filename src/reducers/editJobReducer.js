const initState = {
    editjob: {},
    editjobResponse: null,
    loading:false

}

const editjobReducer = (state = initState, action) => {
    if (action.type === 'GET_EDITJOB') {
        return {
            ...state,
            editjob: action.editjob,
            editjobResponse: action.editjobResponse,
            loading:action.loading,
        }
    }
    // /// THESE ARE GENERAL APPLICABLE TO ALL API's
    else if (action.type === 'EDITJOB_RESET') {
        return {
            ...state,

            editjobResponse: null,
            loading:action.loading,

        }
    }
    else if (action.type === 'EDITJOB_SUCCESS') {
        return {
            ...state,

            editjobResponse: action.editjobResponse,
            loading:action.loading,
        }
    }
    else if (action.type === 'EDITJOB_FAIL') {
        return {
            ...state,

            editjobResponse: action.editjobResponse,
            loading:action.loading,
        }
    }

    return state;
}
export default editjobReducer;