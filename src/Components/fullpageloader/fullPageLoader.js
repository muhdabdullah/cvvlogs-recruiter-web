import React from "react"
import spinner from "../../Assests/spinner 2.gif"
import "./fullpagelaoder.css"

const FullPageLoader = () => {
    return (
        <div className="fp-container">
            <img src={spinner} className="fp-loader d-lg-block d-md-block d-none" alt="loading" />
            <img src={spinner} className="fp-loaders d-lg-none d-md-none d-block" alt="loading" />
        </div>
    )
}
export default FullPageLoader