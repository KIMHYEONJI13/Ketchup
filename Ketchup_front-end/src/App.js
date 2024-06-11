import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layouts/Layout';
import Main from './pages/Main';
import 'bootstrap/dist/css/bootstrap.min.css';
import Notices from './pages/notices/Notices';
import InsertNotice from './pages/notices/InsertNotice';
import Calendar from './pages/schedules/calendar';
import Approvals from './pages/approvals/Approvals';
import InsertApproval from './pages/approvals/InsertApproval';
import ApprovalDetail from './pages/approvals/ApprovalDetail';
import Mail from './pages/mails/Mail';
import MailDetail from './pages/mails/MailDetail';
import InsertMail from './pages/mails/InsertMail';
import Login from './pages/members/Login';
import MyPage from './pages/members/MyPage';
import NoticeDetail from './pages/notices/NoticeDetail';
import Members from './pages/members/Members';
import MemberDetail from './pages/members/MemberDetail';
import MailReply from './pages/mails/MailReply';
import InsertMember from './pages/members/InsertMember';
import UpdateNotice from './pages/notices/UpdateNotice';
import Reserve from './pages/reserves/Reserve';
import InsertBoard from './pages/boards/InsertBoard';
import Boards from './pages/boards/Boards';
import BoardDetail from './pages/boards/BoardDetail';
import UpdateBoard from './pages/boards/UpdateBoard';
import Resources from './pages/resources/Resources';
import Departments from './pages/members/Departments';
import Positions from './pages/members/Positions';
import OrganizationChart from './pages/members/OrganizationChart';

import FindPW from './pages/members/FindPW';
import Error from './pages/Error';

function App() {
 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 상태 확인 로직 추가
  useEffect(() => {

    const accessToken = window.localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  // 로그인 성공 콜백
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인 여부에 따라 "/" 경로를 리다이렉션 */}
        <Route path="/" element={isLoggedIn ? <Navigate to="/main" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/findPW" element={<FindPW/>}/>
       
          <Route path="/" element={<Layout />}>
            <Route path='main' element={<Main />} />
            <Route path="notices">
              <Route index element={<Notices />} />
              <Route path=":noticeNo" element={<NoticeDetail />} />
              <Route path="insert" element={<InsertNotice />} />
              <Route path="update">
                <Route path=":noticeNo" element={<UpdateNotice />} />
              </Route>
            </Route>
            <Route path="approvals">
              <Route index element={<Approvals />} />
              <Route path="insert" element={<InsertApproval />} />
              <Route path=":approvalNo" element={<ApprovalDetail />} />
            </Route>
            <Route path="boards">
              <Route index element={<Boards />} />
              <Route path=":boardNo" element={<BoardDetail />} />
              <Route path="insert" element={<InsertBoard />} />
              <Route path="update">
                <Route path=":boardNo" element={<UpdateBoard />} />
              </Route>
            </Route>
            <Route path="calendar" element={<Calendar />} />
            <Route path='reserve' element={<Reserve />} />
            <Route path="mails">
              <Route path=":part" element={<Mail />} />
              <Route path="detail">
                <Route path=":mailNo" element={<MailDetail />} />
              </Route>
              <Route path="insert" element={<InsertMail />} />
              <Route path="reply" element={<MailReply />} />
            </Route>
            <Route path="mypage" element={<MyPage />} />
            <Route path="members">
              <Route index element={<Members />} />
              <Route path="insert" element={<InsertMember />} />
              <Route path=":memberNo" element={<MemberDetail />} />
            </Route>
            <Route path="organizationChart" element={<OrganizationChart />} />
            <Route path="deparpments" element={<Departments/>}/>
            <Route path="positions" element={<Positions/>}/>
            <Route path='resources'>
              <Route path=':part' element={<Resources />} />
            </Route>

          </Route>
      
        <Route index element={<Login/>} />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;