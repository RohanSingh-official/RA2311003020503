const axios = require('axios');
require('dotenv').config();

const BASE_URL = process.env.AFFORDMED_BASE_URL;

const credentials = {
    companyName: process.env.COMPANY_NAME,
    ownerName: process.env.OWNER_NAME,
    rollNo: process.env.ROLL_NUMBER,
    ownerEmail: process.env.OWNER_EMAIL,
    accessCode: process.env.ACCESS_CODE,
    // Fields required by the new registration endpoint
    name: process.env.OWNER_NAME,
    email: process.env.OWNER_EMAIL,
    mobileNo: process.env.MOBILE_NUMBER,
    githubUsername: process.env.GITHUB_USERNAME
};

let authToken = null;
let tokenExpiresAt = null;

async function register() {
    try {
        const url = BASE_URL.endsWith('/register') ? BASE_URL : `${BASE_URL}/register`;
        
        // Prepare the exact payload requested by the server
        const registrationPayload = {
            companyName: credentials.companyName,
            ownerName: credentials.ownerName,
            rollNo: credentials.rollNo,
            ownerEmail: credentials.ownerEmail,
            accessCode: credentials.accessCode,
            name: credentials.name,
            email: credentials.email,
            mobileNo: credentials.mobileNo,
            githubUsername: credentials.githubUsername
        };

        const response = await axios.post(url, registrationPayload);
        console.log('Registration successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
        return null;
    }
}

async function getAuthToken() {
    if (authToken && tokenExpiresAt && Date.now() < tokenExpiresAt) {
        return authToken;
    }

    try {
        const authData = {
            companyName: credentials.companyName,
            clientID: process.env.CLIENT_ID || '',
            clientSecret: process.env.CLIENT_SECRET || '',
            ownerName: credentials.ownerName,
            ownerEmail: credentials.ownerEmail,
            rollNo: credentials.rollNo,
            // Added fields required by the server for auth
            name: credentials.ownerName,
            email: credentials.ownerEmail,
            accessCode: credentials.accessCode
        };

        const authBase = getApiBase();
        const url = `${authBase}/auth`;
        console.log(`Attempting authentication at: ${url}`);

        const response = await axios.post(url, authData);
        authToken = response.data.access_token;
        tokenExpiresAt = Date.now() + (response.data.expires_in || 3600) * 1000;
        console.log('Authentication successful');
        return authToken;
    } catch (error) {
        console.error('Auth failed:', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
        return null;
    }
}

function getApiBase() {
    return BASE_URL.replace(/\/register$/, '');
}

module.exports = { register, getAuthToken, getApiBase };
