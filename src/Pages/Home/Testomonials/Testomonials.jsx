import SectionTitle from "../../../component/sectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import '@smastrom/react-rating/style.css'


import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {Navigation } from "swiper";
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";




const Testomonials = () => {
   
   const [reviews,setReviews] = useState([])

  
   useEffect(()=>{

    fetch('http://localhost:5000/reviews')
    .then(res => res.json())
    .then(data => {
        setReviews(data)
    })


   },[])
   
   
   
    return (
        <section className="mb-20">

            <SectionTitle 
            subHeading='What our Clients Say?'
            heading='Testimonials'></SectionTitle>

<Swiper
        
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
       
        {
            reviews.map(review =>  <SwiperSlide 
            key={review._id}>
                
            <div className="my-16 mx-24 flex flex-col items-center">
            <Rating
      style={{ maxWidth: 100 }}
      value={review.rating}
      readOnly
    />


                <p className="py-6">{review.details}</p>
                <h3 className="text-2xl text-orange-400">{review.name}</h3>
            </div>

           
            </SwiperSlide> )
        }
      </Swiper>


            
        </section>
    );
};

export default Testomonials;