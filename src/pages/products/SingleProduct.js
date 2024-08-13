import React, { useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { sendNotification } from "../../utils/notifications";
import Loader from "../../components/loader";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { addToCart } from "../../services/api/products";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/actions/productAction";
import { startLoading, stopLoading } from "../../store/actions/LoadingAction";

const SingleProduct = () => {
  const { id } = useParams();
  const { userId, refreshList, setRefreshList } = useLocalStorage();

  const productList = useSelector((state) => state?.products);
  const isLoading = useSelector((state) => state?.loading);

  const product = (productList?.filter(
    (product) => product?.product_id == id
  ))[0];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleAddtoCart = async (product) => {
    dispatch(startLoading(true));
    if (userId === null) {
      sendNotification("warning", "Please Login to Proceed");
    } else {
      const { id: product_id, ...rest } = product;
      let res = await addToCart({ userId, product_id, ...rest });
      if (res?.status === 201) {
        sendNotification("success", res?.data?.message);
        setRefreshList(!refreshList);
      } else {
        sendNotification("warning", res?.response?.data?.message);
      }
    }
    dispatch(stopLoading(false));
  };

  return (
    <section className="flexCenter" style={{ minHeight: "90vh" }}>
      <Container className="py-5">
        <Row className="p-3">
          <Col xs={12} lg={6}>
            <div className="flexCenter" style={{ height: "500px" }}>
              <img
                src={product?.image}
                alt="product-img"
                className="w-75 h-75"
                loading="lazy"
              />
            </div>
          </Col>
          <Col xs={12} lg={6} className="d-flex align-content-center">
            <div>
              <p className="text-uppercase text-black-50">
                {product?.category}
              </p>
              <h2>{product?.title}</h2>
              <p>$ {product?.price}</p>
              <p className="mb-5">{product?.description}</p>
              {isLoading ? (
                <button className="btn btn-outline-dark px-5">
                  <Spinner animation="border" role="status" size="sm"></Spinner>
                </button>
              ) : (
                <button
                  className="btn btn-outline-dark w-100 py-3 mb-3"
                  onClick={() => handleAddtoCart(product)}
                >
                  Add to Cart
                </button>
              )}
              <Link to="/cart">
                <button className="btn btn-dark w-100 py-3">Go to Cart</button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SingleProduct;
