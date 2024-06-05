import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useMedicineData = () => {
    const axiosPublic = useAxiosPublic()
    const medicineData = useQuery({
        queryKey: ['medicineData'],
        queryFn: async () =>{
            const res = await axiosPublic.get('/medicines')
            return res.data
        }
    })
    return medicineData;
};

export default useMedicineData;