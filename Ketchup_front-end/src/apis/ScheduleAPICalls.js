import { request } from './Api';
import { getSchedule } from '../modules/ScheduleModule';

export const getScheduleAPI = (dptNo) => {
  return async (dispatch) => {
    try {
      const schedules = await request('GET', `/schedules/department/${dptNo}`);
      dispatch({
        type: getSchedule,
        payload: schedules
      });
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message;
      throw new Error(`[ScheduleAPICalls중 getScheduleAPI] 오류: ${errorMessage}`);
    }
  };
};

export const insertScheduleAPI = async (newScheduleData) => {
  try {
    const response = await request('post', '/schedules/schedules', newScheduleData);
    return response;
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : error.message;
    throw new Error(`[ScheduleAPICalls중 insertScheduleAPI] 오류: ${errorMessage}`);
  }
};

export const updateScheduleAPI = async (skdNo, updatedScheduleData) => {
  try {
    const response = await request('put', `/schedules/schedules/${skdNo}`, updatedScheduleData);
    return response;
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : error.message;
    throw new Error(`[ScheduleAPICalls중 updateScheduleAPI] 오류: ${errorMessage}`);
  }
};

export const deleteScheduleAPI = async (skdNo) => {
  try {
    const response = await request('delete', `/schedules/schedules/${skdNo}`);
    return response;
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : error.message;
    throw new Error(`[ScheduleAPICalls 중 deleteScheduleAPI] 오류: ${errorMessage}`);
  }
};