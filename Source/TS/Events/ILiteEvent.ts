module FlexWhale.Lookup {
    export interface ILiteEvent<T> {
        on(handler: { (data?: T): void });
        off(handler: { (data?: T): void });
    }
}
