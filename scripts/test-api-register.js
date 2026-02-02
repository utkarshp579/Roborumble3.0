const https = require('http'); // using http since localhost:3000 is usually http

const payload = {
    leader: {
        name: "Test User",
        email: `testuser_${Date.now()}@example.com`, // Unique email
        phone: "1234567890",
        college: "Test College",
        course: "B.Tech",
        password: "password123"
    },
    teamName: "Test Team " + Date.now(),
    totalAmount: 500,
    transactionId: "TXN_" + Date.now()
};

const data = JSON.stringify(payload);

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/register',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

console.log("Sending payload:", JSON.stringify(payload, null, 2));

const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);

    let responseBody = '';
    res.on('data', (chunk) => {
        responseBody += chunk;
    });

    res.on('end', () => {
        console.log('Response:', responseBody);
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
