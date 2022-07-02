import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./BuyPremiumAlert.css";

function BuyPremiumAlert() {
    return (
        <div>
        {/* Button trigger modal */}
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
          Launch demo modal
        </button>
        {/* Modal */}
        <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header" style={{border:"1px solid #fff"}}>
                <h5 className="modal-title modal-head-recr-premium" id="exampleModalLongTitle">Buy Premium</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <p className="modal-para-recr-prem">Your account is limited to only 3 CV views. 
                To review more, purchase <span className="premium-sub-rcer">Premium Subscription</span></p>
                <button className="btn btn-primary w-100 btn-of-premium-rece" data-dismiss="modal">Purchase</button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
)
}

export default BuyPremiumAlert;
