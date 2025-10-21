'use client';

import { useState, FormEvent, KeyboardEvent } from 'react';
import Image from 'next/image';

export default function Home() {
  const [accessCode, setAccessCode] = useState('');
  const [hasAccess, setHasAccess] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCodeSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: accessCode }),
      });

      const data = await response.json();
      
      if (data.valid) {
        setHasAccess(true);
      } else {
        alert('Forkert kode. Prøv igen.');
        setAccessCode('');
      }
    } catch (error) {
      alert('Fejl ved validering af kode.');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) throw new Error('Fejl i anmodning');

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Der opstod en fejl. Prøv venligst igen.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const handleNewChat = () => {
    if (messages.length > 0) {
      const confirmed = window.confirm('Er du sikker på, at du vil starte en ny chat? Dette sletter den nuværende samtale.');
      if (confirmed) {
        setMessages([]);
        setInput('');
      }
    }
  };

  if (!hasAccess) {
    return (
      <div className="container">
        <div className="code-gate">
          <Image src="/aof.png" alt="AOF Logo" width={80} height={80} className="logo" />
          <h1>🎓 Dommer-GPT</h1>
          <p>Indtast koden for at fortsætte</p>
          <form onSubmit={handleCodeSubmit}>
            <input
              type="text"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              placeholder="Indtast kode"
              className="code-input"
              autoFocus
            />
            <button type="submit" className="submit-button">
              Fortsæt
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="corner-logo">
        <Image src="/aof.png" alt="AOF Logo" width={220} height={120} />
      </div>
      
      <div className="container">
        <div className="chat-container">
          <div className="header">
            <div className="header-content">
              <div>
                <h1>🎓 Dommer-GPT</h1>
                <p className="subtitle">Indsend din prompt for vurdering</p>
              </div>
              <button onClick={handleNewChat} className="new-chat-button">
                ✨ Ny chat
              </button>
            </div>
          </div>

          <div className="messages">
            {messages.length === 0 && (
              <div className="welcome-message">
                <p>👋 Velkommen til Dommer-GPT!</p>
                <p>Indsend din prompt, så vil jeg vurdere den baseret på de teknikker, vi har gennemgået.</p>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                <div className="message-content">
                  {msg.content.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message assistant">
                <div className="message-content loading">
                  Vurderer din prompt...
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="input-form">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Indsend din prompt her..."
              className="chat-input"
              rows={3}
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="send-button"
              disabled={isLoading || !input.trim()}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}