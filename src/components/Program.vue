<script setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';

  const store = useStore();
  
  const raceProgram = computed(() => store.state.program.raceProgram);
</script>

<template>
  <div class="program">
    <h2 class="program__title">Program</h2>
    <div class="program__table-wrapper">
      <table class="program__table">
        <thead>
          <tr>
            <th>Position</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(lap, index) in raceProgram" :key="index">
            <tr>
              <td colspan="3" class="program__lap-title">
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
  .program {
    padding: 20px;
    font-family: Arial, sans-serif;
  }

  .program__title {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
  }

  .program__table-wrapper {
    max-height: 700px; 
    overflow-y: auto; 
    border: 1px solid #ddd; 
    background-color: #f9f9f9;
    border-radius: 8px;
  }

  .program__table {
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
  }

  .program__table th,
  .program__table td {
    padding: 12px 15px;
    border: 1px solid #ddd;
    text-align: left;
  }

  .program__table th {
    background-color: #f2f2f2;
    color: #333;
    font-weight: bold;
  }

  .program__lap-title {
    font-weight: bold;
    text-align: center;
    background-color: #007bff;
    color: black;
    padding: 10px;
  }

  .program__table td {
    background-color: #f9f9f9; 
  }

  .program__table tr:nth-child(even) td {
    background-color: #f1f1f1; 
  }

  .program__table tr:hover td {
    background-color: #d3d3d3;
  }

  .program__table td {
    vertical-align: middle;
  }
</style>
