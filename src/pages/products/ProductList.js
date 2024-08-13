import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { fetchProducts } from "../../store/actions/productAction";
import defaultProductImg from "../../assets/images/photo-1591047139829-d91aecb6caea.avif";
import { IoSearch } from "react-icons/io5";
import Loader from "../../components/Loader";
import { FaPlus } from "react-icons/fa6";
import CustomTooltip from "../../components/shared/CustomTooltip";
import { startLoading, stopLoading } from "../../store/actions/LoadingAction";
import { sendNotification } from "../../utils/notifications";
import { addToCart } from "../../services/api/products";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import "./product.css";

const Productlist = ({ activeCategory }) => {
  const productList = useSelector((state) => state?.products);
  const { userId, refreshList, setRefreshList } = useLocalStorage();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleGoTo = (id) => {
    navigate(`/product/${id}`);
  };

  const updatedProductList = productList?.filter((product) => {
    return activeCategory === "All"
      ? product
      : product?.category === activeCategory;
  });

  // adding product to cart
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
    <Row>
      {updatedProductList?.length ? (
        updatedProductList.map((product) => {
          return (
            <Col
              key={product?.id}
              xs={10}
              sm={6}
              md={4}
              xl={3}
              className="mb-4 mx-auto"
            >
              <div className="product_card_container bg-body-tertiary cursor h-100 position-relative overflow-hidden">
                <div className="product_img_container flexCenter">
                  <img
                    src={product?.image ? product.image : defaultProductImg}
                    alt="product"
                    className="w-50 h-50"
                  />
                </div>
                <div className="product_details mt-4 px-4">
                  <p className="fw-medium mb-2">
                    {product?.title?.substring(0, 40)}
                  </p>
                  <p className="mb-3">${product?.price}</p>
                </div>

                <div className="position-absolute top-0 start-0 w-100 h-100 product__overlay d-flex justify-content-end">
                  <div className="d-flex flex-column p-3 gap-1">
                    <CustomTooltip msg="Details">
                      <button
                        className="rounded-circle border-0 bg-body-tertiary search__icon"
                        style={{
                          height: "40px",
                          width: "40px",
                        }}
                        onClick={() => handleGoTo(product?.product_id)}
                      >
                        <IoSearch color="black" />
                      </button>
                    </CustomTooltip>
                    <CustomTooltip msg="Add to cart">
                      <button
                        className="rounded-circle border-0 bg-body-tertiary search__icon"
                        style={{
                          height: "40px",
                          width: "40px",
                        }}
                        onClick={() => handleAddtoCart(product)}
                      >
                        <FaPlus color="black" />
                      </button>
                    </CustomTooltip>
                  </div>
                </div>
              </div>
            </Col>
          );
        })
      ) : (
        <Loader />
      )}
    </Row>
  );
};

export default Productlist;
