export const getSearch = (userId) => {
  return (dispatch) => {
    /// get request
    fetch(`${process.env.REACT_APP_API_END_POINT}/web/search_data_get.php`, {
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
        const search = response.data;

        // console.log("kkkkk", response);
        dispatch({
          type: "GET_SEARCH",
          search: search,
          searchResponse: "got it",
          loading: true,
        });
      })
      .catch((error) => {
        console.log("error", error);
        dispatch({
          type: "GET_SEARCH",
          search: {},
          searchResponse: null,
          loading: true,
        });
        // alert("Please Check Your Internet Connection...")
      });
  };
};

export const createSearch = (data) => {
  console.log("ffff", data);
  return (dispatch) => {
    dispatch({
      type: "SEARCH_RESET",
      loading: false,
    });
    fetch(`${process.env.REACT_APP_API_END_POINT}/web/search.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth_id: `${data.userId}`,
      },
      body: JSON.stringify({
        keyword: data.keyword,
        skill: data.skill,
        state: data.state,
        city: data.city,
        ind: data.ind,
        exp: data.exp,
      }),
    })
      .then((res) => {
        console.log("res aqib", res);
        if (res.status !== 200) {
          alert("Some thing went wrong...");
        }
        return res.json();
      })
      .then((response) => {
        console.log("pppppp", response);
        const searchData = response.data;
        console.log("search", searchData);
        dispatch({
          type: "SEARCH_SUCCESS",
          searchResponse: response,
          sData: searchData,
          loading: true,
        });
        // window.location="/SearchResultsLogin"
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: "SEARCH_FAIL",
          searchResponse: "creation failed",
          sData: {},
          loading: true,
          //pageName: PGN.COLORS_PAGE_NAME
        });
        alert("Please Check Your Internet Connection...");
      });
  };
};

export const newSearchFunc = (data) => {
  return fetch(`${process.env.REACT_APP_API_END_POINT}/web/search.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json", auth_id: `${data.userId}` },
    body: JSON.stringify({
      keyword: data.keyword,
      skill: data.skill,
      state: data.state,
      city: data.city,
      ind: data.ind,
      exp: data.exp,
    }),
  });
};
