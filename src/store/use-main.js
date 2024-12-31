import { createStore } from 'vuex';

import horses from './modules/use-horses';
import program from './modules/use-program';
import race from './modules/use-race';

export default createStore({
  modules: {
    horses,
    program,
    race
  }
});
