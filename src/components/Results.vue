<script setup>
  import { computed, watchEffect } from 'vue';
  import { useStore } from 'vuex';

  const store = useStore();
  const raceResults = computed(() => store.getters['race/raceResults'] || []);
  const raceInProgress = computed(() => store.getters['race/raceInProgress']);
  const currentRace = computed(() => store.getters['race/currentRace']);

  watchEffect(() => {
    if (!raceInProgress.value && raceResults.value.length > 0) {
      console.log('All races are completed!');
    }
  });
</script>

<template>
  <div class="results">
    <h2 class="results__title">Results</h2>

    <div v-if="raceResults.length === 0">
      <p class="results__no-result">No results available yet.</p>
      <p class="results__no-result">Please start the race for results.</p>
    </div>

    <div v-else class="results__table-wrapper">
      <table class="results__table">
        <thead>
          <tr>
            <th>Position</th>
            <th>Horse Name</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(result, index) in raceResults" :key="index">
            <td>{{ result.position }}</td>
            <td>{{ result.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .results {
    &__title {
      font-size: 24px;
      margin-bottom: 20px;
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
      margin-top: 20px;
    }

    &__table {
      width: 100%;
      border-collapse: collapse;
      background-color: #fff;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

      th, td {
        padding: 12px 15px;
        border: 1px solid #ddd;
        text-align: left;
      }

      th {
        background-color: #f2f2f2;
        color: #333;
        font-weight: bold;
        font-size: 18px;
      }

      tr:nth-child(even) td {
        background-color: #f9f9f9;
      }

      tr:hover td {
        background-color: #e1e1e1;
      }
    }
  }
</style>
