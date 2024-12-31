import { computed, ref, onMounted, watch } from 'vue';
import { useStore } from 'vuex';

export const useRaceTrack = () => {
  const store = useStore();

  const allHorses = computed(() => store.getters['horses/allHorses']);
  const currentRace = computed(() => store.getters['race/currentRace']);
  const currentRaceDetails = computed(() => store.getters['race/currentRaceDetails']);
  const raceInProgress = computed(() => store.getters['race/hasRaceStarted']);
  const raceProgram = computed(() => store.getters['race/raceProgram']);
  
  const currentRaceHorses = computed(() => {
    const race = raceProgram.value[currentRace.value];
    return race ? race.positions : [];
  });

  const horseProgress = ref(currentRaceHorses.value.map(() => 0));

  const getHorseStyle = (index) => {
    return {
      left: `${horseProgress.value[index]}%`,
      transition: 'left 2s ease-in-out', 
    };
  };

  const updateRace = () => {
    if (!raceInProgress.value) return;

    horseProgress.value = horseProgress.value.map((progress, index) => {
      const horseCondition = currentRaceHorses.value[index].condition || 1;
      const raceDistance = currentRaceDetails.value.distance;
      const speed = Math.random() * (horseCondition * 5) * (100 / raceDistance);
      const newProgress = progress + speed;

      if (newProgress >= 100) return 100;
      return newProgress;
    });

    if (horseProgress.value.every((progress) => progress === 100)) {
      store.dispatch('race/nextRace');
      horseProgress.value = currentRaceHorses.value.map(() => 0);
    }
  };

  let raceInterval;

  onMounted(() => {
    if (raceInProgress.value) {
      raceInterval = setInterval(() => {
        updateRace();
      }, 2000); 
    }

    watch(raceInProgress, (newValue) => {
      if (newValue) {
        raceInterval = setInterval(() => {
          updateRace();
        }, 2000);
      } else {
        clearInterval(raceInterval); 
      }
    });
  });

  watch(currentRaceHorses, () => {
    horseProgress.value = currentRaceHorses.value.map(() => 0);
  });

  return {
    allHorses,
    currentRace,
    currentRaceDetails,
    raceInProgress,
    raceProgram,
    currentRaceHorses,
    horseProgress,
    getHorseStyle,
  };
};
