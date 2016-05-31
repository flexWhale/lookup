module FlexWhale.Lookup {
 
    export class PopupControl<T extends ILookupContent> {
        private _popupContent: FlexWhale.Lookup.ILookupContent;
        private _isVisible = false;
        private _$popupWindow: JQuery;
        get isVisible() {
            return this._isVisible;
        }

        private _callbackClosePopup;

        private _onOpenedPopup = new LiteEvent<any>();
        get onOpenedPopup(): ILiteEvent<void> { return this._onOpenedPopup; }

        private _onClosedPopup = new LiteEvent<any>();
        get onClosedPopup(): ILiteEvent<void> { return this._onClosedPopup; }

        constructor(popupContent: ILookupContent) {
            this._popupContent = popupContent;
        }

        //private _callbackClosePopup:()=>void;

        show(topOffset: number, leftOffset: number, width: string, height: string): void {
         
            var popup = this._$popupWindow= $("<div/>");
            popup.addClass("flexWhale-lookup-popup");

            popup.append(this._popupContent.getView());

            popup.css("transform", `translate(${topOffset}px,${leftOffset}px)`);
            popup.css("width", width);
            popup.css("height", height);

            popup.on("click",(event: JQueryEventObject) => {
                event.stopPropagation();
            });

            this._callbackClosePopup = this.close.bind(this);

            $("html").one("click", this._callbackClosePopup);

            $("body").append(popup);
            this._isVisible = true;

            this._onOpenedPopup.trigger();
        }

        close(): void {
            
            this._isVisible = false;

            $("html").off("click", this._callbackClosePopup);
            this._$popupWindow.off("click");
            this._callbackClosePopup = null;

            this._$popupWindow.remove();
            
            this._onClosedPopup.trigger();
        }

        
    }
}