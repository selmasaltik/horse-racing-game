<script setup>
  import { useRaceControl } from '../assets/composables/useRaceControl.js';

  const {  
    isProgramGenerated,
    generateProgram,
    startPauseRace,
    raceProgram,
    currentRace,
    raceInProgress 
  } = useRaceControl();
</script>

<template>
  <div class="race-control">
    <h1 class="race-control__title">Horse Racing</h1>
    <div class="race-control__buttons">
      <button class="race-control__button" @click="generateProgram">Generate Program</button>
      <button 
        class="race-control__button" 
        :disabled="!isProgramGenerated || currentRace === 6" 
        @click="startPauseRace"
      >
        {{ raceInProgress ? 'Pause' : 'Start' }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @use '../assets/styles/race-control.scss';
</style>
