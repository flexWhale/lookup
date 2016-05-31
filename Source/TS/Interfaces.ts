module FlexWhale.Lookup {
    export interface ILookupContent {
        getView(): JQuery;
    }

    export interface IFilterController {
        filter(items: Array<any>, filterProp: string, text: string): Array<any>;
    }

    export interface IListControl {
        getView(items: Array<any>): JQuery;
    }
}