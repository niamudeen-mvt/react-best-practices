import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "./product.css";
import ProductCategory from "./ProductCategory";
import Productlist from "./ProductList";
import HeroSection from "../../components/hero-section";

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  return (
    <>
      <HeroSection />
      <section className="common_section">
        <Container>
          <ProductCategory setActiveCategory={setActiveCategory} />
          <Productlist activeCategory={activeCategory} />
        </Container>
      </section>
    </>
  );
};

export default Products;
