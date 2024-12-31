<script setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';

  import RaceControl from './components/RaceControl.vue';
  import HorseList from './components/HorseList.vue';
  import RaceTrack from './components/RaceTrack.vue';
  import Program from './components/Program.vue';
  import Results from './components/Results.vue';

  const store = useStore();

  const raceProgram = computed(() => store.getters['race/raceProgram']);
  const currentRace = computed(() => store.getters['race/currentRace']);
  const raceInProgress = computed(() => store.getters['race/hasRaceStarted']);
  const isProgramGenerated = computed(() => raceProgram.value.length > 0);
  const raceResults = computed(() => store.getters['race/raceResults']); 
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
      />
      <p v-if="!isProgramGenerated" class="main-content__info">Please create a schedule.</p>
      <p v-if="isProgramGenerated && currentRace === 6" class="main-content__info">Race is finished.</p> 
    </main>
    <aside class="right-sidebar" v-if="isProgramGenerated">
      <Program :program="raceProgram" />
      <Results :raceResults="raceResults" />
    </aside>
  </div>
</template>

<style scoped lang="scss">
  .app-container {
    display: grid;
    grid-template-areas:
      "header"
      "sidebar"
      "main-content"
      "right-sidebar";
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr 1fr 1fr;
    height: 100vh;
  }

  .header {
    grid-area: header;
    min-height: 150px;
    height: auto;
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);  
  }

  .sidebar,
  .main-content,
  .right-sidebar {
    padding: 20px;
    background-color: #f7f7f7;
  }

  .sidebar {
    grid-area: sidebar;
  }

  .main-content {
    grid-area: main-content;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &__info {
      display: flex;
      align-items: flex-start;
      height: 100%;
      color: #555;
      text-align: center;
      font-size: 18px;
      margin-top: 50px;
    }
  }

  .right-sidebar {
    grid-area: right-sidebar;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .right-sidebar > * {
    flex: 1; 
  }

  @media (min-width: 768px) {
    .app-container {
      grid-template-areas:
        "header header header header"
        "sidebar main-content right-sidebar right-sidebar";
      grid-template-columns: 1fr 2fr 1fr 1fr;
      grid-template-rows: auto 1fr;
    }

    .right-sidebar {
      flex-direction: row;
    }
  }

  @media (min-width: 1024px) {
    .app-container {
      grid-template-areas:
        "header header header header"
        "sidebar main-content right-sidebar right-sidebar";
      grid-template-columns: 1fr 2fr 1fr 1fr;
      grid-template-rows: auto 1fr;
    }
  }
</style>
