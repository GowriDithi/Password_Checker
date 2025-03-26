// Backend (Node.js with Express)
const express = require("express");
const app = express();
const cors = require("cors");

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Simple test endpoint
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Function to check password strength
function checkPasswordStrength(password) {
    if (!password) return { strength: "Empty", message: "Please enter a password" };
    
    // Check for minimum length
    if (password.length < 8) {
        return { 
            strength: "Weak", 
            message: "Password must be at least 8 characters long" 
        };
    }

    // Initialize score
    let score = 0;

    // Check for uppercase letters
    if (/[A-Z]/.test(password)) score++;
    
    // Check for lowercase letters
    if (/[a-z]/.test(password)) score++;
    
    // Check for numbers
    if (/[0-9]/.test(password)) score++;
    
    // Check for special characters
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

    // Return strength based on score
    if (score === 4) {
        return { 
            strength: "Strong", 
            message: "Excellent! Your password is strong!" 
        };
    } else if (score === 3) {
        return { 
            strength: "Medium", 
            message: "Add another character type (uppercase, lowercase, number, or special character)" 
        };
    } else {
        return { 
            strength: "Weak", 
            message: "Try adding uppercase letters, numbers, and special characters" 
        };
    }
}

// Endpoint to check password
app.post("/check-password", (req, res) => {
    try {
        console.log('Received request:', req.body);
        const { password } = req.body;
        const result = checkPasswordStrength(password);
        console.log('Sending response:', result);
        res.json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
