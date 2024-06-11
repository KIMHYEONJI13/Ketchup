import { createActions, handleActions } from "redux-actions";

const initialState = [{
    rscNo: '',
    rscCategory: '',
    rscName: '',
    rscInfo: '',
    rscCap: '',
    rscIsAvailable: '',
    rscDescr: ''
}];

const GET_RESOURCES = 'resources/GET_RESOURCES';
const POST_RESOURCES = 'resources/POST_RESOURCES';
const GET_RESOURCEDETAIL = 'resources/GET_RESOURCEDETAIL';
const PUT_RESOURCE = 'resources/PUT_RESOURCE';
const DELETE_RESOURCE = 'resources/DELETE_RESOURCE';

export const {resources: {getResources, postResources, getResourcedetail, putResource, deleteResource}} = createActions({
    [GET_RESOURCES]: (res) => ({resourcelist: res}),
    [POST_RESOURCES]: (res) => ({insertresource: res}),
    [GET_RESOURCEDETAIL]: (res) => ({resourcedetail: res}),
    [PUT_RESOURCE]: (res) => ({updateresource: res}),
    [DELETE_RESOURCE]: (res) => ({deleteresource: res})
});

const resourceReducer = handleActions(
    {
        [GET_RESOURCES]: (state, {payload}) => {
            return payload;
        },
        [POST_RESOURCES]: (state, {payload}) => {
            return payload;
        },
        [GET_RESOURCEDETAIL]: (state, {payload}) => {
            return payload;
        },
        [PUT_RESOURCE]: (state, {payload}) => {
            return payload;
        },
        [DELETE_RESOURCE]: (state, {payload}) => {
            return payload;
        }
     }, initialState
);

export default resourceReducer;