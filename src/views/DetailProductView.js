import React from "react";
import MainLayout from "../layouts/MainLayout";
import DetailProduct from "../components/DetailProduct";
import { Helmet } from "react-helmet";

const DetailProductView = () => {
  return (
    <div>
      <Helmet>
        <title>Product Detail</title>
      </Helmet>
      <MainLayout>
        <DetailProduct />
      </MainLayout>
    </div>
  );
};

export default DetailProductView;
