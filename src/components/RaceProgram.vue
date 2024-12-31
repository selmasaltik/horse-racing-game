<script setup>
  import { useRaceProgram } from '../assets/composables/useRaceProgram.js';

const { raceProgram } = useRaceProgram();
</script>

<template>
  <div class="race-program">
    <h2 class="race-program__title">Program</h2>
    <div class="race-program__table-wrapper">
      <table class="race-program__table">
        <thead>
          <tr>
            <th>Position</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(lap, index) in raceProgram" :key="index">
            <tr>
              <td colspan="2" class="race-program__lap-title">
                {{ index + 1 }}ST Lap - {{ lap.distance }}m
              </td>
            </tr>
            <template v-for="(horse, idx) in lap.positions" :key="idx">
              <tr>
                <td>{{ idx + 1 }}</td>
                <td>{{ horse.name }}</td>
              </tr>
            </template>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @use '../assets/styles/race-program.scss';
</style>
