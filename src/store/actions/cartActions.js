export const fetchCartProducts = (products) => {
  return {
    type: "FETCH_CART_LIST",
    payload: products,
  };
};
