import { PropTypes } from "prop-types";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const CartItem = ({ medicine, refetch }) => {
  const { medicienName, price, photo, medicineId, quantity } =
    medicine;
  const axiosSecure = useAxiosSecure();
  const [itemQuantity, setQuantity] = useState(quantity);

  useEffect(() => {
    const updateInfo = {
      quantity: parseInt(itemQuantity),
    };
    console.log(updateInfo);
    axiosSecure
      .patch(`/cartItem/update/${medicineId}`, updateInfo)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, [itemQuantity, axiosSecure, medicineId]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/cartItem/${id}`)
          .then((res) => {
            console.log(res.data);
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              refetch();
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const handleQuentity = (e) => {
    const value = e.target.value;
    if (value >= 1) {
      setQuantity(value);
    }

    // const updateInfo = {quantity: parseInt(itemQuantity), totalPrice: totalPrice * itemQuantity}
    // console.log(updateInfo);
    // axiosSecure.patch(`/cartItem/update/${medicineId}`, updateInfo)
    // .then(res => console.log(res.data))
    // .catch(err => console.log(err))
  };

  return (
    <div className="flex gap-3 border border-secondary shadow-lg shadow-secondary/50 sm:p-3 p-2">
      <div className="w-5/12">
        <img className="w-full sm:h-32 h-28" src={photo} alt="" />
      </div>

      <div className="w-7/12">
        <h2 className="sm:text-xl text-lg font-medium text-primary">
          {medicienName}
        </h2>

        <div className="flex items-center gap-4 my-2 border-b border-secondary ">
          <p className="flex items-center">
            <input
              type="number"
              className="border border-primary text-primary outline-none w-8 text-center"
              value={itemQuantity}
              min={1}
              onChange={handleQuentity}
            />
            <p>
              <IoMdArrowDropup
                onClick={() => setQuantity(itemQuantity + 1)}
                className="text-2xl text-primary cursor-pointer"
              />
              <IoMdArrowDropdown
                onClick={() => {
                  if (itemQuantity > 1) setQuantity(itemQuantity - 1);
                }}
                className="text-2xl text-primary cursor-pointer"
              />
            </p>
          </p>
          <p className="sm:text-base text-sm sm:font-medium">
            Price per unit: {price}$
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="sm:font-medium">Total Price: {itemQuantity * price}$</p>
          <div>
            <RiDeleteBin6Line
              onClick={() => handleDelete(medicineId)}
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
  refetch: PropTypes.func,
};
export default CartItem;
