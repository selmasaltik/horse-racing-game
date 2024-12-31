import { computed } from 'vue';
import { useStore } from 'vuex';

export const useHorseList = () => {
  const store = useStore();

  const horses = computed(() => store.getters['horses/allHorses'] || []);
  const horseCount = computed(() => horses.value.length);

  return {
    horses,
    horseCount,
  };
}
