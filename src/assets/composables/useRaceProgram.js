import { computed } from 'vue';
import { useStore } from 'vuex';

export const useRaceProgram = () => {
  const store = useStore();

  const raceProgram = computed(() => store.state.program.raceProgram);

  return {
    raceProgram
  };
}