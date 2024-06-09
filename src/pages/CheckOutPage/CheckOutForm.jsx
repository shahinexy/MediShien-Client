import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";
import useAuth from "../../Hooks/useAuth";

const CheckOutForm = () => {
  const [error, setError] = useState();
  const [clientSecret, setClientSecret] = useState("");
  const [transitionId, setTransitionId] = useState(null)
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const { data } = useCart();

  const totalPrice = data?.reduce((acc, medicine) => {
    if (medicine.discount > 0) {
      return acc + medicine.discountPrice * medicine.quantity;
    } else {
      return acc + medicine.price * medicine.quantity;
    }
  }, 0);
  console.log(totalPrice);

  useEffect(() => {
    if (!totalPrice) return;
    axiosSecure
      .post("/create-payment-intent", { price: totalPrice })
      .then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    } else {
      console.log("[Payment Intent]", paymentIntent);
      if(paymentIntent.status === 'succeeded'){
        console.log('transitionId', paymentIntent.id);
        setTransitionId(paymentIntent.id)

        const paymentInfo = {
            userEmail: user?.email || "anonymous",
            UserName: user?.displayName || "anonymous",
            transitionId: paymentIntent.id,
            price: totalPrice,
            date: new Date(),
            status: 'pending',
            medicineIds: data.map(medicine => medicine._id),
        }

        const res = await axiosSecure.post('/payments', paymentInfo)
        console.log(res.data);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button type="submit" disabled={!stripe || !clientSecret}>
          Pay
        </button>
        <p className="text-red-300 text-sm">{error}</p>
        {
            transitionId && <p className="text-green-300 mt-6">Your transition ID: {transitionId}</p>
        }
      </form>
    </div>
  );
};

export default CheckOutForm;
