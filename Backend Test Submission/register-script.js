const { register } = require('./auth');
require('dotenv').config();

async function run() {
    console.log('--- Affordmed Registration Utility ---');
    
    // Check if .env is configured
    if (process.env.COMPANY_NAME === 'Update_With_Your_Company_Name' || !process.env.ACCESS_CODE) {
        console.error('\x1b[31m%s\x1b[0m', 'Error: Please update your .env file with your actual credentials first!');
        console.log('Current .env state:');
        console.log('- COMPANY_NAME:', process.env.COMPANY_NAME);
        console.log('- ACCESS_CODE:', process.env.ACCESS_CODE ? 'Set (Hidden)' : 'NOT SET');
        return;
    }

    console.log('Attempting to register with credentials in .env...');
    const result = await register();

    if (result) {
        console.log('\n\x1b[32m%s\x1b[0m', 'SUCCESS!');
        console.log('Please copy these values into your .env file:');
        console.log('-------------------------------------------');
        console.log(`CLIENT_ID=${result.clientID}`);
        console.log(`CLIENT_SECRET=${result.clientSecret}`);
        console.log('-------------------------------------------');
        console.log('\nAfter updating .env, you can start the server with: npm start');
    } else {
        console.log('\n\x1b[31m%s\x1b[0m', 'FAILED!');
        console.log('Check your credentials and ensure the test server is reachable.');
    }
}

run();
