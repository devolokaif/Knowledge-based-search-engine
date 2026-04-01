# 🚀 Knowledge Based Search Engine

An AI-powered document search system that allows users to upload PDFs and ask questions based strictly on the document content using Retrieval-Augmented Generation (RAG).

---

## 📌 Overview

This project enables intelligent querying over uploaded documents. It extracts text from PDFs, converts them into vector embeddings, and retrieves the most relevant information to answer user queries using a Large Language Model.

---

## ✨ Features

* 📂 Upload PDF documents
* 🔍 Semantic search using vector embeddings
* 🤖 AI-powered question answering
* 🧠 Context-aware responses (RAG pipeline)
* ⚡ Fast inference using Groq API
* 💬 ChatGPT-like UI interface
* 📄 Supports multiple documents (extendable)
* 🧾 OCR support for scanned PDFs (optional)

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS

### Backend

* Node.js
* Express.js
* Multer (file uploads)

### AI / ML

* LangChain
* FAISS (Vector Database)
* Groq API (LLM)
* HuggingFace Transformers (Local embeddings)
* Tesseract.js (OCR fallback)

---

## ⚙️ How It Works

1. User uploads a PDF
2. Text is extracted (or OCR applied if needed)
3. Text is split into chunks
4. Each chunk is converted into embeddings
5. Embeddings are stored in FAISS vector database
6. User asks a question
7. Relevant chunks are retrieved
8. LLM generates answer based ONLY on retrieved context

---

## 📁 Project Structure

```
KB_search_engine/
│
├── backend/
│   ├── services/
│   │   ├── ingest.js
│   │   └── query.js
│   ├── uploads/
│   ├── embeddings/
│   └── app.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── index.css
│
└── README.md
```

---

## 🚀 Getting Started

### 1️⃣ Clone the repo

```
git clone https://github.com/YOUR_USERNAME/knowledge-based-search-engine.git
cd knowledge-based-search-engine
```

---

### 2️⃣ Backend setup

```
cd backend
npm install
```

Create `.env` file:

```
GROQ_API_KEY=your_api_key_here
```

Run backend:

```
node app.js
```

---

### 3️⃣ Frontend setup

```
cd frontend
npm install
npm run dev
```

---

## 🧪 Usage

1. Upload a PDF document
2. Ask questions in the chat interface
3. Get answers strictly based on document content

---

## ⚠️ Limitations

* Works best with text-based PDFs
* OCR for scanned PDFs may be slower
* Current setup overwrites embeddings per upload (can be extended)

---

## 🚀 Future Improvements

* Multi-document support
* Chat history memory
* Streaming responses (typing effect)
* Highlight answers in PDF
* Deployment (Vercel + Render)

---

## 🎯 Key Learning Outcomes

* Built a complete RAG pipeline
* Integrated vector databases (FAISS)
* Worked with LLM APIs (Groq)
* Implemented semantic search
* Designed full-stack AI application

---

## 👨‍💻 Author

**Mohd Kaif**

---

## ⭐ If you like this project

Give it a star ⭐ on GitHub!
