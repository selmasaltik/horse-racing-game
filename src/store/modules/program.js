import horses from './horses';  
import { getRandomHorses, laps } from '@/utils/helpers';

export default {
  namespaced: true,
  state: {
    raceProgram: [], 
  },
  mutations: {
    setRaceProgram(state, program) {
      state.raceProgram = program;
    },
  },
  actions: {
    generateRaceSchedule({ commit }) {
      const raceProgram = laps.map((lap) => {
        const selectedHorses = getRandomHorses(horses.state.horses, 10);

        return {
          distance: lap.distance,
          positions: selectedHorses.map((horse) => horse),
        };
      });

      commit('setRaceProgram', raceProgram);
    },
  },
  getters: {
    raceProgram(state) {
      return state.raceProgram;  
    },
  },
};
