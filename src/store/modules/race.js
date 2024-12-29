export default {
  namespaced: true,
  state: {
    raceInProgress: false, 
    currentRace: 0, 
    currentLap: 1,  
    raceProgram: [],  
    raceDetails: {},  
    raceResults: [],  
  },
  getters: {
    hasRaceStarted: (state) => state.raceInProgress, 
    currentRace: (state) => state.currentRace, 
    currentLap: (state) => state.currentLap,  
    raceDetails: (state) => state.raceDetails,  
    raceResults: (state) => state.raceResults,  
    raceProgram: (state) => state.raceProgram,  
    currentRaceDetails: (state) => { 
      return state.raceProgram[state.currentRace] || {}; 
    },
  },
  mutations: {
    setRaceInProgress(state, status) {
      state.raceInProgress = status;
      console.log('State after setRaceInProgress:', JSON.stringify(state.raceDetails, null, 2));
      console.log('State after setRaceInProgress:', JSON.stringify(state.raceResults, null, 2));
    },
    setRaceProgram(state, program) {
      state.raceProgram = program;
      console.log('State after setRaceProgram:', JSON.stringify(state.raceDetails, null, 2));
      console.log('State after setRaceProgram:', JSON.stringify(state.raceResults, null, 2));
    },
    setCurrentRace(state, raceIndex) {
      state.currentRace = raceIndex;
      const raceDetail = state.raceProgram[raceIndex] || {}; 
      state.raceDetails = raceDetail; 
      console.log('State after setCurrentRace:', JSON.stringify(state.raceDetails, null, 2));
      console.log('State after setCurrentRace:', JSON.stringify(state.raceResults, null, 2));
    },
    setCurrentLap(state, lapIndex) {
      state.currentLap = lapIndex;
      console.log('State after setCurrentLap:', JSON.stringify(state.raceDetails, null, 2));
      console.log('State after setCurrentLap:', JSON.stringify(state.raceResults, null, 2));
    },
    setRaceDetails(state, details) {
      state.raceDetails = details;  
      console.log('State after setRaceDetails:', JSON.stringify(state.raceDetails, null, 2));
      console.log('State after setRaceDetails:', JSON.stringify(state.raceResults, null, 2));
    },
    addRaceResult(state, result) {
      state.raceResults.push(result);
      console.log('State after addRaceResult:', JSON.stringify(state.raceDetails, null, 2));
      console.log('State after addRaceResult:', JSON.stringify(state.raceResults, null, 2));
    },
    resetRace(state) {
      state.currentRace = 0;
      state.currentLap = 1;
      state.raceResults = [];
      state.raceDetails = {};  
      console.log('State after resetRace:', JSON.stringify(state, null, 2));
    },
  },
  actions: {
    startPauseRace({ commit, state }) {
    
      if (!state.raceInProgress) {
        commit('setRaceInProgress', true);
       
        if (state.currentLap === 1) {
          commit('setRaceDetails', state.raceProgram[state.currentRace]);  
        }
        console.log('Race Started!');
      } else {
        commit('setRaceInProgress', false);
        console.log('Race Paused!');
      }
    },
    nextRace({ commit, state, dispatch }) {
    
      const nextRace = state.currentRace + 1;
      if (nextRace < state.raceProgram.length) {
        commit('setCurrentRace', nextRace);
        commit('setCurrentLap', 1);  
        commit('setRaceDetails', state.raceProgram[nextRace]);  
        console.log(`Next race started: Race ${nextRace + 1}`);
      } else {
        console.log('All races are completed!');
        commit('setRaceInProgress', false);  
        dispatch('showAllResults');
      }
    },
    async generateRaceSchedule({ commit, rootGetters, dispatch }) {
      await dispatch('program/generateRaceSchedule', null, { root: true });
      const raceProgram = rootGetters['program/raceProgram'];
      commit('setRaceProgram', raceProgram);

      console.log('Race Program:', raceProgram);
    },
    finishRace({ commit, state, dispatch }, raceResult) {
      commit('addRaceResult', raceResult);  
      console.log(`Race result added:`, raceResult);

      commit('setCurrentLap', state.currentLap + 1);

      const totalLaps = state.raceProgram[state.currentRace].totalLaps || 6; 
      if (state.currentLap > totalLaps) {
        dispatch('nextRace');  
      } else {
        commit('setRaceDetails', state.raceProgram[state.currentRace]); 
      }
    },
    checkRaceCompletion({ commit, state, dispatch }, horseProgress) {
      if (horseProgress.every((progress) => progress === 100)) {
        console.log('All horses have finished!');
        const raceResult = {
          raceNumber: state.currentRace + 1,
          horses: state.raceProgram[state.currentRace].horses.map((horse, index) => ({
            name: horse.name,
            position: index + 1,
          })),
        };
        commit('addRaceResult', raceResult); 
        console.log(`Race ${state.currentRace + 1} final results:`);
        raceResult.horses.forEach((horse, index) => {
          console.log(`Position: ${horse.position}, Horse: ${horse.name}`);
        });
        dispatch('nextRace'); 
      }
    },
    showAllResults({ state }) {
      console.log('All races completed. Here are the results:');
      state.raceResults.forEach((result, index) => {
        console.log(`Race ${result.raceNumber}:`);
        result.horses.forEach((horse) => {
          console.log(`Position: ${horse.position}, Horse: ${horse.name}`);
        });
      });
    },
    updateLapResult({ commit, state, dispatch }, lapResult) {
      const raceResult = {
        raceNumber: state.currentRace + 1,
        lap: state.currentLap,
        horses: state.raceProgram[state.currentRace].horses.map((horse, index) => ({
          name: horse.name,
          position: index + 1,
        })),
      };
      commit('addRaceResult', raceResult); 
      console.log(`Lap ${state.currentLap} result added:`, raceResult);

      commit('setCurrentLap', state.currentLap + 1);

      const totalLaps = state.raceProgram[state.currentRace].totalLaps || 6;  
      if (state.currentLap > totalLaps) {
        dispatch('nextRace');  
      }
    },
  },
};
