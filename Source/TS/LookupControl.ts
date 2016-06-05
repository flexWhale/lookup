/// <reference path="popupcontentcontrol.ts" />
module FlexWhale.Lookup {

    export class LookupControl {
        private _$rootLayout: JQuery;
        private _$fieldLayout: JQuery;
        private _$panel: JQuery;

        private _popup: Lookup.PopupControl<Lookup.PopupContentControl>;
        private _popupContent: Lookup.PopupContentControl;
        private _listControl: Lookup.ListControl;

        private _options: LookupControlOptions;

        private _isInit = false;

        private _dataSource: Array<any> = new Array<any>();
        public get dataSource(): Array<any> {
            return this._dataSource;
        }
        public set dataSource(newValue: Array<any>) {
            if (this._isInit === false) throw new Error("The flexWhaleLookup is not initialized");
            this._dataSource = newValue;         
            this._popupContent.dataSource = this._dataSource;
        }

        private _selectedItems: Array<any> = new Array<any>();
        public get selectedItems(): Array<any> {
            return this._selectedItems;
        }
        public set selectedItems(newValue: Array<any>) {
            if (this._isInit === false) throw new Error("The flexWhaleLookup is not initialized");
            this._selectedItems = newValue;
            this._listControl.selectedItems = this._selectedItems;
        }

        constructor(panel: HTMLElement, options: LookupControlOptions) {
            if ("undefined" == typeof jQuery) throw new Error("Lookup requires jQuery");

            this._$panel = $(panel);
            this._options = options;
            var self = this;

            if (this._options.dataSource)
                this._dataSource = this._options.dataSource;

            if (this._options.selectedItems)
                this._selectedItems = this._options.selectedItems;

            const listControl = this._listControl = new Lookup.ListControl(this._selectedItems,
                options.messages,
                options.displayExpr,
                options.grouped,
                options.groupExpr,
                options.multiSelection,
                options.itemTemplate,
                options.headerGroupTemplate);

            listControl.onSelectionChanged.on((selectedItems: Array<any>) => {
                self.onSelectionChanged(selectedItems);

                if (self._popup.isVisible)
                    if (self._options.multiSelection === false)
                        self._popup.close();
            });


            this._popupContent = new Lookup.PopupContentControl(this._dataSource,
                options.displayExpr,
                listControl,
                options.isVisibleSearchPanel
            );

            this._popup = new Lookup.PopupControl<Lookup.PopupContentControl>(this._popupContent);
            this._popup.onClosedPopup.on(this.onClosedPopup.bind(this));
            this._popup.onOpenedPopup.on(this.onOpenedPopup.bind(this));
        }

        private onOpenedPopup(): void {
            if (this._options.onOpenedPopup)
                this._options.onOpenedPopup();
        }

        private onClosedPopup(): void {
            if (this._options.onClosedPopup)
                this._options.onClosedPopup();
        }

        private onSelectionChanged(selectedItems: Array<any>): void {
            this._selectedItems = selectedItems;
            this.drawField(selectedItems);

            if (this._options.onSelectionChanged)
                this._options.onSelectionChanged(new SelectedItemsArgs(selectedItems));
        }

        init(): void {
            if (this._isInit) throw new Error("Lookup has already been initialized");
            this._isInit = true;

            var self = this;

            $(window)
                .resize(() => {
                    if (self._popup.isVisible)
                        self._popup.close();
                });

            this.createLayout();
            this._$rootLayout.on("click",(data) => {
                self.onClickRootLayout(data);
            });

            if (this._options.onInitialized)
                this._options.onInitialized();

            if (this._options.selectedItems !== void 0)
                this.onSelectionChanged(this._options.selectedItems);

            this._$panel.append(this._$rootLayout);
        }

        private drawField(selectedItems: Array<any>): void {
            this._$fieldLayout.empty();
            this._$fieldLayout.removeClass("flexWhale-fieldLayoutLookup_noSelectedItems");
            this._$fieldLayout.removeClass("flexWhale-customContentFieldLayoutLookup");


            if (selectedItems.length > 0) {
                let contentFieldLayout: HTMLElement = void 0;
                if (this._options.fieldTemplate)
                    contentFieldLayout = this._options
                        .fieldTemplate(new Lookup.SelectedItemsArgs(selectedItems));
                if (contentFieldLayout === void 0) {
                    if (this._options.multiSelection === false ||
                    (this._options.multiSelection && selectedItems.length === 1))
                        contentFieldLayout = selectedItems[0][this._options.displayExpr];
                    else
                        contentFieldLayout = ((selectedItems
                            .length +
                            this._options.messages.prefixMultiSelectionField) as any);
                } else
                    this._$fieldLayout.addClass("flexWhale-customContentFieldLayoutLookup");

                this._$fieldLayout.append(contentFieldLayout);
            } else {
                const placeholderMessageLabel = $(`<span>${this._options.messages.placeholderMessage}</span>`);

                this._$fieldLayout.addClass("flexWhale-fieldLayoutLookup_noSelectedItems");
                this._$fieldLayout.append(placeholderMessageLabel);
            }

        }

        private onClickRootLayout(event: JQueryEventObject) {
            //
            //  event.stopImmediatePropagation();
            if (this._popup.isVisible) {
                this._popupContent.setFocus();
                event.stopPropagation();
                return;
            }

            var self = this;

            setTimeout(() => {
                    const rootLayoutOffset = self._$rootLayout.offset();

                    const heightRootLayout = self._$rootLayout.height();
                    const widthRootLayout = self._$rootLayout.outerWidth();

                    const widthPopup = self._options.widthPopup
                        ? self._options.widthPopup
                        : self._$rootLayout.outerWidth() + "px";
                    const heightPopup = self._options.heightPopup ? self._options.heightPopup : "200px";

                    let xPositionPopup = 0;
                    const yPositionPopup = rootLayoutOffset.top + heightRootLayout + 5;

                    if (self._options.startPositionPopup === "left")
                        xPositionPopup = rootLayoutOffset.left;
                    else if (self._options.startPositionPopup === "right")
                        xPositionPopup = rootLayoutOffset.left + widthRootLayout - Number(widthPopup.replace("px", ""));

                    self._popup.show(xPositionPopup, yPositionPopup, widthPopup, heightPopup);
                    self._popupContent.setFocus();
                },
                1);

        }

        private createLayout(): void {

            this._$rootLayout = $("<div/>");;
            this._$rootLayout.addClass("flexWhale-lookup-rootLayout");

            this._$fieldLayout = $("<div/>");
            this._$fieldLayout.addClass("flexWhale-fieldLayoutLookup");
            this._$rootLayout.append(this._$fieldLayout);

            const arrow = $("<div/>");
            arrow.addClass("flexWhale-lookup-arrow");

            const downArrow = $("<div/>");
            downArrow.addClass("flexWhale-imageLibary-downArrow");

            arrow.append(downArrow);
            this._$rootLayout.append(arrow);
        }


    }
}