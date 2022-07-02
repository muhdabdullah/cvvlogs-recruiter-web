import React, { useEffect } from "react";
import "./AboutUs.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../../Components/Footer/Footer";
import Nav2 from "../../Components/Nav2/Nav2";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import { getHomeVideo } from "../../../src/actions/homeVideoAction";

function AboutUs(props) {
  useEffect(() => {
    loadGetHomeJob();
  }, []);

  const loadGetHomeJob = async () => {
    await props.getHomeVideo();
    return null;
  };
  return (
    <>
      <Nav2 />
      <div>
        <div className="container-fluid about-us-image"></div>
        <div className="container mt-5">
          <h1 className="about-head">About Us</h1>
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex justify-content-center align-item-center">
                {localStorage.getItem("userCurrentLocation") ? (
                  localStorage.getItem("userCurrentLocation") == "PK" ? (
                    <ReactPlayer
                      url={"https://www.youtube.com/watch?v=3mZFjtRaOyY"}
                      playing={false}
                      controls
                      className="react-player ml-4"
                    />
                  ) : (
                    <ReactPlayer
                      url="https://youtu.be/Lr4XcRr6M9Y"
                      playing={false}
                      controls
                      className="react-player ml-4"
                    />
                  )
                ) : (
                  <ReactPlayer
                    url="https://youtu.be/Lr4XcRr6M9Y"
                    playing={false}
                    controls
                    className="react-player ml-4"
                  />
                )}
              </div>

              <br />
            </div>
          </div>
          <p>
            Welcome to cvvlogs, a new era of recruitment, Job search and
            recruitment is often a time consuming and stressful experience, to
            solve this issue we have developed the world’s first dedicated video
            resume platform.
          </p>
          <p>
            In a rapidly changing environment, standing out in the crowd is
            difficult, and so we created this unique portal.
          </p>
          <p>
            cvvlogs is the first and only online dedicated video resume platform
            where job seekers can upload a video resume to showcase their
            personalities and communication skills to get noticed by recruiters
            and get hired to pursue their dream careers.
          </p>
          <p>
            This unique platform allows the job seekers to show their
            personality and strengths on camera rather than being judged by a
            written resume.
          </p>
          <p>
            Our platform also makes it easier for recruiters to browse through
            our extensive video library of candidates to save time and find
            quality applicants by viewing, shortlisting and hiring them with
            ease and efficiency.
          </p>
          <p>
            So if you are to ready to experience this new and efficient form of
            recruitment, then please reach out to one of our team members to
            find out how we can assist and support you.
          </p>
          <h1 className="about-head mt-5">Our Mission</h1>
          <p className="mb-5">
            Our mission is to change the landscape of conventional recruitment
            with this unique, dynamic and reliable video platform that allows
            employers and candidates to connect globally with efficiency and
            transparency.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  homeVideorReducer: state.homeVideorReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getHomeVideo: () => dispatch(getHomeVideo()),
});
export default connect(mapStateToProps, mapDispatchToProps)(AboutUs);
