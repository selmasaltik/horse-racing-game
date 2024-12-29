<script setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';

  const store = useStore();
  
  const horses = computed(() => store.getters['horses/allHorses'] || []);
  const horseCount = computed(() => horses.value.length);
</script>

<template>
  <div class="horse-list">
    <h2 class="horse-list__title">Horse List (1-{{ horseCount }})</h2>
    <div class="horse-list__table-wrapper">
      <table class="horse-list__table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Condition</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="horse in horses" :key="horse.id">
            <td>{{ horse.name }}</td>
            <td>{{ horse.condition }}</td>
            <td :style="{ color: horse.color }">{{ horse.color }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .horse-list {
    &__title {
    font-size: 24px;
    margin-bottom: 20px;
    color: black;
  }

  &__table-wrapper {
    max-height: 700px;
    overflow-y: auto; 
    border: 1px solid #ddd; 
    border-radius: 8px;
  }

  &__table {
    width: 100%;
    border-collapse: collapse;
  }

  &__table th, &__table td {
    padding: 8px;
    text-align: center;
    border: 1px solid #ddd;
  }

  &__table th {
    background-color: #dfdede;
    color: black;
    position: sticky;
    top: -1px; 
    z-index: 1;
  }

  &__table td {
    background-color: #fff;
    color: black;
  }

  &__table td:first-child {
    text-transform: capitalize;
  }

  &__table td:nth-child(3) {
    font-weight: bold;
    color: #fff;
  }
  }
</style>

