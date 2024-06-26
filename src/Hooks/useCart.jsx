import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
    const {user, loader} = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data, isPending, isError, error, refetch } = useQuery({
        queryKey: ["cartItem"],
        enabled: !loader,
        queryFn: async () => {
          const res = await axiosSecure.get(`/cartItem/buyerEmail/${user.email}`);
          return res.data;
        },
      });

    return { data, isPending, isError, error, refetch };
};

export default useCart;