import SectionTitle from "../../../components/SectionTitle";
import DiscountSlider from "./DiscountSlider";

const DiscountSection = () => {
    return (
        <div>
            <SectionTitle title={'Special Discounts'}></SectionTitle>
            <div>
                <DiscountSlider></DiscountSlider>
            </div>
        </div>
    );
};

export default DiscountSection;