import SectionTitle from "../../../component/sectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg'
import './fearured.css'
const Featured = () => {
    return (
        <div className="feature bg-fixed text-white pt-3 my-10">
            <SectionTitle
            subHeading='Check it Out'
            heading='Featured Item'></SectionTitle>

            <div className="md:flex justify-center bg-slate-200 bg-opacity-30 items-center py-20 px-36">
                <div>
                    <img src={featuredImg} alt="" />
                </div>

            <div className="md:ml-10">
                <p>Aug, 2029</p>
                <p className="uppercase"> Where can I get some? </p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora pariatur similique provident dolor sed soluta earum sint nulla, alias velit in ipsa odit, voluptate expedita obcaecati commodi reprehenderit excepturi porro praesentium mollitia, eius a. Esse dolores vero voluptas vel deleniti!</p>
            
                <button className="btn btn-outline border-0 border-b-4 mt-4 text-orange-500">Order Now</button>

            </div>


            </div>
            
        </div>
    );
};

export default Featured;