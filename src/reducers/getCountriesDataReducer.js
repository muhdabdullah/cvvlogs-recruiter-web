const initState = {
    countriesData: [],
    loading:false
}

const getCountriesDataReducer = (state = initState, action) => {
    console.log(state, action)
    if (action.type === 'GET_COUNTRIES_DATA') {
        return {
            ...state,
            countriesData: action.countriesData,
            loading:action.loading,
        }
    }
    return state;
}
export default getCountriesDataReducer;