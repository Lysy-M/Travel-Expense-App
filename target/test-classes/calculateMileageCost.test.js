const { calculateMileageCost } = require('./script');

describe('calculateMileageCost function', () => {
    it('should calculate mileage cost within limit', () => {
        const mileage = 150; // Sample mileage
        const mileageRate = 0.2; // Sample mileage rate
        const distanceLimit = 200; // Sample distance limit
        const expectedCost = mileage * mileageRate;

        const calculatedCost = calculateMileageCost(mileage, mileageRate, distanceLimit);

        expect(calculatedCost).toEqual(expectedCost);
    });

    it('should calculate mileage cost exceeding limit', () => {
        const mileage = 300; // Sample mileage
        const mileageRate = 0.2; // Sample mileage rate
        const distanceLimit = 200; // Sample distance limit
        const exceededDistance = mileage - distanceLimit;
        const expectedCost = exceededDistance * mileageRate;

        const calculatedCost = calculateMileageCost(mileage, mileageRate, distanceLimit);

        expect(calculatedCost).toEqual(expectedCost);
    });
});
