import { computed } from 'vue';
import { useStore } from 'vuex';

export const useHorseList = () => {
  const store = useStore();

  // 'horses' is a computed property that retrieves the list of horses from the Vuex store using the getter 'horses/allHorses'.
  // If there are no horses available (i.e., the getter returns null or undefined), it defaults to an empty array.
  const horses = computed(() => store.getters['horses/allHorses'] || []);
  
  // 'horseCount' is a computed property that calculates the total number of horses by checking the length of the 'horses' array.
  const horseCount = computed(() => horses.value.length);  // The 'horses' array has to be accessed via 'horses.value' because it is a reactive object.

  // Returning the 'horses' array and the 'horseCount' so that these values can be used in a component.
  return {
    horses,
    horseCount,
  };
}
