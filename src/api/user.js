import { post } from '@/api/base/request';

const _adminLogin = post('/user/user-login', false, true, '');
const _adminRtcToken = post('/im/admin-rtc-token-get', true, true, '');
const _adminRoomExit = post('/im/admin-cmd-room-exit', true, true, '');

const _adminSystemRoleList = post('/user/admin-system-role-list', true, true, '');

const _userInfoQuery = post('/user/user-info-query', true, true, '');
const _userInfoList = post('/user/user-info-list', true, true, '');
const _userInfoGet = post('/user/user-info-get', true, true, '');
const _userInfoSave = post('/user/user-info-save', true, true, '');
const _userForbidSave = post('/user/user-forbid-save', true, true, '');
const _userReportQuery = post('/manage/user-report-query', true, true, '');

export { _adminLogin, _adminRtcToken, _adminRoomExit, _userInfoList, _userInfoQuery, _userInfoGet, _userInfoSave, _userForbidSave, _adminSystemRoleList, _userReportQuery };
