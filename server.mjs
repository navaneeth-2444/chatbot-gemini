import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY); // Load API key from .env file
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

app.use(express.json());
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
    const question = req.body.question;
    
    try {
        console.log('Received question:', question);
        
        // Generate response from Gemini
        const result = await model.generateContent(question);
        const response = await result.response;
        const text = response.text();
        
        res.json({ completion: text });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: "An error occurred", 
            details: error.message 
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});