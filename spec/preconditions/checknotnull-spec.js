const Preconditions = require('../../preconditions').Preconditions

describe("Check Not Null", function () {
    it("Valid parameter", function() {
        try {
            const valid = new Object();
            expect(Preconditions.checkNotNull(valid)).toBe(valid);
            expect(Preconditions.checkNotNull(valid, "This message should not appear beacuse ${0}", ["precondition is satisfied"]))
                .toBe(valid);
            expect(Preconditions.checkNotNull(valid, "This message should not appear beacuse ${reason}", {reason: "precondition is satisfied"}))
                .toBe(valid);
        } catch (error) {
            fail(`Unexpected error is raised: ${error}`);
        }
    });

    it("No custom message", function () {
        try {
            Preconditions.checkNotNull(null);
            fail("NullPointerException was exepected for null object with no message");
        } catch (actual) {
            expect(actual.name).toBe('NullPointerException');
            expect(actual.message).toBe('');
        }

        try {
            Preconditions.checkNotNull(undefined);
            fail("NullPointerException was exepected for undefined object with no message");
        } catch (actual) {
            expect(actual.name).toBe('NullPointerException');
            expect(actual.message).toBe('');
        }
    });

    it("Static custom message", function () {
        try {
            Preconditions.checkNotNull(null, 'Argument is undefined or null');
            fail("NullPointerException was exepected for null object with static message");
        } catch (actual) {
            expect(actual.name).toBe('NullPointerException');
            expect(actual.message).toBe('Argument is undefined or null');
        }
        try {
            Preconditions.checkNotNull(undefined, 'Argument is undefined or null');
            fail("NullPointerException was exepected for undefined object with static message");
        } catch (actual) {
            expect(actual.name).toBe('NullPointerException');
            expect(actual.message).toBe('Argument is undefined or null');
        }
    });

    it("Dynamic custom message by keys", function () {
        try {
            Preconditions.checkNotNull(null, 'There\'re no ninjas from ${land}', {land: 'NinjaLand'});
            fail("NullPointerException was exepected for null object with dynamic message");
        } catch (actual) {
            expect(actual.name).toBe('NullPointerException');
            expect(actual.message).toBe('There\'re no ninjas from NinjaLand');
        }
        try {
            Preconditions.checkNotNull(undefined, 'There\'re no ninjas from ${land}', {land: 'NinjaLand'});
            fail("NullPointerException was exepected for null object with static message");
        } catch (actual) {
            expect(actual.name).toBe('NullPointerException');
            expect(actual.message).toBe('There\'re no ninjas from NinjaLand');
        }
    });

    it("Dynamic custom message by keys", function () {
        try {
            Preconditions.checkNotNull(null, 'The ${0} parameter is undefined or is null', ['passed']);
        } catch (actual) {
            expect(actual.name).toBe('NullPointerException');
            expect(actual.message).toBe('The passed parameter is undefined or is null');
        }
        try {
            Preconditions.checkNotNull(undefined, 'The ${0} parameter is undefined or is null', ['passed']);
        } catch (actual) {
            expect(actual.name).toBe('NullPointerException');
            expect(actual.message).toBe('The passed parameter is undefined or is null');
        }
    });

    it("Custom message with missing placeholder", function () {
        try {
            Preconditions.checkNotNull(undefined, 'The ${0} parameter is underfined or is null', ['']);
        } catch (actual) {
            expect(actual.name).toBe('NullPointerException');
            expect(actual.message).toBe('The ${0} parameter is underfined or is null');
        }

        try {
            Preconditions.checkNotNull(null, '${2} ${3}', ['hello', 'world']);
        } catch (actual) {
            expect(actual.name).toBe('NullPointerException');
            expect(actual.message).toBe('${2} ${3}');
        }
    });

    it("Custom message with null and undefined placeholder", function () {
        try {
            Preconditions.checkNotNull(null, 'If you do not use \'===\' then ${0} is like ${1}', [null, undefined]);
        } catch (actual) {
            expect(actual.name).toBe('NullPointerException');
            expect(actual.message).toBe('If you do not use \'===\' then null is like undefined');
        }

        try {
            Preconditions.checkNotNull(undefined, 'If you do not use \'===\' then ${first} is like ${second}', {first: null, second: undefined});
        } catch (actual) {
            expect(actual.name).toBe('NullPointerException');
            expect(actual.message).toBe('If you do not use \'===\' then null is like undefined');
        }
    });
});