import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const UseAdmin = () => {
    const {user, loader} = useAuth()
    const axiosSecure = useAxiosSecure()
    const {data: isAdmin, isPending: isAdminLoading} = useQuery({
        queryKey: ['admin'],
        enabled: !loader,
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/allUsers/admin/${user.email}`)
            return res.data?.admin
        }
    })
    return {isAdmin, isAdminLoading};
};

export default UseAdmin;