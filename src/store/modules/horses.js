import { 
  getRandomColor, 
  getRandomCondition, 
  horseNames, 
  calculatePerformanceAndCondition, 
  calculatePerformanceLoss, 
  calculateConditionLoss 
} from '@/utils/helpers';

const initialHorses = horseNames.map((name, index) => ({
  id: index + 1,
  name,
  condition: getRandomCondition(1, 100),
  color: getRandomColor(),
  hasRaced: false,
  performance: 0,
}));

export default {
  namespaced: true,
  state: {
    horses: initialHorses,
  },
  getters: {
    allHorses: (state) => state.horses,
    getHorseById: (state) => (horseId) => state.horses.find(horse => horse.id === horseId),
  },
  mutations: {
    updateHorseState(state, { horseId, performance, condition }) {
      const horse = state.horses.find(h => h.id === horseId);
      if (horse) {
        horse.performance = performance;
        horse.condition = condition;
      }
    },

    markHorseAsRaced(state, horseId) {
      const horse = state.horses.find(h => h.id === horseId);
      if (horse) horse.hasRaced = true;
    },

    applyPerformanceAndConditionLoss(state, { horseId, distance }) {
      const horse = state.horses.find(h => h.id === horseId);
      if (horse) {
        const performanceLoss = calculatePerformanceLoss(horse.performance, distance);
        const conditionLoss = calculateConditionLoss(horse.condition, horse.hasRaced);
        
        horse.performance -= performanceLoss;
        horse.condition -= conditionLoss;

        horse.performance = Math.max(0, horse.performance);
        horse.condition = Math.max(0, horse.condition);
      }
    },

    calculatePerformance(state, { horseId, distance }) {
      const horse = state.horses.find(h => h.id === horseId);
      if (horse) {
        const { newPerformance, newCondition } = calculatePerformanceAndCondition(horse.condition, distance, horse.hasRaced);
        horse.performance = newPerformance;
        horse.condition = newCondition;
      }
    },
  },
  actions: {
    calculateHorsePerformance({ commit }, { horseId, distance }) {
      commit('calculatePerformance', { horseId, distance });
    },

    applyRaceEffects({ commit }, { horseId, distance }) {
      commit('applyPerformanceAndConditionLoss', { horseId, distance });
    },

    finishRace({ commit }, { horseId, distance }) {
      commit('applyRaceEffects', { horseId, distance });
    },
  },
};
