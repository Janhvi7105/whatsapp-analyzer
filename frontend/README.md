📊 WhatsApp Chat Analyzer with AI Insights

A full-stack MERN Stack web application that analyzes exported WhatsApp chat files and generates meaningful insights using Artificial Intelligence, interactive charts, and natural language processing.

🚀 Live Demo

🌐 Live Application: https://whatsapp-analyzer-ten-pink.vercel.app

💻 GitHub Repository: https://github.com/Janhvi7105/whatsapp-analyzer

📌 Project Overview

WhatsApp Chat Analyzer is an AI-powered analytics platform that allows users to upload exported WhatsApp chat files (.txt) and instantly receive comprehensive insights about their conversations.

The application performs:

Chat parsing and processing
User activity analysis
Message statistics
Emoji analysis
Word frequency analysis
AI-powered sentiment analysis
Emotion detection
Interactive visual dashboards
✨ Features
📂 Chat Upload
Upload exported WhatsApp .txt files
Automatic validation and parsing
Supports multiple WhatsApp export formats
📊 Chat Statistics
Total Messages
Most Active Participant
User-wise Message Distribution
Average Messages
Smart Conversation Summary
🔤 Word Analysis
Most Frequently Used Words
Stop-word Filtering
Keyword Extraction
😊 Emoji Analysis
Emoji Frequency
Emoji Distribution
Most Used Emojis
📅 Activity Analysis

Visualize messaging activity by:

Day of Week
Month
Timeline
🤖 AI-Powered Insights

Powered by the Hugging Face Inference API.

Includes:

Sentiment Analysis
Positive
Neutral
Negative
Emotion Detection
Joy
Sadness
Anger
Fear
Surprise
📈 Interactive Dashboard

Built using Chart.js and Recharts.

Includes:

User Activity Charts
Timeline Graphs
Emoji Charts
Word Analysis Visualizations
🧠 How It Works
User uploads a WhatsApp chat export (.txt).
Backend validates and parses the chat.
Messages are converted into structured data.
Statistics and analytics are generated.
AI performs sentiment and emotion analysis.
Results are stored in MongoDB.
Interactive charts and dashboards are displayed on the frontend.
🛠 Tech Stack
Frontend
React.js
React Router
Axios
Chart.js
Recharts
Backend
Node.js
Express.js
MongoDB
Mongoose
AI & NLP
Hugging Face Inference API
Other Libraries
Multer
dotenv
CORS
📂 Project Structure
whatsapp-analyzer
│
├── backend
│   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   ├── uploads
│   └── server.js
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── services
│   │   └── App.js
│
├── package.json
└── README.md
⚙️ Installation
Clone Repository
git clone https://github.com/Janhvi7105/whatsapp-analyzer.git

cd whatsapp-analyzer
Install Backend
cd backend

npm install

Create a .env file inside the backend directory.

PORT=5001
MONGO_URI=YOUR_MONGODB_URI
HUGGINGFACE_API_KEY=YOUR_API_KEY

Start the backend:

npm run dev
Install Frontend
cd frontend

npm install

npm start
🌐 Deployment
Service	Platform
Frontend	Vercel
Backend	Render
Database	MongoDB Atlas
📸 Screenshots

Add screenshots here after capturing your application.

Example:

screenshots/
│
├── home.png
├── upload.png
├── dashboard.png
├── charts.png
├── insights.png
📖 Usage
Export a WhatsApp chat without media.
Save the chat as a .txt file.
Upload the file through the application.
Click Analyze Chat.
Explore statistics, charts, and AI-generated insights.
🔮 Future Enhancements
User Authentication
Chat History Management
PDF Report Generation
Topic Modeling
Real-Time Chat Analysis
Dark Mode
Multi-Chat Comparison
Cloud File Storage
👩‍💻 Author

Janhvi

GitHub: https://github.com/Janhvi7105