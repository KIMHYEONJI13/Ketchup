import axios from 'axios';
const DOMAIN = 'http://localhost:8080';


export const request = async (method, url, data) => {
    try {
        // API 요청
        const token = window.localStorage.getItem('accessToken')
        
        const response = await axios({
            method: method,
            url: `${DOMAIN}${url}`,
            data: data,
            headers: {
                'Authorization': `Bearer ${token}`,
                // 'Content-Type': 'multipart/form-data' // 추가

            }
        });
        return response.data;
    } catch (error) {
        console.error('API request 에러: ', error);
        throw error;
    }
};

export const multipartRequest = async (method, url, data) => {
    try {
   
        const token = window.localStorage.getItem('accessToken')
        const response = await axios({
            method: method,
            url: `${DOMAIN}${url}`,
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': '*/*',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('API request 에러: ', error);
        throw error;
    }
};


export const noTokenRequest = async (method, url, data) => {
    try {
        // API 요청
        const response = await axios({
            method: method,
            url: `${DOMAIN}${url}`,
            data: data,
            headers: {
                'Authorization': 'Bearer eyJkYXRlIjoxNzE2Nzg4NTQyOTA2LCJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJwb3NpdGlvbk5hbWUiOiLtjIDsnqUiLCJkZXBObyI6NSwiaW1nVXJsIjoiNjIyZjM4Y2FkM2RkNGNkM2I5NDA5ZDY3MjcwZWU2NGMucG5nIiwibWVtYmVyTm8iOiI1IiwicG9zaXRpb25MZXZlbCI6Miwic3ViIjoia2V0Y2h1cCB0b2tlbiA6IDUiLCJyb2xlIjoiTFYyIiwicG9zaXRpb25TdGF0dXMiOiJZIiwibWVtYmVyTmFtZSI6Iuq5gO2YhOyngCIsInBvc2l0aW9uTm8iOjIsImV4cCI6MTcxNjg3NDk0MiwiZGVwTmFtZSI6IuuyleustO2MgCJ9.CG8XE-75UIXTjRDRqDxeJ_LFPyZqkEIprUFTyO9DTEk'

            }
           
        });
        return response.data;
    } catch (error) {
        console.error('API request 에러: ', error);
        throw error;
    }
};