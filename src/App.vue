<script setup>
 import { useApp } from './assets/composables/useApp.js';

const { 
  raceProgram, 
  currentRace, 
  raceInProgress, 
  isProgramGenerated, 
  raceResults 
} = useApp();

import RaceControl from './components/RaceControl.vue';
import HorseList from './components/HorseList.vue';
import RaceTrack from './components/RaceTrack.vue';
import RaceProgram from './components/RaceProgram.vue';
import RaceResults from './components/RaceResults.vue';

import horseRaceStartImg from './assets/images/horse-racing-start.jpg';
import horseRaceFinishImg from './assets/images/horse-racing-finish.jpg';
</script>

<template>
  <div class="app-container">
     <header class="header">
        <RaceControl />
     </header>
    <aside class="sidebar">
      <HorseList />
    </aside>
    <main class="main-content">
      <RaceTrack 
        v-if="isProgramGenerated && currentRace < 6"
        :key="currentRace" 
      />
      <div v-if="!isProgramGenerated" class="main-content__info">
        <p>Please create a schedule.</p>
        <img :src="horseRaceStartImg" alt="Horse Race Start" />
      </div>
      <div v-if="isProgramGenerated && currentRace === 6" class="main-content__info">
        <p>Race is finished.</p>
        <img :src="horseRaceFinishImg" alt="Horses Race Finish">
      </div>
    </main>
    <aside class="right-sidebar" v-if="isProgramGenerated">
      <RaceProgram :program="raceProgram" />
      <RaceResults :raceResults="raceResults" />
    </aside>
  </div>
</template>

<style scoped lang="scss">
  @use './assets/styles/app.scss';
</style>
