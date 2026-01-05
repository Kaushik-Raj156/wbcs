import { useGlobalContext } from "../Contexts/globalContext/context";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import TableOrder from "../components/product_components/TableOrder";
import { langs } from "../Contexts/values/LangValues";
import {
  LocationMarkerIcon,
  TruckIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  UserIcon,
  PhoneIcon,
  HomeIcon,
} from "@heroicons/react/outline";

export default function checkout() {
  const router = useRouter();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    translate: t,
    lang,
    cart,
    total,
    amount,
    clearCart,
    account,
  } = useGlobalContext();
  const [orders, setOrders] = useState({
    name: "",
    lastname: "",
    address: "",
    phone: 0,
    cart,
    amount,
    cost: total,
  });
  const [send, setSend] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  // set field values from account using react-hook-form setValue only
  useEffect(() => {
    if (account.name) {
      setValue("name", account.name);
      setValue("lastname", account.lastname);
      setValue("address", account.address);
      setValue("phone", account.phone);
    }
  }, [account, setValue]);

  // set new order to sent
  const submitHandler = async (form) => {
    setPaymentLoading(true);
    try {
      const { name, lastname, address, phone } = form;
      
      // Directly save order to database without payment
      const orderData = {
        name,
        lastname,
        address,
        phone,
        cart,
        cost: total + Math.round(total * 0.18),
        amount,
      };

      console.log('Submitting order:', orderData);

      const response = await fetch("/api/order/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      console.log('Order response:', result);
      
      if (result.message === "saved") {
        // Store order data in sessionStorage for confirmation page
        const orderConfirmation = {
          orderId: result.createdOrder._id,
          name,
          lastname,
          phone,
          address,
          cart,
          totalAmount: total + Math.round(total * 0.18),
        };
        sessionStorage.setItem("orderConfirmation", JSON.stringify(orderConfirmation));
        
        clearCart();
        router.push("/order-confirmation");
      } else {
        alert("❌ Order submission failed: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error('Order error:', error);
      alert("❌ Failed to place order. Please try again.");
    }
    setPaymentLoading(false);
  };

  //sending order - kept for modal compatibility
  const sendOrder = async () => {
    const data = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orders),
    });

    const res = await data.json();
    if (res.message && res.message === "saved") {
      clearCart();
      router.push("/");
      alert(t('Your order has been successfully submitted.'));
    } else {
      if (res.message === "incomplete data") {
        alert(t('Please complete all fields in the form.'));
      } else {
        alert(t('Something went wrong! Please try again later.'));
      }
    }
  };

  return (
    <>
      <div
        style={{ direction: `${lang === langs["fa"] ? "rtl" : "ltr"}` }}
        className="min-h-screen bg-secondary py-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Left Column - Delivery Information */}
            <div className="space-y-6">
              {/* Header */}
              <div className="bg-primary rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-primary mb-2">Billing Information</h1>
                <p className="text-secondary">Complete your order by providing delivery details</p>
              </div>

              {/* Delivery Information Form */}
              <div className="bg-primary rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-6">
                  <LocationMarkerIcon className="w-6 h-6 text-accent mr-3" />
                  <h2 className="text-xl font-semibold text-primary">{t('Delivery Information')}</h2>
                </div>

                <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-2" htmlFor="name">
                        <UserIcon className="w-4 h-4 inline mr-1" />
                        First Name
                      </label>
                      <input
                        className="w-full px-4 py-3 border border-hover bg-primary text-primary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                        id="name"
                        type="text"
                        placeholder="Enter your first name"
                        {...register("name", {
                          required: true,
                          pattern: /^[^+={}()<>!@#$%^&*?;:,|\\/_.\.\d]*[^\s+={}()<>!@#$%^&*?;:,|\\/_.\.\d]$/,
                        })}
                      />
                      {errors.name && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.name.type === "required"
                            ? "First name is required"
                            : "Invalid name format"}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary mb-2" htmlFor="lastname">
                        Last Name
                      </label>
                      <input
                        className="w-full px-4 py-3 border border-hover bg-primary text-primary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                        type="text"
                        id="lastname"
                        placeholder="Enter your last name"
                        {...register("lastname", {
                          required: true,
                          pattern: /^[^+={}()<>!@#$%^&*?;:,|\\/_.\.\d]*[^\s+={}()<>!@#$%^&*?;:,|\\/_.\.\d]$/,
                        })}
                      />
                      {errors.lastname && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.lastname.type === "required"
                            ? "Last name is required"
                            : "Invalid name format"}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2" htmlFor="phone">
                      <PhoneIcon className="w-4 h-4 inline mr-1" />
                      Phone Number
                    </label>
                    <input
                      className="w-full px-4 py-3 border border-hover bg-primary text-primary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      {...register("phone", {
                        required: true,
                        pattern: /^\d+$/,
                      })}
                    />
                    {errors.phone && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.phone.type === "required"
                          ? "Phone number is required"
                          : "Invalid phone number"}
                      </p>
                    )}
                  </div>

                  {/* Delivery Address */}
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2" htmlFor="address">
                      <HomeIcon className="w-4 h-4 inline mr-1" />
                      Delivery Address
                    </label>
                    <textarea
                      className="w-full px-4 py-3 border border-hover bg-primary text-primary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors resize-none"
                      id="address"
                      rows="4"
                      placeholder="Enter your complete delivery address"
                      {...register("address", {
                        required: true,
                      })}
                    />
                    {errors.address && (
                      <p className="text-red-600 text-sm mt-1">Delivery address is required</p>
                    )}
                  </div>

                  {/* Delivery Features */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-hover">
                    <div className="flex items-center space-x-3 p-3 bg-secondary rounded-lg">
                      <TruckIcon className="w-6 h-6 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-primary">Free Delivery</p>
                        <p className="text-xs text-secondary">Within 3-5 days</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-secondary rounded-lg">
                      <ShieldCheckIcon className="w-6 h-6 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-primary">Secure Payment</p>
                        <p className="text-xs text-secondary">100% protected</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-secondary rounded-lg">
                      <CreditCardIcon className="w-6 h-6 text-purple-600" />
                      <div>
                        <p className="text-sm font-medium text-primary">Easy Returns</p>
                        <p className="text-xs text-secondary">30 days policy</p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-primary rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-primary mb-6">Order Summary</h2>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={`${item.name}-${item.color}-${item.size}`} className="flex items-center space-x-4 py-4 border-b border-hover last:border-b-0">
                      <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center">
                        {/* Render image if exists */}
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <span className="text-xs font-medium text-secondary">IMG</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-primary">{item.name.replace(/_/g, " ")}</h3>
                        <p className="text-sm text-secondary">
                          Color: {item.color} | Size: {item.size}
                        </p>
                        <p className="text-sm text-secondary">Qty: {item.amount}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-primary">₹{(item.price * item.amount).toLocaleString()}</p>
                        <p className="text-xs text-secondary">₹{item.price.toLocaleString()} each</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Totals */}
                <div className="border-t border-hover pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary">Subtotal</span>
                    <span className="font-medium text-primary">₹{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary">Tax (GST 18%)</span>
                    <span className="font-medium text-primary">₹{Math.round(total * 0.18).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Shipping</span>
                    <span className="font-medium text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-3 border-t border-hover">
                    <span className="text-primary">Total</span>
                    <span className="text-primary">₹{(total + Math.round(total * 0.18)).toLocaleString()}</span>
                  </div>
                </div>

                {/* Payment Button */}
                <button
                  onClick={handleSubmit(submitHandler)}
                  disabled={paymentLoading}
                  className="w-full mt-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {paymentLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing Order...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <CreditCardIcon className="w-5 h-5 mr-2" />
                      Place Order ₹{(total + Math.round(total * 0.18)).toLocaleString()}
                    </div>
                  )}
                </button>

                {/* Cancel Button */}
                <button
                  onClick={() => router.back()}
                  className="w-full mt-3 bg-secondary hover:bg-hover text-primary font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Confirmation Modal */}
        {send === true && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-primary rounded-xl max-w-md w-full p-6 text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheckIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Confirm Your Order</h3>
              <p className="text-secondary mb-6">Please review your order details before confirming</p>

              <div className="flex space-x-3">
                <button
                  onClick={() => setSend(false)}
                  className="flex-1 bg-secondary hover:bg-hover text-primary font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  Review Order
                </button>
                <button
                  onClick={() => {
                    setSend(false);
                    sendOrder();
                  }}
                  className="flex-1 bg-accent hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
