import React from "react";
import Navbar from "../components/Navbar";

const MainLayout = (props) => {
  return (
    <React.Fragment>
      <Navbar />
      {props.children}
    </React.Fragment>
  );
};

export default MainLayout;
