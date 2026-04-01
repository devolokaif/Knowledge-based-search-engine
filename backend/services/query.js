const Groq = require("groq-sdk");
const fs = require("fs");

const { FaissStore } = require("@langchain/community/vectorstores/faiss");
const { HuggingFaceTransformersEmbeddings } = require("@langchain/community/embeddings/hf_transformers");

const embeddings = new HuggingFaceTransformersEmbeddings({
  modelName: "Xenova/all-MiniLM-L6-v2",
});

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function queryDocs(question) {
  try {
    console.log("🔍 Query:", question);

    // ❌ Check if embeddings exist
    if (!fs.existsSync("embeddings")) {
      return "❌ Please upload a document first.";
    }

    // ✅ Load vector store
    const vectorStore = await FaissStore.load("embeddings", embeddings);

    // 🔥 Get relevant chunks
    const docs = await vectorStore.similaritySearch(question, 3);

    console.log("📄 Docs found:", docs.length);

    if (!docs || docs.length === 0) {
      return "❌ Answer not found in document.";
    }

    const context = docs.map((doc) => doc.pageContent).join("\n\n");

    // 🔥 STRICT PROMPT
    const prompt = `
You are a strict AI assistant.

ONLY answer from the context below.
If answer is not present, say:
"Answer not found in document."

Context:
${context}

Question:
${question}
`;

    const response = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-8b-instant",
    });

    let answer = response.choices[0].message.content;

    return answer.trim();

  } catch (err) {
    console.error("QUERY ERROR:", err.message);
    return "❌ Error processing query.";
  }
}

module.exports = { queryDocs };