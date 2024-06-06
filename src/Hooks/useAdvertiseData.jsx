import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAdvertiseData = () => {
    const axiosSecure = useAxiosSecure()
    const advertise = useQuery({
        queryKey: ['advertisement'],
        queryFn: async () =>{
            const res = await axiosSecure.get('/advertisment')
            return res.data
        }
    })
    return advertise;
};

export default useAdvertiseData;