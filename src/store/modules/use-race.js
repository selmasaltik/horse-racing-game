export default {
  namespaced: true,
  
  state: {
    raceInProgress: false,  // Indicates whether a race is currently in progress.
    currentRace: 0,         // The index of the current race being processed.
    currentLap: 1,          // The current lap number within the race.
    raceProgram: [],        // Stores the entire race schedule (all races and their details).
    raceDetails: {},        // Stores details for the current race (like distance, horses in the race, etc.).
    raceResults: [],        // Holds the results of each race that has been completed.
    pausedRaceState: {},    // Stores the state of the race if it is paused, so it can be resumed.
  },

  // Getters provide a way to access the state in a more readable manner.
  getters: {
    hasRaceStarted: (state) => state.raceInProgress,  // Returns whether the race has started or not.
    currentRace: (state) => state.currentRace,        // Returns the index of the current race.
    currentLap: (state) => state.currentLap,           // Returns the current lap number.
    raceDetails: (state) => state.raceDetails,         // Returns the details of the current race.
    raceResults: (state) => state.raceResults,         // Returns all the race results.
    raceProgram: (state) => state.raceProgram,         // Returns the entire race program (all races).
    currentRaceDetails: (state) => state.raceProgram[state.currentRace] || {},  // Returns the details of the current race (if it exists).
    pausedRaceState: (state) => state.pausedRaceState, // Returns the paused race state.
  },

  mutations: {
    setRaceInProgress(state, status) {
      state.raceInProgress = status;  // Sets whether the race is in progress or not.
    },
    
    setRaceProgram(state, program) {
      state.raceProgram = [...program];  // Sets the race program by cloning the passed program.
    },
    
    setCurrentRace(state, raceIndex) {
      state.currentRace = raceIndex;  // Sets the current race index.
      const raceDetail = state.raceProgram[raceIndex] || {};  // Fetches the details for the current race.
      state.raceDetails = raceDetail;  // Sets the current race details.
    },
    
    setCurrentLap(state, lapIndex) {
      state.currentLap = lapIndex;  // Sets the current lap index.
    },
    
    setRaceDetails(state, details) {
      state.raceDetails = details;  // Sets the details of the current race.
    },

    addRaceResult(state, result) {
      result.horses.sort((a, b) => (b.performance || 0) - (a.performance || 0));  // Sorts the horses based on their performance in descending order.

      state.raceResults.push({
        raceNumber: state.currentRace + 1,  // Adds the race number (starting from 1).
        distance: result.distance,          // Stores the distance of the race.
        lap: result.lap + 1,                // Stores the lap number (starting from 1).
        horses: result.horses.map((horse, index) => ({
          name: horse.name,                // Stores the horse's name.
          position: index + 1,             // Stores the horse's position based on performance.
          performance: horse.performance,  // Stores the horse's performance score.
        })),
      });
    },

    updateHorseState(state, { horseId, performance, condition }) {
      const horse = state.raceProgram[state.currentRace]?.horses?.find(h => h.id === horseId);  // Finds the horse by its ID.
      if (horse) {
        horse.performance = Math.max(0, performance);  // Updates the horse's performance, ensuring it doesn't go below 0.
        horse.condition = Math.max(0, condition);      // Updates the horse's condition, ensuring it doesn't go below 0.
      }
    },

    savePausedRaceState(state) {
      state.pausedRaceState = {
        currentRace: state.currentRace,    // Saves the current race index.
        currentLap: state.currentLap,      // Saves the current lap index.
        raceDetails: { ...state.raceDetails },  // Saves the current race details.
        raceResults: [...state.raceResults],  // Saves the current race results.
      };
    },

    restorePausedRaceState(state) {
      const pausedState = state.pausedRaceState;  // Fetches the paused race state.
      if (pausedState) {
        state.currentRace = pausedState.currentRace;     // Restores the paused race index.
        state.currentLap = pausedState.currentLap;       // Restores the paused lap index.
        state.raceDetails = pausedState.raceDetails;     // Restores the paused race details.
        state.raceResults = pausedState.raceResults;     // Restores the paused race results.
        state.pausedRaceState = {};  // Clears the paused race state after restoring it.
      }
    },
  },

  actions: {
    startPauseRace({ commit, state }) {
      if (!state.raceInProgress) {
        commit('setRaceInProgress', true);  // Starts the race if it isn't already in progress.

        if (state.pausedRaceState && state.pausedRaceState.currentRace !== undefined) {
          commit('restorePausedRaceState');  // If the race was paused, restore the paused state.
        } else {
          if (state.currentLap === 1) {
            commit('setRaceDetails', state.raceProgram[state.currentRace]);  // Set details for the first lap.
          }
        }
      } else {
        commit('setRaceInProgress', false);  // Pause the race.
        commit('savePausedRaceState');  // Save the current state for resumption.
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
          ...state.raceProgram[nextRace],  // Sets the details for the next race.
          previousRaceResults: currentRaceResults,
        });

        dispatch('finishRace', currentRaceResults);  // Finish the current race before moving to the next one.

        commit('setCurrentRace', nextRace);  // Move to the next race.
        commit('setCurrentLap', 1);  // Reset lap number for the next race.
      }
    },

    async generateRaceSchedule({ commit, state, rootGetters, dispatch }) {
      await dispatch('program/generateRaceSchedule', null, { root: true });  // Fetches the race schedule.
      const raceProgram = rootGetters['program/raceProgram'];  // Gets the race program from the program module.
      commit('setCurrentRace', 0);  // Resets to the first race.
      commit('setRaceInProgress', false);  // Stops the race from being in progress.
      state.raceResults = [];  // Clears the race results.
      commit('setRaceProgram', raceProgram);  // Sets the full race program.
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
    
      const sortedHorses = [...currentRaceDetails.positions].sort((a, b) => b.performance - a.performance);  // Sort horses by performance.

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
    
      commit('setCurrentLap', state.currentLap + 1);  // Move to the next lap.

      const totalLaps = 6;
      if (state.currentLap > totalLaps) {
        dispatch('nextRace');  // If the race has finished, move to the next race.
      } else {
        commit('setRaceDetails', currentRaceDetails);  // Set details for the current race.
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
        commit('addRaceResult', raceResult);  // Add the result for the race.
        dispatch('nextRace');  // Move to the next race after completion.
      }
    },

    restoreRace({ commit }) {
      commit('restorePausedRaceState');  // Restore the paused race state.
      commit('setRaceInProgress', true);  // Resume the race.
    },
  },
};
