import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export const useRaceControl = () => {
  const store = useStore();

  const isProgramGenerated = ref(false);

  const generateProgram = () => {
    store.dispatch('race/generateRaceSchedule').then(() => {
      isProgramGenerated.value = true;
    });
  };

  const startPauseRace = () => {
    if (isProgramGenerated.value) {
      store.dispatch('race/startPauseRace');
    }
  };

  const raceProgram = computed(() => store.getters['race/raceProgram']);
  const currentRace = computed(() => store.getters['race/currentRace']);
  const raceInProgress = computed(() => store.getters['race/hasRaceStarted']);

  return {
    isProgramGenerated,
    generateProgram,
    startPauseRace,
    raceProgram,
    currentRace,
    raceInProgress,
  };
};
