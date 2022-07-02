import { createSearch } from "./getsearchAction";

const config = require("../helpers/config.json");
export const createAddtofav = (userId, id) => {
  console.log(userId, id);
  return (dispatch) => {
    dispatch({
      type: "ADDTOFAV_RESET",
      loading: true,
    });
    var data = {
      userId: userId,
      user_id: id,
    };

    console.log("wwww", data);
    /// post request
    fetch(`${process.env.REACT_APP_API_END_POINT}web/add_to_fav.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json", auth_id: `${userId}` },
      body: JSON.stringify({
        user_id: id,
      }),
    })
      .then((r) => {
        return r.json();
      })
      .then((response) => {
        console.log("pppppp", response);
        dispatch({
          type: "ADDTOFAV_SUCCESS",
          addtofavResponse: response,
          loading: false,
        });
        if (response.status == 404) {
          alert("Already favourite.");
        }
        if (response.status == 200) {
          window.location.reload(false);
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: "ADDTOFAV_FAIL",
          addtofavResponse: "creation failed",
          loading: false,
          //pageName: PGN.COLORS_PAGE_NAME
        });
        // alert("Please Check Your Internet Connection...")
      });
  };
};

export const createAddtofavsearch = (
  userId,
  id,
  keyword,
  skill,
  state,
  ind,
  exp
) => {
  console.log(userId, id);
  return (dispatch) => {
    dispatch({
      type: "ADDTOFAV_RESET",
      loading: true,
    });
    var data = {
      userId: userId,
      user_id: id,
    };

    console.log("wwww", data);
    /// post request
    fetch(`${process.env.REACT_APP_API_END_POINT}/web/add_to_fav.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json", auth_id: `${userId}` },
      body: JSON.stringify({
        user_id: id,
      }),
    })
      .then((r) => {
        return r.json();
      })
      .then((response) => {
        console.log("pppppp", response);
        dispatch({
          type: "ADDTOFAV_SUCCESS",
          addtofavResponse: response,
          loading: false,
        });
        //  dispatch(createSearch(userId,keyword,skill,state,ind,exp))
        if (response.status == 404) {
          alert("Already favourite.");
        }
        if (response.status == 200) {
          // window.location="/Addtofav"
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: "ADDTOFAV_FAIL",
          addtofavResponse: "creation failed",
          loading: false,
          //pageName: PGN.COLORS_PAGE_NAME
        });
        // alert("Please Check Your Internet Connection...")
      });
  };
};

export const getAllFavs = (userId) => {
  return (dispatch) => {
    /// get request
    fetch(`${process.env.REACT_APP_API_END_POINT}/web/all_favs.php`, {
      method: "GET",
      headers: { "Content-Type": "application/json", auth_id: `${userId}` },
      // body: JSON.stringify({
      //     "data":{
      //         "company_url": companyUrl,
      //         "email": email,
      //         "password": password
      //     }
      // })
    })
      .then((res) => res.json())
      .then((response) => {
        const addtofav = response.data;

        // console.log("kkkkk", response);
        dispatch({
          type: "GET_ADDTOFAV",
          addtofav: addtofav,
          addtofavResponse: "got it",
          loading1: true,
        });
      })
      .catch((error) => {
        console.log("error", error);
        dispatch({
          type: "GET_ADDTOFAV",
          addtofav: {},
          addtofavResponse: null,
          loading1: true,
        });
        // alert("Please Check Your Internet Connection...")
      });
  };
};
