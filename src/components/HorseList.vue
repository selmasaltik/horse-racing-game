<script setup>
  import { useHorseList } from '../assets/composables/useHorseList.js';

  const { horses, horseCount } = useHorseList();
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
  @use '../assets/styles/horse-list.scss'; 
</style>

