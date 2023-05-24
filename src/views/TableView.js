import React from "react";
import Table from "../components/Table";
import MainLayout from "../layouts/MainLayout";
import { Helmet } from "react-helmet";

const TableView = () => {
  return (
    <div>
      <Helmet>
        <title>Table View</title>
      </Helmet>
      <MainLayout>
        <Table />
      </MainLayout>
    </div>
  );
};

export default TableView;
