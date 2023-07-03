const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  auth: state => state.user.storeUserAuth,
  token: state => state.user.storeUserInfo?.token,
  avatar: state => state.user.storeUserInfo?.avatar,
  name: state => state.user.storeUserInfo?.nickName,
  roleSet: state => state.user.storeUserInfo?.roleSet,
  locale: state => state.settings.setting?.locale
};
export default getters;
