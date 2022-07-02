const initState = {
    setstatus: {},
    setstatusResponse: null,
    pushed:null,
    loading:false,

}

const setstatusReducer = (state = initState, action) => {
    if (action.type === 'GET_SETSTATUS') {
        return {
            ...state,
            setstatus: action.setstatus,
            setstatusResponse: action.setstatusResponse,
            loading:action.loading
        }
    }
    // /// THESE ARE GENERAL APPLICABLE TO ALL API's
    else if (action.type === 'SETSTATUS_RESET') {
        return {
            ...state,
            pushed:action.pushed,
            setstatusResponse: null,
            loading:action.loading

        }
    }
    else if (action.type === 'SETSTATUS_SUCCESS') {
        return {
            ...state,
            pushed:action.pushed,
            setstatusResponse: action.setstatusResponse,
            loading:action.loading
        }
    }
    else if (action.type === 'SETSTATUS_FAIL') {
        return {
            ...state,
            pushed:action.pushed,
            setstatusResponse: action.setstatusResponse,
            loading:action.loading
        }
    }

    return state;
}
export default setstatusReducer;