import { post } from '@/api/base/request';

// 币商登录
const agentLogin = post('/mcn/agent-user-login', false, true, '');
// 订单查询
const agentOrder = post('/mcn/agent-order-query', true, true, '');
// 币商-充值金币
const agentDistribute = post('/mcn/agent-distribute-coins', true, true, '');
// 用户列表信息
const userList = post('/user/user-info-list', true, true, '');
// 用户信息
const userInfo = post('/user/user-info-get', true, true, '');
// 订单查询
const agentLog = post('/mcn/agent-log-query', true, true, '');

// 用户列表信息
const agentUserInfo = post('/mcn/agent-user-get', true, true, '');

// 查询币商
const agentUserQuery = post('/mcn/agent-user-query', true, true, '');

// 添加币商
const agentUserSave = post('/mcn/agent-user-save', true, true, '');

export {
  agentLogin,
  agentOrder,
  agentDistribute,
  userList,
  userInfo,
  agentLog,
  agentUserInfo,
  agentUserQuery,
  agentUserSave
};
