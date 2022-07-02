// const initState = {
//     register: {},
//     registerResponse: null,
    
// }

// const registerReducer = (state = initState, action) => {
//     if (action.type === 'GET_REGISTER') {
//         return {
//             ...state,
//             register: action.register,
//             registerResponse:action.registerResponse
//         }
//     }
//     // /// THESE ARE GENERAL APPLICABLE TO ALL API's
//     else if (action.type === 'REGISTER_RESET') {
//         return {
//             ...state,
            
//             registerResponse: null,
            
//         }
//     }
//     else if (action.type === 'REGISTER_SUCCESS') {
//         return {
//             ...state,
            
//             registerResponse: action.registerResponse,
//         }
//     }
//     else if (action.type === 'REGISTER_FAIL') {
//         return {
//             ...state,
            
//             registerResponse: action.registerResponse,
//         }
//     }

//     return state;
// }
// export default registerReducer;














const initState = {
    auth_id: null,
    authError: null,
    authMessage: null,
    employee_id: null,
    loading:true,
}

const registerReducer = (state = initState, action) => {
    // console.log(action)
    if (action.type === 'REGISTER_IN') {
        return {
            ...state,
            auth_id: action.auth_id,
            authError: action.authError,
            authMessage: action.authMessage,
            employee_id: action.employee_id,
            loading:action.loading,
        }
    }
    else if (action.type === 'REGISTER_UP') {
        return {
            ...state,
            auth_id: action.auth_id,
            authError: action.authError,
            authMessage: action.authMessage,
            loading:action.loading,
        }
    }
    else if (action.type === 'REGISTER_OUT') {
        return {
            ...state,
            auth_id: null,
            authError: null,
            authMessage: null,
            loading:action.loading,
        }
    }
    else if (action.type === 'RESET_REGISTER_MESSAGE') {
        return {
            ...state,
            authMessage: null,
            authError: null,
            loading:action.loading,
        }
    }

    return state;
}

export default registerReducer;