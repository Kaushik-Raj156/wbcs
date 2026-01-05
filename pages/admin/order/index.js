import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { server } from "../../../config/index";
// to shwo order product in table
import TableOrder from "../../../components/product_components/TableOrder";
// icons
import {
  TruckIcon,
  ReplyIcon,
  CalendarIcon,
  SearchIcon,
} from "@heroicons/react/outline";
// calender
import DatePicker from "../../../components/admin/DatePicker";
import format from "date-fns/format";
import authHandler from "../../../shared/utils/auth/authHandler";

export default function index({ orders }) {
  const router = useRouter();

  // order state to send to order api
  const [ordSt, setOrdSt] = useState(orders);
  useEffect(() => {
    setOrdSt(orders);
  }, [orders]);

  // query keys and values states for searhing orders from api
  const [name, setName] = useState();
  const [lastname, setLastname] = useState();
  const [sent, setSent] = useState();
  const [dateQuery, setDateQuery] = useState();

  // date states for passing to DatePicker Component
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  //display calender boolean
  const [showCalender, setShowCalender] = useState(false);

  // when order delivered
  // change sent boolean in database and then change ui
  const UpdateSent = async (id, status) => {
    const data = await fetch(`${server}/api/order`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    });
    const athorized = data.headers.get("authorized") === "true";
    const res = await data.json();
    if (athorized === true) {
      if (res.message && res.message == "updated") {
        var newOrders = ordSt;
        newOrders = newOrders.map((order) => {
          if (order._id === id) {
            order.sent = !res.docs.sent;
          }
          return order;
        });
        setOrdSt(newOrders);
      } else {
        alert("couldn't update order");
        console.log(res);
      }
    } else {
      router.push("/admin/login");
    }
  };

  // fech orders base on new query states
  const fetchOrders = () => {
    var keys = "";
    var values = "";
    // check for undefined and empty and white space
    if (name !== undefined && name !== "" && name.indexOf(" ") < 0) {
      keys = "name";
      values = name;
    }
    if (
      lastname !== undefined &&
      lastname !== "" &&
      lastname.indexOf(" ") < 0
    ) {
      keys += "_lastname";
      values += `_${lastname}`;
    }
    if (sent !== "undefined" && sent !== undefined) {
      keys += "_sent";
      values += `_${sent}`;
    }
    if (dateQuery !== undefined && dateQuery !== "") {
      keys += "_createdAt";
      values += `_${dateQuery}`;
    }
    // requesting new query
    router.push(server + "/admin/order?key=" + keys + "&value=" + values);
  };
  return (
    <div className="bg-secondary text-secondary min-h-screen py-8 px-4 relative w-full">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-third rounded-2xl shadow-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">Order Management</h1>
              <p className="text-secondary">Manage and track customer orders</p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{ordSt.length}</div>
                <div className="text-sm text-secondary">Total Orders</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">
                  {ordSt.filter(order => order.sent).length}
                </div>
                <div className="text-sm text-secondary">Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-alert">
                  {ordSt.filter(order => !order.sent).length}
                </div>
                <div className="text-sm text-secondary">In Process</div>
              </div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-secondary rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-primary mb-4 flex items-center">
              <SearchIcon className="w-5 h-5 mr-2" />
              Search & Filter Orders
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Customer First Name
                </label>
                <input
                  placeholder="Search by first name"
                  className="w-full bg-third border border-gray-300 rounded-xl py-3 px-4 focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 outline-none"
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Customer Last Name
                </label>
                <input
                  placeholder="Search by last name"
                  className="w-full bg-third border border-gray-300 rounded-xl py-3 px-4 focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 outline-none"
                  id="lastname"
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Order Status
                </label>
                <select
                  className="w-full bg-third border border-gray-300 rounded-xl py-3 px-4 focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 outline-none"
                  value={sent}
                  onChange={(e) => setSent(e.target.value)}
                >
                  <option value="undefined">All Orders</option>
                  <option value="true">Delivered Orders</option>
                  <option value="false">In Process Orders</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">
                  Date Range
                </label>
                <button
                  className="w-full flex items-center justify-center py-3 px-4 bg-third border border-hover rounded-xl hover:bg-hover transition-all duration-200 focus:ring-2 focus:ring-accent focus:border-transparent outline-none"
                  onClick={() => setShowCalender(true)}
                >
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  <span>Select Date Range</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="flex items-center justify-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                onClick={() => setDateQuery()}
              >
                <span>Reset Filters</span>
              </button>
              <button
                className="flex items-center justify-center px-6 py-3 bg-accent hover:bg-green-600 text-white rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                onClick={fetchOrders}
              >
                <SearchIcon className="w-5 h-5 mr-2" />
                <span>Search Orders</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* orders */}
      <div className="max-w-7xl mx-auto space-y-6">
        {ordSt.map((order, i) => (
          <div
            key={i}
            className="bg-third rounded-2xl shadow-xl overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl"
            style={{
              borderColor: order.sent ? '#10b981' : '#f59e0b'
            }}
          >
            {/* Order Header */}
            <div 
              className="px-6 py-4 flex items-center justify-between"
              style={{
                background: order.sent 
                  ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                  : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
              }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  {order.sent ? (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {order.name} {order.lastname}
                  </h3>
                  <p className="text-sm text-white text-opacity-90">
                    Order #{order._id.slice(-8).toUpperCase()}
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => UpdateSent(order._id, !order.sent)}
                className="px-6 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg transition-all duration-200 flex items-center gap-2 font-semibold"
              >
                {order.sent ? (
                  <>
                    <ReplyIcon className="w-5 h-5" />
                    Mark as Pending
                  </>
                ) : (
                  <>
                    <TruckIcon className="w-5 h-5" />
                    Mark as Delivered
                  </>
                )}
              </button>
            </div>

            {/* Order Details */}
            <div className="px-6 py-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Contact Info */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-1">Phone</p>
                    <p className="text-base font-medium text-primary">{order.phone}</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-1">Delivery Address</p>
                    <p className="text-base font-medium text-primary">{order.address}</p>
                  </div>
                </div>

                {/* Order Date */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-1">Order Date</p>
                    <p className="text-base font-medium text-primary">
                      {format(new Date(order.createdAt), "dd-MMM-yyyy")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mt-6">
                <h4 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                  </svg>
                  Order Items
                </h4>
                <TableOrder cart={order.cart} />
              </div>

              {/* Order Status Badge */}
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-secondary">Status:</span>
                  <span 
                    className="px-4 py-1.5 rounded-full text-sm font-semibold"
                    style={{
                      backgroundColor: order.sent ? '#d1fae5' : '#fef3c7',
                      color: order.sent ? '#065f46' : '#92400e'
                    }}
                  >
                    {order.sent ? '✓ Delivered' : '⏳ In Process'}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-secondary">Total Amount</p>
                  <p className="text-2xl font-bold text-primary">
                    ₹{order.cart.reduce((total, item) => total + (item.price * item.qty), 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        input[type="checkbox"] {
          opacity: 0.7;
        }
        input[type="checkbox"]:checked {
          opacity: 1;
        }
      `}</style>
      {/* date range calender conditional rendering */}
      {showCalender ? (
        <div className="z-50 absolute flex flex-col justify-center w-full h-screen bg-[#000000e3] top-0 lef-0 right-0">
          <div className="w-min mx-auto">
            <DatePicker state={date} setState={setDate} />
          </div>
          <button
            className="mt-8 px-6 py-2 bg-success mx-auto text-center rounded-full text-white text-xl"
            onClick={() => {
              setDateQuery(
                `${format(
                  new Date(date[0]["startDate"]),
                  "yyyy-MM-dd'T'HH:mm:ss.SSS"
                )}to${format(
                  new Date(date[0]["endDate"]),
                  "yyyy-MM-dd'T'HH:mm:ss.SSS"
                )}`
              );
              setShowCalender(false);
            }}
          >
            set date
          </button>
        </div>
      ) : null}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { authorized, access, refresh } = await authHandler(
    context.req,
    context.res,
    true
  );

  if (authorized === true) {
    const { key, value } = context.query;
    const response = await fetch(
      `${server}/api/order?key=${key}&value=${value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          refresh: refresh,
          access: access,
        },
      }
    );
    const data = await response.json();
    return {
      props: { orders: data.orders }, // will be passed to the page component as props
    };
  } else {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
}
