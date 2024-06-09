import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet";
import CheckOutForm from "./CheckOutForm";
import useCart from "../../Hooks/useCart";
import Loader from "../../components/Loader";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETWAY_PK);

const CheckOutPage = () => {
  const { data, isPending } = useCart();

  const totalPrice = data?.reduce((acc, medicine) => {
    if (medicine.discount > 0) {
      return acc + medicine.discountPrice * medicine.quantity;
    } else {
      return acc + medicine.price * medicine.quantity;
    }
  }, 0);

  if (isPending) return <Loader></Loader>;
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
          {data?.map((medicine) => (
            <div
              key={medicine._id}
              className="flex gap-3 border-b border-secondary py-1"
            >
              <div>
                <img className="w-12 h-12" src={medicine.photo} alt="" />
              </div>
              <div className="w-full">
                <p>{medicine.genericName}</p>
                <p className="flex justify-between text-sm">
                  <span>Quantity: {medicine.quantity}</span>
                  <span>
                    Price:{" "}
                    {medicine.discount > 0
                      ? medicine.quantity * medicine.discountPrice
                      : medicine.quantity * medicine.price}$
                  </span>
                </p>
              </div>
            </div>
          ))}
          <div className="border-t-2 border-secondary mt-7 text-end text-lg font-medium py-2">
              Total: {totalPrice}$
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
