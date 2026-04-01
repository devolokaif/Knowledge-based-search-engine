require("dotenv").config();

const express = require("express");
const multer = require("multer");
const cors = require("cors");

const { ingestDocument } = require("./services/ingest");
const { queryDocs } = require("./services/query");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Multer setup
const upload = multer({ dest: "uploads/" });

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Server working ✅");
});

// ✅ Upload route
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    console.log("UPLOAD HIT ✅");
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // 🔥 Process document (RAG ingestion)
    await ingestDocument(req.file.path);

    res.json({ message: "Document processed successfully 🚀" });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Query route
app.post("/query", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const answer = await queryDocs(question);

    res.json({ answer });
  } catch (err) {
    console.error("QUERY ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});