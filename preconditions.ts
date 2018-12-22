import {
    IllegalArgumentException,
    IllegalStateException,
    IndexOutOfBoundsException,
    NullPointerException
} from "./exceptions";

export class Preconditions {
    private constructor() {
        // Static class type
    }

    public static checkArgument(expression: boolean, message: string = '', placeholders: Placecholders = ['']): void {
        if (!expression) {
            const template = new Formatter(placeholders);
            throw new IllegalArgumentException(template.format(message));
        }
    }

    public static checkState(expression: boolean, message: string = '', placeholders: Placecholders = ['']): void {
        if (!expression) {
            const template = new Formatter(placeholders);
            throw new IllegalStateException(template.format(message));
        }
    }

    public static checkNotNull<T>(object: T, message: string = '', placeholders: Placecholders = ['']): T {
        if (object === undefined || object == null) {
            const template = new Formatter(placeholders);
            throw new NullPointerException(template.format(message));
        }

        return object;
    }

    public static checkElementIndex(index: number, limit: number, message: string = '', placeholders: Placecholders = ['']): number {
        if (index < 0 || index >= limit) {
            const template = new Formatter(placeholders);
            throw new IndexOutOfBoundsException(template.format(message));
        }
        return index;
    }

    public static checkPositionIndex(index: number, limit: number, message: string = '', placeholders: Placecholders = ['']): number {
        if (index < 0 || index > limit) {
            const template = new Formatter(placeholders);
            throw new IndexOutOfBoundsException(template.format(message));
        }
        return index;
    }

    public static checkPositionIndexes(start: number, end: number, limit: number, message: string = '', placeholders: Placecholders = ['']): void {
        if (start < 0 || end < start || end > limit) {
            const template = new Formatter(placeholders);
            throw new IndexOutOfBoundsException(template.format(message));
        }
    }
}


type Placecholders = [string] | { [property: string]: string; };

class Formatter {
    private parameters: Map<string, string>;
    private expression: RegExp;

    constructor(values: Placecholders) {
        this.parameters = new Map<string, string>();
        let keys = new Array<string>();
        for (let key in values) {
            // @ts-ignore
            this.parameters.set(`\$\{${key}\}`, values[key]); //todo(sigur) resolve TS7017
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