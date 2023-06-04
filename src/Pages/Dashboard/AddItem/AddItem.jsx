import Swal from "sweetalert2";
import useAxoisSecure from "../../../Hooks/useAxoisSecure";
import SectionTitle from "../../../component/sectionTitle/SectionTitle";
import { useForm } from 'react-hook-form';

const Image_hosting_token = import.meta.env.VITE_Image_Upload_Token

const AddItem = () => {

    const [axoisSecure] = useAxoisSecure()


    const { register, handleSubmit,} = useForm();
    const Image_hosting_url = `https://api.imgbb.com/1/upload?key=${Image_hosting_token}`
  
  
    const onSubmit = data => {
    console.log(data)

    const formData = new FormData 
    formData.append('image',data.image[0])
    fetch(Image_hosting_url,{
        method : 'POST',
        body : formData
    })
    .then(res => res.json())
    .then(ImageRes => {
      
        if(ImageRes.success){
            const imgURL = ImageRes.data.display_url
            const {name,price,category,recipe} = data
            const newItem = {name,price : parseFloat(price) ,category,recipe, image : imgURL}
            console.log(newItem)
            axoisSecure.post('/menu', newItem)
            .then(data =>{
                console.log('after added menu', data)
                if(data.data.insertedId){
                    Swal.fire(
                        'Good job!',
                        'You clicked the button!',
                        'success'
                      )
                }
            })
        }
    })
   
  };
  
  return (
    <div className="w-full px-14 py-6">
      <SectionTitle
        subHeading="Whats new "
        heading="Add an Item"
      ></SectionTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text">Recipe name*</span>
          </label>
          <input
          placeholder="Recipe name" {...register("name", {required: true, maxLength: 80})}
            type="text"
            className="input input-bordered w-full "
          />
        </div>

    <div  className="flex">

    <div className="form-control w-full ">
  <label className="label">
    <span className="label-text">Category*</span>
    
  </label>
  <select defaultValue='pick One' {...register("category", { required: true })} className="select select-bordered">
    <option disabled >Pick One</option>
    <option>Pizza</option>
    <option>Soup</option>
    <option>Salad</option>
    <option>Desert</option>
    <option>Drinks</option>
  </select>
 
</div>

<div className="form-control w-full ml-4">
          <label className="label">
            <span className="label-text">Price*</span>
          </label>
          <input
          {...register("price", { required: true })}
            type="number"
            placeholder="Price"
            className="input input-bordered w-full "
          />
  </div>

    </div>


  <div className="form-control">
  <label className="label">
    <span className="label-text-alt">Recipe Details</span>
  </label>
  <textarea {...register("recipe", { required: true })} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
  
</div>

<div className="form-control w-full ">
  <label className="label">
    <span className="label-text">Item Image*</span>
  </label>
  <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full " />
  
</div>
 <input type="submit" className="btn btn-sm mt-4" value="Add Item" />
      </form>
    </div>
  );
};

export default AddItem;
