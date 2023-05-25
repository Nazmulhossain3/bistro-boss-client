import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({item,title,img}) => {
    return (
        <div className="pt-8">
            {
                title && <Cover img={img} title={title} className='my-16' ></Cover>

            }
             <div className="grid md:grid-cols-2 gap-8 mt-8">
                {
                   item.map(item => <MenuItem
                    key={item._id}
                    item={item}></MenuItem>)
                }
            </div>
                <Link to={`/order/${title}`}> <button className="btn btn-outline border-0 border-b-4 mt-4 text-orange-500">Order Now</button>
               </Link>
        </div>
    );
};

export default MenuCategory;