// Quick script to view all orders in database
const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://sosukeaizen_db_user:zAStWyLNfquePbCP@cluster03.1aq2iob.mongodb.net/?appName=Cluster03";

const OrderSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  address: String,
  phone: String,
  cart: Array,
  cost: Number,
  amount: Number,
  sent: Boolean,
  payment_id: String,
  payment_status: String,
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

async function viewOrders() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('📊 Checking database for orders...\n');

    const orders = await Order.find({}).sort({ createdAt: -1 });
    
    if (orders.length === 0) {
      console.log('❌ No orders found in database yet.\n');
      console.log('💡 Place an order from the website to see it here!');
    } else {
      console.log(`✅ Found ${orders.length} order(s):\n`);
      
      orders.forEach((order, index) => {
        console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
        console.log(`Order #${index + 1}`);
        console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
        console.log(`Order ID: ${order._id}`);
        console.log(`Customer: ${order.name} ${order.lastname}`);
        console.log(`Phone: ${order.phone}`);
        console.log(`Address: ${order.address}`);
        console.log(`Total: ₹${order.cost}`);
        console.log(`Items: ${order.amount}`);
        console.log(`Payment: ${order.payment_status || 'N/A'}`);
        console.log(`Status: ${order.sent ? 'Delivered' : 'Pending'}`);
        console.log(`Date: ${order.createdAt.toLocaleString()}`);
        console.log(`\nCart Items:`);
        order.cart.forEach((item, i) => {
          console.log(`  ${i + 1}. ${item.name?.replace(/_/g, ' ') || 'Unknown'}`);
          console.log(`     Color: ${item.color}, Size: ${item.size}`);
          console.log(`     Qty: ${item.amount} × ₹${item.price} = ₹${item.amount * item.price}`);
        });
        console.log('');
      });
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
  }
}

viewOrders();
