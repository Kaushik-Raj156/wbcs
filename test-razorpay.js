// Test Razorpay API connection
const Razorpay = require('razorpay');

const RAZORPAY_KEY_ID = 'rzp_test_RZ9WtceYiHwuMU';
const RAZORPAY_KEY_SECRET = 'UTPkyyGo41tQOYvapELNpYT8';

async function testRazorpayConnection() {
  console.log('🔍 Testing Razorpay Integration...\n');
  
  try {
    console.log('🔑 Razorpay Credentials:');
    console.log('Key ID:', RAZORPAY_KEY_ID);
    console.log('Key Secret:', RAZORPAY_KEY_SECRET ? '***' + RAZORPAY_KEY_SECRET.slice(-4) : 'Not set');
    
    const razorpay = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    });
    
    console.log('\n✅ Razorpay instance created successfully!\n');

    // Test creating a payment order
    console.log('🧪 Creating test payment order...');
    const options = {
      amount: 50000, // ₹500 in paise
      currency: 'INR',
      receipt: `test_receipt_${Date.now()}`,
    };
    
    console.log('Order options:', options);
    
    const order = await razorpay.orders.create(options);
    
    console.log('\n✅ Payment order created successfully!');
    console.log('Order Details:');
    console.log('  Order ID:', order.id);
    console.log('  Amount:', order.amount, 'paise (₹' + (order.amount / 100) + ')');
    console.log('  Currency:', order.currency);
    console.log('  Status:', order.status);
    console.log('  Receipt:', order.receipt);
    
    console.log('\n📊 Razorpay Integration Summary:');
    console.log('✅ API Credentials: Valid');
    console.log('✅ Order Creation: Working');
    console.log('\n💡 Your Razorpay integration is fully functional!');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\n🔧 Error Details:', error);
    console.error('\n🔧 Troubleshooting tips:');
    console.error('1. Verify Razorpay API credentials are correct');
    console.error('2. Check if test mode keys are being used');
    console.error('3. Ensure Razorpay account is active');
    console.error('4. Check network connectivity to Razorpay API');
  }
}

testRazorpayConnection();
