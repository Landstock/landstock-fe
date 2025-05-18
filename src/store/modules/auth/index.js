import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export default {
  state() {
    return {
      token: null,
      role: null,
      tokenExpiration: null,
      userEmail: null,
    };
  },
  actions,
  getters,
  mutations,
};
