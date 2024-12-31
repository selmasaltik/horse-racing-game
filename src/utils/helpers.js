// List of horse names to be randomly assigned
export const horseNames = [
  'Thunder', 'Lightning', 'Blaze', 'Storm', 'Comet', 
  'Shadow', 'Viper', 'Falcon', 'Hurricane', 'Phantom',
  'Cyclone', 'Titan', 'Eclipse', 'Inferno', 'Tempest', 
  'Nova', 'Scorpion', 'Raptor', 'Avalanche', 'Maverick',
];

// Predefined lap distances for the races
export const laps = [
  { distance: 1200 },
  { distance: 1400 },
  { distance: 1600 },
  { distance: 1800 },
  { distance: 2000 },
  { distance: 2200 },
];

const usedColors = new Set(); // Tracks colors already assigned to prevent duplicates

// Returns a random, unique color from a predefined list
export const getRandomColor = () => {
  const colors = [
    'Aqua', 'Black', 'Blue', 'Brown', 
    'Crimson', 'Gold', 'Gray', 'Green', 
    'Indigo', 'Lime', 'Magenta','Navy', 
    'Orange', 'Pink', 'Purple', 'Red', 
    'Tomato', 'Turquoise', 'Violet', 'Yellow',
  ];
  
  let color;
  do {
    color = colors[Math.floor(Math.random() * colors.length)];
  } while (usedColors.has(color)); // Ensure no duplicate colors

  usedColors.add(color);
  return color;
};

// Generates a random condition value within a range
export const getRandomCondition = (min = 1, max = 100) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

// Randomly selects a subset of horses
export const getRandomHorses = (horses, count) => 
  [...horses].sort(() => Math.random() - 0.5).slice(0, count);

// Calculates performance and condition after a race
export const calculatePerformanceAndCondition = (condition, distance, hasRaced) => {
  let newCondition = condition;
  let newPerformance = (newCondition / 100) * (distance / 1000); // Base performance calculation

  const conditionLoss = 0.1; // Condition loss factor
  if (hasRaced) {
    newCondition -= conditionLoss; // Reduce condition if the horse has raced
  }

  newCondition = Math.max(0, newCondition); // Ensure condition does not go below 0
  newPerformance = Math.max(0, newPerformance); // Ensure performance does not go below 0

  return { newPerformance, newCondition };
};

// Calculates performance loss based on race distance
export const calculatePerformanceLoss = (performance, distance) => {
  const baseLoss = 0.05; // Base loss factor
  const distanceFactor = distance / 1000; // Additional loss proportional to distance
  return baseLoss * distanceFactor;
};

// Calculates condition loss if the horse has raced
export const calculateConditionLoss = (condition, hasRaced) => {
  if (hasRaced) {
    return condition * 0.1; // 10% condition loss
  }
  return 0;
};
