import React from "react";
import Product from "../components/Product";
import MainLayout from "../layouts/MainLayout";
import Jumbotron from "../components/Jumbotron";
import { Helmet } from "react-helmet";

const Home = () => {
  const Token = localStorage.getItem("token");
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <MainLayout>
        <Jumbotron />
        <Product />
      </MainLayout>
    </div>
  );
};

export default Home;
