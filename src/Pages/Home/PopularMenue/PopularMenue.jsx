import SectionTitle from "../../../component/sectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../Hooks/useMenu";

const PopularMenue = () => {
    const [menu] = useMenu()
    const popular = menu.filter(item => item.category === 'popular')

    // const [menu,setMenu] = useState([])

    // useEffect(()=>{
    //     fetch('Menu.json')
    //     .then(res => res.json())
    //     .then(data => {
    //         const popularItem = data.filter(item => item.category === 'popular')
        
    //         setMenu(popularItem)
    //     })


    // },[])


    return (
        <section className="mb-12">
            <SectionTitle 
            heading='From Our Menu'
            subHeading='Popular Items'>
             
            </SectionTitle>

            <div className="grid md:grid-cols-2 gap-8">
                {
                   popular.map(item => <MenuItem
                    key={item._id}
                    item={item}></MenuItem>)
                }
            </div>
            <button className="btn btn-outline border-0 border-b-4 mt-4 text-orange-500">
                View Full Menu
            </button>

        </section>
    );
};

export default PopularMenue;