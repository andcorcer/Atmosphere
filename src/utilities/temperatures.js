// Utility function to convert temperature between Celsius and Fahrenheit
export const convertTemperature = (temperature, units) => {
  if (temperature === null || temperature === undefined) return "--"; // Return as is if temperature is not defined

  if (units === 'fahrenheit') {
    return ((temperature * 9) / 5 + 32).toFixed(1);
  }
  return temperature.toFixed(1); // Default to Celsius if units are 'celsius' or unknown
};