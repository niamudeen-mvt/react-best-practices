const loadingReducer = (state = false, { type, payload }) => {
  switch (type) {
    case "START_LOADING":
      return payload;
    case "STOP_LOADING":
      return payload;
    default:
      return state;
  }
};

export default loadingReducer;
