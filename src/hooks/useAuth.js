import { useDispatch, useSelector } from "react-redux";
import { updateAuthUser, userlogout } from "../store/features/authSlice";
import {
  getDataFromLc,
  removeDataFromLc,
  setDataIntoLc,
} from "../utils/helper";
import { useEffect } from "react";

export default function useAuth() {
  const authUser = useSelector((state) => state.authUser);

  const dispatch = useDispatch();

  useEffect(() => {
    const isLoggedIn = getDataFromLc("isLoggedIn");

    if (isLoggedIn) {
      dispatch(updateAuthUser());
    }
  }, [dispatch]);

  const handleUpdateAuth = () => {
    dispatch(updateAuthUser());
    setDataIntoLc("isLoggedIn", true);
  };

  const handleLogout = () => {
    dispatch(userlogout());
    removeDataFromLc("isLoggedIn");
  };

  const isLoggedIn = authUser?.isLoggedIn;

  return {
    isLoggedIn,
    handleUpdateAuth,
    handleLogout,
  };
}
