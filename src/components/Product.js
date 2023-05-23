import React, { useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import sale from "../assets/sale-tag.png";
import { Link } from "react-router-dom";

const Product = () => {
  const isLogin = localStorage.getItem("token");
  const { fetchProduct, product } = useContext(GlobalContext);
  var array2 = product.slice(0, 5);

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="w-[100%] relative">
      <div className="w-[90%] left-[5%] relative flex justify-end top-[4rem]">
        {isLogin === null ? (
          <Link to="/login">
            <p className="text-bold text-xl text-[#2DCFC1]">Selengkapnya</p>
          </Link>
        ) : (
          <Link to="/Product">
            <p className="text-bold text-xl text-[#2DCFC1]">Selengkapnya</p>
          </Link>
        )}
      </div>
      <div className="relative w-[90%] left-[5%] grid grid-cols-5 gap-8  mt-20 ">
        {array2.map((produk, index) => (
          <div
            key={produk.id}
            className="border border-[#2DCFC1] shadow-md rounded-md p-[1rem] "
          >
            {produk.is_diskon === true ? (
              <div className=" absolute ">
                <img
                  src={sale}
                  alt=""
                  className="relative w-[50px] h-[50px] -top-5 -left-5 "
                />
              </div>
            ) : (
              <p></p>
            )}

            <img
              src={produk.image_url}
              alt=""
              className="object-scale-down  w-[200px] h-[200px]"
            />
            <p>{produk.name}</p>
            {produk.is_diskon === true ? (
              <p className="line-through">Rp {produk.harga}</p>
            ) : (
              <p>Rp {produk.harga}</p>
            )}

            {produk.is_diskon === true ? (
              <p>Rp {produk.harga_diskon}</p>
            ) : (
              <p></p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
