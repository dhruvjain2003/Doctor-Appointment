// 'use client';

// import { useState } from 'react';
// import { Bot, X } from 'lucide-react';
// import styles from './ChatSupport.module.css';

// export default function ChatSupport() {
//   const [open, setOpen] = useState(false);
//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState([]);

//   const handleSend = async () => {
//     if (!input.trim()) return;
  
//     const newMessages = [...messages, { sender: 'You', text: input }];
//     setMessages(newMessages);
//     setInput('');
//     const prompt = `Give a concise answer to: ${input}`;
//     const res = await fetch('/api/chat', {
//       method: 'POST',
//       body: JSON.stringify({ message: prompt }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
  
//     const data = await res.json();
  
//     if (data.response) {
//       setMessages([...newMessages, { sender: 'AI', text: data.response }]);
//     }
//   };
  

//   return (
//     <>
//       <div className={styles.chatIcon} onClick={() => setOpen(!open)}>
//         {open ? <X size={20} /> : <Bot size={20} />}
//       </div>

//       {open && (
//         <div className={styles.chatPopup}>
//           <h2 className={styles.chatTitle}>Ask MedCare AI 💬</h2>

//           <div className={styles.chatMessages}>
//             {messages.map((msg, index) => (
//               <div key={index}><strong>{msg.sender}:</strong> {msg.text}</div>
//             ))}
//           </div>

//           <textarea
//             placeholder="Type your question..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             className={styles.chatTextarea}
//           />
//           <button className={styles.chatSend} onClick={handleSend}>
//             Send
//           </button>
//         </div>
//       )}
//     </>
//   );
// }

'use client';

import { useState,useEffect } from 'react';
import { Bot, X, Send } from 'lucide-react';
import styles from './ChatSupport.module.css';

export default function ChatSupport() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    
    // const prompt = `Give a most concise answer to: ${input}`;
    // const prompt = `You are a medical assistant. Give a concise, accurate answer (1–2 sentences max) to: ${input}`;
    const prompt = `You are MedCare AI, a trusted medical assistant. Answer the user's question clearly and accurately in 1–2 sentences. Keep it concise unless more detail is explicitly requested. Question: ${input}`;
    
    try {
        const res = await fetch('/api/chat', {
            method: 'POST',
            body: JSON.stringify({ messages: [...newMessages, { sender: 'You', text: prompt }] }),
            headers: {
              'Content-Type': 'application/json',
            },
          });          
      const data = await res.json();
      
      if (data.response) {
        setMessages([...newMessages, { sender: 'ai', text: data.response }]);
      }
    } catch (error) {
      setMessages([...newMessages, { sender: 'ai', text: "Sorry, I couldn't process your request. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <div className={styles.chatIcon} onClick={() => setOpen(!open)}>
        {open ? <X size={20} /> : <Bot size={20} />}
      </div>
      
      {open && (
        <div className={styles.chatPopup}>
          <h2 className={styles.chatTitle}>Ask MedCare AI 💬</h2>
          
          <div className={styles.chatMessages}>
            {messages.length === 0 && (
              <div className={styles.welcomeMessage}>
                How can I help you with your medical questions today?
              </div>
            )}
            
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`${styles.messageContainer} ${
                  msg.sender === 'user' ? styles.userMessage : styles.aiMessage
                }`}
              >
                <div className={styles.messageBubble}>
                  {msg.text}
                </div>
                <div className={styles.messageInfo}>
                  {msg.sender === 'user' ? 'You' : 'MedCare AI'}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className={`${styles.messageContainer} ${styles.aiMessage}`}>
                <div className={styles.messageBubble}>
                  <div className={styles.loadingDots}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className={styles.messageInfo}>MedCare AI</div>
              </div>
            )}
          </div>
          
          <div className={styles.chatInputContainer}>
            <textarea
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className={styles.chatTextarea}
            />
            <button 
              className={styles.chatSend} 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}