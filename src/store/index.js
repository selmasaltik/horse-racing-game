import { createStore } from 'vuex';

import horses from './modules/horses';

export default createStore({
  modules: {
    horses,
  }
});