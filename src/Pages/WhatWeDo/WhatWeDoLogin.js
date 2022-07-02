import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import HomeBanner2 from '../../Components/Banner';
import Nav2 from '../../Components/Nav2/Nav2';
import Footer from '../../Components/Footer/Footer';

function WhatWeDoLogin() {
    const vidLink = "https://drive.google.com/file/d/1oTnhqAHJupQHis38OsZ8bo7RTCOh2Ni7/preview";
    return (
        <>
        <Nav2/>
            <div className="container">
                <div className="row mt-5 mb-5">
                    <div className="col-md-12">
                        <h1 className="font-weight-bold" style={{ color: "#865ddd" }}>How it works</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <HomeBanner2 />
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className="embed-responsive embed-responsive-16by9">
                            <iframe className="embed-responsive-item" src={vidLink} allowFullScreen />
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default WhatWeDoLogin;
