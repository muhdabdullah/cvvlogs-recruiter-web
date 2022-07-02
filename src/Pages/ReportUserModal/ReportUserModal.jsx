import React from "react";
import "./ReportUserModal.css";
import "bootstrap/dist/css/bootstrap.min.css";

function ReportUserModal() {
  return (
    <div>
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >
        Launch demo modal
      </button>
      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header" style={{ border: "1px solid #fff" }}>
              <h5
                className="modal-title report-user-head-rep-modal"
                id="exampleModalLongTitle"
              >
                Report User
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <label>Reason of report</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter reason of report"
              />
              <label className="mt-3">When did it happen?</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter reason of report"
              />
              <label className="mt-3">Attachment of proof</label>
              <input
                type="file"
                className="form-control file-handle-input-recr"
              />
              <button
                className="btn btn-primary w-100 btn-of-premium-rece"
                data-dismiss="modal"
              >
                Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportUserModal;
