const initState = {
    userprofile: {},
    userprofileResponse: null,
    loading:false,

}

const userprofileReducer = (state = initState, action) => {
    if (action.type === 'GET_USERPROFILE') {
        return {
            ...state,
            userprofile: action.userprofile,
            userprofileResponse: action.userprofileResponse,
            loading:action.loading,
        }
    }
    // /// THESE ARE GENERAL APPLICABLE TO ALL API's
    else if (action.type === 'USERPROFILE_RESET') {
        return {
            ...state,

            userprofileResponse: null,
            loading:action.loading,

        }
    }
    else if (action.type === 'USERPROFILE_SUCCESS') {
        return {
            ...state,

            userprofileResponse: action.userprofileResponse,
            loading:action.loading,
        }
    }
    else if (action.type === 'USERPROFILE_FAIL') {
        return {
            ...state,

            userprofileResponse: action.userprofileResponse,
            loading:action.loading,
        }
    }

    return state;
}
export default userprofileReducer;