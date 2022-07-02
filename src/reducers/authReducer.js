const initState = {
    auth_id: null,
    authError: null,
    authMessage: null,
    employee_id: null,
    loading:true
}

const authReducer = (state = initState, action) => {
    // console.log(action)
    if (action.type === 'SIGN_IN') {
        return {
            ...state,
            auth_id: action.auth_id,
            authError: action.authError,
            authMessage: action.authMessage,
            employee_id: action.employee_id,
            loading:action.loading,
        }
    }
    else if (action.type === 'SIGN_UP') {
        return {
            ...state,
            auth_id: action.auth_id,
            authError: action.authError,
            authMessage: action.authMessage,
            loading:action.loading,
        }
    }
    else if (action.type === 'SIGN_OUT') {
        return {
            ...state,
            auth_id: null,
            authError: null,
            authMessage: null,
            loading:action.loading,
        }
    }
    else if (action.type === 'RESET_AUTH_MESSAGE') {
        return {
            ...state,
            authMessage: null,
            authError: null,
            loading:action.loading,
        }
    }

    return state;
}

export default authReducer;