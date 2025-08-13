// test-mongo-connection.js
// Run this script to test different connection methods
const { MongoClient } = require('mongodb');

const testConfigs = [
  {
    name: 'Without authSource',
    uri: 'mongodb://amit:amit1234567890@172.16.0.12:27017/devops-secops'
  },
  {
    name: 'With authSource=devops-secops and authMechanism',
    uri: 'mongodb://amit:amit1234567890@172.16.0.12:27017/devops-secops?authSource=devops-secops&authMechanism=SCRAM-SHA-1'
  },
  {
    name: 'With authSource=admin and authMechanism',
    uri: 'mongodb://amit:amit1234567890@172.16.0.12:27017/devops-secops?authSource=admin&authMechanism=SCRAM-SHA-1'
  }
];

async function testConnection(config) {
  console.log(`\n🧪 Testing: ${config.name}`);
  console.log(`URI: ${config.uri.replace('amit1234567890', '***')}`);
  
  const client = new MongoClient(config.uri, {
    serverSelectionTimeoutMS: 5000
  });
  
  try {
    console.log('Connecting...');
    await client.connect();
    console.log('✅ Connection successful!');
    
    const db = client.db('devops-secops');
    const collection = db.collection('test');
    
    console.log('Testing database access...');
    const count = await collection.countDocuments();
    console.log(`✅ Database access successful! Found ${count} documents`);
    
    return true;
  } catch (error) {
    console.error(`❌ Connection failed:`);
    console.error(`Error: ${error.message}`);
    console.error(`Code: ${error.code || 'N/A'}`);
    return false;
  } finally {
    try {
      await client.close();
    } catch (closeError) {
      // Ignore close errors
    }
  }
}

async function runAllTests() {
  console.log('🚀 Starting MongoDB connection tests...\n');
  
  for (const config of testConfigs) {
    const success = await testConnection(config);
    if (success) {
      console.log(`\n🎉 SUCCESS! Use this connection string:`);
      console.log(`MONGODB_URI=${config.uri}`);
      break;
    }
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second between tests
  }
  
  console.log('\n🏁 Tests completed');
}

runAllTests().catch(console.error);