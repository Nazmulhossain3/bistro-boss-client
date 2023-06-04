import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../../component/sectionTitle/SectionTitle";
import ChechOut from "./ChechOut";
import { loadStripe } from "@stripe/stripe-js";
// TODO : provide publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

const Payment = () => {
    return (
        <div className="w-full">
            <SectionTitle subHeading='Please Process' heading='Payment'></SectionTitle>
           <Elements stripe={stripePromise}>
           <ChechOut></ChechOut>
           </Elements>
        </div>
    );
};

export default Payment;