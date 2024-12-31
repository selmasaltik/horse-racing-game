<script setup>
  import { useRaceResults } from '../assets/composables/useRaceResults.js';

  const { raceResults, raceInProgress, currentRace } = useRaceResults();
</script>

<template>
  <div class="race-results">
    <h2 class="race-results__title">Results</h2>

    <div v-if="raceResults.length === 0" class="race-results__no-result">
      <p v-if="!raceInProgress">No results available yet. Please start the race for results.</p>
      <p v-if="raceInProgress">Race is in progress. Please wait for the results.</p>
    </div>

    <div v-else class="race-results__table-wrapper">
      <table class="race-results__table">
        <thead>
          <tr>
            <th>Position</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(lap, lapIndex) in raceResults" :key="lapIndex">
            <tr>
              <td colspan="2" class="race-results__lap-title">
                {{ lapIndex + 1 }}ST Lap - {{ lap.distance }}m
              </td>
            </tr>
            <template v-for="(horse, horseIndex) in lap.horses" :key="horseIndex">
              <tr>
                <td>{{ horse.position }}</td> 
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
 @use '../assets/styles/race-results.scss';
</style>
