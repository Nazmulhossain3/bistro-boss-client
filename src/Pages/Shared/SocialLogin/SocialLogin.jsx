import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../../Providers/Authproviders";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const {googleSignIn} = useContext(AuthContext)

    const handleGoogleSignIn = ()=> {
        googleSignIn()
        .then(result => {
            const loggedUser = result.user 
            const saveUser = {name : loggedUser.displayName, email : loggedUser.email}

            fetch('http://localhost:5000/users',{
                method : 'POST',
                headers : {
                  'content-type' : 'application/json'
                },
                body : JSON.stringify(saveUser)
              })
              .then(res => res.json())
              .then(() => {
                navigate('/', {state : {from : location}})
              })
           


            console.log(loggedUser)
           
        })
    }


    return (
        <div>
         <div className="divider"> </div>
          <div className="w-full text-center my-4">
          <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline">
         <FaGoogle></FaGoogle>
        </button>
          </div>
        
        </div>
    );
};

export default SocialLogin;