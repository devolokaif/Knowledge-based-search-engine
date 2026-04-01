const fs = require("fs");
const pdfParse = require("pdf-parse");

const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters");
const { FaissStore } = require("@langchain/community/vectorstores/faiss");
const { HuggingFaceTransformersEmbeddings } = require("@langchain/community/embeddings/hf_transformers");

// ✅ LOCAL embeddings (no API)
const embeddings = new HuggingFaceTransformersEmbeddings({
  modelName: "Xenova/all-MiniLM-L6-v2",
});

async function ingestDocument(filePath) {
  try {
    // 📄 read PDF
    const buffer = fs.readFileSync(filePath);
    const pdf = await pdfParse(buffer);

    const text = pdf.text;

    if (!text || text.trim().length === 0) {
      throw new Error("PDF text is empty");
    }

    // ✂️ split
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 50,
    });

    const docs = await splitter.createDocuments([text]);

    console.log("📄 Total chunks:", docs.length);

    // 🔥 THIS IS THE MOST IMPORTANT LINE
    const vectorStore = await FaissStore.fromDocuments(docs, embeddings);

    // 💾 save
    await vectorStore.save("embeddings");

    console.log("✅ SUCCESS: embeddings saved");
  } catch (err) {
    console.error("❌ INGEST ERROR:", err.message);
    throw err;
  }
}

module.exports = { ingestDocument };