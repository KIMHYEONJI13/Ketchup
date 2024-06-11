import { request } from './Api';
import { DELETE_RESERVE, GET_RESERVE, POST_RESERVE } from '../modules/ReserveModule'

export const getReserveAPI = (rscCategory, rsvDate) => {
    return async (dispatch) => {
        try {
            const reserves = await request('GET', `/reserves?category=${rscCategory}&date=${rsvDate}`);
            dispatch({
                type: GET_RESERVE,
                payload: reserves
            });
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            throw new Error(`ReserveAPICall중 getReserveAPI 오류: ${errorMessage}`);
        }
    };
};

export const insertReserveAPI = async (newReserveData) => {
    try {
        const response = await request('post', '/reserves', newReserveData);
        return response;
    } catch (error) {
        alert("예약 등록에 실패했습니다. insertReserveAPI 호출 실패");
        const errorMessage = error.response ? error.response.data.message : error.message;
        throw new Error(`[ReserveAPICalls중 insertReserveAPI] 오류: ${errorMessage}`);
    }
};

export const updateReserveAPI = async (rsvNo, updatedReserveData) => {
    try {
        const response = await request('put', `/reserves/${rsvNo}`, updatedReserveData);
        return response;
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message;
        throw new Error(`[ReserveAPICalls중 insertReserveAPI] 오류: ${errorMessage}`);
    }
};

export const deleteReserveAPI = async (rsvNo) => {
    try {
        const response = await request('delete', `/reserves/${rsvNo}`);
        return response;
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message;
        throw new Error(`[ReserveAPICalls중 deleteReserveAPI 오류 발생] : ${errorMessage}`);
    }
};