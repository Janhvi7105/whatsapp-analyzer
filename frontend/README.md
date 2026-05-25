📊 WhatsApp Chat Analyzer with AI Insights 🤖

A full-stack web application that analyzes exported WhatsApp chats and generates data-driven insights, visual analytics, and AI-powered sentiment analysis.

🚀 Features
📂 Chat Upload & Processing
Upload WhatsApp .txt chat file
Backend validates and parses chat data
Supports fallback parsing for different chat formats
📊 Chat Statistics
Total number of messages
Most active user detection
User-wise message distribution
Smart summary generation
🔤 Word Analysis
Word frequency calculation
Stop-word filtering for meaningful insights
Helps identify commonly used terms
😊 Emoji Analysis
Extracts emojis using regex
Counts frequency of each emoji
Displays emoji usage trends
📅 Activity Analysis
Messages grouped by:
Day (Monday–Sunday)
Month (Jan–Dec)
Helps visualize user activity patterns
🧠 AI-Powered Insights
Sentiment analysis (Positive / Neutral / Negative)
Emotion detection (Joy, Sadness, etc.)
Uses HuggingFace API for NLP tasks
📈 Data Visualization
Interactive charts using:
Chart.js
Recharts
Includes:
User activity graphs
Timeline charts
Emoji charts
🧠 How It Works
User uploads WhatsApp chat file
Backend reads file using fs
Chat is parsed into structured messages
System calculates:
Message count
User activity
Word frequency
Emoji usage
AI analyzes sample chat text
Data is stored in MongoDB
Results are sent to frontend for visualization
🧠 Tech Stack
Frontend
React.js
React Router
Chart.js
Recharts
Axios
Backend
Node.js
Express.js
MongoDB (Mongoose)
AI & Processing
HuggingFace API (Sentiment + Emotion)
Multer (file upload)
dotenv (env management)
📁 Project Structure
whatsapp-analyzer/
│
├── backend/
│   ├── controllers/      # Chat processing logic
│   ├── services/         # AI APIs
│   ├── models/           # MongoDB schema
│   ├── routes/           # API routes
│   ├── utils/            # Chat parser
│   └── server.js
│
├── frontend/
│   ├── pages/            # Home, Insights, Charts, Emoji
│   ├── components/
│   └── App.js
⚙️ Installation & Setup
1️⃣ Clone Repo
git clone https://github.com/your-username/whatsapp-analyzer.git
cd whatsapp-analyzer
2️⃣ Backend Setup
cd backend
npm install

Create .env file:

PORT=5001
MONGO_URI=your_mongodb_uri
HUGGINGFACE_API_KEY=your_key

Run backend:

npm run dev
3️⃣ Frontend Setup
cd frontend
npm install
npm start
🌐 Running URLs
Frontend: http://localhost:3000
Backend: http://localhost:5001
📂 How to Use
Export WhatsApp chat as .txt
Upload file in the app
View:
📊 Charts
😊 Emoji Analysis
🧠 AI Insights
🔮 Future Improvements
Real-time chat streaming
Advanced NLP (topic modeling)
PDF report download
Group comparison analysis
Dark mode UI 🌙