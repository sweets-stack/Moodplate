// test-simple.js
import dotenv from 'dotenv';
import fs from 'fs';

console.log('=== SIMPLE ENV TEST ===');

// Check if .env exists
if (!fs.existsSync('.env')) {
  console.log('❌ .env file does not exist in current directory');
  process.exit(1);
}

console.log('✅ .env file exists');

// Read .env content
const envContent = fs.readFileSync('.env', 'utf8');
console.log('📄 .env file content:');
console.log(envContent);

// Load environment variables
dotenv.config();

console.log('🔍 After loading:');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? `"${process.env.JWT_SECRET.substring(0, 10)}..."` : 'NOT FOUND');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'FOUND' : 'NOT FOUND');
console.log('PORT:', process.env.PORT);