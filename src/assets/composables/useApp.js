import { computed } from 'vue';
import { useStore } from 'vuex';

export function useApp() {
  const store = useStore();

  const raceProgram = computed(() => store.getters['race/raceProgram']);
  const currentRace = computed(() => store.getters['race/currentRace']);
  const raceInProgress = computed(() => store.getters['race/hasRaceStarted']);
  const isProgramGenerated = computed(() => raceProgram.value.length > 0);
  const raceResults = computed(() => store.getters['race/raceResults']); 

  return {
    raceProgram,
    currentRace,
    raceInProgress,
    isProgramGenerated,
    raceResults
  };
}