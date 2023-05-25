import { Helmet } from "react-helmet-async";
import menuImg from '../../../assets/menu/banner3.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import useMenu from "../../../Hooks/useMenu";
import SectionTitle from "../../../component/sectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";
import Cover from "../../Shared/Cover/Cover";

const Menu = () => {
    const [menu] = useMenu()
    const desserts = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const offered = menu.filter(item => item.category === 'offered')

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <Cover img={menuImg} title='Our Menu' ></Cover>
           <SectionTitle
           subHeading="Don't Miss" heading='Todays Offer'></SectionTitle>
           <MenuCategory item={offered}></MenuCategory>

           <MenuCategory
           item={desserts} title="dessert"
           img={dessertImg}></MenuCategory>
           
           <MenuCategory
           item={pizza} title="pizza"
           img={pizzaImg}></MenuCategory>
           
           <MenuCategory
           item={soup} title="soup"
           img={soupImg}></MenuCategory>
           
           <MenuCategory
           item={salad} title="salad"
           img={saladImg}></MenuCategory>
           
        </div>
    );
};

export default Menu;