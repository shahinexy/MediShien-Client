import { Link } from "react-router-dom";
import { GiMedicines } from "react-icons/gi";
import { PropTypes } from "prop-types";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const CategoriCard = ({ category }) => {
  const axiosPublic = useAxiosPublic()
  const {data} = useQuery({
    queryKey: [category?.categoryName],
    queryFn: async ()=>{
      const res = await axiosPublic.get(`/medicines/category/${category?.categoryName}`)
      return res.data;
    }
  })
  
  return (
    <Link to={`/categoryPage/${category.categoryName}`}>
      <div className="relative flex justify-center text-center duration-300 shadow-lg hover:shadow-secondary/50 p-7 py-10  group cursor-pointer">
        <div className="absolute top-4 right-4 flex gap-1 items-center shadow-sm text-primary shadow-secondary border px-2">
          {data?.length} <GiMedicines className="text-xl text-primary" />
        </div>
        <div>
          <img
            className="w-24 group-hover:rotate-12 group-hover:scale-110 duration-500"
            src={category.photo}
            alt=""
          />
          <h3 className=" text-2xl font-medium mt-7 group-hover:underline">
            {category.categoryName}
          </h3>
        </div>
      </div>
    </Link>
  );
};

CategoriCard.propTypes = {
  category: PropTypes.object,
};

export default CategoriCard;
