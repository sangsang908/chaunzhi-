import { useState, useRef, useEffect } from 'react';
import { Brain, Send, User, Sparkles, Lightbulb, BookOpen, BarChart2, Trash2 } from 'lucide-react';
import type { ChatMessage } from '../data/mockData';
import { getAIResponse, aiResponses } from '../data/mockData';

const quickQuestions = [
  { icon: Lightbulb, label: '解释微积分导数', query: '请帮我解释微积分中的导数概念' },
  { icon: BookOpen, label: '制定学习计划', query: '帮我制定一个本周的学习计划' },
  { icon: BarChart2, label: '查看学习建议', query: '根据我的学习情况给我一些建议' },
  { icon: Brain, label: 'Python入门', query: 'Python编程怎么入门？' },
];

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
        <Brain className="w-4 h-4 text-white" />
      </div>
      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0ms]" />
          <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:150ms]" />
          <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === 'user';
  const formattedContent = msg.content.split('\n').map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**')) {
      return <p key={i} className="font-semibold text-gray-800">{line.slice(2, -2)}</p>;
    }
    if (line.startsWith('•')) {
      return <p key={i} className="ml-2">{line}</p>;
    }
    if (line.startsWith('```')) return null;
    if (line === '') return <br key={i} />;
    return <p key={i}>{line}</p>;
  });

  return (
    <div className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser
            ? 'bg-gradient-to-br from-indigo-400 to-purple-500'
            : 'bg-gradient-to-br from-indigo-500 to-purple-600'
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Brain className="w-4 h-4 text-white" />
        )}
      </div>
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed space-y-1 ${
          isUser
            ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-br-sm shadow-md'
            : 'bg-white border border-gray-100 shadow-sm text-gray-700 rounded-bl-sm'
        }`}
      >
        {formattedContent}
        <p className={`text-[10px] mt-1 ${isUser ? 'text-indigo-200' : 'text-gray-400'}`}>
          {msg.timestamp.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'assistant',
      content: aiResponses.default,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    await new Promise((r) => setTimeout(r, 1000 + Math.random() * 800));
    setIsTyping(false);

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: getAIResponse(text),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiMsg]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const clearChat = () => {
    setMessages([
      {
        id: '0',
        role: 'assistant',
        content: aiResponses.default,
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 px-4 py-5">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-white text-lg">AI 智能助教</h1>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-indigo-200 text-xs">小智在线 · 随时解答您的问题</span>
              </div>
            </div>
          </div>
          <button
            onClick={clearChat}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            title="清空对话"
          >
            <Trash2 className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            <span className="text-xs text-gray-500 font-medium">快速提问：</span>
            {quickQuestions.map(({ icon: Icon, label, query }) => (
              <button
                key={label}
                onClick={() => sendMessage(query)}
                disabled={isTyping}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-xs text-gray-600 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all disabled:opacity-50"
              >
                <Icon className="w-3 h-3" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-gray-100 bg-white shadow-lg">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="输入您的问题，比如「解释牛顿第二定律」..."
              disabled={isTyping}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent bg-gray-50 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl flex items-center justify-center hover:opacity-90 disabled:opacity-40 transition-opacity flex-shrink-0 shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <p className="text-[11px] text-gray-400 mt-2 text-center">
            AI助教由大语言模型驱动，回答仅供参考，请结合实际学习情况判断
          </p>
        </div>
      </div>
    </div>
  );
}
