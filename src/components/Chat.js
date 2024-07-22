import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Chat.css';  // 스타일을 정의한 CSS 파일 임포트

function Chat() {
    const [messages, setMessages] = useState([]);
    const [question, setQuestion] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        if (question.trim() === '') return; // 빈 입력 방지
        const userMessage = { sender: 'user', text: question };
        setMessages([...messages, userMessage]);

        try {
            const result = await axios.post('/ask', { question: question }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const botMessage = { sender: 'bot', text: result.data.result }; // 응답 구조에 맞게 수정
            setMessages([...messages, userMessage, botMessage]);
            setError(null);
        } catch (error) {
            setError(error);
            console.error('Error asking the question:', error);
        } finally {
            setQuestion(''); // 질문 입력 후 초기화
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-log">
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.sender}`}>
                        <p>{msg.text}</p>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask a question"
                />
                <button onClick={handleSubmit}>Ask</button>
            </div>
            {error && (
                <div className="chat-error">
                    <p>Error: {error.message}</p>
                </div>
            )}
        </div>
    );
}

export default Chat;
