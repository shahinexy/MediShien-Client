import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETWAY_PK);

const CheckOutPage = () => {
  return (
    <div className="max-w-7xl mx-auto mt-28 mb-20">
      <Helmet>
        <title>Check Out</title>
      </Helmet>
      <div className="flex items-center justify-between py-2 bg-secondary px-4 text-white">
        <p className="text-xl font-semibold">Check Out</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 flex sm:flex-row flex-col-reverse my-16 text-white">
            <div className="w-full bg-secondary p-7">
                <h2 className="text-2xl font-medium mb-7">Payment info</h2>
                <Elements stripe={stripePromise}>
                    <CheckOutForm></CheckOutForm>
                </Elements>
            </div>
            <div className="w-full bg-primary p-7">
            <h2 className="text-2xl font-medium mb-7">In your bag</h2>
            </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
