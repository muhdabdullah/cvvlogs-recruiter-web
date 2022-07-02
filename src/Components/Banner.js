import React from "react";
import bannerr from "../Assests/bannn.png";

export default function HomeBanner2() {
    return (
        <div className="container mb-4 mt-n5">
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <img src={bannerr} width="100%" />
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
    );
}