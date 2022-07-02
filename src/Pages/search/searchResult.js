import React, { useState, useEffect } from "react";
import Briefcase from "../../Assests/briefcase.svg";
import Location from "../../Assests/Location.svg";
import Pen from "../../Assests/pen.svg";
import "./searchResult.css";
import Nav2 from "../../Components/Nav2/Nav2";
import Footer from "../../Components/Footer/Footer";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { createSearch, getSearch } from "../../actions/getsearchAction";
import { createAddtofavsearch } from "../../actions/addtofaavAction";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";
import { newSearchFunc } from "../../actions/getsearchAction";
import { useHistory } from "react-router-dom";

function SearchResultsLogin(props) {
  let search = useLocation().search;
  search = search.split("&&");
  const keyword = search[0].split("=")[1];
  const skill = search[1].split("=")[1];
  const state = search[2].split("=")[1];
  const industry = search[3].split("=")[1];
  const experience = search[4].split("=")[1];
  const city = search[5].split("=")[1];
  const checkId =
    skill.length == 0
      ? ""
      : skill.includes(",")
      ? skill.split(",")
      : [skill.toString()];

  const [load, setload] = useState(false);
  const [item, setItems] = useState([]);

  const [list, setlist] = useState([]);
  useEffect(() => {
    // searchget();
    searchList();
  }, []);
  const searchget = async () => {
    let data = {
      userId: localStorage.getItem("auth_id1"),
      keyword: keyword,
      state: state,
      city: city,
      ind: industry,
      exp: experience,
      skill: skill,
    };
    setload(true);
    newSearchFunc(data)
      .then((ref) => {
        return ref.json();
      })
      .then((res) => {
        let list1 = res.data.users;
        if (
          JSON.stringify(list1) !== JSON.stringify(list) &&
          (res.status == 200 || res.status == 201)
        ) {
          setlist(list1);
        }
        setload(false);
      })
      .catch((err) => {
        setload(false);
      });
  };
  const searchList = async () => {
    setload(true);
    let data = {
      userId: localStorage.getItem("auth_id1"),
      keyword: keyword,
      state: state,
      city: city,
      ind: industry,
      exp: experience,
      skill: skill,
    };
    newSearchFunc(data)
      .then((ref) => {
        return ref.json();
      })
      .then((res) => {
        let list1 = res.data.users;
        setItems(list1);
        // if ((JSON.stringify(list1) !== JSON.stringify(list))&&(res.status==200||res.status==201)) {
        //   setlist(list1)

        // }
        setload(false);
      })
      .catch((err) => {
        setload(false);
      });
  };
  const AddtoFav = async (user, i) => {
    await props.createAddtofavsearch(localStorage.getItem("auth_id1"), user.id);
  };
  const newAddtoFav = async (user, i) => {
    const tempItem = [...item];
    let tempData = { ...user };
    let finalList = [];
    if (tempData["favourite"] == 0) {
      tempData["favourite"] = 1;
    } else if (tempData["favourite"] == 1) {
      tempData["favourite"] = 0;
    }
    for (let i = 0; i < tempItem.length; i++) {
      if (tempItem[i].id == tempData.id) {
        finalList.push(tempData);
      } else {
        finalList.push(tempItem[i]);
      }
    }
    setItems(finalList);
    await props.createAddtofavsearch(localStorage.getItem("auth_id1"), user.id);
  };
  let history = useHistory();
  const navigate = (dis, id) => {
    if (!dis) {
      history.push(`/SearchApplicantsProfile?id=${id}`);
    } else return;
  };
  return (
    <>
      <Nav2 />
      <div className="container my-5">
        <div className="row">
          <div className="col-md-12 text-md-left text-lg-left text-center">
            <h1 className="font-weight-bold mb-0" style={{ color: "#865ddd" }}>
              Search For Candidates
            </h1>
            <p className="font-weight-bold" style={{ color: "#011F95" }}>
              Showing{" "}
              {props.getSearchReducer.sData
                ? props.getSearchReducer.sData.users &&
                  props.getSearchReducer.sData.users.length > 0
                  ? props.getSearchReducer.sData.users.length
                  : ""
                : ""}{" "}
              Candidates
            </p>
          </div>
        </div>
        {/* Main Section Parent start */}
        {/* ----------------------------------------------- */}
        <div className="row">
          <div
            className="col-md-10"
            // style={{ maxHeight: "700px", overflowY: "scroll" }}
          >
            {item.length > 0 ? (
              item.map((user, i) => (
                <div className="row shadow p-2 recr-user-info-main mb-5 mr-1 mt-2 ml-1 home-hover-effect">
                  <div className="col-md-12 text-right">
                    {user.favourite == 0 ? (
                      <span title="Add to favorites">
                        <i
                          className="fal fa-heart fa-1x"
                          onClick={(e) => newAddtoFav(user, i)}
                        ></i>
                      </span>
                    ) : (
                      <span title="Remove from favourites">
                        <i
                          className="fas fa-heart fa-1x text-danger"
                          onClick={(e) => newAddtoFav(user, i)}
                        ></i>
                      </span>
                    )}
                  </div>
                  <div
                    onClick={() => navigate(user.is_client_disabled, user.id)}
                    className="link-tag-home"
                  >
                    <div className="row">
                      <div className="col-lg-3 col-md-4 col-8">
                        {!user.is_client_disabled ? (
                          user.picture ? (
                            <img
                              src={user.picture}
                              height="130px"
                              width="70%"
                              style={{
                                objectFit: "cover",
                                borderRadius: "50%",
                              }}
                              className="mt-2"
                            />
                          ) : (
                            <i
                              className="far fa-user fa-7x ml-4"
                              style={{ color: "lightgray" }}
                            ></i>
                          )
                        ) : (
                          <i
                            className="far fa-user fa-7x ml-4"
                            style={{ color: "lightgray" }}
                          ></i>
                        )}
                      </div>
                      <div className="col-md-6">
                        <h1 className="user-name-recr m-0 p-0">
                          {!user.is_client_disabled
                            ? user.name
                              ? user.name
                              : ""
                            : "Account Deactivated"}
                        </h1>
                        <p className="user-loc-recr m-0 p-0">
                          {!user.is_client_disabled
                            ? user.city
                              ? user.city + ", "
                              : ""
                            : ""}
                          {!user.is_client_disabled
                            ? user.state
                              ? user.state
                              : ""
                            : ""}
                        </p>
                        <h3 className="key-skills-recr-applicants m-0 p-0">
                          {!user.is_client_disabled ? "Key Skills" : ""}
                        </h3>
                        <p className="userskills-appli m-0 p-0">
                          {!user.is_client_disabled
                            ? user.skills && user.skills.length > 0
                              ? user.skills.map((sk) => <>{sk} ,</>)
                              : "no skills"
                            : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>no candidates</p>
            )}
          </div>

          <div className="col-md-2 col-12 mt-3">
            <div className="place-ad ">
              <h4>Place Ad </h4>
            </div>
          </div>
          <div className="result-main-child-03"></div>
        </div>
        {item.length < 0 ? <FullPageLoader /> : ""}
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  getSearchReducer: state.getSearchReducer,
});

const mapDispatchToProps = (dispatch) => ({
  // getSearch: (userId) => dispatch(getSearch(userId)),
  createAddtofavsearch: (userId, id) =>
    dispatch(createAddtofavsearch(userId, id)),
  getSearch: (userId) => dispatch(getSearch(userId)),
  createSearch: (userId, keyword, skill, state, ind, exp) =>
    dispatch(createSearch(userId, keyword, skill, state, ind, exp)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchResultsLogin);
