export const FeedbackModalAction = (toggle) => {
  return (dispatch) => {
    dispatch({
      type: "FEEDBACK_MODAL_TOGGLE",
      feedbackModal: toggle,
    });
    localStorage.setItem("isFirstLogin", 0);
  };
};
