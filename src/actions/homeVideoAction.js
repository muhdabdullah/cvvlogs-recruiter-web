const config = require('../helpers/config.json');

export const getHomeVideo = (userId, id) => {
    return (dispatch) => {
        /// get request
        fetch(`https://api.cvvlogs.com/cv-tube/api.v.1/user/home_vid.php`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', "auth_id": `${userId}`, },
        }).then(res => res.json()).then((response) => {
            const homeVideo = response.data
            console.log(response, "response")
            console.log(homeVideo, "homeVideo")
            dispatch({
                type: "GET_HOMEVIDEO",
                homeVideo: homeVideo,
                homeVideoResponse: "got it"
            });
        }).catch((error) => {
            console.log("error", error);
            dispatch({
                type: "GET_HOMEVIDEO",
                homeVideo: {},
                homeVideoResponse: null
            });
        })

    }


}

