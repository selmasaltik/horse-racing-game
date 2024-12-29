import { createStore } from 'vuex';

import horses from './modules/horses';
import program from './modules/program';
import race from './modules/race';

export default createStore({
  modules: {
    horses,
    program,
    race
  }
});
