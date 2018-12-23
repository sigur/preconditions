export class Exception {
    private constructor(public readonly name: string, public readonly message: string){
    }

    public static IllegalArgumentException(description: string) : Exception {
        return new Exception('IllegalArgumentException', description);
    }

    public static IllegalStateException(description: string) : Exception {
        return new Exception('IllegalStateException', description);
    }

    public static NullPointerException(description: string) : Exception {
        return new Exception('NullPointerException', description);
    }

    public static IndexOutOfBoundsException(description: string) : Exception {
        return new Exception('IndexOutOfBoundsException', description);
    }

}