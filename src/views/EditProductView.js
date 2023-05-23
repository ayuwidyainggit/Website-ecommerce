import React from "react";
import MainLayout from "../layouts/MainLayout";
import EditProduct from "../components/EditProduct";
import Login from "./Login";
import { Helmet } from "react-helmet";

const EditProductView = () => {
  return (
    <div>
      <Helmet>
        <title>Edit Product</title>
      </Helmet>
      <MainLayout>
        <EditProduct />
      </MainLayout>
    </div>
  );
};

export default EditProductView;
