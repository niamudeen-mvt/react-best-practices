export const startLoading = (value) => {
  return {
    type: "START_LOADING",
    payload: value,
  };
};

export const stopLoading = (value) => {
  return {
    type: "STOP_LOADING",
    payload: value,
  };
};
