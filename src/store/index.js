import { createStore } from 'vuex';

import horses from './modules/horses';
import program from './modules/program';

export default createStore({
  modules: {
    horses,
    program,
  }
});
