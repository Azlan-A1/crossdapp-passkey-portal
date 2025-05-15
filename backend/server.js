const express = require('express');
const cors = require('cors');
const { Keypair } = require('stellar-sdk');

const app = express();
app.use(cors());
app.use(express.json());

// Store challenges in memory (in production, use a proper database)
const challenges = new Map();

// Generate a unique challenge for passkey authentication
app.get('/challenge', (req, res) => {
    const challenge = Keypair.random().publicKey();
    const timestamp = Date.now();
    challenges.set(challenge, timestamp);
    
    // Clean up old challenges (older than 5 minutes)
    for (const [key, value] of challenges.entries()) {
        if (Date.now() - value > 5 * 60 * 1000) {
            challenges.delete(key);
        }
    }
    
    res.json({ challenge });
});

// Verify a challenge response
app.post('/verify', (req, res) => {
    const { challenge, signature } = req.body;
    
    if (!challenges.has(challenge)) {
        return res.status(400).json({ error: 'Invalid or expired challenge' });
    }
    
    // In a real implementation, verify the signature here
    // For now, we'll just acknowledge receipt
    challenges.delete(challenge);
    res.json({ verified: true });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`OrbitPass API running on port ${PORT}`);
}); 