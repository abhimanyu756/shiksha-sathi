# Shikshak Saathi (शिक्षक साथी)

> 🧑‍🏫 AI-Powered Teaching Assistant for Indian Teachers

Shikshak Saathi provides instant, personalized coaching to teachers through voice-enabled, offline-capable technology with bilingual support (Hindi/English).

---

## 🎯 Features

- **🤖 AI Coaching** - Gemini-powered personalized teaching advice
- **🎤 Voice Interaction** - Speak your questions, hear the answers
- **🌐 Bilingual** - Full Hindi and English support
- **📴 Offline Mode** - Works without internet, syncs when online
- **📱 Mobile-First** - Designed for teachers on the go

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
# Navigate to project
cd "Shikshak Saathi"

# Install all dependencies
npm install
```

### 2. Configure Environment

Create `backend/.env` with your Gemini API key:

```env
GEMINI_API_KEY=your_api_key_here
PORT=3001
```

> Get your API key from [Google AI Studio](https://aistudio.google.com/apikey)

### 3. Run the Application

```bash
# Start both frontend and backend
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001

---

## 📁 Project Structure

```
Shikshak Saathi/
├── backend/              # Express.js API server
│   ├── index.js          # Server entry point
│   ├── services/         # Gemini AI, prompts
│   ├── routes/           # API endpoints
│   └── middleware/       # Error handling
│
├── frontend/             # React + Vite app
│   ├── src/
│   │   ├── pages/        # Home, Coach, Scenarios, Resources, History
│   │   ├── components/   # Reusable UI components
│   │   └── services/     # API, IndexedDB, Speech
│   └── index.html
│
├── package.json          # Root scripts
└── README.md
```

---

## 🔌 API Reference

### Coaching Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/coaching/ask` | Get AI coaching response |
| `GET` | `/api/coaching/scenarios` | Get scenario templates |
| `GET` | `/api/coaching/status` | Check AI availability |

#### POST /api/coaching/ask

Request AI coaching advice.

**Request Body:**
```json
{
  "message": "How do I explain fractions?",
  "context": [],
  "language": "en"
}
```

**Response:**
```json
{
  "success": true,
  "response": "Here are effective ways to teach fractions...",
  "source": "gemini"
}
```

---

### Resources Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/resources/micro-lessons` | List all micro-lessons |
| `GET` | `/api/resources/micro-lessons/:id` | Get lesson by ID |
| `GET` | `/api/resources/categories` | List categories |

#### GET /api/resources/micro-lessons

**Query Parameters:**
- `category` (optional) - Filter by category
- `language` (optional) - `en` or `hi`

**Response:**
```json
{
  "success": true,
  "lessons": [
    {
      "id": "classroom-management-101",
      "title": "Classroom Management Basics",
      "category": "Management",
      "duration": "5 min"
    }
  ]
}
```

---

### Health Endpoint

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Server health check |

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| AI | Google Gemini API |
| Voice | Web Speech API |
| Offline Storage | IndexedDB (via `idb`) |
| Backend | Express.js |

---

## 📱 Pages

| Page | Path | Description |
|------|------|-------------|
| Home | `/` | Landing page with features |
| Coach | `/coach` | AI chat interface |
| Scenarios | `/scenarios` | Classroom challenge templates |
| Resources | `/resources` | Micro-learning lessons |
| History | `/history` | Previous conversations |

---

## 🌐 Offline Capabilities

The app uses IndexedDB for offline support:

- **Chat History** - Conversations saved locally
- **Response Caching** - Previous answers cached
- **Pending Queries** - Questions queued when offline
- **Offline Indicator** - Visual feedback when disconnected

---

## 🎨 Design System

### Colors

| Name | Value | Use |
|------|-------|-----|
| Primary | Indigo | Buttons, links |
| Accent | Emerald | Success states |
| Slate | Gray tones | Text, backgrounds |

### Components

- `Button` - Primary, secondary, ghost variants
- `Card` - Content containers with hover effects
- `VoiceButton` - Mic input with animations
- `ChatMessage` - User/assistant message bubbles

---

## 🧪 Testing

Run the development servers and test:

```bash
npm run dev
```

| Feature | Test |
|---------|------|
| AI Chat | Ask a question in coach page |
| Voice | Click mic button, speak |
| Languages | Toggle EN/HI in header |
| Offline | Disconnect network, use app |

---

## 📝 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start both servers |
| `npm run dev:server` | Backend only (port 3001) |
| `npm run dev:client` | Frontend only (port 5173) |

---

## 🔒 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | Google Gemini API key |
| `PORT` | No | Backend port (default: 3001) |

---

## 📄 License

MIT License - Built for the HackerEarth Hackathon

---

## 🙏 Acknowledgments

- Google Gemini for AI capabilities
- Indian educators for inspiration
- HackerEarth for the hackathon platform
