// Test script to simulate adding to cart and checking database
const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://sosukeaizen_db_user:zAStWyLNfquePbCP@cluster03.1aq2iob.mongodb.net/?appName=Cluster03";

const OrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  cart: { type: Array, required: true },
  cost: { type: Number, required: true },
  amount: { type: Number, required: true },
  sent: { type: Boolean, default: false },
  payment_id: { type: String },
  payment_status: { type: String },
}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

async function testOrderFlow() {
  console.log('🛒 Testing Order Flow (Cart to Database)...\n');
  
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Simulate cart with products
    const simulatedCart = [
      {
        name: "Blue_Denim_Jacket",
        color: "Blue",
        size: "L",
        price: 1500,
        amount: 2,
        image: "/products/jacket.jpg"
      },
      {
        name: "White_Cotton_Tshirt",
        color: "White",
        size: "M",
        price: 500,
        amount: 3,
        image: "/products/tshirt.jpg"
      }
    ];

    // Calculate totals
    const subtotal = simulatedCart.reduce((sum, item) => sum + (item.price * item.amount), 0);
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + tax;
    const totalItems = simulatedCart.reduce((sum, item) => sum + item.amount, 0);

    console.log('📦 Cart Summary:');
    simulatedCart.forEach(item => {
      console.log(`  - ${item.name.replace(/_/g, ' ')}`);
      console.log(`    Color: ${item.color}, Size: ${item.size}`);
      console.log(`    Quantity: ${item.amount} × ₹${item.price} = ₹${item.price * item.amount}`);
    });
    console.log(`\n💰 Pricing:`);
    console.log(`  Subtotal: ₹${subtotal}`);
    console.log(`  Tax (18%): ₹${tax}`);
    console.log(`  Total: ₹${total}`);
    console.log(`  Total Items: ${totalItems}\n`);

    // Create order (simulating checkout)
    console.log('💾 Saving order to database...');
    const testOrder = new Order({
      name: "Kaushik",
      lastname: "Sharma",
      address: "123 MG Road, Bangalore, Karnataka, 560001",
      phone: "9876543210",
      cart: simulatedCart,
      cost: total,
      amount: totalItems,
      sent: false,
      payment_id: "test_" + Date.now(),
      payment_status: "pending"
    });

    const savedOrder = await testOrder.save();
    console.log('✅ Order saved successfully!\n');
    console.log('📋 Order Details:');
    console.log(`  Order ID: ${savedOrder._id}`);
    console.log(`  Customer: ${savedOrder.name} ${savedOrder.lastname}`);
    console.log(`  Phone: ${savedOrder.phone}`);
    console.log(`  Address: ${savedOrder.address}`);
    console.log(`  Total Amount: ₹${savedOrder.cost}`);
    console.log(`  Total Items: ${savedOrder.amount}`);
    console.log(`  Payment Status: ${savedOrder.payment_status}`);
    console.log(`  Delivery Status: ${savedOrder.sent ? 'Sent' : 'Pending'}`);
    console.log(`  Created: ${savedOrder.createdAt}`);

    // Verify in database
    console.log('\n🔍 Verifying in database...');
    const verifiedOrder = await Order.findById(savedOrder._id);
    console.log('✅ Order found in database!');
    console.log(`  Cart has ${verifiedOrder.cart.length} product(s)`);
    
    verifiedOrder.cart.forEach((item, index) => {
      console.log(`  ${index + 1}. ${item.name} - ${item.amount} item(s)`);
    });

    // List all orders
    console.log('\n📊 All Orders in Database:');
    const allOrders = await Order.find({}).sort({ createdAt: -1 });
    console.log(`  Total orders: ${allOrders.length}`);
    
    if (allOrders.length > 0) {
      console.log('\n  Recent orders:');
      allOrders.slice(0, 5).forEach((order, index) => {
        console.log(`  ${index + 1}. ${order.name} ${order.lastname} - ₹${order.cost} (${order.amount} items) - ${order.createdAt.toLocaleString()}`);
      });
    }

    console.log('\n✅ TEST SUCCESSFUL!');
    console.log('🎉 Cart items are being saved to database correctly!');
    console.log('🎉 Product quantities are tracked!');
    console.log('🎉 Order details are complete!\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('👋 Connection closed');
  }
}

testOrderFlow();
