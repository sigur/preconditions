const Preconditions = require('../../preconditions').Preconditions

describe("Check Not Null", function () {
    it("Valid parameter", function () {
        const isPair = 4 % 2 == 0;
        try {
            Preconditions.checkState(isPair);
            Preconditions.checkState(isPair, "This message should not appear beacuse ${0}", ["precondition is satisfied"])
            Preconditions.checkState(isPair, "This message should not appear beacuse ${reason}", {reason: "precondition is satisfied"});
        } catch (error) {
            fail(`Unexpected error is raised: ${error}`);
        }
    });

    const isNotValid = 0 > 1;
    it("No custom message", function () {
        try {
            Preconditions.checkState(isNotValid);
            fail("IllegalStateException was exepected with no message");
        } catch (actual) {
            expect(actual.name).toBe('IllegalStateException');
            expect(actual.message).toBe('');
        }
    });

    it("Static custom message", function () {
        try {
            Preconditions.checkState(isNotValid, 'The parameter is not valid');
            fail("IllegalStateException was exepected for null object with static message");
        } catch (actual) {
            expect(actual.name).toBe('IllegalStateException');
            expect(actual.message).toBe('The parameter is not valid');
        }
    });

    it("Dynamic custom message by keys", function () {
        try {
            Preconditions.checkState(isNotValid, 'The result is ${result}, so this is not valid', {result: isNotValid});
            fail("IllegalStateException was exepected with dynamic message");
        } catch (actual) {
            expect(actual.name).toBe('IllegalStateException');
            expect(actual.message).toBe('The result is false, so this is not valid');
        }
    });

    it("Dynamic custom message by keys", function () {
        try {
            Preconditions.checkState(isNotValid, 'The state is ${0} at moment', ['not ready']);
        } catch (actual) {
            expect(actual.name).toBe('IllegalStateException');
            expect(actual.message).toBe('The state is not ready at moment');
        }
    });

    it("Custom message with missing placeholder", function () {
        try {
            Preconditions.checkState(isNotValid, 'The ${0} does not have value', ['']);
        } catch (actual) {
            expect(actual.name).toBe('IllegalStateException');
            expect(actual.message).toBe('The ${0} does not have value');
        }

        try {
            Preconditions.checkState(isNotValid, '${2} ${3}', ['hello', 'world']);
        } catch (actual) {
            expect(actual.name).toBe('IllegalStateException');
            expect(actual.message).toBe('${2} ${3}');
        }
    });

    it("Custom message with null and undefined placeholder", function () {
        try {
            Preconditions.checkState(isNotValid, 'If you do not use \'===\' then ${0} is like ${1}', [null, undefined]);
        } catch (actual) {
            expect(actual.name).toBe('IllegalStateException');
            expect(actual.message).toBe('If you do not use \'===\' then null is like undefined');
        }

        try {
            Preconditions.checkState(undefined, 'If you do not use \'===\' then ${first} is like ${second}', {
                first: null,
                second: undefined
            });
        } catch (actual) {
            expect(actual.name).toBe('IllegalStateException');
            expect(actual.message).toBe('If you do not use \'===\' then null is like undefined');
        }
    });
});