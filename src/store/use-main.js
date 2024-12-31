import { createStore } from 'vuex';

import horses from './modules/use-horses';
import program from './modules/use-program';
import race from './modules/use-race';

export default createStore({
  modules: {
    horses,  // Module to manage horses-related state and actions
    program, // Module to manage the race program logic and data
    race     // Module to handle the race state and progress
  }
});
