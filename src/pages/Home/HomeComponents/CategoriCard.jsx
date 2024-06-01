import { Link } from "react-router-dom";
import img from "../../../assets/images/pngwing.com (4).png";
import { GiMedicines } from "react-icons/gi";
const CategoriCard = () => {
  return (
    <Link>
      <div className="relative flex justify-center text-center border p-7 py-10 shadow-inner group shadow-secondary cursor-pointer">
        <div className="absolute top-2 right-2 flex gap-2 items-center shadow-inner shadow-secondary border px-2">item: 20 <GiMedicines className="text-xl text-primary" /> </div>
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
