import { PropTypes } from "prop-types";
import heartbeat from "../assets/images/heartbeat.png";
const SectionTitle = ({ title, des }) => {
  return (
    <div className="max-w-4xl mb-12">
      <h2 className="sm:text-4xl text-3xl font-semibold text-secondary uppercase">
        {title}
      </h2>
      {/* <img className="-mt-6 -mb-4" src={heartbeat} alt="" /> */}
      <div className="border-2 border-primary w-36 mt-1 mb-4"></div>
      <p>{des}</p>
    </div>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string,
  des: PropTypes.string,
};
export default SectionTitle;
