import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './Store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={ store }>
        <App />
    </Provider>
);

/* bootstrap import 방법 */
// import Button from 'react-bootstrap/Button';
// or 
// import { Button } from 'source/_posts/style/react-bootstrap';

/* vs.code 클론 후 (install 설정) */
// npm install
// npm install react-router-dom
// npm install react-bootstrap bootstrap
// npm install react-icons
// // npm install bootstrap-icons

/* reducx install 설정 */
// npm install redux@4.2.1
// npm install redux-devtools-extension
// npm install redux-thunk@2.4.2
// npm install redux-actions  (createActions, handleActions 등 사용을 위해)
// npm install react-redux@8.1.3
// npm install redux-logger
// npm install react-quill

/* npm uninstall ~ (install된 npm 삭제) */