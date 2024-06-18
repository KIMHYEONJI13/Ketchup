import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Nav } from 'react-bootstrap'
import '../../style.css';
import '../../pages/mails/mail.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { callLogoutAPI } from '../../apis/MemberAPICalls';
import { decodeJwt } from '../../utils/tokenUtils';
import NotificationIcon from '../../pages/NotificationIcon';
import { useEffect } from 'react';
import { useState } from 'react';

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = decodeJwt(window.localStorage.getItem('accessToken'));
    const [notifications, setNotifications] = useState([]); // 알림기능을 위해 신규 생성

    const onClickLogoutHandler = () => {
        window.localStorage.removeItem('accessToken');
        //로그아웃
        dispatch(callLogoutAPI());

        alert('로그아웃이 되어 로그인화면 으로 이동합니다.');
        navigate("login", { replace: true })
    };

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080/myHandler');
        
        ws.onopen = () => {
            console.log('WebSocket connection opened');
        };

        ws.onerror = (event) => {
            console.error('WebSocket 오류:', event);
        }; 
        
        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };
        
        ws.onmessage = (event) => {
            const newNotification = event.data;
            setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
        };

        // return () => {
        //     ws.close();
        // };

        ws.onopen = () => {
            console.log("WebSocket connection established");
            ws.send("Test message from client");
        };

    }, []);

    // useEffect(() => {
    //     let socket = null;
    //     if (token) {
    //         socket = new WebSocket('ws://localhost:8080/myHandler');

    //         socket.addEventListener('open', () => {
    //             console.log('WebSocket이 연결되었습니다.');
    //         });

    //         socket.addEventListener('message', (event) => {
    //             const message = JSON.parse(event.data);
    //             setNotifications(prev => [...prev, message.content]);
    //             console.log('Received WebSocket message:', message); // 추가: 받은 메시지 로그
    //         });

    //         socket.addEventListener('close', (e) => {
    //             console.log('WebSocket이 닫혔습니다.');
    //             console.error(e);
    //         });
    //     }

    //     return () => {
    //         if (socket) {
    //             socket.close();
    //         }
    //     };
    // }, [token]);

    return (
        <header id="header" className="header fixed-top d-flex align-items-center">

            <div className="d-flex align-items-center justify-content-between">
                <Link to="/main" className="logo d-flex align-items-center">
                    <img style={{ width: '180px', height: '150px' }} src="/img/logo.png" alt="Logo" />
                </Link>
            </div>

            <Nav className="header-nav ms-auto">
                <ul className="d-flex align-items-center">
                    {/* 알림을 위해 신규 생성됨 */}
                    <li className="nav-item d-flex">    
                        <NotificationIcon notifications={notifications} />
                    </li>
                    <li className="nav-item d-flex">
                        <Link to="/mails/receive" className="bi-envelope nav-icon m-0" style={{ color: '#EC0B0B' }}></Link>
                    </li>
                    <li className="nav-item dropdown pe-2">
                        <a className="nav-link nav-profile d-flex align-items-center pe-6" href="#" data-bs-toggle="dropdown">

                            <img src={`/img/${token?.imgUrl}`} width="45" height="45" alt="Profile" className="rounded-circle" />

                            <span className="d-none d-md-block dropdown-toggle ps-2" style={{ color: "#000" }}>{token?.memberName} {token?.positionName}</span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                            <li className="dropdown-header">
                                <h6>{token?.memberName}</h6>
                                <span>{token?.depName}</span>
                            </li>
                            <li>
                                <Link className="dropdown-item d-flex align-items-center" to="mypage">
                                    <i className="bi bi-person"></i>
                                    <span>My Profile</span>
                                </Link>
                            </li>
                            <li>
                                <button className="dropdown-item d-flex align-items-center" onClick={onClickLogoutHandler}>
                                    <i className="bi bi-box-arrow-right"></i>
                                    <span>Sign Out</span>
                                </button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </Nav>
        </header>
    );
}

export default Header;