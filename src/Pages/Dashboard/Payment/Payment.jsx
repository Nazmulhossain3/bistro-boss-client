import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../../component/sectionTitle/SectionTitle";
import ChechOut from "./ChechOut";
import { loadStripe } from "@stripe/stripe-js";
import useCart from "../../../Hooks/useCart";
// TODO : provide publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

const Payment = () => {

    const [cart] = useCart()
    const total = cart.reduce((sum,item)=> sum + item.price , 0)
    const price = parseFloat(total.toFixed(2))


    return (
        <div className="w-full">
            <SectionTitle subHeading='Please Process' heading='Payment'></SectionTitle>
           <Elements stripe={stripePromise}>
           <ChechOut cart={cart} price={price}></ChechOut>
           </Elements>
        </div>
    );
};

export default Payment;