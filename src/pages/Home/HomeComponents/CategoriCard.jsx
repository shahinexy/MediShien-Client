import { Link } from "react-router-dom";
import img from "../../../assets/images/pngwing.com (4).png";
import { GiMedicines } from "react-icons/gi";
const CategoriCard = () => {
  return (
    <Link>
      <div className="relative flex justify-center text-center bg-secondary/10 hover:bg-secondary/20 duration-300 shadow-lg p-7 py-10  group cursor-pointer">
        <div className="absolute top-4 right-4 flex gap-1 items-center shadow-sm text-primary shadow-secondary border px-2"> 20 <GiMedicines className="text-xl text-primary" /> </div>
        <div>
          <img
            className="w-52 group-hover:rotate-12 group-hover:scale-110 duration-500"
            src={img}
            alt=""
          />
          <h3 className="text-secondary text-2xl font-medium mt-7 group-hover:underline">
            Tis is title for this{" "}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoriCard;
