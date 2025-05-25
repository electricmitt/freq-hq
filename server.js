require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static('.'));

// Proxy endpoint for Riffusion API
app.post('/api/generate-music', async (req, res) => {
    try {
        console.log('Received request to generate music');
        const response = await fetch('https://api.replicate.com/v1/predictions', {
            method: 'POST',
            headers: {
                'Authorization': `Token ${process.env.RIFFUSION_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body)
        });
        
        const data = await response.json();
        console.log('Riffusion API response:', data);
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to generate music' });
    }
});

// Get prediction status
app.get('/api/prediction/:id', async (req, res) => {
    try {
        console.log('Checking prediction status for:', req.params.id);
        const response = await fetch(`https://api.replicate.com/v1/predictions/${req.params.id}`, {
            headers: {
                'Authorization': `Token ${process.env.RIFFUSION_API_TOKEN}`,
            }
        });
        
        const data = await response.json();
        console.log('Prediction status:', data.status);
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to get prediction status' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('API Token loaded:', process.env.RIFFUSION_API_TOKEN ? 'Yes' : 'No');
}); 