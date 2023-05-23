import React from "react";
import jumbotron from "../assets/HeaderBanner.png";

const Jumbotron = () => {
  return (
    <div className="relative flex top-20 h-[500px] justify-center">
      <div className="w-[90%] relative flex ">
        <div className="w-[50%] relative flex justify-center items-center">
          <div className="w-[90%] h-[60%]">
            <p className="text-4xl font-bold">
              Welcome to {""}
              <span className="text-[#2DCFC1] text-4xl">
                Vibe<span className="text-[#FDCC50]">X</span>
              </span>
            </p>
            <p className="text-lg">
              VibeX is the buying and selling of goods and services, or the
              transmitting of funds or data, over an electronic network,
              primarily the internet.
            </p>
            <div className=" relative flex top-8 justify-between w-[50%]">
              <button className="bg-[#FDCC50] rounded-sm w-[120px] h-[40px] text-white hover:text-[#2DCFC1]">
                Shop Now
              </button>
              <button className="bg-[#2DCFC1] rounded-sm w-[120px] h-[40px] color-white text-white hover:text-[#FDCC50]">
                Contact Us
              </button>
            </div>
          </div>
        </div>
        <div className="w-[50%]">
          <img src={jumbotron} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
