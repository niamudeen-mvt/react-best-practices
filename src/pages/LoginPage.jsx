import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../components/shared/Input";
import { setDataIntoLc, VALIDATE_USER_DETAIL } from "../utils/helper";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../utils/axios";
import { updateAuthUser } from "../store/features/authSlice";
import { sendNotification } from "../utils/notifications";


export default function LoginPage() {


  const [user, setUser] = useState({
    email: "",
    password: "",
  });


  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleOnChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };


  const { mutate, isPending } = useMutation({
    mutationFn: async (user) => {
      const response = await axiosInstance.post("/auth/login", user)
      return response?.data || {}
    },
    onSuccess: (response) => {
      if (response?.code === 'SUCCESS') {
        const { token, user } = response
        dispatch(updateAuthUser(user))
        setDataIntoLc("token", token)
        setDataIntoLc("userId", user?._id)
        navigate('/products')
      }
    },
    onError: (error) => {

      const errors = error?.response?.data?.errors;

      if (errors && errors.length > 0 && errors[0]?.msg) {
        sendNotification("error", errors[0]?.msg);
      } else if (error?.response?.data?.code === "ERROR") {
        sendNotification("warning", "Something went wrong. Please try again");
      }
    },


  })


  const handleSubmit = (event) => {
    event.preventDefault();

    const { ERRORS, IS_EMPTY } = VALIDATE_USER_DETAIL(user);

    if (IS_EMPTY) {
      return sendNotification("warning", "Please fill all the fields");
    }

    if (ERRORS && ERRORS.length > 0) {
      return sendNotification("error", ERRORS[0]);
    }

    mutate(user)
  };

  return (
    <section className="custom_container min-h-screen  flex_center">
      <form
        className="max-w-[400px] min-h-[500px] mx-auto text-lg p-14 rounded-xl space-y-8 shadow-lg"
        onSubmit={handleSubmit}
      >
        <h2>Sign in</h2>
        <Input
          label="email"
          name="email"
          handleOnChange={handleOnChange}
          value={user.email}
          placeholder="Enter your email"
        />

        <Input
          label="password"
          name="password"
          type="password"
          handleOnChange={handleOnChange}
          value={user.password}
          placeholder="Enter your password"
        />

        <button type="submit" className="btn w-full" >
          {isPending ? 'Loading...' : 'Submit'}
        </button>

        {/* <p className="text-center">
          Don't have an account ?
          <Link to="/signup" className="ml-2 text-black">
            Sign up
          </Link>
        </p> */}

      </form>
    </section>
  );
}