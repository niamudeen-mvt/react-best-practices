import { useEffect, useState } from "react";
import { cartProducts } from "../services/api/products";
import { userById } from "../services/api/user";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartProducts } from "../store/actions/cartActions";

export const useLocalStorage = () => {
  const [userId, setUserId] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [refreshList, setRefreshList] = useState(false);

  const cartList = useSelector((state) => state?.cart);

  const dispatch = useDispatch();

  const storedUserId = sessionStorage.getItem("userId");

  const fetchCartList = async () => {
    if (userId) {
      let res = await cartProducts(userId);
      if (res?.status === 200) {
        const data = res?.data?.cart || [];
        dispatch(fetchCartProducts(data));
      }
    }
  };

  useEffect(() => {
    setUserId(storedUserId);
  }, [storedUserId]);

  useEffect(() => {
    fetchCartList();
  }, [refreshList, userId]);

  useEffect(() => {
    (async () => {
      let res = await userById();
      if (res?.status === 200) {
        setCurrentUser(res?.data?.user);
      }
    })();
  }, []);

  const logout = async () => {
    sessionStorage.clear();
    setUserId(null);
  };

  return { userId, currentUser, logout, cartList, refreshList, setRefreshList };
};
