import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SectionTitle from "../../../components/SectionTitle";
import CategoriCard from "./CategoriCard";
import Loader from "../../../components/Loader";

const Categories = () => {
    const axiosPublic = useAxiosPublic()

    const {data, isPending} = useQuery({
        queryKey: ['medicineCategory'],
        queryFn: async () =>{
            const res = await axiosPublic.get('/medicineCategory')
            return res.data;
        }
    })

    if(isPending) return <Loader></Loader>
    return (
        <div className="px-4">
            <SectionTitle title={'Explore Our Medicine Categories'} des={"Discover a wide range of medications categorized for your convenience. Whether you're looking for prescription drugs, over-the-counter remedies, or specialized treatments, our comprehensive selection ensures you find exactly what you need. Browse through our categories to find the right medicine tailored to your health requirements."}></SectionTitle>

            <div className="max-w-5xl mx-auto grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
            {
                data?.map(category => <CategoriCard key={category._id} category={category}></CategoriCard>)
            }
        </div>
        </div>
    );
};

export default Categories;