import {IllegalArgumentException, IllegalStateException, NullPointerException} from "./exceptions";

export class Preconditions {
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

    //todo(sigur) implement method
    public static checkElementIndex(index: number, limit: number, message?: string): number {
        return index;
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

        this.expression = new RegExp(keys.join('|'), "gi");
        console.log(this.expression);
    }

    //todo(sigur) in Guava library all the "not expression parameters" are appended to the end
    public format(template: string): string {
        return template.replace(this.expression, (pattern: string) => {
            console.log(pattern);
            return this.parameters.get(pattern) || pattern ;
        });

    }
}