import React,{ useState, useEffect } from "react";
// import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useLocation } from "react-router-dom";
import { getResetPass, createReset } from "../../actions/resetpassAction";
import { connect } from "react-redux";

function ResetPassword(props) {
    const search = useLocation().search;
    const verid = new URLSearchParams(search).get("verid");
    const [new_pass, setnew_pass] = useState("")
    
    useEffect(() => {
        console.log("search", search)
        console.log("verid", verid)
        loadGetPersonal(search);
    },[])

    const loadGetPersonal = async (verid) => {
        await props.getResetPass(verid);
        return null;
    };
    
    const resetPassword = async () => {
        console.log("qwerty", props?.resetReducer?.reset?.user_id, new_pass)

        await props.createReset(props?.resetReducer?.reset?.user_id, new_pass)
    }

    return (
        <>
            {/* <Navbar /> */}
            <div className="conatiner-fluid">
                <div className="conatiner-fluid">
                    <div className="container mt-5 mb-5">
                        <div className="row" >
                            <div className="col-lg-3 col-md-2"></div>
                            <div className="col-lg-6 col-md-8">
                                <div className="shadow p-4" style={{ borderRadius: "15px", background: "#fff" }}>
                                    <h3 className="text-center" style={{ color: "#865ddd" }}>Reset Your Password!</h3>
                                    <p className="text-center mb-3" style={{ color: "#707070" }}>You are setting up a new password for your cvvlogs account linked with particular email</p>
                                    <label style={{ color: "#707070" }}>Password</label>
                                    <input onChange={e => setnew_pass(e.target.value)} type="password" className="p-0 form-control" placeholder="Type your Password here" style={{ borderRight: "#fff", borderLeft: "#fff", borderTop: "#fff", borderRadius: "0", color: "#c8c8c8" }} />
                                    <label style={{ color: "#707070" }} className="mt-2">Confirm Password</label>
                                    <input type="password" className="form-control p-0" placeholder="Type your Password here" style={{ borderRight: "#fff", borderLeft: "#fff", borderTop: "#fff", borderRadius: "0", color: "#c8c8c8" }} />
                                    <div className="text-center">
                                        <button className="btn btn-warning mt-3 w-50 font-weight-bold " style={{ color: "#fff", background: "#ffb44a" }} onClick={() => resetPassword()}>Reset</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-2"></div>
                        </div>
                    </div>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    )
}



const mapStateToProps = (state) => ({
    resetReducer: state.resetReducer,
});

const mapDispatchToProps = (dispatch) => ({
    getResetPass: (verid) => dispatch(getResetPass(verid)),
    createReset: (id, new_pass) => dispatch(createReset(id, new_pass)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
