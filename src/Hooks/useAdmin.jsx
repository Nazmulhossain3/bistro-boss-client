import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxoisSecure from "./useAxoisSecure";

const useAdmin = () => {
   const {user} = useAuth()
   const [axoisSecure] = useAxoisSecure() 
   const {data : isAdmin, isLoading : isAdminLoading} = useQuery({
    queryKey : ['isAdmin', user?.email],
    queryFn : async () => {
        const res = await axoisSecure.get(`/users/admin/${user?.email}`)
      
        return res.data.admin
    }
   })
   return [isAdmin, isAdminLoading]
};

export default useAdmin;