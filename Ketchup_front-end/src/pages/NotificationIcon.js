// 알림을 위해 신규 생성됨
import React, { useState } from 'react';

const NotificationIcon = ({ notifications }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleIconClick = () => {
    setShowNotifications(!showNotifications);
    console.log('Notification icon clicked. Show notifications:', !showNotifications); // 추가: 아이콘 클릭 로그
};

  return (
    <div style={{ position: 'relative' }}>
      <div onClick={handleIconClick} style={{ cursor: 'pointer' }}>
        <i className="bi bi-bell" style={{ fontSize: '1.5rem', color: '#EC0B0B' }}></i>
        {notifications.length > 0 && (
          <span style={{
            position: 'absolute',
            top: 0,
            right: 0,
            background: 'red',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '0.8rem'
          }}>
            {notifications.length}
          </span>
        )}
      </div>
      {showNotifications && (
        <div style={{
          position: 'absolute',
          right: 0,
          background: 'white',
          border: '1px solid #ccc',
          width: '300px',
          maxHeight: '400px',
          overflowY: 'auto',
          zIndex: 1000,
          boxShadow: '0px 0px 10px rgba(0,0,0,0.1)'
        }}>
          {notifications.length === 0 ? (
            <div style={{ padding: '10px' }}>No notifications</div>
          ) : (
            notifications.map((notification, index) => (
              <div key={index} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
                {notification}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
