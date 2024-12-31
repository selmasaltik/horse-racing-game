import horses from './use-horses';  
import { getRandomHorses, laps } from '@/utils/helpers';

export default {
  namespaced: true,  // Enable namespacing for the module
  state: {
    raceProgram: [],  // Store the race schedule
  },
  mutations: {
    // Set the generated race program
    setRaceProgram(state, program) {
      state.raceProgram = program;
    },
  },
  actions: {
    // Generate the race schedule by selecting random horses for each lap
    generateRaceSchedule({ commit }) {
      const raceProgram = laps.map((lap) => {
        const selectedHorses = getRandomHorses(horses.state.horses, 10);  // Select 10 random horses for each lap

        return {
          distance: lap.distance,  // Set the distance for the lap
          positions: selectedHorses.map((horse) => horse),  // Assign the selected horses to the lap
        };
      });

      commit('setRaceProgram', raceProgram);  // Commit the generated program to the state
    },
  },
  getters: {
    // Retrieve the current race program
    raceProgram(state) {
      return state.raceProgram;  
    },
  },
};
