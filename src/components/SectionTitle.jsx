import { PropTypes } from "prop-types";
const SectionTitle = ({ title, des }) => {
  return (
    <div className="max-w-4xl mb-12">
      <h2 className="sm:text-4xl text-3xl font-semibold uppercase">
        {title}
      </h2>
      <div className="border-2 border-secondary w-36 mt-1 mb-4"></div>
      <p>{des}</p>
    </div>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string,
  des: PropTypes.string,
};
export default SectionTitle;
