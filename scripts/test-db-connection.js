const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Manually load .env to avoid dependency issues
const envPath = path.resolve(__dirname, '../.env');
console.log("Looking for .env at:", envPath);

if (fs.existsSync(envPath)) {
    console.log(".env file exists.");
    const envConfig = fs.readFileSync(envPath, 'utf8');
    console.log("File content length:", envConfig.length);

    const lines = envConfig.split(/\r?\n/);
    lines.forEach((line, index) => {
        if (!line.trim()) return;
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            const key = match[1].trim();
            const value = match[2].trim().replace(/^"(.*)"$/, '$1'); // Remove quotes if present
            process.env[key] = value;
            if (key === 'MONGODB_URI') {
                console.log(`Loaded MONGODB_URI (masked): ${value.substring(0, 15)}...`);
            }
        } else {
            // console.log(`Line ${index} ignored: ${line}`);
        }
    });
} else {
    console.error("No .env file found at " + envPath);
    process.exit(1);
}

const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error("MONGODB_URI is undefined after parsing .env!");
    process.exit(1);
}

async function testConnection() {
    try {
        console.log("Attempting to connect to MongoDB...");
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000
        });
        console.log("Successfully connected to MongoDB!");
        await mongoose.connection.close();
    } catch (err) {
        console.error("Connection failed:", err.message);
    }
}

testConnection();
