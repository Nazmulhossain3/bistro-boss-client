/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from '@tanstack/react-query'
import useAxoisSecure from './useAxoisSecure'
import useAuth from './useAuth'

const useCart = () => {
const {user} = useAuth()

// const token = localStorage.getItem('access-token')


const [axoisSecure] = useAxoisSecure()
const { isLoading,refetch, data : cart = []} = useQuery({
    queryKey: ['carts', user?.email],
    queryFn: async () => {
      if(!user){
        return []
      
      }
        const res = await axoisSecure(`/carts?email=${user?.email}`)
      
        return res.data;
        
    },
    
  })

return [cart,refetch,isLoading,]

}

export default useCart