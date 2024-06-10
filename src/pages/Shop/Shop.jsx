import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loader from "../../components/Loader";
import { PiShoppingCartFill } from "react-icons/pi";
import MedicineDetails from "../../components/MedicineDetails";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import { ImSortAmountDesc } from "react-icons/im";
import { Dropdown } from "keep-react";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const Shop = () => {
  const [searchFilter, setSearchFilter] = useState("");
  const [asc, setAsc] = useState("non");
  const { user, loader } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data, isPending } = useQuery({
    queryKey: ["allMedicine", asc],
    queryFn: async () => {
      const res = await axiosPublic.get(`/medicines?sort=${asc}`);
      return res.data;
    },
  });

  const handleAddCart = (medicine) => {
    if (!user) {
      return navigate("/login");
    }

    const { _id, ...rest } = medicine;

    const medicineInfo = {
      ...rest,
      medicineId: medicine._id,
      buyerEmail: user.email,
      quantity: 1,
    };
    console.log(medicineInfo);

    axiosSecure
      .post("/cartItem", medicineInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            title: "SuccessFull",
            text: "Your Item has been saved.",
            icon: "success",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  if (isPending || loader) return <Loader></Loader>;
  return (
    <div className="max-w-7xl mx-auto mt-28 mb-20">
      <Helmet>
        <title>Shop</title>
      </Helmet>
      <div className="flex justify-between bg-secondary p-2 text-white items-center">
        <p className="text-xl font-semibold ">Shop Now</p>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div>
          <Dropdown
            action={
              <div className="flex items-center gap-2 text-lg w-20 justify-center">
                Sort <ImSortAmountDesc />
              </div>
            }
            actionClassName="bg-secondary py-2 px-5 rounded-none hover:bg-[#44adb0] hover:scale-95 duration-300"
            className="rounded-none bg-secondary w-40"
          >
            <Dropdown.List>
              <Dropdown.Item
                onClick={() => setAsc("asc")}
                className="text-black text-sm border-b border-white rounded-none"
              >
                Low to high $
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setAsc("dsc")}
                className="text-black text-sm border-b border-white rounded-none"
              >
                High to low $
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setAsc("non")}
                className="text-black text-sm rounded-none"
              >
                Default
              </Dropdown.Item>
            </Dropdown.List>
          </Dropdown>
        </div>

        <form>
          <div className="flex gap-3 justify-between items-center bg-secondary">
            <input
              className="flex-1  bg-black/15 px-3 py-3 outline-none text-white"
              type=""
              placeholder="name, company"
            />
            <button className="w-full  pr-4 pl-2 text-xl text-white">
              <FaSearch />{" "}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full  text-left whitespace-nowrap">
          <thead>
            <tr className="text-left text-lg bg-secondary/70 text-white">
              <th className="p-3">No.</th>
              <th className="py-3 pl-3 ">Image</th>
              <th className="p-3 ">Medicine Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Description</th>
              <th className="p-3">Price</th>
              <th className="p-3">Discount Price</th>
              <th className="p-3">View</th>
              <th className="p-3">Add to Cart</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((medicine, idx) => (
              <tr
                key={medicine._id}
                className="bg-secondary/10 border-b border-secondary/30 hover:bg-secondary/30"
              >
                <td className="px-3 py-2 pl-4">{idx + 1}.</td>
                <td className="pl-3 py-2 bg-secondary/10">
                  <img className="w-16 h-12" src={medicine?.photo} alt="" />
                </td>
                <td className="px-3 py-2 ">
                  <div>
                    <p className="font-medium">{medicine?.medicienName}</p>
                    <small>{medicine.genericName}</small>
                  </div>
                </td>
                <td className="px-3 py-2">{medicine?.category}</td>
                <td className="px-3 py-2">
                  {medicine.description.slice(0, 50)}...
                </td>
                <td className="px-3 py-2 font-medium text-center">
                  {medicine?.price}$
                </td>
                <td className="px-3 py-2 font-medium text-center">
                  {medicine?.discountPrice?.toFixed(2)}$
                </td>
                <td className="px-3 py-2 ">
                  <div className="flex justify-center items-center">
                    <div className="inline-block">
                      <MedicineDetails medicine={medicine}></MedicineDetails>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-2">
                  <div className="flex justify-center items-center">
                    <div className="inline-block mx-auto">
                      <PiShoppingCartFill
                        onClick={() => handleAddCart(medicine)}
                        className="text-3xl text-green-800 hover:text-green-700 cursor-pointer hover:scale-[1.15] hover:rotate-3 duration-500"
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Shop;
