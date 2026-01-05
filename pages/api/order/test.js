import connectDB from "../../../middleware/db/mongodb";
import Order from "../../../models/OrderModel";
import errorController from "../../../controller/errorController";

// TEST MODE ENDPOINT - Skip Razorpay payment verification
const createTestOrder = async (req, res) => {
  if (req.method !== 'POST') {
    return errorController(405, 'Method not allowed', res);
  }

  const { name, lastname, address, phone, cart, cost, amount } = req.body;

  console.log('📝 Test Order Received:');
  console.log('Customer:', name, lastname);
  console.log('Phone:', phone);
  console.log('Address:', address);
  console.log('Cart items:', cart?.length);
  console.log('Total cost:', cost);
  console.log('Total amount:', amount);

  if (!name || !lastname || !address || !phone || !cart || !cost || !amount) {
    console.log('❌ Missing required fields');
    return errorController(422, 'incomplete data', res);
  }

  try {
    // Create order without payment verification
    const order = new Order({
      name,
      lastname,
      address,
      phone,
      cart,
      cost,
      amount,
      sent: false,
      payment_id: `order_${Date.now()}`,
      payment_status: 'pending',
    });

    const createdOrder = await order.save();
    console.log('✅ Test order saved! ID:', createdOrder._id);
    
    return res.status(200).json({ 
      message: "saved", 
      createdOrder,
      note: "TEST MODE - Payment verification skipped"
    });
  } catch (error) {
    console.error('❌ Error saving test order:', error);
    return errorController(500, error.message, res);
  }
};

export default connectDB(createTestOrder);
