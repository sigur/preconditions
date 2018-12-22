//todo(sigur) refactor for factory methods
class Exception {
    constructor(public name: string, public message: string = ''){}
}
export class IllegalArgumentException extends Exception {
    constructor(message: string = '') {
        super('IllegalArgumentException', message);
    }
};

export class IllegalStateException extends Exception {
    constructor(message: string = '') {
        super('IllegalStateException', message);
    }
}

export class NullPointerException extends Exception {
    constructor(message: string = '') {
        super('NullPointerException', message);

    }
}

export class IndexOutOfBoundsException extends Exception {
    constructor(message: string = '') {
        super('IndexOutOfBoundsException', message);

    }
}