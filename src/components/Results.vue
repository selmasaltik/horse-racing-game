<script setup>
  import { computed, watchEffect } from 'vue';
  import { useStore } from 'vuex';

  const store = useStore();

  const raceResults = computed(() => store.getters['race/raceResults'] || []);  
  const raceInProgress = computed(() => store.getters['race/raceInProgress']);  
  const currentRace = computed(() => store.getters['race/nextRace']);  

  watchEffect(() => {
    if (!raceInProgress.value && currentRace.value && currentRace.value.id) {
      const currentResult = {
        raceId: currentRace.value.id,
        results: raceResults.value.filter(result => result.raceId === currentRace.value.id).map(result => result.results).flat(),
      };
      store.commit('race/addRaceResult', currentResult);
      console.log(`Race ${currentResult.raceId} completed!`);
    }
  });
</script>

<template>
  <div class="results">
    <h2 class="results__title">Results</h2>

    <div v-if="raceResults.length === 0">
      <p class="results__no-result" v-if="!raceInProgress">No results available yet. Please start the race for results.</p>
      <p class="results__no-result" v-if="raceInProgress">Race is in progress. Please wait for the results.</p>
    </div>

    <div v-else class="results__table-wrapper">
      <table class="results__table">
        <thead>
          <tr>
            <th>Position</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(lap, lapIndex) in raceResults" :key="lapIndex">
            <tr>
              <td colspan="2" class="results__lap-title">
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
.results {
  &__title {
    font-size: 24px;
    margin-bottom: 10px;
    color: #333;
  }

  &__no-result {
    color: #555;
    font-size: 16px;
  }

  &__table-wrapper {
    max-height: 700px; 
    overflow-y: auto; 
    border: 1px solid #ddd; 
    background-color: #f9f9f9;
    border-radius: 8px;
  }

  &__table {
    width: 100%;
    border-collapse: collapse;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 

    th, td {
      padding: 12px 15px;
      border: 1px solid #dfdede;
      text-align: center;
    }

    th {
      color: #333;
      font-weight: bold;
      background-color: #dfdede;
      position: sticky;
      top: -1px;
      z-index: 1;
    }

    td {
      vertical-align: middle;
    }
  }

  &__lap-title {
    font-weight: bold;
    background-color: tomato;
    color: black;
    padding: 10px;
  }
}
</style>
