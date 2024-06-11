import { NavLink, useLocation } from 'react-router-dom';
import '../../style.css';
import '../../pages/mails/mail.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Sidebar() {
    const location = useLocation();

    const isOrganizationActive = location.pathname.startsWith('/deparpments') || location.pathname.startsWith('/positions');
    const isResourceManagementNav = location.pathname.startsWith('/resources/conferences') ||  location.pathname.startsWith('/resources/vehicles');

    const onClickApp = () => {
        window.localStorage.setItem('category', 1);
    }

    return (
        <aside id="sidebar" className="sidebar">
            <ul className="sidebar-nav" id="sidebar-nav">
                <li className="nav-item">
                    <NavLink className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link collapsed"} to="/notices">
                        <i className="bi bi-megaphone"></i><span>공지사항</span>
                    </NavLink >
                </li>
                <li class="nav-item">
                    <NavLink className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link collapsed"} to="/approvals" onClick={() => onClickApp()}>
                        <i className="bi bi-pencil-square"></i><span>전자결재</span>
                    </NavLink>
                </li>
                <li class="nav-item">
                    <NavLink className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link collapsed"} to="/calendar">
                        <i className="bi bi-calendar-event"></i><span>일정</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link collapsed"} to="/mails/receive">
                        <i className="bi bi-envelope"></i>
                        <span>메일</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link collapsed"} to="/boards">
                        <i className="bi bi-file-text"></i><span>자료실</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link collapsed"} to="/reserve">
                        <i className="bi bi-clock"></i><span>자원예약</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link collapsed"} to="/organizationChart">
                        <i className="bi bi-diagram-3"></i><span>조직도</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link collapsed"} to="/members">
                        <i className="bi bi-person-badge"></i><span>사원</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <a className={isOrganizationActive ? "nav-link active-link" : "nav-link collapsed"} data-bs-toggle="collapse" data-bs-target="#organization-nav">
                        <i className="bi bi-diagram-3"></i><span>조직관리</span><i className="bi bi-chevron-down ms-auto"></i>
                    </a>
                    <ul id="organization-nav" className="nav-content collapse" data-bs-parent="#organization-parent">
                        <li className="nav-item">
                            <NavLink to="/deparpments" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"} style={{ color: "black", textDecorationLine: "none"}}>
                                <i></i><span> - 부서</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink  to="/positions" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"} style={{ color: "black", textDecorationLine: "none"}}>
                                <i></i><span> - 직급</span>
                            </NavLink>
                        </li>
                    </ul>
                </li>
                <li className="nav-item">
                    <a className={isResourceManagementNav ? "nav-link active-link" : "nav-link collapsed"} data-bs-toggle="collapse" data-bs-target="#resource-management-nav">
                        <i className="bi bi-people"></i><span>자원관리</span><i className="bi bi-chevron-down ms-auto"></i>
                    </a>              
                    <ul id="resource-management-nav" className="nav-content collapse" data-bs-parent="#resource-management-parent">                    
                        <li className="nav-item">
                            <NavLink  to="/resources/conferences" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"} style={{ color: "black", textDecorationLine: "none"}}>
                                <i></i><span> - 회의실</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/resources/vehicles" className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"} style={{ color: "black", textDecorationLine: "none"}}>
                                <i></i><span> - 차량</span>
                            </NavLink>
                        </li>
                    </ul>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;