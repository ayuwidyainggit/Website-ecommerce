import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailProduct = () => {
  const { id } = useParams();
  const [produkId, setProdukId] = useState([]);

  const fetchDetailProduct = async () => {
    try {
      const response = await axios.get(
        `https://api-project.amandemy.co.id/api/final/products/${id}`
      );
      setProdukId([response.data.data]);
      console.log(produkId);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDetailProduct();
  }, []);

  return (
    <div className="mt-14 ">
      <div className="relative pt-8">
        <p className="text-center  font-bold text-[#2DCFC1] text-[25px]">
          Detail Product
        </p>
      </div>

      {produkId.map((produk) => (
        <div className="w-[90%] relative flex left-[5%]  pt-4" key={produk.id}>
          <div className="relative flex justify-center   w-[40%] ">
            <img src={produk.image_url} alt="" />
          </div>
          <div className="relative   w-[60%]">
            <div className="relative  w-[90%] left-[5%]">
              <div className="flex relative">
                <p className="w-[40%] font-bold text-[#2DCFC1] text-[18px]">
                  {produk.name}
                </p>
                <p className="w-[60%] font-bold text-[#2DCFC1] text-[15px] ">
                  {produk.category}
                </p>
              </div>
              <div className="flex relative">
                <p className=" w-[40%]">Harga Barang </p>
                <p className=" w-[60%]">: {produk.harga_display}</p>
              </div>
              <div className="flex relative">
                <p className=" w-[40%]">Harga Diskon </p>
                <p className=" w-[60%] ">
                  <span>:</span>{" "}
                  <span className="line-through">
                    {" "}
                    {produk.harga_diskon_display}
                  </span>
                </p>
              </div>
              <div className="flex relative">
                <p className=" w-[40%]">Stock </p>
                <p className="w-[60%]">: {produk.stock}</p>
              </div>
              <div className="flex relative">
                <p className="w-[40%]">Deskripsi </p>
                <p className="w-[60%]">: {produk.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailProduct;
