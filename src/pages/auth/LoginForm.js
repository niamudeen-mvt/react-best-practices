import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { errorListtoObj } from "../../utils/helper";
import { sendNotification } from "../../utils/notifications";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api/user";

const LoginForm = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await loginUser(user);

    if (res?.status === 200) {
      sessionStorage.setItem("userId", res?.data?.userId);
      sessionStorage.setItem("access_token", res?.data?.access_token);
      sessionStorage.setItem("refresh_token", res?.data?.refresh_token);
      sendNotification("success", res?.data?.message);
      navigate("/");
    } else {
      setErrors(errorListtoObj(res?.response?.data?.errors));
    }
  };

  return (
    <section className="common_section">
      <Container>
        <div style={{ height: "80vh" }}>
          <Row>
            <Col className="mx-auto" xs={12} lg={6}>
              <form className="p-5 w-100 bg-body-tertiary">
                <h1 className="mb-4 text-center">Login Form</h1>
                <div className="mb-3 ">
                  <input
                    type="text"
                    className="px-2 py-3 rounded border-0 w-100"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder=" Email .........."
                    autoComplete="off"
                  />
                </div>
                <p className="text-danger">
                  {errors?.email ? errors.email : ""}
                </p>

                <div className="mb-3">
                  <input
                    type="password"
                    className="px-2 py-3 rounded border-0 w-100"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder=" Password .........."
                    autoComplete="off"
                  />
                </div>
                <p className="text-danger">
                  {errors?.password ? errors.password : ""}
                </p>
                <button
                  className="btn btn-dark w-100 mb-3 py-2"
                  onClick={handleSubmit}
                >
                  SUBMIT
                </button>
                <Link to="/signup">
                  <button className="btn btn-outline-dark w-100 py-2">
                    SIGNUP
                  </button>
                </Link>
              </form>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default LoginForm;
