import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <section className="flexCenter text-black bg-body-tertiary min-vh-100">
      <div className="d-flex flex-column">
        <Spinner animation="border" role="status" className="mb-2"></Spinner>
        <span className="text-center">Loading........</span>
      </div>
    </section>
  );
};

export default Loader;
