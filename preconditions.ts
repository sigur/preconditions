import {
    Exception
} from "./exceptions";

export class Preconditions {
    private constructor() {
        // Static class type
    }

    public static checkArgument(expression: boolean, message: string = '', placeholders: Placecholders = ['']): void {
        if (!expression) {
            throw this.createException(Exception.IllegalArgumentException, message, placeholders);
        }
    }

    public static checkState(expression: boolean, message: string = '', placeholders: Placecholders = ['']): void {
        if (!expression) {
            throw this.createException(Exception.IllegalStateException, message, placeholders);
        }
    }

    public static checkNotNull<T>(object: T, message: string = '', placeholders: Placecholders = ['']): T {
        if (object === undefined || object === null) {
            throw this.createException(Exception.NullPointerException, message, placeholders);
        }

        return object;
    }

    public static checkElementIndex(index: number, limit: number, message: string = '', placeholders: Placecholders = ['']): number {
        if (index < 0 || index >= limit) {
            throw this.createException(Exception.IndexOutOfBoundsException, message, placeholders);
        }
        return index;
    }

    public static checkPositionIndex(index: number, limit: number, message: string = '', placeholders: Placecholders = ['']): number {
        if (index < 0 || index > limit) {
            throw this.createException(Exception.IndexOutOfBoundsException, message, placeholders);
        }
        return index;
    }

    public static checkPositionIndexes(start: number, end: number, limit: number, message: string = '', placeholders: Placecholders = ['']): void {
        if (start < 0 || end < start || end > limit) {
            throw this.createException(Exception.IndexOutOfBoundsException, message, placeholders);
        }
    }

    private static createException(error: (message: string) => Exception, message: string, placeholders: Placecholders) : Exception {
        const template = new Formatter(placeholders);
        return error(template.format(message));
    }
}


type Placecholders = [any] | { [property: string]: any; };
class Formatter {
    private parameters: Map<string, string>;
    private expression: RegExp;

    constructor(values: Placecholders) {
        this.parameters = new Map<string, string>();
        let keys = new Array<string>();
        for (let key in values) {
            // @ts-ignore
            this.parameters.set(`\$\{${key}\}`, values[key].toString()); //todo(sigur) resolve TS7017
            keys.push(`\\$\\{${key}\\}`);
        }

        this.expression = new RegExp(keys.join('|'), "g");
    }

    //todo(sigur) in Guava library all the "not expression parameters" are appended to the end
    public format(template: string): string {
        return template.replace(this.expression, (pattern: string) => {
            return this.parameters.get(pattern) || pattern;
        });

    }
}