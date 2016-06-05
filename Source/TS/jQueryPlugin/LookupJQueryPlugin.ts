($ => {
    $.flexWhaleLookup = function(el, options) {

        var base = this;
        base.$el = $(el);
        base.el = el;
        base.$el.data("flexWhaleLookup", base);

        base.init = () => {

            base.options = $.extend({}, $.flexWhaleLookup.defaultOptions, options);
            base.options.messages = $.extend({}, $.flexWhaleLookup.defaultMessages, options.messages);

            var lookupInstance = new FlexWhale.Lookup
                .LookupControl(el, base.options);
            lookupInstance.init();

            base.instance = lookupInstance;

        };

        Object.defineProperty(base, "dataSource", {
            get() {
                return base.instance.dataSource;
            },
            set(newValue:Array<any>) {
                base.instance.dataSource = newValue;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(base, "selectedItems", {
            get() {
                return base.instance.selectedItems;
            },
            set(newValue: Array<any>) {
                base.instance.selectedItems = newValue;
            },
            enumerable: true,
            configurable: true
        });

        base.init();
    };

    $.flexWhaleLookup.defaultMessages = {
        noDataMessage: "No data to display",
        placeholderMessage: "Select a value",
        prefixMultiSelectionField: " items"
    };


    $.flexWhaleLookup.defaultOptions = {
        grouped: false,
        selectedItems: [],
        widthPopup: void 0,
        heightPopup: void 0,
        startPositionPopup: "left",
        multiSelection: false,
        dataSource: [],
        displayExpr: "",
        groupExpr: "",
        isVisibleSearchPanel: true
    };

    $.fn.flexWhaleLookup = function(options) {
        return this.each(function() {
            (new $.flexWhaleLookup(this, options));
        });
    };

})(jQuery);