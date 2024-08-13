const cartReducer = (state = [], { type, payload }) => {
  switch (type) {
    case "FETCH_CART_LIST":
      return payload;
    default:
      return state;
  }
};

export default cartReducer;
