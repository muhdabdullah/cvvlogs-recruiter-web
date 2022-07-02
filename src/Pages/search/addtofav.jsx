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
import { getAllFavs, createAddtofav } from "../../actions/addtofaavAction";
import FullPageLoader from "../../Components/fullpageloader/fullPageLoader";
import { useHistory } from "react-router-dom";

function Addtofav(props) {
  //   const search = useLocation().search;
  //   const key = new URLSearchParams(search).get("key");
  const [icon, seticon] = React.useState(false);
  useEffect(() => {
    getfav(localStorage.getItem("auth_id1"));
  }, []);
  const getfav = async (userId) => {
    await props.getAllFavs(userId);
  };

  const postFav = async (e) => {
    await props.createAddtofav(localStorage.getItem("auth_id1"), e);
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
          <div className="col-md-12">
            <h1 className="font-weight-bold mb-0" style={{ color: "#865ddd" }}>
              Favorites
            </h1>
            <p className="font-weight-bold" style={{ color: "#011F95" }}>
              Showing{" "}
              {props.addtofavReducer.addtofav &&
              props.addtofavReducer.addtofav.length > 0
                ? props.addtofavReducer.addtofav.length
                : "0"}{" "}
              Candidates
              {/* {key} Jobs */}
              {/* search.split('?')[2].split('=')[1] */}
            </p>
          </div>
        </div>
        {/* Main Section Parent start */}
        {/* ----------------------------------------------- */}
        <div className="row">
          <div className="col-md-10">
            {props.addtofavReducer.addtofav &&
            props.addtofavReducer.addtofav.length > 0 ? (
              props.addtofavReducer.addtofav.map((user) => (
                <div className="row shadow p-2 recr-user-info-main mb-5 mr-1 mt-2 ml-1 home-hover-effect">
                  <div className="col-md-12 text-right">
                    <span title="Remove from favourites">
                      <i
                        className="fas fa-heart fa-1x text-danger"
                        onClick={(e) => postFav(user.id)}
                      ></i>
                    </span>
                  </div>
                  <div
                    // to={`/SearchApplicantsProfile?id=${user.id}`}
                    onClick={() => navigate(user.is_client_disabled, user.id)}
                    className="link-tag-home"
                  >
                    <div className="row ">
                      <div className="col-lg-3 col-md-5 col-8">
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
                              className="far fa-user fa-7x"
                              style={{ color: "lightgray" }}
                            ></i>
                          )
                        ) : (
                          <i
                            className="far fa-user fa-7x"
                            style={{ color: "lightgray" }}
                          ></i>
                        )}
                      </div>
                      <div className="col-lg-6 col-md-7">
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
              <div>
                <p>Candidates will appear here!</p>
              </div>
            )}
          </div>
          <div className="col-md-2 col-12 mt-3">
            <div className="place-ad ">
              <h4>Place Ad </h4>
            </div>
          </div>
          {/* Section 2 ends */}

          {/* Section 3 starts */}
          <div className="result-main-child-03"></div>
          {/* Section 3 ends */}
        </div>
        {/* ----------------------------------------------- */}
        {/* </div> */}
        {/* Main Section Parent end */}
        {props.addtofavReducer.loading1 == false ? <FullPageLoader /> : ""}
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  addtofavReducer: state.addtofavReducer,
});

const mapDispatchToProps = (dispatch) => ({
  createAddtofav: (userId, id) => dispatch(createAddtofav(userId, id)),
  getAllFavs: (userId) => dispatch(getAllFavs(userId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Addtofav);
