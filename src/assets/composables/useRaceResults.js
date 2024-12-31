import { computed, watchEffect } from 'vue';  
import { useStore } from 'vuex';  

export const useRaceResults = () => {
  const store = useStore(); 

  // A computed property that gets 'raceResults' from the Vuex store. 
  // If no race results are found, it defaults to an empty array.
  const raceResults = computed(() => store.getters['race/raceResults'] || []);  

  // A computed property that gets whether the race is in progress or not from the store.
  const raceInProgress = computed(() => store.getters['race/raceInProgress']);  

  // A computed property that retrieves the details of the next race (current race) from the store.
  const currentRace = computed(() => store.getters['race/nextRace']);  

  // Watching the effect of changes to the reactive properties.
  // This will execute every time the watched values change (raceInProgress and currentRace).
  watchEffect(() => {
    // If the race is not in progress and the current race exists and has a valid ID:
    if (!raceInProgress.value && currentRace.value && currentRace.value.id) {
      // Prepare the current race result based on the race ID.
      const currentResult = {
        raceId: currentRace.value.id,  // Use the ID of the current race.
        results: raceResults.value
          .filter(result => result.raceId === currentRace.value.id)  // Filter the results for the current race ID.
          .map(result => result.results)  // Get the individual results.
          .flat(),  // Flatten the array of results.
      };
      
      // Commit the current race results to the Vuex store using the mutation 'race/addRaceResult'.
      store.commit('race/addRaceResult', currentResult);
    }
  });

  // Returning computed properties for use in components.
  return {
    raceResults,  // The race results.
    raceInProgress,  // Whether the race is currently in progress.
    currentRace,  // The details of the current race.
  };
};
