import { computed } from 'vue';  
import { useStore } from 'vuex';  

export const useRaceProgram = () => {
  const store = useStore(); 

  // A computed property that retrieves the 'raceProgram' from the Vuex store state.
  const raceProgram = computed(() => store.state.program.raceProgram);

  // Returning the computed property so it can be used in the component.
  return {
    raceProgram
  };
};
