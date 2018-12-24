const Preconditions = require('../../preconditions').Preconditions

describe("Check Argument", function () {
    let zero = 0, one = 1;
    it("No custom message", function () {
        try {
            Preconditions.checkArgument(zero > one);
        } catch (actual) {
            expect(actual.name).toBe('IllegalArgumentException');
            expect(actual.message).toBe('');
        }
    });

    it("Static custom message", function () {
        try {
            Preconditions.checkArgument(zero > one, 'Number is less than expected');
        } catch (actual) {
            expect(actual.name).toBe('IllegalArgumentException');
            expect(actual.message).toBe('Number is less than expected');
        }
    });

    it("Dynamic custom message by keys", function () {
        try {
            Preconditions.checkArgument(zero > one, 'Number (${actual}) is less than expected (${expected})', {actual: zero, expected: one});
        } catch (actual) {
            expect(actual.name).toBe('IllegalArgumentException');
            expect(actual.message).toBe('Number (0) is less than expected (1)');
        }
    });

    it("Dynamic custom message by keys", function () {
        try {
            Preconditions.checkArgument(zero > one, 'Number (${0}) is less than expected (${1})', [zero, one]);
        } catch (actual) {
            expect(actual.name).toBe('IllegalArgumentException');
            expect(actual.message).toBe('Number (0) is less than expected (1)');
        }
    });

    it("Custom message with missing placeholder", function () {
        try {
            Preconditions.checkArgument(zero > one, 'Number (${0}) is less than expected (${1})', []);
        } catch (actual) {
            expect(actual.name).toBe('IllegalArgumentException');
            expect(actual.message).toBe('Number (${0}) is less than expected (${1})');
        }

        try {
            Preconditions.checkArgument(zero > one, 'There\'s no ${2} and for sure no ${3}', ['hello', 'world']);
        } catch (actual) {
            expect(actual.name).toBe('IllegalArgumentException');
            expect(actual.message).toBe('There\'s no ${2} and for sure no ${3}');
        }
    });

    it("Custom message with null and undefined placeholder", function () {
        try {
            Preconditions.checkArgument(zero > one, 'If you do not use \'===\' then ${0} is like ${1}', [null, undefined]);
        } catch (actual) {
            expect(actual.name).toBe('IllegalArgumentException');
            expect(actual.message).toBe('If you do not use \'===\' then null is like undefined');
        }

        try {
            Preconditions.checkArgument(zero > one, 'If you do not use \'===\' then ${first} is like ${second}', {first: null, second: undefined});
        } catch (actual) {
            expect(actual.name).toBe('IllegalArgumentException');
            expect(actual.message).toBe('If you do not use \'===\' then null is like undefined');
        }
    });
});