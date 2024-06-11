import { combineReducers } from "redux";
import noticeReducer from './NoticeModule';
import approvalReducer from "./ApprovalModule";
import mailReducer from "./MailModule";
import memberReducer from "./MemberModule";
import scheduleReducer from "./ScheduleModule";
import reserveReducer from "./ReserveModule";
import resourceReducer from "./ResourceModule";
import departmentReducer from "./DepartmentModule";
import positionReducer from "./PositionModule";
import boardReducer from "./BoardModule";
import commentReducer from "./CommentModule";

const rootReducer = combineReducers({
    noticeReducer,
    memberReducer,
    scheduleReducer,
    approvalReducer,
    mailReducer,
    reserveReducer,
    resourceReducer,
    departmentReducer,
    positionReducer,
    boardReducer,
    commentReducer
});

export default rootReducer;