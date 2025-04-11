import React, { useEffect, useRef } from 'react';
import { Col } from 'reactstrap';
import InputSection from './InputSection';

export default function TextWindow(props) {
  const { messages, playerInfo, setPlayerInfo, gameState, setGameState, setMessages } = props;
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Col className="text-window">
      <div className="chat-container">
        <div className="message-content">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`message ${message.type || (index === 0 ? 'assistant' : 'user')}`}
            >
              {typeof message === 'string' ? message : message.text}
            </div>
          ))}
        </div>
        <div className="message-input">
          <InputSection 
            playerInfo={playerInfo} 
            setPlayerInfo={setPlayerInfo} 
            gameState={gameState} 
            setGameState={setGameState}
            messages={messages}
            setMessages={setMessages}
          />
        </div>
        <div ref={messagesEndRef} />
      </div>
    </Col>
  );
}