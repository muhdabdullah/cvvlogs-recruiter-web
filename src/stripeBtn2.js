



// import React from 'react';
import axios from 'axios';
import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { useLocation } from "react-router-dom"
import FullPageLoader from "./Components/fullpageloader/fullPageLoader"
import STRIPE_PUBLISHABLE from "./stripe"

const MStripe2 = (props) => {
  const[loading,setLoading]=React.useState(false)

  const search = useLocation().search;
  const compIds = new URLSearchParams(search).get("id").split("?");
  const id=compIds[0]
  const sid=compIds[1].split("=")[1]
  console.log("ddddd",id,sid)
  const onPost = () => {
    // setLoading(true)
    var data =
    {
      "user_id": id,

    }
      ;
    console.log("fffffff", data)
    /// post request
    fetch(`${process.env.REACT_APP_API_END_POINT}/web/paid_for.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "auth_id": `${localStorage.getItem("auth_id1")}` },
      body: JSON.stringify({
        "user_id": id,


      })
    }).then(res => {
      console.log("res aqib", res.json())
      window.location=`/SearchApplicantsProfile?id=${sid}`
      // alert("successfully buy....")
      // setLoading(false)

    }).catch((error) => {
      console.log(error)
      // setLoading(false)

    })
  };


  const onToken = (token, addresses) => {
    setLoading(true)
    var data =
    {
      "pkg_id": props.id !== null&&props.id !== undefined ? props.id : null,
      "costumer_id": token ? token.card ? token.card.id !== null && token.card.id !== undefined ? token.card.id : null : null : null,
      "payment_token": token ? token.id !== null && token.id !== undefined ? token.id : null : null

    }
      ;
    console.log("dddddd", data)
    /// post request
    fetch(`${process.env.REACT_APP_API_END_POINT}/web/package_payment_confirmation.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "auth_id": `${localStorage.getItem("auth_id1")}` },
      body: JSON.stringify({
        "pkg_id": props.id !== null ? props.id : null,
        "costumer_id": token ? token.card ? token.card.id !== null && token.card.id !== undefined ? token.card.id : null : null : null,
        "payment_token": token ? token.id !== null && token.id !== undefined ? token.id : null : null


      })
    }).then(res => {
      console.log("res aqib", res.json())
      // window.location="/get-premium"
      onPost()
      alert("payment confirmed")
      setLoading(false)

    }).catch((error) => {
      console.log(error)
      setLoading(false)

    })
    console.log(token);
  };

  const totalAmount = props.amount * 100

  return (
    <>
    <StripeCheckout
      className="check"
      style={{ backgroundColor: "orange !important" }}
      amount={totalAmount}
      description="Awesome Product"
      locale="auto"
      name="cvvlogs.com"
      stripeKey={STRIPE_PUBLISHABLE}
      token={onToken}
      zipCode
    />
    {
      loading==true?<FullPageLoader />:null
    }
    </>
  )

}

export default MStripe2





// import React from "react"
// import StripeCheckout from "react-stripe-checkout"
// import { Elements ,Stripe} from "@stripe/react-stripe-js";
// import { loadStripe} from "@stripe/stripe-js";
// import "./App.css"


// import React from "react";
// import LinkedIn from "linkedin-login-for-react";
// import React, { Component } from "react";
// import getURL from "./getURL";
// import PropTypes from "prop-types";
// import React from "react";
// import Webcam2 from "./Components/WebCam/Webcam2";
// import Routing from "./Routing/Routing";
// import DisabledButton from "./Components/DisabledButton";
// import PersonalDetails from "./Pages/PersonalDetails/PersonalDetails";
// import KeySkills from "./Pages/KeySkills/KeySkills";
// import React, { useEffect } from "react"
// // import LinkedIn from "linkedin-login-for-react";
// // import styles from "./styles.css";

// const stripePromise = loadStripe("pk_test_51Iw2FFKl1ZAnnMNkMEtJGcvYDf19HGfk5Jns9Akj5omsZb4xfxsPyOEs3AZBi1UHnmdoL9yP3gWBpr1c1gbFRq7h00LYMbXXN5");
// const key=Stripe("pk_test_51Iw2FFKl1ZAnnMNkMEtJGcvYDf19HGfk5Jns9Akj5omsZb4xfxsPyOEs3AZBi1UHnmdoL9yP3gWBpr1c1gbFRq7h00LYMbXXN5")

// function MStripe() {
//     const onToken = (token) => {
//         fetch('/get-premium', {
//           method: 'POST',
//           body: JSON.stringify(token),
//         }).then(response => {
//             console.log("gggg",response.body)
//         //   response.json().then(data => {
//         //       console.log("gggg",data)
//         //     alert(`We are in business, ${data.email}`);
//         //   });
//         });
//       }

//   return (   
// <>
// {/* <Elements > */}
//      <StripeCheckout
//         className="check"
//         style={{background:"orange !important"}}
//         token={onToken}
//         stripeKey="pk_test_51Iw2FFKl1ZAnnMNkMEtJGcvYDf19HGfk5Jns9Akj5omsZb4xfxsPyOEs3AZBi1UHnmdoL9yP3gWBpr1c1gbFRq7h00LYMbXXN5"
//      /> 
//     {/* </Elements> */}
// </>






//   );
// }

// export default MStripe;



