import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loader from "../../components/Loader";
import { PiShoppingCartFill } from "react-icons/pi";
import MedicineDetails from "../../components/MedicineDetails";

const Shop = () => {
  const axiosPublic = useAxiosPublic();
  const { data, isPending } = useQuery({
    queryKey: ["allMedicine"],
    queryFn: async () => {
      const res = await axiosPublic.get("/medicines");
      return res.data;
    },
  });

    console.log(data);

  if (isPending) return <Loader></Loader>;
  return (
    <div className="max-w-7xl mx-auto mt-32 mb-20">
      <div className="mt-6 overflow-x-auto">
        <table className="w-full  text-left whitespace-nowrap">
          <thead>
            <tr className="text-left text-lg bg-secondary/70 text-white">
              <th className="p-3">No.</th>
              <th className="py-3 pl-3 ">Image</th>
              <th className="p-3 ">Medicine Name</th>
              <th className="p-3">Categori</th>
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
                <td className="pl-3 py-2 font-medium">
                  <img className="w-16 h-12" src={medicine?.photo} alt="" />
                </td>
                <td className="px-3 py-2 ">
                  <div>
                    <p className="font-medium">{medicine?.medicienName}</p>
                    <small>{medicine.genericName}</small>
                  </div>
                </td>
                <td className="px-3 py-2 text-center">{medicine?.categori}</td>
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
                        // onClick={() => handleDelete(medicine._id)}
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
