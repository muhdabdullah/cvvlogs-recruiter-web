export const feedBack = (userId, feedback, source) => {
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_API_END_POINT}/web/send_feedback.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json", auth_id: `${userId}` },
      body: JSON.stringify({
        feedback: feedback,
        source: source,
      }),
    })
      .then((r) => {
        return r.json();
      })
      .then((response) => {
        dispatch({
          type: "FEEDBACK_MODAL_TOGGLE",
          feedbackModal: false,
        });
        alert(response.message);
      })
      .catch((error) => {
        dispatch({
          type: "FEEDBACK_MODAL_TOGGLE",
          feedbackModal: true,
        });
      });
  };
};
