const initState = {
    homeVideo: {},
    homeVideoResponse: null,
}

const homeVideorReducer = (state = initState, action) => {
    if (action.type === 'GET_HOMEVIDEO') {
        return {
            ...state,
            homeVideo: action.homeVideo,
            homeVideoResponse:action.homeVideoResponse
        }
    }
    // /// THESE ARE GENERAL APPLICABLE TO ALL API's
    else if (action.type === 'HOMEVIDEO_RESET') {
        return {
            ...state,
            
            homeVideoResponse: null,
            
        }
    }
    else if (action.type === 'HOMEVIDEO_SUCCESS') {
        return {
            ...state,
            
            homeVideoResponse: action.homeVideoResponse,
        }
    }
    else if (action.type === 'HOMEVIDEO_FAIL') {
        return {
            ...state,
            
            homeVideoResponse: action.homeVideoResponse,
        }
    }

    return state;
}
export default homeVideorReducer;