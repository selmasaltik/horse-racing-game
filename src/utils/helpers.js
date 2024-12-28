export const horseNames = [
  'Thunder', 'Lightning', 'Blaze', 'Storm', 'Comet', 
  'Shadow', 'Viper', 'Falcon', 'Hurricane', 'Phantom',
  'Cyclone', 'Titan', 'Eclipse', 'Inferno', 'Tempest', 
  'Nova', 'Scorpion', 'Raptor', 'Avalanche', 'Maverick',
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