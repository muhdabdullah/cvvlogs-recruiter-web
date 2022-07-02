const initState = {
    pricing: {},
    pricingResponse: null,
    loading:false,
    
}

const pricingReducer = (state = initState, action) => {
    if (action.type === 'GET_PRICING') {
        return {
            ...state,
            pricing: action.pricing,
            pricingResponse:action.pricingResponse,
            loading:action.loading,
        }
    }
    // /// THESE ARE GENERAL APPLICABLE TO ALL API's
    else if (action.type === 'PRICING_RESET') {
        return {
            ...state,
            
            pricingResponse: null,
            loading:action.loading,
            
        }
    }
    else if (action.type === 'PRICING_SUCCESS') {
        return {
            ...state,
            
            pricingResponse: action.pricingResponse,
            loading:action.loading,
        }
    }
    else if (action.type === 'PRICING_FAIL') {
        return {
            ...state,
            
            pricingResponse: action.pricingResponse,
            loading:action.loading,
        }
    }

    return state;
}
export default pricingReducer;