import SectionTitle from "../../../components/SectionTitle";
import DiscountSlider from "./DiscountSlider";

const DiscountSection = () => {
    return (
        <div>
            <SectionTitle title={'Special Discounts'} des={"Take advantage of our exclusive discounts on a variety of medications. Enjoy significant savings on your essential health products and prescriptions. Check out our special offers and get the best deals on top-quality medicines today!"}></SectionTitle>
            <div>
                <DiscountSlider></DiscountSlider>
            </div>
        </div>
    );
};

export default DiscountSection;