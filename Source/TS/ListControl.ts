module FlexWhale.Lookup {

    enum ActionType {
        Selected,
        UnSelected
    }

    export class ListControl implements IListControl {
        private _itemTemplate: (data: any) => HTMLElement;
        private _headerGroupTemplate: (e: Lookup.HeaderGroupTemplateArgs) => HTMLElement;


        private _messages: Lookup.Messages;
        private _displayExpr: string;
        private _selectedItems: Array<any>;

        public get selectedItems(): Array<any> {
            return this._selectedItems;
        }

        public set selectedItems(newValue: Array<any>) {
            this._selectedItems = newValue;
            this._onSelectionChanged.trigger(this._selectedItems);
        }

        private _grouped = false;
        private _groupExpr: string;

        private _multiSelection=false;

        private _onSelectionChanged = new LiteEvent<Array<any>>();

        get onSelectionChanged(): ILiteEvent<Array<any>> { return this._onSelectionChanged; }

        constructor(
            selectedItems: Array<any>,
            messages: Messages,
            displayExpr: string,
            grouped: boolean,
            groupExpr: string,
            multiSelection: boolean,
            itemTemplate: (data) => HTMLElement,
            headerGroupTemplate: (e: HeaderGroupTemplateArgs) => HTMLElement) {

            this._selectedItems = selectedItems;

            this._itemTemplate = itemTemplate;
            this._headerGroupTemplate = headerGroupTemplate;

            this._messages = messages;
            this._displayExpr = displayExpr;

            this._grouped = grouped;
            this._groupExpr = groupExpr;

            this._multiSelection = multiSelection;
        }

        getView(items: Array<any>): JQuery {

            const result = $("<div/>");
            result.addClass("flexWhale-listLayout");

            if (items && items.length > 0) {
                let $items: Array<JQuery>;

                if (this._grouped === false)
                    $items = this.getPlainViewItems(items);
                else
                    $items = this.getGroupsViewItems(items);

                result.append($items);

            } else {
                const noDataLabel = $(`<span>${this._messages.noDataMessage}</span>`);
                noDataLabel.addClass("flexWhale-noDataLabel");
                result.append(noDataLabel);
            }

            return result;
        }

        private onClickedItem(data: any, actionType: ActionType): void {

            if (this._multiSelection)
                if (actionType === ActionType.Selected)
                    this._selectedItems.push(data);
                else if (actionType === ActionType.UnSelected)
                    this._selectedItems.splice(this._selectedItems.indexOf(data), 1);
                else throw new Error("InvalidOperationException");
            else
                this._selectedItems = [data];


            this._onSelectionChanged.trigger(this._selectedItems);
        }


        private getGroupsViewItems(items: Array<any>): Array<JQuery> {

            const result = new Array<JQuery>();
            const mapGroupToView: { [id: string]: Array<JQuery>; } = {};

            for (let indexDataItem = 0; indexDataItem < items.length; indexDataItem++) {
                const currentDataItem = items[indexDataItem];
                const keyGroup = currentDataItem[this._groupExpr];
                const currentView = this
                    .getListItem(currentDataItem, this._selectedItems.indexOf(currentDataItem) !== -1);

                if (mapGroupToView[keyGroup])
                    mapGroupToView[keyGroup].push(currentView);
                else
                    mapGroupToView[keyGroup] = new Array<JQuery>(currentView);
            }

            for (let prop in mapGroupToView) {
                if (!mapGroupToView.hasOwnProperty(prop)) continue;;

                const panel = $("<div/>");
                const viewItems = mapGroupToView[prop];
                const listPanel = $("<div/>");

                listPanel.append(viewItems);

                panel.append(this.getViewHeaderGroup(prop, viewItems));
                panel.append(listPanel);

                result.push(panel);
            }


            return result;
        }

        private getViewHeaderGroup(caption: string, items: Array<any>): JQuery {
            const result = $("<div/>");

            let content: HTMLElement = void 0;
            if (this._headerGroupTemplate)
                content = this._headerGroupTemplate(new HeaderGroupTemplateArgs(items, caption));

            result.addClass("flexWhale-headerGroup");

            if (content !== void 0)
                result.append(content);
            else result.append(caption);


            return result;
        }

        private getPlainViewItems(items: Array<any>): Array<JQuery> {
            const result = new Array<JQuery>();

            for (let indexDataItem = 0; indexDataItem < items.length; indexDataItem++) {
                const currentDataItem = items[indexDataItem];
                const viewRow = this.getListItem(currentDataItem, this._selectedItems.indexOf(currentDataItem) !== -1);

                result.push(viewRow);
            }

            return result;
        }


        private getListItem(dataItem: any, isSelected: boolean): JQuery {
            var self = this;

            const row = $("<div/>");
            row.addClass("flexWhale-listItem");

            const rowContent = $("<div/>");
            rowContent.addClass("flexWhale-listItemContent");

            if (this._multiSelection) {
                const columnCheckBox = $("<div/>");
                columnCheckBox.addClass("flexWhale-checkBoxColumn");

                var checkBox = $("<div/>");
                checkBox.addClass("flexWhale-imageLibary-check");

                if (isSelected === false)
                    checkBox.hide();

                columnCheckBox.append(checkBox);
                row.append(columnCheckBox);

                rowContent.addClass("flexWhale-listItemContent_multiSelection");
            }


            let layoutContent: HTMLElement = void 0;

            if (this._itemTemplate !== void 0)
                layoutContent = this._itemTemplate(dataItem);

            if (!layoutContent)
                layoutContent = dataItem[this._displayExpr];

            rowContent.append(layoutContent);
            row.append(rowContent);


            row.on("click",
                dataItem,
                (data) => {

                    var selectedNow = self._selectedItems.indexOf(data.data) !== -1;

                    if (self._multiSelection)
                        if (selectedNow) {
                            row.removeClass("flexWhale-listItem_selected");
                            checkBox.hide();
                        } else {
                            row.addClass("flexWhale-listItem_selected");
                            checkBox.show();
                        }


                    self.onClickedItem(data.data, selectedNow ? ActionType.UnSelected : ActionType.Selected);
                });

            if (isSelected)
                row.addClass("flexWhale-listItem_selected");

            return row;
        }

        //dispose(): void {
        //    for (var indexListItem = 0; indexListItem < this._listItems.length; indexListItem++) {
        //        this._listItems[indexListItem].remove();
        //    }
        //    this._listItems.splice(0, this._listItems.length);
        //}
    }
}