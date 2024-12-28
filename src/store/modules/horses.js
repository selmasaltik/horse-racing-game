import { getRandomColor, getRandomCondition, horseNames } from '@/utils/helpers';

const horses = horseNames.map((name, index) => ({
  id: index + 1,
  name,
  condition: getRandomCondition(1, 100),
  color: getRandomColor(),
}));

export default {
  namespaced: true,
  state: {
    horses,
  },
  getters: {
    allHorses: (state) => state.horses,
  },
};
