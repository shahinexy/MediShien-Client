import { PiBuildingsBold } from "react-icons/pi";
import { PropTypes } from "prop-types";

const AdvertisementCard = ({ data }) => {
  return (
    <div className="relative flex sm:flex-row flex-col-reverse gap-3 items-center border border-secondary shadow-lg shadow-secondary/60 p-4">
      <small className={`absolute top-2 right-2 border border-primary ${data.status === 'pending' && 'text-orange-500'}  ${data.status === 'approve' && 'text-green-500'}  ${data.status === 'cancel' && 'text-red-500'} shadow-md shadow-secondary/50 py-1 px-2`}>
        {data.status}
      </small>
      <div className="sm:w-8/12">
        <p className="text-2xl font-semibold text-primary mb-2">
          {data.medicienName}
        </p>
        <p className="text-sm">{data.description}</p>
        <p className="text-sm flex items-center gap-2 mt-2 font-medium">
          <PiBuildingsBold className="text-xl text-primary" />{" "}
          {data.companyName}
        </p>
      </div>
      <div className="sm:w-4/12 flex items-center">
        <img className="md:w-full w-52" src={data.photo} alt="" />
      </div>
    </div>
  );
};

AdvertisementCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AdvertisementCard;
