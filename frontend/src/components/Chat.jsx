import { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef();

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    const updated = [...messages, userMsg];

    setMessages(updated);
    setInput("");

    try {
      const res = await axios.post("https://knowledge-based-search-engine.onrender.com/query", {
        question: input,
      });

      setMessages([
        ...updated,
        { role: "ai", text: res.data.answer },
      ]);
    } catch {
      setMessages([
        ...updated,
        { role: "ai", text: "❌ Error" },
      ]);
    }
  };

  // 🔥 ENTER KEY SUPPORT
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // 🔥 AUTO SCROLL
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-2xl px-4 py-3 rounded-xl ${
              msg.role === "user"
                ? "ml-auto bg-blue-600"
                : "bg-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      {/* Input (FIXED POSITION LIKE CHATGPT) */}
      <div className="p-4 border-t border-gray-800 bg-[#0f172a]">
        <div className="max-w-3xl mx-auto flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            className="flex-1 p-3 rounded-lg bg-[#020617] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 px-6 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}