export const horseNames = [
  'Thunder', 'Lightning', 'Blaze', 'Storm', 'Comet', 
  'Shadow', 'Viper', 'Falcon', 'Hurricane', 'Phantom',
  'Cyclone', 'Titan', 'Eclipse', 'Inferno', 'Tempest', 
  'Nova', 'Scorpion', 'Raptor', 'Avalanche', 'Maverick',
];

export const laps = [
  { distance: 1200 },
  { distance: 1400 },
  { distance: 1600 },
  { distance: 1800 },
  { distance: 2000 },
  { distance: 2200 },
];

const usedColors = new Set();

export const getRandomColor = () => {
  const colors = [
    'Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Pink', 'Brown',
    'Black', 'Aqua', 'Cyan', 'Magenta', 'Gray', 'Indigo', 'Turquoise',
    'Lime', 'Gold', 'Teal', 'Silver', 'Violet',
  ];
  
  let color;
  do {
    color = colors[Math.floor(Math.random() * colors.length)];
  } while (usedColors.has(color));

  usedColors.add(color);
  return color;
};

export const getRandomCondition = (min = 1, max = 100) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomHorses = (horses, count) => 
  [...horses].sort(() => Math.random() - 0.5).slice(0, count);

export const calculatePerformanceAndCondition = (condition, distance, hasRaced) => {
  let newCondition = condition;
  let newPerformance = (newCondition / 100) * (distance / 1000);

  const conditionLoss = 0.1;
  if (hasRaced) {
    newCondition -= conditionLoss;
  }

  newCondition = Math.max(0, newCondition);
  newPerformance = Math.max(0, newPerformance);

  return { newPerformance, newCondition };
};

export const calculatePerformanceLoss = (performance, distance) => {
  const baseLoss = 0.05;
  const distanceFactor = distance / 1000;
  return baseLoss * distanceFactor;
};

export const calculateConditionLoss = (condition, hasRaced) => {
  if (hasRaced) {
    return condition * 0.1;
  }
  return 0;
};
