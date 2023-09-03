const { calculateDietCost } = require('./script');

describe('calculateDietCost function', () => {
    it('should calculate the diet cost correctly', () => {
        const dietDays = 5; // Sample number of days
        const dietRate = 10; // Sample diet rate
        const expectedCost = dietDays * dietRate;

        const calculatedCost = calculateDietCost(dietDays, dietRate);

        expect(calculatedCost).toEqual(expectedCost);
    });
});





