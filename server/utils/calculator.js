// BMR Calculation using Harris-Benedict Equation
function calculateBMR(sex, weight, height, age) {
    if (sex === 'male') {
      return 66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age);
    } else if (sex === 'female') {
      return 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age);
    } else {
      throw new Error('Invalid sex value for BMR calculation');
    }
  }
  
  // Sum total food calories
  function calculateFoodCalories(foods) {
    return foods.reduce((total, item) => total + item.calories, 0);
  }
  
  // Sum total activity calories burned
  function calculateActivityCalories(activities) {
    return activities.reduce((total, item) => total + item.caloriesBurned, 0);
  }
  
  // Calculate net calories
  function calculateNetCalories(bmr, foodCalories, activityCalories) {
    return foodCalories - activityCalories + bmr;
  }
  
  module.exports = {
    calculateBMR,
    calculateFoodCalories,
    calculateActivityCalories,
    calculateNetCalories
  }