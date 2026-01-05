import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CheckCircleIcon, HomeIcon, ShoppingBagIcon } from "@heroicons/react/outline";
import TableOrder from "../components/product_components/TableOrder";

export default function OrderConfirmation() {
  const router = useRouter();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // Get order data from sessionStorage
    const storedOrder = sessionStorage.getItem("orderConfirmation");
    if (storedOrder) {
      setOrderData(JSON.parse(storedOrder));
      // Clear after retrieving
      sessionStorage.removeItem("orderConfirmation");
    } else {
      // Redirect to home if no order data
      router.push("/");
    }
  }, []);

  if (!orderData) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto"></div>
          <p className="text-primary mt-4">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 mb-8 text-center shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="bg-white bg-opacity-20 rounded-full p-6 animate-bounce">
              <CheckCircleIcon className="w-20 h-20 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">
            Order Placed Successfully! 🎉
          </h1>
          <p className="text-xl text-white text-opacity-90">
            Thank you for your purchase
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-secondary rounded-2xl shadow-xl overflow-hidden border-2 border-hover mb-6">
          {/* Order ID Section */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm text-white text-opacity-80 mb-1">Order ID</p>
                <p className="text-2xl font-bold text-white font-mono">
                  {orderData.orderId}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-white text-opacity-80 mb-1">Total Amount</p>
                <p className="text-3xl font-bold text-white">
                  ₹{orderData.totalAmount}
                </p>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="px-8 py-6 border-b border-hover">
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              Customer Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-1">Name</p>
                  <p className="text-base font-medium text-primary">
                    {orderData.name} {orderData.lastname}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-1">Phone</p>
                  <p className="text-base font-medium text-primary">{orderData.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 md:col-span-2">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-1">Delivery Address</p>
                  <p className="text-base font-medium text-primary">{orderData.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="px-8 py-6">
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <ShoppingBagIcon className="w-6 h-6" />
              Order Items
            </h3>
            <TableOrder cart={orderData.cart} />
          </div>
        </div>

        {/* Status Message */}
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <h4 className="text-lg font-bold text-blue-900 mb-2">What's Next?</h4>
              <p className="text-blue-800 leading-relaxed">
                Your order has been received and will be processed soon. You'll receive updates on your registered phone number. 
                Our team will contact you for delivery confirmation.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => router.push("/")}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg font-bold flex items-center gap-3"
          >
            <HomeIcon className="w-6 h-6" />
            Back to Home
          </button>
          <button
            onClick={() => router.push("/search")}
            className="px-8 py-4 bg-third hover:bg-hover text-primary border-2 border-hover rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg font-bold flex items-center gap-3"
          >
            <ShoppingBagIcon className="w-6 h-6" />
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
