<script setup>
  import HorseList from './components/HorseList.vue';
  import RaceField from './components/RaceField.vue';
  import Program from './components/Program.vue';
  import Results from './components/Results.vue';
</script>

<template>
  <div class="app-container">
    <header class="header">
      <h1 class="header__title">Horse Racing</h1>
      <div class="header__buttons">
        <button class="header__button">Generate Program</button>
        <button class="header__button">Start / Pause</button>
      </div>
    </header>
    <aside class="sidebar">
      <HorseList />
    </aside>
    <main class="main-content">
      <RaceField />
    </main>
    <aside class="right-sidebar">
      <Program />
      <Results />
    </aside>
  </div>
</template>

<style scoped lang="scss">
  .app-container {
    display: grid;
    grid-template-areas:
      "header header header"
      "sidebar main-content right-sidebar";
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: auto 1fr;
    height: 100vh;
  }

  .header {
    grid-area: header;
    background-color: #d9534f;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
  }

  .header__title {
    font-size: 24px;
    margin: 0;
  }

  .header__buttons {
    display: flex;
    gap: 10px;
  }

  .header__button {
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
  }

  .sidebar {
    grid-area: sidebar;
    background-color: #f7f7f7;
    padding: 10px;
  }

  .main-content {
    grid-area: main-content;
    background-color: #eee;
    padding: 10px;
  }

  .right-sidebar {
    grid-area: right-sidebar;
    background-color: #f7f7f7;
    padding: 10px;

    display: flex;
    gap: 10px;
  }

  .right-sidebar > * {
    flex: 1;
  }
</style>
