import { Button, Modal } from "keep-react";
import { PropTypes } from "prop-types";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { PiBuildingsBold } from "react-icons/pi";

const MedicineDetails = ({ medicine }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const {
    medicienName,
    genericName,
    category,
    company,
    price,
    description,
    discount,
    discountPrice,
    massUnit,
    photo,
  } = medicine;
  return (
    <div>
      <Button onClick={openModal} className="inline-block p-0">
        <FaEye className="text-2xl text-secondary hover:text-primary cursor-pointer hover:scale-[1.25] hover:rotate-6 duration-500" />
      </Button>
      <Modal isOpen={isOpen} onClose={closeModal} className="bg-transparent mx-2">
        <Modal.Body className="max-w-4xl w-full mx-auto rounded-none text-white bg-secondary border-2 border-gray-400 p-0">
          <div className="grid md:grid-cols-2 grid-cols-1 items-center shadow-inner shadow-primary ">
            <div className="bg-secondary sm:p-10 p-5">
              <Modal.Content>
                <div className="!mb-6">
                  <div>
                    <img src={photo} alt="" />
                  </div>
                </div>
              </Modal.Content>
            </div>

            <div className="bg-primary sm:p-10 p-5 h-full">
              <div className="mb-10">
                <h2 className="text-2xl font-semibold">{medicienName}</h2>
                <p className="text-sm">{genericName}</p>

                <p className="my-4">{description}</p>

                <div className="flex justify-between border-y border-secondary py-2">
                  <p className="flex gap-2 items-center">
                    <PiBuildingsBold className="text-[#44adb0] text-2xl" />
                    {company}
                  </p>
                  <p className="flex gap-2 items-center">
                    <MdCategory className="text-[#44adb0] text-2xl" />
                    {category}
                  </p>
                </div>
                <div className="grid grid-cols-4 my-5 gap-3 text-center">
                  <div>
                    <p className="border-b pb-1 mb-2 font-medium border-secondary">Price</p>
                    <p className="font-medium"> {price}$</p>
                  </div>
                  <div>
                    <p className="border-b pb-1 mb-2 font-medium border-secondary">Discount</p>
                    <p className="font-medium"> {discount}%</p>
                  </div>
                  <div>
                    <p className="border-b pb-1 mb-2 font-medium border-secondary">Discounted</p>
                    <p className="font-medium"> {discountPrice?.toFixed(2)}$</p>
                  </div>
                  <div>
                    <p className="border-b pb-1 mb-2 font-medium border-secondary">Mass Unit</p>
                    <p className="font-medium"> {massUnit}</p>
                  </div>
                </div>
              </div>
              <Modal.Footer className="flex justify-end">
                <Button
                  onClick={closeModal}
                  size="sm"
                  variant="outline"
                  color="secondary"
                  className="rounded-none text-primary font-semibold"
                >
                  Cancel
                </Button>
              </Modal.Footer>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

MedicineDetails.propTypes = {
  medicine: PropTypes.object,
  setIsOpen: PropTypes.func,
};

export default MedicineDetails;
