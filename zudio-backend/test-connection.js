const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  try {
    console.log('Testing MongoDB connection...');
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully!');
    console.log('Database:', conn.connection.db.databaseName);
    
    // Test creating a simple document
    const TestSchema = new mongoose.Schema({ test: String });
    const TestModel = mongoose.model('Test', TestSchema);
    
    const testDoc = new TestModel({ test: 'Connection test successful' });
    await testDoc.save();
    console.log('✅ Test document created successfully!');
    
    // Clean up
    await TestModel.deleteMany({});
    console.log('✅ Test cleanup completed!');
    
    await mongoose.disconnect();
    console.log('✅ Connection test completed successfully!');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    if (error.message.includes('authentication failed')) {
      console.log('💡 Check your MongoDB Atlas username and password');
    } else if (error.message.includes('getaddrinfo ENOTFOUND')) {
      console.log('💡 Check your connection string and network access');
    }
  }
};

testConnection();
