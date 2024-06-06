import { PropTypes } from "prop-types";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
const CartItem = ({ medicine }) => {
  const {
    medicienName,
    genericName,
    categori,
    company,
    price,
    description,
    discount,
    discountPrice,
    massUnit,
    photo,
  } = medicine;
  return (
    <div className="flex gap-3 border border-secondary shadow-lg shadow-secondary/50 sm:p-3 p-2">
      <div className="w-5/12">
        <img className="w-full sm:h-32 h-28" src={photo} alt="" />
      </div>

      <div className="w-7/12">
        <h2 className="sm:text-xl text-lg font-medium text-primary">{medicienName}</h2>

        <div className="flex items-center gap-4 my-2 border-b border-secondary ">
          <p className="flex items-center">
            <input
              type="number"
              className="border border-primary text-primary outline-none w-8 text-center"
              defaultValue={1}
            />
            <p> <IoMdArrowDropup className="text-2xl text-primary m-0 p-0" /> <IoMdArrowDropdown className="text-2xl text-primary" /> </p>
          </p>
          <p className="sm:text-base text-sm sm:font-medium">Price per unit: {price}$</p>
        </div>
        <div className="flex justify-between items-center">
            <p className="sm:font-medium">Total Price: </p>
            <div>
            <RiDeleteBin6Line
                    // onClick={() => handleDelete(category._id)}
                    className="text-3xl text-red-500 hover:text-red-700 cursor-pointer hover:scale-110 hover:rotate-3 duration-500"
                  />
            </div>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  medicine: PropTypes.object,
};
export default CartItem;
