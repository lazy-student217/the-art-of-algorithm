export function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function nullgetter<T>(): T | null {
    return null;
}