const config = require("../helpers/config.json");
export const getEditCompany = (userId) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.REACT_APP_API_END_POINT}/web/add_company_get.php`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth_id: `${userId}`,
        },
      })
        .then((res) => res.json())
        .then((response) => {
          const editcompany = response.data;
          resolve(editcompany);
          dispatch({
            type: "GET_EDITCOMPANY",
            editcompany: editcompany,
            editcompanyResponse: "got it",
            loading: true,
          });
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
          dispatch({
            type: "GET_EDITCOMPANY",
            editcompany: {},
            editcompanyResponse: null,
            loading: true,
          });
        });
    });
  };
};

// export const createEditCompany = (userId,keyword,skill,state,ind,exp) => {
//     console.log(userId,keyword,skill,state,ind,exp)

//     var data={
//         "user":userId,
//         "keyword":keyword,
//         "skill":skill,
//         "state":state,
//         "ind":ind,
//         "exp":exp,
//     }
//     console.log("ffff",data)
//     return (dispatch) => {
//         dispatch({
//             type: "EDITCOMPANY_RESET",
//             loading:false
//         });
//         fetch(`${process.env.REACT_APP_API_END_POINT}/web/edit_company.php`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json',"auth_id": `${userId}`, },
//             body: JSON.stringify({
//                 "keyword":keyword,
//                 "skill":skill,
//                 "state":state,
//                 "ind":ind,
//                 "exp":exp,

//             })
//         }).then(res => {
//             console.log("res aqib", res)
//             if(res.status !== 200){
//                 alert("Some thing went wrong...");
//             }
//             return res.json();
//         }).then((response) => {
//             console.log("pppppp", response);
//             dispatch({
//                 type: "EDITCOMPANY_SUCCESS",
//                 loading:true

//             });
//                 // window.location="/SearchResultsLogin"

//         }).catch((error) => {
//             console.log(error)
//             dispatch({
//                 type: "EDITCOMPANY_FAIL",
//                 editcompanyResponse: "creation failed",
//                 loading:true
//                 //pageName: PGN.COLORS_PAGE_NAME
//             });
//             alert("Please Check Your Internet Connection...")
//         })
//     }
// }
