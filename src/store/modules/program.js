import { getRandomCondition, horseNames, getRandomHorses } from '@/utils/helpers';

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
      const horses = horseNames.map((name) => ({
        name,
        condition: getRandomCondition(1, 100),
      }));

      const laps = [
        { distance: 1200 },
        { distance: 1400 },
        { distance: 1600 },
        { distance: 1800 },
        { distance: 2000 },
        { distance: 2200 },
      ];

      const raceProgram = laps.map((lap) => {
        const selectedHorses = getRandomHorses(horses, 10);
        const sortedHorses = selectedHorses.sort((a, b) => b.condition - a.condition);

        return {
          distance: lap.distance,
          positions: sortedHorses.map((horse) => horse),
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
