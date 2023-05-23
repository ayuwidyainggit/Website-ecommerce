import React from "react";
import AddProduct from "../components/AddProduct";
import MainLayout from "../layouts/MainLayout";
import Login from "./Login";
import { Helmet } from "react-helmet";

const AddProductView = () => {
  const Token = localStorage.getItem("token");
  return (
    <div>
      <Helmet>
        <title>Add Product</title>
      </Helmet>
      <MainLayout>
        <AddProduct />
      </MainLayout>
    </div>
  );
};

export default AddProductView;
