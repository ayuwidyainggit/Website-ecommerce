import React from "react";
import Navbar from "../components/Navbar";
import Login from "./Login";
import MainLayout from "../layouts/MainLayout";
import ProductAfterLogin from "../components/ProductAfterLogin";
import { Helmet } from "react-helmet";

const ProductView = () => {
  const Token = localStorage.getItem("token");
  return (
    <div>
      {Token === null ? (
        <div>
          {alert("Anda harus melakukan login terlebih dahulu")}
          <Login />
        </div>
      ) : (
        <div>
          <Helmet>
            <title>Product List</title>
          </Helmet>
          <MainLayout>
            <Navbar />
            <ProductAfterLogin />
          </MainLayout>
        </div>
      )}
    </div>
  );
};

export default ProductView;
