import { _adminLogin } from '@/api/user';

const state = () => {
  let storeUserAuth = localStorage.getItem('storeUserAuth') === 'true';
  let storeUserInfo = localStorage.getItem('storeUserInfo');

  if (storeUserInfo) {
    storeUserInfo = JSON.parse(storeUserInfo);
  } else {
    storeUserInfo = {};
  }

  return {
    storeUserAuth,
    storeUserInfo
  };
};

const mutations = {
  CLEAR_USER: state => {
    state.storeUserAuth = false;
    state.storeUserInfo = {};
    localStorage.clear();
  },
  SET_USER_AUTH: (state, storeUserAuth) => {
    state.storeUserAuth = storeUserAuth;
    localStorage.setItem('storeUserAuth', storeUserAuth);
  },
  SET_USER_INFO: (state, storeUserInfo) => {
    state.storeUserInfo = storeUserInfo;
    localStorage.setItem('storeUserInfo', JSON.stringify(storeUserInfo));
  }
};

const actions = {
  // user login
  login({ commit }, loginForm) {
    return new Promise((resolve, reject) => {
      _adminLogin(loginForm)
        .then(data => {
          commit('SET_USER_AUTH', true);
          commit('SET_USER_INFO', data.result);

          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  loginByQrCode({ commit }, userLoginBean) {
    return new Promise((resolve, reject) => {
      commit('SET_USER_AUTH', true);
      commit('SET_USER_INFO', userLoginBean);
      resolve();
    });
  },

  // user logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit('CLEAR_USER');
      resolve();
    });
  },

  // remove token
  clearUser({ commit }) {
    return new Promise(resolve => {
      // removeToken(); // must remove  token  first
      commit('CLEAR_USER');
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
