import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { BsCart } from "react-icons/bs";
import { Link } from "react-router-dom";
import { sendNotification } from "../../utils/notifications";
import { AiOutlineClose } from "react-icons/ai";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { removeFromCart } from "../../services/api/products";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../../store/actions/LoadingAction";
import Loader from "../loader";
import "./productcard.css";
import CustomTooltip from "../shared/CustomTooltip";

const ProductCard = ({ productList, refreshList, setRefreshList }) => {
  const { userId } = useLocalStorage();
  const [quantities, setQuantities] = useState({});

  const isLoading = useSelector((state) => state?.loading);
  const dispatch = useDispatch();

  const handleDecrement = (id) => {
    // Decrement the quantity for a specific product
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 1) - 1,
    }));
  };

  const handleIncrement = (id) => {
    // Increment the quantity for a specific product
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 1) + 1,
    }));
  };

  const handleRemove = async (id) => {
    dispatch(startLoading(true));
    let res = await removeFromCart({
      userId: userId,
      product_id: id,
    });
    if (res?.status === 200) {
      sendNotification("success", res?.data?.message);
      setRefreshList(!refreshList);
    } else {
      sendNotification("warning", res?.response?.data?.message);
    }
    dispatch(stopLoading(false));
  };

  let subtotal = productList?.reduce((total, product) => {
    total = total + quantities[product?.product_id] * product?.price;
    return total;
  }, 0);

  const handleProceed = () => {
    sendNotification("success", "Thank you for visiting our website");
  };

  if (isLoading) return <Loader />;
  return (
    <Container>
      <section className="common_section">
        {productList?.length ? (
          productList?.map((product) => {
            return (
              <Row
                className="mb-5 shadow-sm  product_row bg-body-tertiary"
                key={product?.product_id}
              >
                <Col xs={10} className="mx-auto flexCenter">
                  <div className="d-flex gap-5 w-100">
                    <div
                      className="flexCenter bg-black"
                      style={{ height: "60px", width: "60px" }}
                    >
                      <img
                        src={product?.image}
                        alt="Product"
                        className="w-100 h-100"
                      />
                    </div>
                    <div className="d-flex flex-column gap-1 w-100">
                      <div className="d-flex justify-content-between">
                        <h3>{(product?.title).substring(0, 20)}</h3>
                        <CustomTooltip msg="Delete">
                          <AiOutlineClose
                            className="cursor text-black"
                            onClick={() => handleRemove(product?.product_id)}
                          />
                        </CustomTooltip>
                      </div>
                      <span>${product?.price}</span>
                      <p>
                        Total:{" "}
                        {quantities[product?.product_id] * product?.price ||
                          product?.price}
                      </p>
                      <div key={product?.product_id}>
                        <button
                          className="custom-counter"
                          disabled={product?.qty === 0 ? true : false}
                          onClick={() => handleDecrement(product?.product_id)}
                        >
                          -
                        </button>
                        <button
                          className="custom-counter "
                          style={{ backgroundColor: "white" }}
                        >
                          {quantities[product?.product_id] || 1}
                        </button>
                        <button
                          className="custom-counter "
                          onClick={() => handleIncrement(product?.product_id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            );
          })
        ) : (
          <div className="flexCenter flex-column min-vh-100">
            <BsCart style={{ fontSize: "100px" }} />
            <Link to="/" className="mt-5">
              <button className="btn btn-outline-dark">Go to Shopping</button>
            </Link>
          </div>
        )}
      </section>

      {productList?.length ? (
        <div className="px-5 flexSB subtotal_container py-3 mb-5 bg-body-secondary">
          <p className="p-0 m-0 ms-auto">
            <span className="p-0 m-0 text-uppercase font-weight-bolder">
              SubTotal
            </span>
            : $ {subtotal ? Math.floor(subtotal) : 0}
          </p>
        </div>
      ) : null}
      {productList?.length === 0 ? null : (
        <div className="text-center">
          <button className="btn btn-outline-dark" onClick={handleProceed}>
            Proceed To Checkout
          </button>
        </div>
      )}
    </Container>
  );
};

export default ProductCard;
