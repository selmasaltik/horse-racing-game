export default {
  namespaced: true,
  state: {
    raceInProgress: false,  
    currentRace: 0,         
    currentLap: 1,          
    raceProgram: [],        
    raceDetails: {},       
    raceResults: [],     
    pausedRaceState: {},   
  },
  getters: {
    hasRaceStarted: (state) => state.raceInProgress,  
    currentRace: (state) => state.currentRace,        
    currentLap: (state) => state.currentLap,           
    raceDetails: (state) => state.raceDetails,        
    raceResults: (state) => state.raceResults,        
    raceProgram: (state) => state.raceProgram,         
    currentRaceDetails: (state) => state.raceProgram[state.currentRace] || {},
    pausedRaceState: (state) => state.pausedRaceState,
  },
  mutations: {
    setRaceInProgress(state, status) {
      state.raceInProgress = status; 
    },
    setRaceProgram(state, program) {
      state.raceProgram = [...program];  
    },
    setCurrentRace(state, raceIndex) {
      state.currentRace = raceIndex;  
      const raceDetail = state.raceProgram[raceIndex] || {};
      state.raceDetails = raceDetail;  
    },
    setCurrentLap(state, lapIndex) {
      state.currentLap = lapIndex;  
    },
    setRaceDetails(state, details) {
      state.raceDetails = details; 
    },
    addRaceResult(state, result) {
      result.horses.sort((a, b) => (b.performance || 0) - (a.performance || 0));  

      state.raceResults.push({
        raceNumber: state.currentRace + 1,  
        distance: result.distance,          
        lap: result.lap + 1,               
        horses: result.horses.map((horse, index) => ({
          name: horse.name,               
          position: index + 1,             
          performance: horse.performance, 
        })),
      });
    },
    updateHorseState(state, { horseId, performance, condition }) {
      const horse = state.raceProgram[state.currentRace]?.horses?.find(h => h.id === horseId);
      if (horse) {
        horse.performance = Math.max(0, performance);  
        horse.condition = Math.max(0, condition);      
      }
    },
    savePausedRaceState(state) {
      state.pausedRaceState = {
        currentRace: state.currentRace,    
        currentLap: state.currentLap,      
        raceDetails: { ...state.raceDetails },  
        raceResults: [...state.raceResults],  
      };
    },
    restorePausedRaceState(state) {
      const pausedState = state.pausedRaceState;
      if (pausedState) {
        state.currentRace = pausedState.currentRace;     
        state.currentLap = pausedState.currentLap;       
        state.raceDetails = pausedState.raceDetails;     
        state.raceResults = pausedState.raceResults;    
        state.pausedRaceState = {};  
      }
    },
  },
  actions: {
    startPauseRace({ commit, state }) {
      if (!state.raceInProgress) {
        commit('setRaceInProgress', true);
      
        if (state.pausedRaceState && state.pausedRaceState.currentRace !== undefined) {
          commit('restorePausedRaceState');
        } else {
          if (state.currentLap === 1) {
            commit('setRaceDetails', state.raceProgram[state.currentRace]);
          }
        }
      } else {
        commit('setRaceInProgress', false);
        commit('savePausedRaceState'); 
      }
    },
    nextRace({ commit, state, dispatch }) {
      const nextRace = state.currentRace + 1;

      if (nextRace <= state.raceProgram.length) {
        const currentRaceResults = {
          raceNumber: state.currentRace + 1,
          results: state.raceResults.filter(result => result.raceNumber === state.currentRace),
        };

        commit('setRaceDetails', {
          ...state.raceProgram[nextRace],
          previousRaceResults: currentRaceResults,
        });

        dispatch('finishRace', currentRaceResults);

        commit('setCurrentRace', nextRace);
        commit('setCurrentLap', 1);
      }
    },
    async generateRaceSchedule({ commit, state, rootGetters, dispatch }) {
      await dispatch('program/generateRaceSchedule', null, { root: true });
      const raceProgram = rootGetters['program/raceProgram'];
      commit('setCurrentRace', 0);
      commit('setRaceInProgress', false);
      state.raceResults = [];
      commit('setRaceProgram', raceProgram);
    },
    finishRace({ commit, state, dispatch }) {
      const currentRaceDetails = state.raceProgram[state.currentRace];
    
      currentRaceDetails.positions.forEach(horse => {
        let performance = horse.performance || 0;
        const conditionLoss = 0.1;
    
        performance += (horse.condition / 100) * (currentRaceDetails.distance / 1000);
        horse.performance = performance;
    
        commit('updateHorseState', {
          horseId: horse.id,
          performance: horse.performance,
          condition: Math.round(horse.condition - conditionLoss),
        });
      });
    
      const sortedHorses = [...currentRaceDetails.positions].sort((a, b) => b.performance - a.performance);
    
      commit('addRaceResult', {
        raceNumber: state.currentRace + 1,
        distance: currentRaceDetails.distance,
        lap: state.currentLap,
        horses: sortedHorses.map((horse, index) => ({
          name: horse.name,
          position: index + 1,
          performance: horse.performance,
        })),
      });
    
      commit('setCurrentLap', state.currentLap + 1);

      const totalLaps = 6;
      if (state.currentLap > totalLaps) {
        dispatch('nextRace');
      } else {
        commit('setRaceDetails', currentRaceDetails); 
      }
    },
    checkRaceCompletion({ commit, state, dispatch }, horseProgress) {
      if (horseProgress.every((progress) => progress === 100)) {
        const raceResult = {
          raceNumber: state.currentRace + 1,
          horses: state.raceProgram[state.currentRace].horses.map((horse, index) => ({
            name: horse.name,
            position: index + 1,
          })),
        };
        commit('addRaceResult', raceResult);
        dispatch('nextRace');
      }
    },
    restoreRace({ commit }) {
      commit('restorePausedRaceState'); 
      commit('setRaceInProgress', true);
    },
  },
};
