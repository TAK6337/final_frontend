import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RecoilRoot } from 'recoil'; // RecoilRoot 임포트

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RecoilRoot> {/* RecoilRoot로 App을 감싸기 */}
            <App />
        </RecoilRoot>
    </React.StrictMode>
);

// 성능 측정
reportWebVitals();
