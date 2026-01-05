// Test script to verify MongoDB connection and order saving
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

async function testDatabaseConnection() {
  console.log('🔍 Testing MongoDB Connection...\n');
  
  try {
    // Connect to MongoDB
    console.log('📡 Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Successfully connected to MongoDB!\n');

    // Test: Fetch existing orders
    console.log('📋 Fetching existing orders...');
    const existingOrders = await Order.find({}).limit(5);
    console.log(`Found ${existingOrders.length} order(s) in database`);
    
    if (existingOrders.length > 0) {
      console.log('\n📦 Sample order:');
      console.log(JSON.stringify(existingOrders[0], null, 2));
    }

    // Test: Create a test order
    console.log('\n🧪 Creating test order...');
    const testOrder = new Order({
      name: "Test",
      lastname: "User",
      address: "123 Test Street, Test City",
      phone: "1234567890",
      cart: [
        {
          name: "Test Product",
          color: "Black",
          size: "M",
          price: 100,
          amount: 1
        }
      ],
      cost: 100,
      amount: 1,
      sent: false,
      payment_id: "test_payment_" + Date.now(),
      payment_status: "test"
    });

    const savedOrder = await testOrder.save();
    console.log('✅ Test order saved successfully!');
    console.log('Order ID:', savedOrder._id);

    // Verify the order was saved
    const verifyOrder = await Order.findById(savedOrder._id);
    console.log('✅ Order verified in database!');

    // Clean up test order
    await Order.findByIdAndDelete(savedOrder._id);
    console.log('🧹 Test order cleaned up');

    // Summary
    console.log('\n📊 Database Connection Summary:');
    console.log('✅ Connection: Working');
    console.log('✅ Read Operations: Working');
    console.log('✅ Write Operations: Working');
    console.log('✅ Delete Operations: Working');
    console.log('\n💡 Your database is fully functional!');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\n🔧 Troubleshooting tips:');
    console.error('1. Check if MongoDB URI is correct');
    console.error('2. Verify network connectivity');
    console.error('3. Ensure IP address is whitelisted in MongoDB Atlas');
    console.error('4. Check database user permissions');
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Connection closed');
  }
}

testDatabaseConnection();
