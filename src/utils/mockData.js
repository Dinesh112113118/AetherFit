import { faker } from '@faker-js/faker';

export const generateMockAirQualityData = () => {
  return {
    aqfaScore: faker.number.float({ min: 3, max: 9, multipleOf: 0.1 }),
    pollutants: {
      ozone: faker.number.int({ min: 20, max: 120 }),
      no2: faker.number.int({ min: 15, max: 80 }),
      pm25: faker.number.int({ min: 10, max: 100 }),
      pm10: faker.number.int({ min: 15, max: 120 }),
    },
    location: {
      lat: 37.7749,
      lng: -122.4194,
      address: 'San Francisco, CA'
    },
    timestamp: new Date(),
    forecast: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      aqfaScore: faker.number.float({ min: 3, max: 9, multipleOf: 0.1 }),
      temperature: faker.number.int({ min: 60, max: 80 })
    }))
  };
};

export const generateMockWorkoutData = () => {
  const activities = ['Running', 'Cycling', 'Walking', 'Hiking', 'Swimming'];
  const locations = [
    'Golden Gate Park',
    'Embarcadero Trail',
    'Mission Bay',
    'Crissy Field',
    'Presidio',
    'Twin Peaks'
  ];

  return Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    activity: faker.helpers.arrayElement(activities),
    date: faker.date.recent({ days: 30 }).toLocaleDateString(),
    time: faker.date.recent().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    duration: `${faker.number.int({ min: 20, max: 120 })} min`,
    location: faker.helpers.arrayElement(locations),
    aqfaScore: faker.number.float({ min: 3, max: 9, multipleOf: 0.1 }),
    performanceScore: faker.number.float({ min: 5, max: 10, multipleOf: 0.1 }),
    distance: faker.number.float({ min: 1, max: 15, multipleOf: 0.1 }),
    calories: faker.number.int({ min: 150, max: 800 })
  }));
};
