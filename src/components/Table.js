import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import axios from "axios";
import { Link } from "react-router-dom";
import edit from "../assets/edit.png";
import hapus from "../assets/delete.png";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";

const Table = () => {
  const Swal = require("sweetalert2");
  const { fetchProduct, product, setDiskon, loading } =
    useContext(GlobalContext);
  const [produkUpdate, setProdukUpdate] = useState(false);
  const [filter, setFilter] = useState({
    search: "",
    highlight: "",
  });
  const [productsFilter, setProductsFilter] = useState([]);

  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
    },
    {
      name: "name",
      selector: (row) => row.name,
    },
    {
      name: "harga_display",
      selector: (row) => row.harga_display,
    },
    {
      name: "is_diskon",
      selector: (row) => row.is_diskon,
    },
    {
      name: "harga_diskon_display",
      selector: (row) => row.harga_diskon_display,
    },
    {
      name: "image_url",
      selector: (row) => <img src={row.image_url} />,
    },
    {
      name: "category",
      selector: (row) => row.category,
    },
    {
      name: "Aksi",
      selector: (row) => (
        <div className="relative flex justify-between">
          <Link to={`/Website-ecommerce/editProduk/${row.id}`}>
            <button onClick={() => onUpdate(productsFilter)}>
              <img src={edit} alt="" className="w-[30px]" />
            </button>
          </Link>
          <button onClick={() => onDelete(row.id)}>
            <img src={hapus} alt="" className="w-[30px]" />
          </button>
        </div>
      ),
    },
  ];
  const handleChange = (event) => {
    if (event.target.name === "search") {
      setFilter({ ...filter, search: event.target.value });
    } else if (event.target.name === "highlight") {
      setFilter({ ...filter, highlight: event.target.value });
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    setProductsFilter(product);
  }, [product]);

  const handleSearch = () => {
    console.log(filter);
    console.log(product);
    let productArr = structuredClone(product);
    if (filter.search !== "") {
      productArr = productArr.filter((product) => {
        return product.name.includes(filter.search);
      });
    }
    if (filter.highlight !== "") {
      productArr = productArr.filter((product) => {
        return product.category === filter.highlight;
      });
    }

    setProductsFilter(productArr);
  };

  const handleReset = () => {
    setFilter({
      search: "",
      highlight: "",
    });
    setProductsFilter(product);
  };

  const onDelete = async (id) => {
    try {
      alert("Apakah anda yakin akan menghapus produk ini?");
      const response = await axios.delete(
        `https://api-project.amandemy.co.id/api/products/${id}`
      );
      Swal.fire({
        title: "Success!",
        text: "Delete produk berhasil ",
        icon: "success",
        confirmButtonText: "OK",
      });
      fetchProduct();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error,
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  // untuk kebutuhan edit
  const onUpdate = async (produk) => {
    setProdukUpdate(produk);
    setDiskon(produk.is_diskon);
  };

  return (
    <div>
      <div className="mt-14 bg-[#F9F9F9]">
        <p className="text-center pt-8 font-bold text-[#003049] text-[25px]">
          Table Product
        </p>
        <div className=" relative flex justify-between w-[90%] left-[5%] items-center pb-4">
          <div className="relative flex w-[80%]">
            <div className="relative flex w-[60%] justify-between">
              <div className="relative flex w-[55%] justify-between">
                <select
                  onChange={handleChange}
                  name="highlight"
                  value={filter.highlight}
                  id=""
                  className="border border-[#2DCFC1] h-8 w-36 rounded-sm"
                >
                  <option value="" disabled>
                    Pilih Kategori
                  </option>
                  <option value="teknologi">teknologi</option>
                  <option value="makanan">makanan</option>
                  <option selected value="minuman">
                    minuman
                  </option>
                  <option value="hiburan">hiburan</option>
                  <option value="kendaraan">kendaraan</option>
                </select>
                <input
                  type="text"
                  onChange={handleChange}
                  name="search"
                  value={filter.search}
                  placeholder="search ..."
                  className="border border-[#2DCFC1] h-8 w-[200px] rounded-sm pl-4 ml-4"
                />
              </div>
              <button
                onClick={handleSearch}
                className="border border-[#2DCFC1] rounded-sm h-8 w-[120px] hover:bg-[#2DCFC1] hover:text-white"
              >
                Find
              </button>

              <button
                onClick={handleReset}
                className="border border-red-600 rounded-sm h-8 w-[120px] hover:bg-red-600 hover:text-white"
              >
                Reset
              </button>
            </div>
          </div>
          <Link to="/Website-ecommerce/addProduk">
            <button className="font-bold border border-[#003049] bg-white text-[#003049] hover:bg-[#003049] hover:text-white h-[35px] w-[150px] rounded-xl">
              Create Produk +{" "}
            </button>
          </Link>
        </div>
        <div className="relative  justify-between w-[90%] left-[5%]">
          <DataTable
            title="Tabel Product"
            columns={columns}
            data={productsFilter}
            progressPending={loading}
            pagination
          />
        </div>

        {/* <div className="relative flex justify-center pt-6 w-[90%] left-[5%]">
          {loading === true ? (
            <h1 className="text-center text-2xl font-bold">Loading ...</h1>
          ) : (
            <table className="table-auto w-[100%]">
              <thead>
                <tr className="bg-[#2DCFC1] text-white h-[50px]">
                  <th className="border border-slate-300">ID</th>
                  <th className="border border-slate-300">Nama</th>
                  <th className="border border-slate-300">Status Diskon</th>
                  <th className="border border-slate-300">Harga</th>
                  <th className="border border-slate-300">Harga Diskon</th>
                  <th className="border border-slate-300">Gambar</th>
                  <th className="border border-slate-300">Kategori</th>
                  <th className="border border-slate-300">Action</th>
                </tr>
              </thead>

              <tbody dataSource={productsFilter}>
                {productsFilter.map((produk, index) => (
                  <tr key={produk.id}>
                    <td className="border border-slate-300 w-[5%] text-center">
                      {produk.id}
                    </td>
                    <td className="border border-slate-300 w-[20%] text-center">
                      {produk.name}
                    </td>
                    <td className="border border-slate-300 w-[20%] text-center">
                      {produk.is_diskon === true ? <p>DISKON</p> : <p>G</p>}
                    </td>
                    <td className="border border-slate-300 w-[20%] text-center">
                      {produk.harga_display}
                    </td>
                    <td className="border border-slate-300 w-[20%] text-center">
                      {produk.harga_diskon_display}
                    </td>
                    <td className="border border-slate-300 w-[30%] ">
                      <img className="w-[90px]" src={produk.image_url} alt="" />
                    </td>
                    <td className="border border-slate-300 w-[20%] text-center">
                      {produk.category}
                    </td>
                    <td className="border border-slate-300 w-[30%] text-center">
                      <div className=" relative flex justify-around">
                        <Link to={`/Website-ecommerce/editProduk/${produk.id}`}>
                          <button onClick={() => onUpdate(produk)}>
                            <img src={edit} alt="" />
                          </button>
                        </Link>

                        <button onClick={() => onDelete(produk.id)}>
                          <img src={hapus} alt="" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Table;
