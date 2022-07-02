import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getHomeVideo } from "../../src/actions/homeVideoAction";
import ReactPlayer from "react-player";

Modal.setAppElement("#root");

function OnPageLoadModal(props) {
  useEffect(() => {
    loadGetHomeJob();
  }, []);

  const loadGetHomeJob = async () => {
    await props.getHomeVideo();
    return null;
  };

  const [videoModal, setVideoModal] = useState(true);
  const [video, setVideo] = useState("ENGLISH");
  return (
    <div className="container-fluid bg-imgage">
      <Modal
        isOpen={videoModal}
        onRequestClose={() => setVideoModal(true)}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
          content: {
            background: "#000",
            border: 0,
            position: "absolute",
            margin: "0 auto",
            width: "750px",
            minHeight: "400px",
            height: "435px",
            top: "85px",
            left: "0",
            right: "0",
            bottom: "50px",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px 20px 0px",
            borderRadius: "20px",
          },
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex justify-content-center">
                <ReactPlayer
                  url={"https://www.youtube.com/watch?v=Az1fRxJANTY"}
                  playing={false}
                  controls
                  className="react-player"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-sm-1"></div>
            <div className="col-md-4 col-sm-10">
              <div className="text-center">
                <Link to="/login">
                  <button
                    onClick={() => setVideoModal(false)}
                    style={{
                      backgroundColor: "#FFB44A",
                      fontWeight: "bold !important",
                      cursor: "pointer",
                      textDecorationColor: "#fff",
                      marginTop: "10px",
                    }}
                    className="btn btn-warning w-100 btn-login"
                  >
                    Skip video
                  </button>
                </Link>
              </div>
            </div>
            <div className="col-md-4 col-sm-1"></div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  homeVideorReducer: state.homeVideorReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getHomeVideo: () => dispatch(getHomeVideo()),
});
export default connect(mapStateToProps, mapDispatchToProps)(OnPageLoadModal);
