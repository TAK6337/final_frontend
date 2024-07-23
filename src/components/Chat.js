import '../styles/Chat.css';
// import '../styles/ChatTest.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useRef  } from 'react';
import axios from 'axios';
import NavigationBar from "./NavigationBar";
import SideNavBtn from '../components/SideNavBtn';


function Chat() {
    const [messages, setMessages] = useState([]);
    const [question, setQuestion] = useState('');
    const [error, setError] = useState(null);
    const inputRef = useRef(null);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    };

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
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div className="chatbot-background">
            <NavigationBar/>
            <SideNavBtn/>
            <div className="chatbot-frame">
                <div className="chatbot-header">
                    <img className="chatbot-header-logo" src="/images/chatbot/AIport.png"/>
                </div>
                <div className="chatbot-content">
                    <div className="chat-log">
                        {messages.map((msg, index) => (
                            <div key={index} className={`chat-message ${msg.sender}`}>
                                <p>{msg.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatbot-footer">
                    <div className="chatbot-footer-user-msg">
                        <input
                            ref={inputRef}
                            className="chatbot-footer-user-msg-text"
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="메세지를 입력해주세요"
                            onKeyDown={handleKeyDown}
                        />
                        <button onClick={handleSubmit} >
                            <img
                                className="chatbot-footer-user-msg-send-img"
                                src="/images/chatbot/chatbot-footer-user-send.png"
                            />
                        </button>

                    </div>
                </div>
            </div>
        </div>


    );
}

export default Chat;
