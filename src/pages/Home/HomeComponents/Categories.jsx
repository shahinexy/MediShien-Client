import SectionTitle from "../../../components/SectionTitle";
import CategoriCard from "./CategoriCard";

const Categories = () => {
    return (
        <div className="px-4">
            <SectionTitle title={'Categories Of Medicien'} des={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus ea in consequuntur quasi eaque praesentium id iste pariatur ullam explicabo, eum quos culpa ad veniam alias molestiae facilis odit numquam?'}></SectionTitle>
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
            <CategoriCard></CategoriCard>
            <CategoriCard></CategoriCard>
            <CategoriCard></CategoriCard>
            <CategoriCard></CategoriCard>
            <CategoriCard></CategoriCard>
            <CategoriCard></CategoriCard>
        </div>
        </div>
    );
};

export default Categories;