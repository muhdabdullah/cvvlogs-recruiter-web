const initState = {
  feedbackModal: false,
};

const feedbackModalReducer = (state = initState, action) => {
  if (action.type === "FEEDBACK_MODAL_TOGGLE") {
    return {
      ...state,
      feedbackModal: action.feedbackModal,
    };
  }
  return state;
};
export default feedbackModalReducer;
