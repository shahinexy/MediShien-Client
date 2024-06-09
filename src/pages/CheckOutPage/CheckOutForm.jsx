import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";
import useAuth from "../../Hooks/useAuth";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import Swal from "sweetalert2";

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
        Swal.fire({
          title: "Action SuccessFull",
          text: "Your payment in proccess.",
          icon: "success",
        });
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <p>Name</p>
          <input className="w-full outline-none p-2 bg-inherit text-white border " type="text" disabled value={user?.displayName} />
        </div>
        <div className="my-3">
          <p>Email</p>
          <input className="w-full outline-none p-2 bg-inherit text-white border " type="text" disabled value={user?.email} />
        </div>
        <p>Card Info</p>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#FAF9F6",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
          className="border border-white p-3"
        />
        <button type="submit" disabled={!stripe || !clientSecret} className="w-full flex mt-6 justify-center bg-primary text-lg font-medium gap-3 py-3 px-5 rounded-none hover:bg-[#44adb0] hover:scale-95 duration-300">
          Pay Now <FaMoneyBillTrendUp className="text-xl" />
        </button>
        <p className="text-red-300 text-sm mt-6">{error}</p>
        {
            transitionId && <p className="text-green-300 mt-6">Your transition ID: {transitionId}</p>
        }
      </form>
    </div>
  );
};

export default CheckOutForm;
