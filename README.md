💬 WhatsApp Chat Analyzer with AI Insights

<p align="center"> <b>AI-powered WhatsApp chat analytics built with the MERN Stack.</b><br> Upload exported WhatsApp chats and receive interactive analytics, sentiment analysis, emotion detection, and beautiful visualizations. </p>

<p align="center"> <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" /> <img src="https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white" /> <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white" /> <img src="https://img.shields.io/badge/HuggingFace-AI-FFD21E" /> 
<img src="https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel" /> 
<img src="https://img.shields.io/badge/Backend-Render-46E3B7" />
 </p>

🌐 Live Demo

🔗 Live Application

https://whatsapp-analyzer-ten-pink.vercel.app

💻 GitHub Repository

https://github.com/Janhvi7105/whatsapp-analyzer

📖 Overview

WhatsApp Chat Analyzer is a full-stack MERN application that transforms exported WhatsApp chat files into meaningful insights using Artificial Intelligence and Natural Language Processing.

The platform automatically analyzes conversations and provides interactive dashboards containing statistics, timelines, emoji analytics, word frequency, participant activity, sentiment analysis, and emotion detection.

This project demonstrates practical implementation of:

Full-Stack MERN Development
REST APIs
MongoDB Database
Artificial Intelligence Integration
Natural Language Processing
Data Visualization
Cloud Deployment
✨ Features
📂 Chat Processing
Upload exported WhatsApp .txt chat files
Automatic validation and parsing
Supports multiple export formats
Intelligent participant identification
📊 Conversation Analytics
Total Messages
Most Active Participant
Average Messages
User-wise Message Distribution
Smart Conversation Summary
😊 Emoji Analytics
Emoji Frequency
Most Used Emojis
Emoji Distribution
Emoji Usage Trends
🔤 Word Analytics
Word Frequency
Stop-word Filtering
Keyword Extraction
Most Frequently Used Words
📅 Activity Analysis
Daily Activity
Weekly Activity
Monthly Timeline
Conversation Trends
🤖 AI Insights

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

The application provides interactive visualizations using Chart.js and Recharts.

Dashboard includes:

User Activity Charts
Timeline Graphs
Emoji Charts
Word Frequency Charts
AI Insights
🏗 System Architecture
                    User
                      │
                      ▼
          Upload WhatsApp Chat
                      │
                      ▼
             React Frontend
                      │
                Axios Requests
                      │
                      ▼
            Express.js Backend
                      │
          Chat Parsing Engine
                      │
        Hugging Face AI Service
                      │
                      ▼
             MongoDB Database
                      │
                      ▼
      Interactive Analytics Dashboard
🔄 Application Workflow
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
AI Analysis
      │
      ▼
Store Results
      │
      ▼
Display Dashboard
🛠 Tech Stack
Category	Technologies
Frontend	React.js, React Router, Axios
Backend	Node.js, Express.js
Database	MongoDB Atlas, Mongoose
AI	Hugging Face Inference API
Charts	Chart.js, Recharts
Deployment	Vercel, Render
📂 Folder Structure
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
├── package-lock.json
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

Start backend

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
AI	Hugging Face
📸 Screenshots

Add screenshots of your application here.

screenshots/
│
├── home.png
├── upload.png
├── dashboard.png
├── charts.png
└── ai-insights.png
📚 Usage
Export a WhatsApp chat without media.
Save it as a .txt file.
Upload the file.
Click Analyze Chat.
View AI insights, charts, statistics, emoji analysis, and timelines.
🎯 Learning Outcomes

This project demonstrates practical knowledge of:

MERN Stack Development
REST API Design
MongoDB Integration
Artificial Intelligence Integration
Natural Language Processing
Data Visualization
File Upload Handling
Cloud Deployment
Responsive UI Development
Git & GitHub
🚀 Future Enhancements
User Authentication
Chat History
PDF Report Generation
AI Conversation Summary
Topic Modeling
Multi-Chat Comparison
Dark Mode
Cloud Storage
Real-Time Chat Analysis
👩‍💻 Developer

Janhvi

B.Tech Student | MERN Stack Developer | AI Enthusiast

GitHub:

https://github.com/Janhvi7105