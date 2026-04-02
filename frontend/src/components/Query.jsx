import { useState } from "react";
import axios from "axios";

export default function Query() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const handleQuery = async () => {
    if (!question) return;

    const userMsg = { role: "user", text: question };
    setMessages((prev) => [...prev, userMsg]);
    setQuestion("");

    try {
      const res = await axios.post("https://knowledge-based-search-engine.onrender.com/query", {
        question,
      });

      const botMsg = { role: "bot", text: res.data.answer };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: `Error ❌ ${err}` },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-full">
      
      {/* Chat Messages */}
      <div className="flex-1 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-xl px-4 py-2 rounded-xl ${
              msg.role === "user"
                ? "bg-blue-600 self-end ml-auto"
                : "bg-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask something..."
          className="flex-1 p-3 rounded-lg bg-[#1e293b] outline-none"
        />

        <button
          onClick={handleQuery}
          className="bg-blue-600 px-5 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}