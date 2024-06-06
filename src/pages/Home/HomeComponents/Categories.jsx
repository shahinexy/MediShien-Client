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
            <SectionTitle title={'Categories Of Medicien'} des={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus ea in consequuntur quasi eaque praesentium id iste pariatur ullam explicabo, eum quos culpa ad veniam alias molestiae facilis odit numquam?'}></SectionTitle>

            <div className="max-w-5xl mx-auto grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
            {
                data?.map(category => <CategoriCard key={category._id} category={category}></CategoriCard>)
            }
        </div>
        </div>
    );
};

export default Categories;