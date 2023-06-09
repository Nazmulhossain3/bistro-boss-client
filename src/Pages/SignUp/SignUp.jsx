import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/Authproviders";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";


const SignUp = () => {
   const navigate = useNavigate()
    const { register,handleSubmit, formState: { errors } } = useForm();
    const {createUser,updateUserProfile} = useContext(AuthContext)

    const onSubmit = data => {
        console.log(data)
        createUser(data.email, data.password)
        .then(result => {
            const loggedUser = result.user 
            console.log(loggedUser)
          updateUserProfile(data.name, data.photoUrl)
          .then(()=> {
          const saveUser = {name : data.name, email : data.email}
            fetch('http://localhost:5000/users',{
              method : 'POST',
              headers : {
                'content-type' : 'application/json'
              },
              body : JSON.stringify(saveUser)
            })
            .then(res => res.json())
            .then(data => {
              if(data.insertedId){
                Swal.fire(
                  'Good job!',
                  'User Created Successfully!',
                  'success'
                )
                navigate('/')
              }
            })
         
           
          })
          .catch(error => console.log(error))
        })
    };


    return (
       <>
    <Helmet>
                <title>Bistro Boss | Sign Up</title>
            </Helmet>
<div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">SignUp</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" {...register("name", { required: true })} placeholder="name" className="input input-bordered" />
        
          {errors.name && <span className="mt-2 text-red-600">Name is required</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo Url</span>
          </label>
          <input type="text" {...register("photoUrl", { required: true })} placeholder="Photo Url" className="input input-bordered" />
        
          {errors.name && <span className="mt-2 text-red-600"> Photo Url is required</span>}
        </div>
      
      
      
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" {...register("email",{ required: true })} name="email" placeholder="email" className="input input-bordered" />
          {errors.email && <span className="mt-2 text-red-600">Email is required</span>}

       
        </div>
       
       
       
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" {...register("password",{ required: true, minLength : 6 })} name="password" placeholder="password" className="input input-bordered" />
         {errors.password?.type == 'required' && <p className="mt-2 text-red-600"> Password must be 6 character </p>}
         
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
            <input className="btn btn-primary" type="submit" value="Sign Up" />
          
        </div>
      </form>
      <p><small>Already have an account <Link to='/login'>Login</Link> </small></p>
      <SocialLogin></SocialLogin>
  
    </div>
  </div>
       </div>
       </>
    );
};

export default SignUp;