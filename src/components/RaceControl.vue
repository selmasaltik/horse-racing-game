<script setup>
  import { computed, ref } from 'vue';
  import { useStore } from 'vuex';

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
    } else {
      alert('Please create a schedule.');
    }
};

const raceProgram = computed(() => store.getters['race/raceProgram']);
const raceInProgress = computed(() => store.getters['race/hasRaceStarted']);
</script>

<template>
  <div class="race-control">
    <h1 class="race-control__title">Horse Racing</h1>
    <div class="race-control__buttons">
      <button class="race-control__button" @click="generateProgram">Generate Program</button>
      <button 
        class="race-control__button" 
        :disabled="!isProgramGenerated" 
        @click="startPauseRace"
      >
        {{ raceInProgress ? 'Pause' : 'Start' }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .race-control {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-image: url('../assets/images/horse-banner.webp');
    background-position: left;
    background-size: contain;
    height: 100%;

    &__title {
    font-size: 24px;
    margin: 0;
    color: white;
    font-weight: 600;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 1);
  }

  &__buttons {
    display: flex;
    gap: 10px;
  }

  &__button {
    padding: 8px 16px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    text-transform: uppercase;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #0056b3;
    }

    &:disabled {
      background-color: #999;
      cursor: not-allowed;
    }
  }
  }
</style>
