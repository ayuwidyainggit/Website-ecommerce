import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import person from "../assets/user.png";
import logoutImage from "../assets/logout.png";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [navbar, setNavbar] = useState(false);
  const [profile, setProfile] = useState(false);
  const Token = localStorage.getItem("token");

  const changeBackground = () => {
    // console.log(window.scrollY);
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  const handleProfile = () => {
    setProfile(!profile);
  };

  const onLogout = async () => {
    try {
      const response = axios.post(
        "https://api-project.amandemy.co.id/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setProfile(false);
      alert("Berhasil Logout");
      navigate("/");
    }
  };

  window.addEventListener("scroll", changeBackground);

  return (
    <div>
      <div className={navbar ? "navbar-fixed" : "navbar"}>
        <div className=" w-[20%] relative left-8">
          {" "}
          <p className="text-[#2DCFC1] text-2xl">
            Vibe<span className="text-[#FDCC50]">X</span>
          </p>
        </div>
        <div className=" w-[60%]">
          <ul className="relative flex justify-around bg-[#2DCFC1] rounded-full w-[80%] left-[10%] h-[40px] items-center">
            <li className="w-[20%] text-white font-bold text-[20px] leading-[56px] top-[1px] hover:text-[#FDCC50] cursor-pointer text-center">
              <Link to="/">
                <p>Home</p>
              </Link>
            </li>
            <li className=" w-[20%] text-white font-bold text-[20px] leading-[56px] top-[1px] hover:text-[#FDCC50] cursor-pointer text-center ">
              <Link to="/Product">Product</Link>
            </li>
            <li className=" w-[20%] text-white font-bold text-[20px] leading-[56px] top-[1px] hover:text-[#FDCC50] cursor-pointer text-center">
              <Link to="/Table">Table</Link>
            </li>
          </ul>
        </div>

        {Token === null ? (
          <div className="w-[15%] relative flex justify-between right-8 ">
            <Link to="/Login">
              <button className="bg-[#FDCC50] rounded-sm w-[100px] h-[40px] text-white hover:text-[#2DCFC1]">
                Login
              </button>
            </Link>
            <Link to="/Register">
              <button className="bg-[#2DCFC1] rounded-sm w-[100px] h-[40px] text-white hover:text-[#FDCC50]">
                Register
              </button>
            </Link>
          </div>
        ) : (
          <div className=" w-[20%] relative flex justify-end right-8">
            <img
              src={person}
              alt=""
              className="w-[10%] h-[10%] relative right-3"
              onClick={handleProfile}
            />{" "}
            <p className="text-[#2DCFC1]">Account</p>
          </div>
        )}
      </div>
      {profile ? (
        <div className="relative flex justify-end top-12 right-4">
          <div className="drop-shadow-lg w-[200px] h-[100px] bg-white rounded-lg absolute z-10 ">
            <div className="p-2 relative justify-between">
              <div className="relative flex justify-between">
                <p>
                  Hello
                  {localStorage.getItem("user")}
                </p>
              </div>
              <div
                onClick={onLogout}
                className="relative flex justify-between w-[50%] top-4"
              >
                <img src={logoutImage} alt="" className="w-[30px] h-[30px]" />
                <button> Logout</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default Navbar;
