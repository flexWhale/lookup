
module FlexWhale.Lookup {

    export class PopupContentControl implements ILookupContent {

        private _$searchBox: JQuery;
        private _filterController: IFilterController = new ContainsFilterController();
        private _displayExpr: string;
        private _dataSource: Array<any>;
        private _isVisibleSearchPanel: boolean;

        public get dataSource(): Array<any> {
            return this._dataSource;
        }
        public set dataSource(newValue: Array<any>) {
            this._dataSource = newValue;
        }

        private _listControl: IListControl;

        constructor(dataSource: Array<any>,
            displayExpr: string,
            listControl: IListControl,
            isVisibleSearchPanel: boolean
        ) {
            this._dataSource = dataSource;
            this._listControl = listControl;
            this._displayExpr = displayExpr;
            this._isVisibleSearchPanel = isVisibleSearchPanel;
        }

        setFocus(): void {
            if (this._$searchBox)
            this._$searchBox.focus();
        }

        static count:number;

        getView(): JQuery {
            var self = this;

            const $popupContent = $("<div/>");
            $popupContent.addClass("flexWhale-lookupContent");

            const listContainer = this.getListContainer();


            if (this._isVisibleSearchPanel) {
                const $searchPanel = $("<div/>");
                $searchPanel.addClass("flexWhale-lookupContent-searchPanel");
                $popupContent.append($searchPanel);

                const $searchBox = this._$searchBox = $("<input/>");
                $searchBox.attr("spellcheck", "false");
                $searchBox.attr("autocomplete", "off");

                $searchBox.keyup((e) => {
                    listContainer.empty();

                    var items = self._filterController.filter(self._dataSource, self._displayExpr, $searchBox.val());
                    listContainer.append(self._listControl.getView(items));
                });

                $searchBox.addClass("flexWhale-lookupContent-searchTextBox");
                $searchPanel.append($searchBox);
            }

           
            listContainer.append(this._listControl.getView(this._dataSource));
            $popupContent.append(listContainer);

            return $popupContent;
        }

        private getListContainer(): JQuery {
            const listContainer = $("<div/>");
            listContainer.addClass("flexWhale-listContainer");

            if (this._isVisibleSearchPanel)
                listContainer.addClass("flexWhale-listContainer_withSearchPanel");
            else
                listContainer.addClass("flexWhale-listContainer_withoutSearchPanel");
            return listContainer;
        }

        //dispose(): void {
        //    this._$searchBox.off("keyup");
        //    this._$searchBox.remove();
        //}
    }
}