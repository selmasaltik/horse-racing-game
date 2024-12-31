import { computed } from 'vue';  
import { useStore } from 'vuex'; 

export function useApp() {
  const store = useStore();  

  // 'raceProgram' is a computed property that retrieves the 'raceProgram' from the store's 'race' module.
  const raceProgram = computed(() => store.getters['race/raceProgram']); 
  
  // 'currentRace' is a computed property that retrieves the index of the current race from the store's 'race' module.
  const currentRace = computed(() => store.getters['race/currentRace']);
  
  // 'raceInProgress' is a computed property that checks whether a race is currently in progress by accessing the 'hasRaceStarted' getter.
  const raceInProgress = computed(() => store.getters['race/hasRaceStarted']);
  
  // 'isProgramGenerated' is a computed property that checks if there are any races in the race program (i.e., the program has been generated).
  // It returns true if 'raceProgram' has more than 0 items, otherwise false.
  const isProgramGenerated = computed(() => raceProgram.value.length > 0);
  
  // 'raceResults' is a computed property that retrieves the results of all the races from the store's 'race' module.
  const raceResults = computed(() => store.getters['race/raceResults']); 

  return {
    raceProgram,
    currentRace,
    raceInProgress,
    isProgramGenerated,
    raceResults
  };
}
