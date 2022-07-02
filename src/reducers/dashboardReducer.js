const initState = {
    dashboard: {},
    dashboardResponse: null,
    loading:false,

}

const dashboardReducer = (state = initState, action) => {
    if (action.type === 'GET_DASHBOARD') {
        return {
            ...state,
            dashboard: action.dashboard,
            dashboardResponse: action.dashboardResponse,
            loading:action.loading,
        }
    }
    // /// THESE ARE GENERAL APPLICABLE TO ALL API's
    else if (action.type === 'DASHBOARD_RESET') {
        return {
            ...state,

            dashboardResponse: null,
            loading:action.loading,

        }
    }
    else if (action.type === 'DASHBOARD_SUCCESS') {
        return {
            ...state,

            dashboardResponse: action.dashboardResponse,
            loading:action.loading,
        }
    }
    else if (action.type === 'DASHBOARD_FAIL') {
        return {
            ...state,

            dashboardResponse: action.dashboardResponse,
            loading:action.loading,
        }
    }

    return state;
}
export default dashboardReducer;