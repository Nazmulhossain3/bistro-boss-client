import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxoisSecure from "../../../Hooks/useAxoisSecure";
import { useEffect } from "react";
import useAuth from "../../../Hooks/useAuth";
import './checkOut.css'

const ChechOut = ({price,cart}) => {
    const stripe = useStripe()
    const {user} = useAuth()
    const elements = useElements()
    const [axoisSecure] = useAxoisSecure()
    const [cardError,setCardError] = useState('')
    const [clientSecret,setClientSecret] = useState('')
     const [proccessing, setProccessing] = useState('')
     const [transactionedId,setTransactionedId] = useState('')

    useEffect(()=>{

        if(price > 0){
        axoisSecure.post('/create-payment-intent',{price})
        .then(res => {
        setClientSecret(res.data.clientSecret)
       
        })
       
        }

    },[price,axoisSecure])
 
 
    const handleSubmit = async(event)=> {
        event.preventDefault()
        if(!stripe|| !elements ){
            return 
        }

        const card = elements.getElement(CardElement)
        if(card === null) {
            return 
        }
        console.log('card', card)

        const {error,paymentMethod} = await stripe.createPaymentMethod({
            type : 'card',
            card,

        })

        if(error){
            console.log('error', error)
            setCardError(error.message)
        }
        else{
            setCardError('')
            console.log('payment method', paymentMethod)
        }

        setProccessing(true)

        const {paymentIntent, error : confirmError} = await stripe.confirmCardPayment(
           clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                 email : user?.email || 'unknown',
                 name : user ?.displayName || 'anonymous'
                },
              },
            },
          );
            if(confirmError){
                console.log(confirmError)

            }
            setProccessing(false)
            console.log(paymentIntent.status)
            if(paymentIntent.status === 'succeeded'){
                setTransactionedId(paymentIntent.id)
           
            //    save payment information to the server

            const payment = {
                email : user ?.email,
                transactionedId : paymentIntent.id ,
                date : new Date(),
                quantity : cart.length,
                cartItems : cart.map(item => item._id),
                menuItems : cart.map(item => item.menuItemId),
                orderStatus : 'service pending',
                itemNames : cart.map(item => item.name)
            }

            axoisSecure.post('/payments',payment)
            .then(res => {
                console.log(res.data)
                if(res.data.insertedId){
                    // display confirm
                }
            })

          
        
        }
           
    }
    return (
       <>
         <form className="w-2/3 m-8" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button className="btn btn-outline btn-primary btn-sm mt-4" type="submit" disabled={!stripe ||!clientSecret || proccessing}>
          Pay
        </button>
      </form>
      {
        cardError && <p className="text-red-600 ml-6">{cardError}</p>
      }
      {
        transactionedId && <p className="text-green-600">transaction Complete with {transactionedId}</p>
      }
       </>
    );
};

export default ChechOut;