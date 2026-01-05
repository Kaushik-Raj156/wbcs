require('dotenv').config();
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  email: String,
  password: String,
  phone: String,
  address: String,
}, { timestamps: true });

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function checkAdmins() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');
    
    const admins = await Admin.find({});
    console.log(`Found ${admins.length} admin(s):\n`);
    
    admins.forEach((admin, index) => {
      console.log(`Admin ${index + 1}:`);
      console.log(`  ID: ${admin._id}`);
      console.log(`  Name: ${admin.name} ${admin.lastname}`);
      console.log(`  Email: ${admin.email}`);
      console.log(`  Phone: ${admin.phone || 'N/A'}`);
      console.log(`  Address: ${admin.address || 'N/A'}`);
      console.log(`  Created: ${admin.createdAt}`);
      console.log(`  Password hash starts with: ${admin.password?.substring(0, 20)}...`);
      console.log('');
    });
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkAdmins();
