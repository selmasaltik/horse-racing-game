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
  &__title {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
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
