💬 WhatsApp Chat Analyzer with AI Insights

An AI-powered MERN Stack application that transforms exported WhatsApp chat files into meaningful analytics using Natural Language Processing (NLP), interactive visualizations, and sentiment analysis.

<p align="center">

React • Node.js • Express.js • MongoDB • Hugging Face AI • Chart.js • Recharts

</p>

🌐 Live Demo

🚀 Live Application
https://whatsapp-analyzer-ten-pink.vercel.app

💻 GitHub Repository
https://github.com/Janhvi7105/whatsapp-analyzer

📖 Overview

WhatsApp Chat Analyzer is a full-stack web application that enables users to upload exported WhatsApp chat files (.txt) and instantly receive comprehensive conversation analytics.

The system combines Artificial Intelligence, Natural Language Processing, and interactive data visualization to convert raw chat data into meaningful insights.

The application is built using the MERN Stack and integrates the Hugging Face Inference API for AI-powered sentiment and emotion analysis.

✨ Key Features
📂 Chat Processing
Upload exported WhatsApp chat files
Automatic chat parsing and validation
Supports multiple WhatsApp export formats
Intelligent participant identification
Efficient text preprocessing
📊 Conversation Analytics
Total Messages
Most Active Participant
User-wise Message Distribution
Average Messages
Smart Conversation Summary
Overall Chat Statistics
📅 Activity Analytics

Visualize messaging behavior through:

Daily Activity
Weekly Activity
Monthly Activity
Timeline Analysis
🔤 Word Analytics
Most Frequently Used Words
Stop-word Removal
Keyword Extraction
Word Frequency Analysis
😊 Emoji Analytics
Emoji Frequency Distribution
Most Used Emojis
Emoji Usage Trends
Emoji Statistics
🤖 AI-Powered Insights

Powered by the Hugging Face Inference API.

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

Interactive visualizations built using Chart.js and Recharts.

Dashboard includes:

User Activity Charts
Timeline Graphs
Participant Distribution
Word Analysis Charts
Emoji Charts
AI Insight Dashboard
🏗️ System Architecture
              User
                │
                ▼
     Upload WhatsApp Chat (.txt)
                │
                ▼
         React Frontend
                │
          Axios API Calls
                │
                ▼
       Express.js Backend
                │
    Chat Parsing & Processing
                │
        AI Sentiment Analysis
                │
          MongoDB Database
                │
                ▼
     Interactive Analytics Dashboard
⚙️ Workflow
Upload Chat
      │
      ▼
Validate File
      │
      ▼
Parse Messages
      │
      ▼
Generate Statistics
      │
      ▼
AI Sentiment Analysis
      │
      ▼
Store Results
      │
      ▼
Display Interactive Dashboard
🛠️ Technology Stack
Category	Technologies
Frontend	React.js, React Router, Axios
Backend	Node.js, Express.js
Database	MongoDB Atlas, Mongoose
AI	Hugging Face Inference API
Charts	Chart.js, Recharts
Deployment	Vercel, Render
📂 Project Structure
whatsapp-analyzer
│
├── backend
│   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── services
│   ├── uploads
│   ├── utils
│   └── server.js
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.js
│
├── package.json
└── README.md
🚀 Installation
Clone Repository
git clone https://github.com/Janhvi7105/whatsapp-analyzer.git

cd whatsapp-analyzer
Backend Setup
cd backend

npm install

Create a .env file.

PORT=5001
MONGO_URI=YOUR_MONGODB_URI
HUGGINGFACE_API_KEY=YOUR_HUGGINGFACE_API_KEY

Run the backend:

npm run dev
Frontend Setup
cd frontend

npm install

npm start
🌍 Deployment
Service	Platform
Frontend	Vercel
Backend	Render
Database	MongoDB Atlas
AI Service	Hugging Face
📸 Screenshots

Add screenshots of the application after deployment.

screenshots/
│
├── home.png
├── upload-chat.png
├── statistics.png
├── emoji-analysis.png
├── timeline.png
└── ai-insights.png
📚 Usage
Export a WhatsApp chat without media.
Save the exported chat as a .txt file.
Open the application.
Upload the chat file.
Click Analyze Chat.
Explore statistics, visualizations, emoji analytics, and AI-generated insights.
🎯 Learning Outcomes

This project demonstrates practical knowledge of:

MERN Stack Development
REST API Design
MongoDB Integration
Artificial Intelligence Integration
Natural Language Processing
Data Visualization
File Upload Handling
Responsive UI Development
Cloud Deployment with Vercel & Render
🔮 Future Enhancements
User Authentication
Chat History
PDF Report Generation
AI Conversation Summary
Topic Modeling
Multi-Chat Comparison
Real-Time Chat Analysis
Dark Mode
Cloud Storage Integration
👩‍💻 Author

Janhvi

GitHub: https://github.com/Janhvi7105