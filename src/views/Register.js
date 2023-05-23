import React, { useState } from "react";
import login from "../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const initialState = {
  name: "",
  username: "",
  email: "",
  password: "",
  password_confirmation: "",
};

const schemaValidation = Yup.object({
  name: Yup.string().required("email Wajib diisi"),
  username: Yup.string().required("username Wajib diisi"),
  email: Yup.string().required("email Wajib diisi"),
  password: Yup.string().required("Password Url wajib diisi"),
  password_confirmation: Yup.string().required(
    "password_confirmation Url wajib diisi"
  ),
});

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState(initialState);
  const Swal = require("sweetalert2");

  const onSubmit = async () => {
    try {
      const response = await axios.post(
        "https://api-project.amandemy.co.id/api/register",
        {
          name: values.name,
          username: values.username,
          email: values.email,
          password: values.password,
          password_confirmation: values.password_confirmation,
        }
      );
      Swal.fire({
        title: "Register Successfully!",
        text: "Register successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/Website-ecommerce/login");
    } catch (error) {
      Swal.fire({
        title: "Register Error!",
        text: error.response.data.info,
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  const {
    handleChange,
    values,
    handleSubmit,
    resetForm,
    errors,
    handleBlur,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: input,
    onSubmit: onSubmit,
    validationSchema: schemaValidation,
    enableReinitialize: true,
  });

  return (
    <div>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className=" relative flex h-[100vh] justify-center items-center bg-[#f2eded]">
        <div className=" relative flex h-[80vh] w-[90%] justify-between   drop-shadow-md/">
          <div className=" justify-center w-[50%] relative flex bg-[#2DCFC1] rounded-l-lg items-center">
            <div className=" w-[50%] h-[80%]">
              <img src={login} alt="" className="" />
              <h1 className="text-center pt-4 text-white text-3xl">
                Instant Support & Replay
              </h1>
              <p className="text-center pt-4 text-white text-md">
                Vibex will receive your order and be able to reply to you once.
                You place an order and ask for help.
              </p>
            </div>
          </div>
          <div className=" w-[50%] bg-white rounded-r-lg relative flex justify-center items-center">
            <div className=" w-[80%] h-[80%]">
              <p className="text-[#2DCFC1] text-2xl">
                Vibe<span className="text-[#FDCC50]">X</span>
              </p>
              <p className="pt-4 text-4xl font-bold">Register</p>
              <div className="relative flex">
                <div className="pt-4">
                  <p>Name</p>
                  <input
                    type="text"
                    placeholder="type your name"
                    className="border border-[#CED4DA] w-[95%] h-[50px] pl-4 rounded-lg"
                    name="name"
                    onChange={handleChange}
                    value={values.name}
                    onBlur={handleBlur}
                  />
                  <p className="col-span-3 text-red-500">
                    {touched.name === true && errors.name}
                  </p>
                </div>
                <div className="pt-4">
                  <p>Username</p>
                  <input
                    type="text"
                    placeholder="type your username"
                    className="border border-[#CED4DA] w-[95%] h-[50px] pl-4 rounded-lg"
                    name="username"
                    onChange={handleChange}
                    value={values.username}
                    onBlur={handleBlur}
                  />
                  <p className="col-span-3 text-red-500">
                    {touched.username === true && errors.username}
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <p>Email</p>
                <input
                  type="text"
                  placeholder="type your email"
                  className="border border-[#CED4DA] w-[75%] h-[50px] pl-4 rounded-lg"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  onBlur={handleBlur}
                />
                <p className="col-span-3 text-red-500">
                  {touched.email === true && errors.email}
                </p>
              </div>
              <div className="relative flex">
                <div className="pt-4">
                  <p>Password</p>
                  <input
                    type="password"
                    placeholder="type your password"
                    className="border border-[#CED4DA] w-[95%] h-[50px] pl-4 rounded-lg"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    onBlur={handleBlur}
                  />
                  <p className="col-span-3 text-red-500">
                    {touched.password === true && errors.password}
                  </p>
                </div>
                <div className="pt-4">
                  <p>Confirm Password</p>
                  <input
                    type="password"
                    placeholder="type your confirm password"
                    className="border border-[#CED4DA] w-[95%] h-[50px] pl-4 rounded-lg"
                    name="password_confirmation"
                    onChange={handleChange}
                    value={values.password_confirmation}
                    onBlur={handleBlur}
                  />
                  <p className="col-span-3 text-red-500">
                    {touched.password_confirmation === true &&
                      errors.password_confirmation}
                  </p>
                </div>
              </div>
              <div className="pt-4">
                <button
                  onClick={onSubmit}
                  className="bg-[#2DCFC1] w-[75%] h-[40px] rounded-lg"
                >
                  Register
                </button>
                <p className="text-sm">
                  already have an account?{" "}
                  <Link to="/">
                    <span className="text-lg pt-4 text-[#2DCFC1]">Login</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
