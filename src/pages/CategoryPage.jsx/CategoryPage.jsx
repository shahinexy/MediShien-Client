import { PiShoppingCartFill } from "react-icons/pi";
import { useLoaderData, useNavigate } from "react-router-dom";
import MedicineDetails from "../../components/MedicineDetails";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const CategoryPage = () => {
  const data = useLoaderData();
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()

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

  return (
    <div className="max-w-7xl mx-auto mt-28 mb-20">
            <Helmet>
        <title>MediShine Category</title>
      </Helmet>

      <div className="flex justify-between bg-secondary p-2 text-white items-center">
        <p className="text-xl font-semibold ">{data[0].category}</p>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full  text-left whitespace-nowrap">
          <thead>
            <tr className="text-left text-lg bg-secondary/70 text-white">
              <th className="p-3">No.</th>
              <th className="p-3">Image</th>
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
                <td className="px-3 py-2 bg-secondary/10 flex justify-center">
                  <img className="w-20 h-16" src={medicine?.photo} alt="" />
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

export default CategoryPage;
