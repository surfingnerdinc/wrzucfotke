'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function LiveChatDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      message: 'Cześć! 👋 Jestem Alex, Twój AI asystent z Core One Flow. Jak mogę Ci pomóc?',
      timestamp: new Date(),
      typing: false
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    'Jak działa automatyzacja?',
    'Pokaż mi cennik',
    'Chcę zobaczyć demo',
    'Jakie są korzyści AI?'
  ];

  const aiResponses: { [key: string]: string } = {
    'automatyzacja': 'Nasza automatyzacja AI może:\n\n✨ Automatycznie przypisywać leady do odpowiednich sprzedawców\n🎯 Segmentować klientów na podstawie zachowania\n📧 Wysyłać spersonalizowane wiadomości follow-up\n📊 Generować raporty w czasie rzeczywistym\n\nCzy chciałbyś zobaczyć konkretny przykład?',
    'cennik': 'Mamy 3 plany dopasowane do każdej firmy:\n\n💼 Starter - 99 PLN/mies (do 5 użytkowników)\n🚀 Professional - 199 PLN/mies (do 25 użytkowników) - NAJPOPULARNIEJSZY\n🏢 Enterprise - 399 PLN/mies (nieograniczenie)\n\nWszystkie plany zawierają AI asystenta i 30-dniowy darmowy trial! Który plan Cię interesuje?',
    'demo': 'Świetnie! 🎉\n\nMożemy umówić się na personalne demo, gdzie pokażę Ci:\n• Dashboard w czasie rzeczywistym\n• AI automatyzację w akcji\n• Integracje z Twoimi narzędziami\n• ROI calculator dla Twojej firmy\n\nKiedy masz 15 minut na szybkie demo?',
    'korzyści': 'AI w Core One Flow to prawdziwy game-changer! 🧠\n\n📈 94% dokładność predykcji sprzedaży\n⏰ 70% redukcja czasu odpowiedzi\n💰 Średnio 40% wzrost konwersji\n🤖 24/7 obsługa klientów bez przerw\n📊 Automatyczne raporty i insights\n\nNasi klienci oszczędzają średnio 15 godzin tygodniowo!'
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowercaseMessage = userMessage.toLowerCase();
    
    if (lowercaseMessage.includes('automatyzacj') || lowercaseMessage.includes('automation')) {
      return aiResponses.automatyzacja;
    } else if (lowercaseMessage.includes('cennik') || lowercaseMessage.includes('cena') || lowercaseMessage.includes('koszt')) {
      return aiResponses.cennik;
    } else if (lowercaseMessage.includes('demo') || lowercaseMessage.includes('prezentacj')) {
      return aiResponses.demo;
    } else if (lowercaseMessage.includes('korzyści') || lowercaseMessage.includes('ai') || lowercaseMessage.includes('zalety')) {
      return aiResponses.korzyści;
    } else if (lowercaseMessage.includes('dzięki') || lowercaseMessage.includes('thanks')) {
      return 'Nie ma za co! 😊 Jestem tutaj, żeby pomóc. Czy masz jeszcze jakieś pytania o Core One Flow?';
    } else if (lowercaseMessage.includes('tak') || lowercaseMessage.includes('yes')) {
      return 'Świetnie! 🎉 Przekierowuję Cię do naszego zespołu sprzedaży, który umówi się z Tobą na szczegółowe demo. Możesz też zapisać się na darmowy trial już teraz!';
    } else {
      return 'Rozumiem Twoje pytanie! 🤔 Pozwól, że połączę Cię z naszym ekspertem, który będzie mógł udzielić Ci szczegółowej odpowiedzi. Możesz też sprawdzić nasze FAQ lub zapisać się na darmowe demo!';
    }
  };

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputValue.trim();
    if (!messageToSend) return;

    const newUserMessage = {
      id: messages.length + 1,
      sender: 'user',
      message: messageToSend,
      timestamp: new Date(),
      typing: false
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(messageToSend);
      const newAIMessage = {
        id: messages.length + 2,
        sender: 'ai',
        message: aiResponse,
        timestamp: new Date(),
        typing: false
      };

      setMessages(prev => [...prev, newAIMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-linear-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              <span className="hidden lg:block font-medium">Porozmawiaj z AI</span>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
          </button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="bg-linear-to-r from-blue-500 to-cyan-500 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <h4 className="font-semibold">Alex - AI Assistant</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                    <span className="text-sm opacity-90">Online • Odpowiada w ~2s</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  <p className="whitespace-pre-line text-sm">{msg.message}</p>
                  <div className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {msg.timestamp.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 border border-gray-200 p-3 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="p-3 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-2 mb-3">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(reply)}
                  className="text-xs p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Wpisz wiadomość..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-sm">➤</span>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Powered by Core One Flow AI • <a href="#" className="text-blue-500">Zasady prywatności</a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}