import dotenv from 'dotenv';
dotenv.config();

console.log('API Key length:', process.env.OPENAI_API_KEY?.length);
console.log('API Key exists:', !!process.env.OPENAI_API_KEY);
console.log('Port:', process.env.PORT);