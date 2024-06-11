function FormatDate(dateString) {
    const dateTime = new Date(dateString);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0');
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    
    
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = weekdays[dateTime.getDay()];
     
     return `${year}-${month}-${day}(${dayOfWeek}) ${hours}:${minutes}`;
};

export default FormatDate;