import { computed, ref, onMounted, watch } from 'vue';  
import { useStore } from 'vuex';  

export const useRaceTrack = () => {
  const store = useStore();  

  // Retrieving all horses from the Vuex store via a computed property.
  const allHorses = computed(() => store.getters['horses/allHorses']);

  // Getting the current race (the race that's happening now) from the store.
  const currentRace = computed(() => store.getters['race/currentRace']);

  // Getting the details of the current race (e.g., race distance, other race-specific data).
  const currentRaceDetails = computed(() => store.getters['race/currentRaceDetails']);

  // Checking whether a race is currently in progress.
  const raceInProgress = computed(() => store.getters['race/hasRaceStarted']);

  // Retrieving the race program (schedule) from the store, which includes the details of the upcoming races.
  const raceProgram = computed(() => store.getters['race/raceProgram']);
  
  // Getting the horses for the current race. This extracts the positions of horses from the race program.
  const currentRaceHorses = computed(() => {
    const race = raceProgram.value[currentRace.value];  // Get the specific race by using the current race index.
    return race ? race.positions : [];  // Return the horse positions for the current race or an empty array if not found.
  });

  // This ref stores the progress of each horse in the race (their position).
  const horseProgress = ref(currentRaceHorses.value.map(() => 0));  

  // Function to get the style (position) of a horse based on its progress. This is used for the UI.
  const getHorseStyle = (index) => {
    return {
      left: `${horseProgress.value[index]}%`,  // The horse's position as a percentage of the total race distance.
      transition: 'left 2s ease-in-out',  // Smooth transition for the horse's movement on the track.
    };
  };

  // Function to update the race progress at regular intervals.
  const updateRace = () => {
    if (!raceInProgress.value) return;  // If the race is not in progress, exit the function.

    // Update the progress for each horse in the race.
    horseProgress.value = horseProgress.value.map((progress, index) => {
      const horseCondition = currentRaceHorses.value[index].condition || 1;  // Get the condition of the horse (default to 1).
      const raceDistance = currentRaceDetails.value.distance;  // Get the total race distance.
      const speed = Math.random() * (horseCondition * 5) * (100 / raceDistance);  // Calculate the speed of the horse.
      const newProgress = progress + speed;  // Update the horse's progress.

      if (newProgress >= 100) return 100;  // If the horse has reached or passed the finish line, set progress to 100%.
      return newProgress;  // Return the updated progress.
    });

    // Check if all horses have finished the race (i.e., their progress is 100%).
    if (horseProgress.value.every((progress) => progress === 100)) {
      store.dispatch('race/nextRace');  // Trigger the action to start the next race.
      horseProgress.value = currentRaceHorses.value.map(() => 0);  // Reset all horses' progress for the next race.
    }
  };

  // Variable to hold the interval ID for race updates.
  let raceInterval;

  // onMounted lifecycle hook: Runs once the component is mounted.
  onMounted(() => {
    if (raceInProgress.value) {
      // If the race is already in progress, start updating the race at regular intervals (every 2 seconds).
      raceInterval = setInterval(() => {
        updateRace();  // Call the function to update the race progress.
      }, 2000); 
    }

    // Watch the 'raceInProgress' value and handle race updates accordingly.
    watch(raceInProgress, (newValue) => {
      if (newValue) {
        // If the race starts, start the interval for updating the race.
        raceInterval = setInterval(() => {
          updateRace();  // Update the race progress.
        }, 2000);
      } else {
        // If the race is stopped, clear the interval.
        clearInterval(raceInterval); 
      }
    });
  });

  // Watch the 'currentRaceHorses' array and reset horse progress whenever the race horses change.
  watch(currentRaceHorses, () => {
    horseProgress.value = currentRaceHorses.value.map(() => 0);  // Reset all horses' progress to 0.
  });

  // Return the computed values and functions for use in the component.
  return {
    allHorses,  // All the horses available.
    currentRace,  // The current race.
    currentRaceDetails,  // The details of the current race.
    raceInProgress,  // Whether the race is in progress.
    raceProgram,  // The entire race program (schedule of races).
    currentRaceHorses,  // The horses involved in the current race.
    horseProgress,  // The progress of each horse in the current race.
    getHorseStyle,  // Function to get the style (position) of each horse.
  };
};
