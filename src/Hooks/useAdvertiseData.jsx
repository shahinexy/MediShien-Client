import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAdvertiseData = () => {
    const axiosPublic = useAxiosPublic()
    const advertise = useQuery({
        queryKey: ['advertisement'],
        queryFn: async () =>{
            const res = await axiosPublic.get('/advertisment')
            return res.data
        }
    })
    return advertise;
};

export default useAdvertiseData;