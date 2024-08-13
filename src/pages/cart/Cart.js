import ProductCard from "../../components/card/ProductCard";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const Cart = () => {
  const {
    cartList: productList,
    refreshList,
    setRefreshList,
  } = useLocalStorage();
  return (
    <ProductCard
      productList={productList}
      refreshList={refreshList}
      setRefreshList={setRefreshList}
    />
  );
};

export default Cart;
