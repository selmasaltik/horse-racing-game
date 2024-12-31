import { computed, ref } from 'vue';  
import { useStore } from 'vuex';  

export const useRaceControl = () => {
  const store = useStore();  

  // A reactive reference that tracks whether the race program has been generated or not.
  const isProgramGenerated = ref(false);

  // Function to generate the race program by dispatching the 'generateRaceSchedule' action.
  const generateProgram = () => {
    store.dispatch('race/generateRaceSchedule').then(() => {
      isProgramGenerated.value = true;  // Once the program is generated, set the 'isProgramGenerated' to true.
    });
  };

  // Function to start or pause the race. It only works if the race program has been generated.
  const startPauseRace = () => {
    if (isProgramGenerated.value) {
      store.dispatch('race/startPauseRace');  // Dispatches 'startPauseRace' action to either start or pause the race.
    }
  };

  // Computed properties to get the race program, the current race, and whether the race is in progress.
  const raceProgram = computed(() => store.getters['race/raceProgram']);  // Retrieves the race program from Vuex store.
  const currentRace = computed(() => store.getters['race/currentRace']);  // Retrieves the current race index from Vuex store.
  const raceInProgress = computed(() => store.getters['race/hasRaceStarted']);  // Checks if the race has started or not.

  // Returning the necessary reactive properties and functions so they can be used in the component.
  return {
    isProgramGenerated,   // Reactive reference indicating whether the race program has been generated.
    generateProgram,      // Function to generate the race program.
    startPauseRace,       // Function to start or pause the race.
    raceProgram,          // Computed property for the race program.
    currentRace,          // Computed property for the current race index.
    raceInProgress,       // Computed property for whether the race is in progress.
  };
};
