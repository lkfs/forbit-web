import { post } from '@/api/base/request';

const _adminSystemRoleList = post('/user/admin-system-role-list', true, true, '');
const _adminSystemRoleSave = post('/user/admin-system-role-save', true, true, '');

export { _adminSystemRoleList, _adminSystemRoleSave };
