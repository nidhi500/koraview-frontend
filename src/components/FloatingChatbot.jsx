// src/components/FloatingChatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import { monasteryQA } from "../data/monasteryQA";

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAsk = () => {
    if (!query.trim()) return;

    const userMessage = { type: "user", text: query };
    setMessages((prev) => [...prev, userMessage]);

    const lowerQuery = query.toLowerCase();
    const matched = monasteryQA.find((q) =>
      q.keywords.some((kw) => lowerQuery.includes(kw))
    );

    const botMessage = {
      type: "bot",
      text: matched
        ? matched.answer
        : "Sorry, I couldn't find an answer. Try asking differently!",
    };

    setMessages((prev) => [...prev, botMessage]);
    setQuery("");
  };

  return (
    <>
      {/* Floating question mark button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-orange-300 text-white flex items-center justify-center shadow-lg hover:bg-orange-700 transition-transform hover:scale-105 z-50"
        title="Ask about Monasteries"
      >
        ❓
      </button>

      {/* Chat Panel */}
      <div
        className={`fixed bottom-0 right-6 w-[360px] h-[500px] bg-white shadow-2xl rounded-t-xl flex flex-col transform transition-transform duration-300 z-50 ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 bg-orange-100/80 backdrop-blur-sm border-b border-orange-300 rounded-t-xl">
          <h2 className="font-bold text-orange-800">Monastery Chat</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-orange-600 hover:text-orange-900 text-xl transition"
          >
            ✖
          </button>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded max-w-[80%] ${
                msg.type === "user"
                  ? "bg-orange-100 self-end"
                  : "bg-white border border-orange-200 self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Input */}
        <div className="flex gap-2 p-3 border-t border-orange-200 bg-orange-50 rounded-b-xl">
          <input
            type="text"
            placeholder="Ask about monasteries..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            className="border border-orange-300 rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            onClick={handleAsk}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded transition"
          >
            Ask
          </button>
        </div>
      </div>
    </>
  );
}
