import { Helmet } from "react-helmet-async";
import useCart from "../../../Hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";

const MyCart = () => {
    const [cart] = useCart()
    const  sum = cart.reduce((sum,item)=> item.price + sum, 0)
    const total = sum.toFixed(2)
    return (
        <div className="ml-12 px-12">
             <Helmet>
                <title>Bistro Boss | myCart</title>
            </Helmet>
            <div className="uppercase font-semibold h-[60px flex justify-evenly">
            <h2>Total Items : {cart.length}</h2>
            <h2>Total Price :${total}</h2>
            <button className="btn btn-warning btn-sm">PAY</button>
            </div>
       
    <div className="overflow-x-auto w-full">
  <table className="table w-full">
    {/* head */}
    <thead>
      <tr>
        <th>
         #
        </th>
        <th>Food</th>
        <th>Item Name</th>
        <th>Price</th>
        <th>Action</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
     {
        cart.map((item,index) => <tr key={item._id}>
            <th>
              {index +1}
            </th>
            <td>
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
               
              </div>
            </td>
            <td>
              {
                item.name
              }
            </td>
            <td className="text-end">${item.price}</td>
            <th>
              <button className="btn btn-ghost bg-red-500 text-xl text-white"><FaTrashAlt></FaTrashAlt></button>
            </th>
          </tr>)
     }
     
     
      {/* row 1 */}
      
     
    </tbody>
    {/* foot */}
  
    
  </table>
</div>
       
        </div>
    );
};

export default MyCart;