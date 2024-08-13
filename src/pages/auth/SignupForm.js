import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { errorListtoObj } from "../../utils/helper";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { sendNotification } from "../../utils/notifications";
import { registerUser } from "../../services/api/user";

const SignupForm = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value.trim(),
    });
  };

  console.log(errors, "errors");
  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await registerUser(user);

    if (res?.status === 201) {
      sendNotification("success", res?.data?.message);
      navigate("/login");
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
                <h1 className="mb-4 text-center">Signup Form</h1>
                <div className="mb-3">
                  <input
                    type="text"
                    autoComplete="off"
                    className="px-2 py-3 rounded border-0 w-100"
                    value={user.username}
                    name="username"
                    onChange={handleChange}
                    placeholder="Username ........."
                  />
                </div>
                <p className="text-danger">
                  {errors?.username ? errors.username : ""}
                </p>
                <div className="mb-3">
                  <input
                    type="text"
                    autoComplete="off"
                    className="px-2 py-3 rounded border-0 w-100"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder=" Email .........."
                  />
                </div>
                <p className="text-danger">
                  {errors?.email ? errors.email : ""}
                </p>
                <div className="mb-3">
                  <input
                    type="text"
                    autoComplete="off"
                    className="px-2 py-3 rounded border-0 w-100"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    placeholder=" Mobile Number .........."
                  />
                </div>
                <p className="text-danger">
                  {errors?.phone ? errors.phone : ""}
                </p>

                <div className="mb-3">
                  <input
                    type="password"
                    autoComplete="off"
                    className="px-2 py-3 rounded border-0 w-100"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder=" Password .........."
                  />
                </div>
                <p className="text-danger">
                  {errors?.password ? errors.password : ""}
                </p>
                <button
                  className="btn btn-dark w-100 py-2 mb-3"
                  onClick={handleSubmit}
                >
                  SUBMIT
                </button>
                <Link to="/login">
                  <button className="btn btn-outline-dark w-100 py-2">
                    LOGIN
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

export default SignupForm;
