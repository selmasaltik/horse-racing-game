import { 
  getRandomColor, 
  getRandomCondition, 
  horseNames, 
  calculatePerformanceAndCondition, 
  calculatePerformanceLoss, 
  calculateConditionLoss 
} from '@/utils/helpers';

// Initialize horses with random conditions and colors
const initialHorses = horseNames.map((name, index) => ({
  id: index + 1,  // Unique ID for each horse
  name,           // Horse name from the predefined list
  condition: getRandomCondition(1, 100),  // Random condition value between 1 and 100
  color: getRandomColor(),  // Random unique color for the horse
  hasRaced: false,  // Flag indicating if the horse has raced
  performance: 0,   // Initial performance of the horse
}));

export default {
  namespaced: true,  // Enable namespacing for the module
  state: {
    horses: initialHorses,  // Store the list of horses in the state
  },
  getters: {
    allHorses: (state) => state.horses,  // Getter to retrieve all horses
    getHorseById: (state) => (horseId) => state.horses.find(horse => horse.id === horseId),  // Get horse by its ID
  },
  mutations: {
    // Update the performance and condition of a specific horse
    updateHorseState(state, { horseId, performance, condition }) {
      const horse = state.horses.find(h => h.id === horseId);
      if (horse) {
        horse.performance = performance;
        horse.condition = condition;
      }
    },

    // Mark the horse as having raced
    markHorseAsRaced(state, horseId) {
      const horse = state.horses.find(h => h.id === horseId);
      if (horse) horse.hasRaced = true;
    },

    // Apply performance and condition losses after a race
    applyPerformanceAndConditionLoss(state, { horseId, distance }) {
      const horse = state.horses.find(h => h.id === horseId);
      if (horse) {
        const performanceLoss = calculatePerformanceLoss(horse.performance, distance);  // Calculate performance loss
        const conditionLoss = calculateConditionLoss(horse.condition, horse.hasRaced);  // Calculate condition loss
        
        horse.performance -= performanceLoss;  // Apply performance loss
        horse.condition -= conditionLoss;      // Apply condition loss

        horse.performance = Math.max(0, horse.performance);  // Ensure performance doesn't go below 0
        horse.condition = Math.max(0, horse.condition);      // Ensure condition doesn't go below 0
      }
    },

    // Calculate new performance and condition based on distance and race status
    calculatePerformance(state, { horseId, distance }) {
      const horse = state.horses.find(h => h.id === horseId);
      if (horse) {
        const { newPerformance, newCondition } = calculatePerformanceAndCondition(horse.condition, distance, horse.hasRaced);
        horse.performance = newPerformance;  // Update performance
        horse.condition = newCondition;      // Update condition
      }
    },
  },
  actions: {
    // Action to calculate horse's performance after a race
    calculateHorsePerformance({ commit }, { horseId, distance }) {
      commit('calculatePerformance', { horseId, distance });
    },

    // Action to apply race effects like performance and condition loss
    applyRaceEffects({ commit }, { horseId, distance }) {
      commit('applyPerformanceAndConditionLoss', { horseId, distance });
    },

    // Action to finalize race effects after a race
    finishRace({ commit }, { horseId, distance }) {
      commit('applyRaceEffects', { horseId, distance });
    },
  },
};
