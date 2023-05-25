import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import PopularMenue from "../PopularMenue/PopularMenue";
import Testomonials from "../Testomonials/Testomonials";

const Home = () => {
    


    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
           <Banner></Banner>
           <Category></Category>
           <PopularMenue></PopularMenue>
           <Featured></Featured>
           <Testomonials></Testomonials>
        </div>
    );
};

export default Home;