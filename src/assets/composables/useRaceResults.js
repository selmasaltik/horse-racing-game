import { computed, watchEffect } from 'vue';
import { useStore } from 'vuex';

export const useRaceResults = () => {
  const store = useStore();

  const raceResults = computed(() => store.getters['race/raceResults'] || []);  
  const raceInProgress = computed(() => store.getters['race/raceInProgress']);  
  const currentRace = computed(() => store.getters['race/nextRace']);  

  watchEffect(() => {
    if (!raceInProgress.value && currentRace.value && currentRace.value.id) {
      const currentResult = {
        raceId: currentRace.value.id,
        results: raceResults.value.filter(result => result.raceId === currentRace.value.id).map(result => result.results).flat(),
      };
      store.commit('race/addRaceResult', currentResult);
      console.log(`Race ${currentResult.raceId} completed!`);
    }
  });

  return {
    raceResults,
    raceInProgress,
    currentRace,
  };
};
