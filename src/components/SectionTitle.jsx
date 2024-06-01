import { PropTypes } from "prop-types";
const SectionTitle = ({ title, des }) => {
  return (
    <div className="max-w-4xl mb-12">
      <h2 className="text-4xl font-semibold text-secondary uppercase">
        {title}
      </h2>
      <div className="flex mt-3 mb-4">
        <p className="border-t-[3px] border-primary w-36"></p>
      </div>
      <p>{des}</p>
    </div>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string,
  des: PropTypes.string,
};
export default SectionTitle;
