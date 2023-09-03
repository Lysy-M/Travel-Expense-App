// all-tests.js
const { JSDOM } = require('jsdom');
const { add } = require('./frontend');
const { multiply } = require('./backend');

describe('Frontend tests', () => {
    let dom;

    beforeAll(() => {
        dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
        global.document = dom.window.document;
    });

    afterAll(() => {
        delete global.document;
    });

    it('should add two numbers', () => {
        const result = add(3, 5);
        expect(result).toBe(8);
    });
});

describe('Backend tests', () => {
    it('should multiply two numbers', () => {
        const result = multiply(4, 7);
        expect(result).toBe(28);
    });
});

//npx jest frontend.test.js
//npx jest backend.test.js
//mvn clean test
// npm test
