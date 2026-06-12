# Smart Study Buddy 📚🤖

> Transform any textbook, notes, or PDF into a personalized AI-powered learning companion.

Smart Study Buddy is an AI-powered educational platform that helps students learn more effectively by turning study materials into interactive conversations, quizzes, and personalized learning experiences.

Upload your notes, textbooks, PDFs, or lecture materials and instantly chat with them using Retrieval-Augmented Generation (RAG). Generate quizzes, track progress, identify weak concepts, and receive personalized learning recommendations.

---

## ✨ Features

### 📄 Document Upload & Processing

* Upload PDF, DOCX, PPT, and text files
* Automatic text extraction
* Intelligent chunking
* Embedding generation
* Vector storage using Qdrant

### 💬 AI Document Chat

* Ask questions about uploaded documents
* Context-aware responses using RAG
* Source citations

### 🧠 AI Tutor

* Explain complex concepts
* Provide examples and analogies
* Personalized learning assistance
* Interactive study sessions

### 📝 Quiz Generation

Generate quizzes directly from study materials:

* Multiple Choice Questions (MCQs)
* Fill in the Blanks
* True/False Questions

### 📊 Learning Analytics

Track learning progress across concepts:

* Mastery scores
* Topic-level performance
* Learning trends
* Revision recommendations

### 📅 Smart Study Planner

* AI-generated study schedules
* Progress tracking
* Learning recommendations
* Revision planning

---

# 🚀 How It Works

```text
Upload Study Material
        ↓
Text Extraction
        ↓
Chunking
        ↓
Embedding Generation
        ↓
Qdrant Vector Database
        ↓
Semantic Retrieval
        ↓
LLM Response Generation
        ↓
AI Tutor Experience
```

---

## 🏗️ System Architecture

```text
┌─────────────────┐
│     Frontend    │
│ React + TS      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Backend      │
│ Node + TS       │
└────────┬────────┘
         │
 ┌───────┴─────────┐
 ▼                 ▼
PostgreSQL      Qdrant
(User Data)   (Embeddings)
         │
         ▼
     AI Layer
         │
         ▼
 Gemini / OpenAI / Claude
```

---

# Some Screenshots
<table>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/5222a22c-e3cc-46c9-82f7-76fae0b90de7" width="100%">
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/16a5cfcc-fc69-456a-9297-8353f1c89af3" width="100%">
    </td>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/9ac89277-a1ec-4b17-a951-c0fdec9adace" width="100%">
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/e3c75b5f-3ae0-4e15-b02e-942eb23d07e4" width="100%">
    </td>
  </tr>
</table>

---

# 🛠️ Tech Stack

## Frontend

* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* React Router
* Axios

## Backend

* Node.js
* TypeScript
* Express.js
* Prisma ORM

## Database

* PostgreSQL

## Vector Database

* Qdrant

## AI & Machine Learning

* Gemini API
* OpenAI API
* Embeddings
* Retrieval-Augmented Generation (RAG)

## Authentication

* JWT Authentication
* HTTP-only Cookies

---

# 📚 Core AI Services

## Ingestion Service

Responsible for:

* File uploads
* Text extraction
* Chunking
* Embedding generation
* Qdrant storage

---

## Retrieval Service

Responsible for:

* Query embedding
* Similarity search
* Context retrieval

---

## Tutor Service

Responsible for:

* Concept explanations
* Learning guidance
* Example generation

---

## Quiz Service

Responsible for:

* Quiz generation
* Answer evaluation
* Difficulty adaptation

---

## Study Planner Service

Responsible for:

* Study schedule generation
* Revision planning
* Learning recommendations

---

# 🔄 RAG Pipeline

```text
User Question
      ↓
Embedding Generation
      ↓
Qdrant Similarity Search
      ↓
Relevant Chunks Retrieved
      ↓
Context Construction
      ↓
LLM Response
      ↓
Cited Answer
```

---

# 🌟 Yet to do

* Spaced Repetition System
* Concept Knowledge Graph
* AI Whiteboard
* Voice Tutor
* Flashcard Generation
* Mobile Application
* Collaborative Study Groups

---

# 💡 Why Smart Study Buddy?

Unlike traditional note-taking tools, Smart Study Buddy acts as a personal AI tutor that:

* Understands your study materials
* Explains concepts on demand
* Creates quizzes automatically
* Tracks learning progress
* Adapts to your strengths and weaknesses

---

⭐ If you find this project useful, consider giving it a star on GitHub!
