import React, { useState } from "react";
import { Col, Dropdown, Row } from "react-bootstrap";

const ProductCategory = ({ setActiveCategory }) => {
  const [isActive, setIsActive] = useState(null);

  const categoryList = [
    "All",
    "men's clothing",
    "electronics",
    "jewelery",
    "women's clothing",
  ];

  const handleCategoryFilter = (category, index) => {
    setIsActive(index);
    setActiveCategory(category);
  };

  return (
    <div className="text-center mb-5">
      <h1 className="mb-5">Latest Products</h1>
      <div className="d-flex justify-content-end">
        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            id="dropdown-basic"
            className="px-5 bg-body-tertiary border-0"
          >
            {isActive === null ? "Category" : categoryList[isActive]}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {categoryList?.length
              ? categoryList.map((category, index) => {
                  return (
                    <Dropdown.Item
                      key={index}
                      href="#/action-1"
                      onClick={() => handleCategoryFilter(category, index)}
                    >
                      {category}
                    </Dropdown.Item>
                  );
                })
              : null}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {/* <Row>
        {categoryList?.length
          ? categoryList.map((category, index) => {
              return (
                <Col className="d-flex justify-content-center mb-3" key={index}>
                  <button
                    key={category}
                    className={`w-100 mx-3 py-3 px-5 btn text-capitalize ${
                      isActive === index ? "btn-dark" : "btn-outline-dark"
                    }`}
                    onClick={() => handleCategoryFilter(category, index)}
                  >
                    {category}
                  </button>
                </Col>
              );
            })
          : null}
      </Row> */}
    </div>
  );
};

export default ProductCategory;
