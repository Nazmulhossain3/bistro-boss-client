import { Helmet } from "react-helmet-async";
import useCart from "../../../Hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const MyCart = () => {
    const [cart,refetch] = useCart()
    const  sum = cart.reduce((sum,item)=> item.price + sum, 0)
    const total = sum.toFixed(2)

    const handleDelete = (item) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
             fetch(`http://localhost:5000/carts/${item._id}`,{
                method : "DELETE"
             })
             .then(res => res.json())
             .then(data => {
                if(data.deletedCount > 0){
                    refetch()
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                }
             })
            }
          })
    }

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
              <button onClick={()=> handleDelete(item)} className="btn btn-ghost bg-red-500 text-xl text-white"><FaTrashAlt></FaTrashAlt></button>
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