'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, Copy, Check } from 'lucide-react';

const MOCK_RESPONSES = {
  default: {
    text: `Great question! Let me break that down for you.

**VLOOKUP** searches for a value in the first column of a range and returns a value from another column.

\`\`\`
=VLOOKUP(lookup_value, table_array, col_index, [range_lookup])
\`\`\`

**Key Parameters:**
• \`lookup_value\` — The value to search for
• \`table_array\` — The range containing the data
• \`col_index\` — The column number to return
• \`range_lookup\` — FALSE for exact match

**Pro Tip:** Consider using **XLOOKUP** instead — it's more flexible and doesn't require the lookup column to be first.`,
    formula: '=VLOOKUP(A2, Data!$A:$D, 3, FALSE)'
  },
  sumifs: {
    text: `Here's how to use **SUMIFS** to sum sales greater than $1,000:

\`\`\`
=SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)
\`\`\`

**Your formula:**
\`\`\`
=SUMIFS(D2:D100, C2:C100, ">1000")
\`\`\`

This sums all values in column D where the corresponding value in column C is greater than 1000.

**For multiple criteria:**
\`\`\`
=SUMIFS(D2:D100, B2:B100, "Region A", C2:C100, ">1000")
\`\`\``,
    formula: '=SUMIFS(D2:D100, C2:C100, ">1000")'
  },
  index: {
    text: `**INDEX MATCH vs XLOOKUP** — Here's the comparison:

**INDEX MATCH (Classic):**
\`\`\`
=INDEX(return_range, MATCH(lookup_value, lookup_range, 0))
\`\`\`

**XLOOKUP (Modern):**
\`\`\`
=XLOOKUP(lookup_value, lookup_range, return_range)
\`\`\`

| Feature | INDEX MATCH | XLOOKUP |
|---------|-------------|---------|
| Direction | Any | Any |
| Error handling | Needs IFERROR | Built-in |
| Syntax | Complex | Simple |
| Availability | All versions | 365/2021+ |

**Verdict:** Use XLOOKUP for simplicity, INDEX MATCH for backward compatibility.`,
    formula: '=XLOOKUP(A2, Data!A:A, Data!C:C, "Not Found")'
  },
};

function getAIResponse(query) {
  const q = query.toLowerCase();
  if (q.includes('sumif') || q.includes('sum') || q.includes('1000')) return MOCK_RESPONSES.sumifs;
  if (q.includes('index') || q.includes('xlookup') || q.includes('match')) return MOCK_RESPONSES.index;
  return MOCK_RESPONSES.default;
}

function MessageBubble({ message }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple markdown-like rendering
  const renderContent = (text) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      // Code blocks
      if (line.startsWith('```')) return null;
      if (line.startsWith('=') || (line.startsWith('|') && line.includes('|'))) {
        return (
          <div key={i} className="font-mono text-[13px] leading-[2] tracking-wider bg-black/40 shadow-inner rounded-xl border border-white/[0.08] px-5 py-4 my-6 text-white/80 overflow-x-auto">
            {line}
          </div>
        );
      }
      // Bold
      const boldParts = line.split(/\*\*(.*?)\*\*/g);
      if (boldParts.length > 1) {
        return (
          <p key={i} className="my-5 text-[15px] leading-[2.2] tracking-wide text-white/70">
            {boldParts.map((part, j) =>
              j % 2 === 1 ? (
                <strong key={j} className="text-white font-semibold">{part}</strong>
              ) : (
                <span key={j}>{part}</span>
              )
            )}
          </p>
        );
      }
      // Bullet points
      if (line.startsWith('•') || line.startsWith('- ')) {
        return (
          <div key={i} className="flex gap-4 my-3 ml-2 text-[15px] leading-[2.2] tracking-wide text-white/70">
            <span className="text-white/30">•</span>
            <span>{line.replace(/^[•\-]\s*/, '')}</span>
          </div>
        );
      }
      // Inline code
      const codeParts = line.split(/`(.*?)`/g);
      if (codeParts.length > 1) {
        return (
          <p key={i} className="my-5 text-[15px] leading-[2.2] tracking-wide text-white/70">
            {codeParts.map((part, j) =>
              j % 2 === 1 ? (
                <code key={j} className="font-mono text-[13px] bg-white/[0.06] rounded px-2 py-1 mx-1 text-white/90">{part}</code>
              ) : (
                <span key={j}>{part}</span>
              )
            )}
          </p>
        );
      }
      if (line.trim() === '') return <div key={i} className="h-4" />;
      return <p key={i} className="my-5 text-[15px] leading-[2.2] tracking-wide text-white/70">{line}</p>;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 border border-white/15 flex items-center justify-center mt-2 rounded-lg bg-white/[0.02]">
          <Bot size={16} className="text-white/50" />
        </div>
      )}

      <div
        className={`max-w-[85%] relative group ${
          isUser
            ? 'bg-white/[0.05] border border-white/10 px-6 py-4 rounded-2xl shadow-lg'
            : 'px-2 py-1'
        }`}
      >
        {isUser ? (
          <p className="text-[14px] leading-loose tracking-wide text-white/80 font-mono">{message.content}</p>
        ) : (
          <div className="text-sm text-white/60 leading-[2.2]">
            {renderContent(message.content)}
            {message.formula && (
              <div className="mt-8 p-5 bg-gradient-to-r from-white/[0.04] to-transparent border border-white/[0.12] rounded-xl font-mono text-[13px] tracking-wider leading-[2] text-white/80 flex items-center justify-between gap-4 shadow-2xl">
                <span className="overflow-x-auto">{message.formula}</span>
                <button
                  onClick={handleCopy}
                  className="flex-shrink-0 text-white/30 hover:text-white/70 bg-white/[0.05] hover:bg-white/[0.1] p-2 rounded-lg transition-all duration-200"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-7 h-7 border border-white/15 flex items-center justify-center mt-1">
          <User size={14} className="text-white/50" />
        </div>
      )}
    </motion.div>
  );
}

export default function AIChatInterface({ isOpen, onClose, initialQuery, onFormulaExplained }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const processedQueriesRef = useRef(new Set());

  useEffect(() => {
    if (initialQuery && !processedQueriesRef.current.has(initialQuery)) {
      processedQueriesRef.current.add(initialQuery);
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (text) => {
    const userMsg = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = getAIResponse(text);
      const aiMsg = {
        role: 'assistant',
        content: response.text,
        formula: response.formula,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
      onFormulaExplained?.();
    }, 1200 + Math.random() * 800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleSendMessage(input.trim());
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 400, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 400, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 right-0 bottom-0 w-full sm:w-[480px] z-50 flex flex-col"
          id="chat-panel"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl border-l border-white/[0.06]" />

          {/* Content */}
          <div className="relative flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse" />
                <span className="text-sm font-mono text-white/60 tracking-wider">
                  AI FORMULA ASSISTANT
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center border border-white/10 hover:border-white/30 hover:bg-white/[0.04] transition-all duration-200"
                id="chat-close"
              >
                <X size={14} className="text-white/50" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 border border-white/10 flex items-center justify-center mb-4">
                    <Bot size={24} className="text-white/20" />
                  </div>
                  <p className="text-sm text-white/20 font-mono">
                    Ask me anything about Excel formulas...
                  </p>
                </div>
              )}
              {messages.map((msg, i) => (
                <MessageBubble key={i} message={msg} />
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-7 h-7 border border-white/15 flex items-center justify-center">
                    <Bot size={14} className="text-white/50" />
                  </div>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.2, 0.8, 0.2] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                        className="w-1.5 h-1.5 bg-white/40 rounded-full"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="px-6 py-4 border-t border-white/[0.06]"
            >
              <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.08] px-4 py-3 focus-within:border-white/20 transition-colors duration-200">
                <span className="text-white/15 font-mono text-sm">{'>'}</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about any Excel formula..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-white/20 font-mono focus:outline-none"
                  id="chat-input"
                />
                <button
                  type="submit"
                  className="text-white/30 hover:text-white/70 transition-colors"
                  id="chat-send"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
