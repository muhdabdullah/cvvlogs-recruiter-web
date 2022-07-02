const initState = {
    applicantprofile: {},
    applicantprofileResponse: null,
    loading:false

}

const applicantprofileReducer = (state = initState, action) => {
    if (action.type === 'GET_APPLICANTPROFILE') {
        return {
            ...state,
            applicantprofile: action.applicantprofile,
            applicantprofileResponse: action.applicantprofileResponse,
            loading:action.loading,
        }
    }
    // /// THESE ARE GENERAL APPLICABLE TO ALL API's
    else if (action.type === 'APPLICANTPROFILE_RESET') {
        return {
            ...state,

            applicantprofileResponse: null,
            loading:action.loading,

        }
    }
    else if (action.type === 'APPLICANTPROFILE_SUCCESS') {
        return {
            ...state,

            applicantprofileResponse: action.applicantprofileResponse,
            loading:action.loading,
        }
    }
    else if (action.type === 'APPLICANTPROFILE_FAIL') {
        return {
            ...state,

            applicantprofileResponse: action.applicantprofileResponse,
            loading:action.loading,
        }
    }

    return state;
}
export default applicantprofileReducer;