import { post } from '@/api/base/request';

const _laborUnionAnchorQuery = post('/user/labor-union-anchor-query', true, true, '');
const _laborUnionAnchorAdd = post('/user/labor-union-anchor-add', true, true, '');
const _laborUnionAnchorDelete = post('/user/labor-union-anchor-delete', true, true, '');
const _laborUnionAnchorSettlePeriodList = post('/pay/pay-anchor-settle-period-list', true, true, '');
const _laborUnionAnchorSettleMain = post('/pay/pay-anchor-settle-main', true, true, '');
const _laborUnionAnchorSettleDetail = post('/pay/pay-anchor-settle-detail', true, true, '');

export { _laborUnionAnchorQuery, _laborUnionAnchorAdd, _laborUnionAnchorDelete, _laborUnionAnchorSettlePeriodList, _laborUnionAnchorSettleMain, _laborUnionAnchorSettleDetail };
