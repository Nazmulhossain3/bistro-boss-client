import { useContext } from "react";
import { AuthContext } from "../../Providers/Authproviders";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../Hooks/useCart";

const FoodCart = ({item}) => {
  const {user} = useContext(AuthContext)
  const [,refetch] = useCart()

  const navigate = useNavigate()
  const location = useLocation()
    const {name,image,price, recipe,_id} = item
  
    const handleAddToCart = (item) => {
      console.log(item)
      if(user && user.email) {
        const cartItem = {menuItemId : _id, name,image,price, email : user.email}
        fetch('http://localhost:5000/carts',{
          method : 'POST',
          headers : {
            'content-type' : 'application/json'
          },
          body : JSON.stringify(cartItem)
        })
        .then(res => res.json())
        .then(data => {
       
          if(data.insertedId){
            refetch();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Food Added On the cart',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
      }
      else{
        Swal.fire({
          title: 'Please Login to Order Food',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Login!'
        }).then((result) => {
          if (result.isConfirmed) {
           navigate('/login',{state : {from : location}})
          }
        })
      }

    }


    return (
        <div className="card w-72 bg-base-100 shadow-xl">
        <figure><img src={image} alt="Shoes" /></figure>
        <p className="bg-slate-900 text-white absolute right-0 mr-4 mt-4 px-4">${price}</p>
        <div className="card-body">
          <h2 className="card-title flex flex-col items-center">{name}</h2>
          <p>{recipe}</p>
          <div className="card-actions justify-center">
            <button onClick={()=> handleAddToCart(item)} className="btn btn-outline bg-slate-100 border-0 border-b-4 mt-4 text-orange-500">Add To Cart</button>
          </div>
        </div>
      </div>
    );
};

export default FoodCart;