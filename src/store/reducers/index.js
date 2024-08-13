import { combineReducers } from "redux";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import loadingReducer from "./loadingReducer";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  loading: loadingReducer,
});

export default rootReducer;
