const productReducer = (state = [], { type, payload }) => {
  switch (type) {
    case "FETCH_DATA":
      return payload;
    case "FETCH_CATEGORIES":
      return payload;
    case "FILTER_BY_CATEGORY":
      return payload;
    default:
      return state;
  }
};

export default productReducer;
