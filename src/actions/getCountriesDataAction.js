import { countries } from "country-data";

export const getCountriesData = () => {
    return (dispatch) => {
        console.log(countries.all, "countries")
        if (countries.all) {
            dispatch({
                type: "GET_COUNTRIES_DATA",
                countriesData: countries.all,
                loading: false
            });
        }
    }
}

