// src/components/MonasteryChatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import { monasteryQA } from "../data/monasteryQA";

export default function MonasteryChatbot() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
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
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-2 space-y-2 bg-gray-50 rounded">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded max-w-[80%] ${
              msg.type === "user"
                ? "bg-indigo-100 self-end"
                : "bg-gray-200 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          placeholder="Ask anything about monasteries..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAsk()}
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={handleAsk}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Ask
        </button>
      </div>
    </div>
  );
}
