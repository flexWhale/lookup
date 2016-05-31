module FlexWhale.Lookup {
    export class Messages {
        noDataMessage = "No data to display";
        placeholderMessage = "Select a value";
        prefixMultiSelectionField = " selected";
    }

    export class SelectedItemsArgs {
        constructor(selectedItems: Array<any>) {
            this.selectedItems = selectedItems;
        }

        selectedItems: Array<any>;
    }

    export class HeaderGroupTemplateArgs {

        constructor(itemsGroup: any[], captionGroup: string) {
            this.itemsGroup = itemsGroup;
            this.captionGroup = captionGroup;
        }

        itemsGroup: Array<any>;
        captionGroup: string;

    }


    export class LookupControlOptions {
        dataSource: Array<any>;
        displayExpr: string;
        selectedItems: Array<any>;
        multiSelection=false;
        messages: Messages=new Messages();
        grouped = false;
        groupExpr: string;

        widthPopup: string;
        heightPopup: string;

        startPositionPopup: string;

        //callbacks
        itemTemplate: (data: any) => HTMLElement;
        fieldTemplate: (e: SelectedItemsArgs) => HTMLElement;
        headerGroupTemplate: (e: HeaderGroupTemplateArgs) => HTMLElement;

        //events
        onSelectionChanged: (e: SelectedItemsArgs) => void;
        onClosedPopup: () => void;
        onOpenedPopup: () => void;
        onInitialized: () => void;

        constructor() {
        }
    }
}