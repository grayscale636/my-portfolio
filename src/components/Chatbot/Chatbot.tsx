"use client";

import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@once-ui-system/core";
import styles from "./Chatbot.module.scss";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatState {
  conversationId: string;
  userId: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatState, setChatState] = useState<ChatState>({
    conversationId: '',
    userId: '',
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize client-side only values
  useEffect(() => {
    setChatState({
      conversationId: '',
      userId: `user-${Date.now()}`,
    });
    
    setMessages([
      {
        id: "1",
        text: "Hi! I'm here to help you learn more about me. Feel free to ask anything about my background, projects, or experience! 👋",
        isBot: true,
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Tooltip animation effect
  useEffect(() => {
    if (!isOpen) {
      const interval = setInterval(() => {
        setShowTooltip(true);
        setTimeout(() => {
          setShowTooltip(false);
        }, 3000); // Show for 3 seconds
      }, 10000); // Every 10 seconds

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const messageId = `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const userMessage: Message = {
      id: messageId,
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentMessage = inputValue;
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentMessage,
          conversationId: chatState.conversationId,
          userId: chatState.userId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(`API Error: ${response.status} - ${errorData.error || response.statusText}`);
      }

      const data = await response.json();

      // Update conversation ID if provided
      if (data.conversationId && data.conversationId !== chatState.conversationId) {
        setChatState(prev => ({
          ...prev,
          conversationId: data.conversationId,
        }));
      }

      const botResponseId = `bot-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const botResponse: Message = {
        id: botResponseId,
        text: data.message,
        isBot: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessageId = `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const errorMessage: Message = {
        id: errorMessageId,
        text: `Sorry, I'm experiencing some technical difficulties: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again later.`,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    // Hide tooltip when chatbot is opened
    if (!isOpen) {
      setShowTooltip(false);
    }
  };

  return (
    <div className={styles.chatbotContainer}>
      {/* Tooltip */}
      <div className={`${styles.chatbotTooltip} ${showTooltip ? styles.show : ''}`}>
        Ask about me here!
      </div>

      {isOpen && (
        <div className={styles.chatbotWindow}>
          <div className={styles.chatbotHeader}>
            <div className={styles.chatbotTitle}>
              <Icon name="help" size="s" />
              Ask Me Anything
              {isTyping && <span style={{ fontSize: '12px', opacity: 0.7 }}> • Thinking...</span>}
            </div>
            <button
              onClick={toggleChatbot}
              className={styles.closeButton}
              aria-label="Close chatbot"
            >
              <Icon name="close" size="s" />
            </button>
          </div>

          <div className={styles.chatbotMessages}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.message} ${
                  message.isBot ? styles.messageBot : styles.messageUser
                }`}
              >
                {message.text}
              </div>
            ))}

            {isTyping && (
              <div className={styles.typingIndicator}>
                <div className={styles.typingDot}></div>
                <div className={styles.typingDot}></div>
                <div className={styles.typingDot}></div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className={styles.chatbotInput}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about my experience, projects, skills..."
              className={styles.inputField}
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className={styles.sendButton}
              aria-label="Send message"
            >
              <span style={{ fontSize: '16px', transform: 'rotate(-45deg)', display: 'inline-block' }}>✈️</span>
            </button>
          </div>
        </div>
      )}

      <button
        onClick={toggleChatbot}
        className={styles.chatbotToggle}
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
      >
        <Icon name={isOpen ? "close" : "help"} size="m" />
      </button>
    </div>
  );
};

export default Chatbot;
