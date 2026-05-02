const http = require('http');

const endpoints = [
    '/health',
    '/depot',
    '/vehicles',
    '/notifications'
];

async function test() {
    for (const endpoint of endpoints) {
        console.log(`\nTesting ${endpoint}...`);
        await new Promise((resolve) => {
            http.get(`http://localhost:3000${endpoint}`, (res) => {
                let data = '';
                res.on('data', (chunk) => { data += chunk; });
                res.on('end', () => {
                    console.log(`Status: ${res.statusCode}`);
                    console.log(`Response: ${data}`);
                    resolve();
                });
            }).on('error', (err) => {
                console.error(`Error: ${err.message}`);
                resolve();
            });
        });
    }
}

test();
