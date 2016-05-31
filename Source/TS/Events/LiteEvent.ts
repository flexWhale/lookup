module FlexWhale.Lookup {
    export class LiteEvent<T> implements ILiteEvent<T> {
        private _handlers: { (data?: T): void; }[] = [];

        public on(handler: { (data?: T): void }) {
            this._handlers.push(handler);
        }

        public off(handler: { (data?: T): void }) {
            this._handlers = this._handlers.filter(h => h !== handler);
        }

        public trigger(data?: T) {
            this._handlers.slice(0).forEach(h => h(data));
        }
    }
}