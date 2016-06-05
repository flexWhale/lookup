var FlexWhale;
(function (FlexWhale) {
    var Lookup;
    (function (Lookup) {
        var ContainsFilterController = (function () {
            function ContainsFilterController() {
            }
            ContainsFilterController.prototype.filter = function (items, filterProp, text) {
                if (text.length === 0)
                    return items;
                var result = new Array();
                for (var indexItem = 0; indexItem < items.length; indexItem++) {
                    var currentItem = items[indexItem];
                    if (currentItem[filterProp].toLowerCase().indexOf(text.toLowerCase()) !== -1)
                        result.push(currentItem);
                }
                return result;
            };
            return ContainsFilterController;
        }());
        Lookup.ContainsFilterController = ContainsFilterController;
    })(Lookup = FlexWhale.Lookup || (FlexWhale.Lookup = {}));
})(FlexWhale || (FlexWhale = {}));
var FlexWhale;
(function (FlexWhale) {
    var Lookup;
    (function (Lookup) {
        var ActionType;
        (function (ActionType) {
            ActionType[ActionType["Selected"] = 0] = "Selected";
            ActionType[ActionType["UnSelected"] = 1] = "UnSelected";
        })(ActionType || (ActionType = {}));
        var ListControl = (function () {
            function ListControl(selectedItems, messages, displayExpr, grouped, groupExpr, multiSelection, itemTemplate, headerGroupTemplate) {
                this._grouped = false;
                this._multiSelection = false;
                this._onSelectionChanged = new Lookup.LiteEvent();
                this._selectedItems = selectedItems;
                this._itemTemplate = itemTemplate;
                this._headerGroupTemplate = headerGroupTemplate;
                this._messages = messages;
                this._displayExpr = displayExpr;
                this._grouped = grouped;
                this._groupExpr = groupExpr;
                this._multiSelection = multiSelection;
            }
            Object.defineProperty(ListControl.prototype, "selectedItems", {
                get: function () {
                    return this._selectedItems;
                },
                set: function (newValue) {
                    this._selectedItems = newValue;
                    this._onSelectionChanged.trigger(this._selectedItems);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ListControl.prototype, "onSelectionChanged", {
                get: function () { return this._onSelectionChanged; },
                enumerable: true,
                configurable: true
            });
            ListControl.prototype.getView = function (items) {
                var result = $("<div/>");
                result.addClass("flexWhale-listLayout");
                if (items && items.length > 0) {
                    var $items = void 0;
                    if (this._grouped === false)
                        $items = this.getPlainViewItems(items);
                    else
                        $items = this.getGroupsViewItems(items);
                    result.append($items);
                }
                else {
                    var noDataLabel = $("<span>" + this._messages.noDataMessage + "</span>");
                    noDataLabel.addClass("flexWhale-noDataLabel");
                    result.append(noDataLabel);
                }
                return result;
            };
            ListControl.prototype.onClickedItem = function (data, actionType) {
                if (this._multiSelection)
                    if (actionType === ActionType.Selected)
                        this._selectedItems.push(data);
                    else if (actionType === ActionType.UnSelected)
                        this._selectedItems.splice(this._selectedItems.indexOf(data), 1);
                    else
                        throw new Error("InvalidOperationException");
                else
                    this._selectedItems = [data];
                this._onSelectionChanged.trigger(this._selectedItems);
            };
            ListControl.prototype.getGroupsViewItems = function (items) {
                var result = new Array();
                var mapGroupToView = {};
                for (var indexDataItem = 0; indexDataItem < items.length; indexDataItem++) {
                    var currentDataItem = items[indexDataItem];
                    var keyGroup = currentDataItem[this._groupExpr];
                    var currentView = this
                        .getListItem(currentDataItem, this._selectedItems.indexOf(currentDataItem) !== -1);
                    if (mapGroupToView[keyGroup])
                        mapGroupToView[keyGroup].push(currentView);
                    else
                        mapGroupToView[keyGroup] = new Array(currentView);
                }
                for (var prop in mapGroupToView) {
                    if (!mapGroupToView.hasOwnProperty(prop))
                        continue;
                    ;
                    var panel = $("<div/>");
                    var viewItems = mapGroupToView[prop];
                    var listPanel = $("<div/>");
                    listPanel.append(viewItems);
                    panel.append(this.getViewHeaderGroup(prop, viewItems));
                    panel.append(listPanel);
                    result.push(panel);
                }
                return result;
            };
            ListControl.prototype.getViewHeaderGroup = function (caption, items) {
                var result = $("<div/>");
                var content = void 0;
                if (this._headerGroupTemplate)
                    content = this._headerGroupTemplate(new Lookup.HeaderGroupTemplateArgs(items, caption));
                result.addClass("flexWhale-headerGroup");
                if (content !== void 0)
                    result.append(content);
                else
                    result.append(caption);
                return result;
            };
            ListControl.prototype.getPlainViewItems = function (items) {
                var result = new Array();
                for (var indexDataItem = 0; indexDataItem < items.length; indexDataItem++) {
                    var currentDataItem = items[indexDataItem];
                    var viewRow = this.getListItem(currentDataItem, this._selectedItems.indexOf(currentDataItem) !== -1);
                    result.push(viewRow);
                }
                return result;
            };
            ListControl.prototype.getListItem = function (dataItem, isSelected) {
                var self = this;
                var row = $("<div/>");
                row.addClass("flexWhale-listItem");
                var rowContent = $("<div/>");
                rowContent.addClass("flexWhale-listItemContent");
                if (this._multiSelection) {
                    var columnCheckBox = $("<div/>");
                    columnCheckBox.addClass("flexWhale-checkBoxColumn");
                    var checkBox = $("<div/>");
                    checkBox.addClass("flexWhale-imageLibary-check");
                    if (isSelected === false)
                        checkBox.hide();
                    columnCheckBox.append(checkBox);
                    row.append(columnCheckBox);
                    rowContent.addClass("flexWhale-listItemContent_multiSelection");
                }
                var layoutContent = void 0;
                if (this._itemTemplate !== void 0)
                    layoutContent = this._itemTemplate(dataItem);
                if (!layoutContent)
                    layoutContent = dataItem[this._displayExpr];
                rowContent.append(layoutContent);
                row.append(rowContent);
                row.on("click", dataItem, function (data) {
                    var selectedNow = self._selectedItems.indexOf(data.data) !== -1;
                    if (self._multiSelection)
                        if (selectedNow) {
                            row.removeClass("flexWhale-listItem_selected");
                            checkBox.hide();
                        }
                        else {
                            row.addClass("flexWhale-listItem_selected");
                            checkBox.show();
                        }
                    self.onClickedItem(data.data, selectedNow ? ActionType.UnSelected : ActionType.Selected);
                });
                if (isSelected)
                    row.addClass("flexWhale-listItem_selected");
                return row;
            };
            return ListControl;
        }());
        Lookup.ListControl = ListControl;
    })(Lookup = FlexWhale.Lookup || (FlexWhale.Lookup = {}));
})(FlexWhale || (FlexWhale = {}));
var FlexWhale;
(function (FlexWhale) {
    var Lookup;
    (function (Lookup) {
        var PopupContentControl = (function () {
            function PopupContentControl(dataSource, displayExpr, listControl, isVisibleSearchPanel) {
                this._filterController = new Lookup.ContainsFilterController();
                this._dataSource = dataSource;
                this._listControl = listControl;
                this._displayExpr = displayExpr;
                this._isVisibleSearchPanel = isVisibleSearchPanel;
            }
            Object.defineProperty(PopupContentControl.prototype, "dataSource", {
                get: function () {
                    return this._dataSource;
                },
                set: function (newValue) {
                    this._dataSource = newValue;
                },
                enumerable: true,
                configurable: true
            });
            PopupContentControl.prototype.setFocus = function () {
                if (this._$searchBox)
                    this._$searchBox.focus();
            };
            PopupContentControl.prototype.getView = function () {
                var self = this;
                var $popupContent = $("<div/>");
                $popupContent.addClass("flexWhale-lookupContent");
                var listContainer = this.getListContainer();
                if (this._isVisibleSearchPanel) {
                    var $searchPanel = $("<div/>");
                    $searchPanel.addClass("flexWhale-lookupContent-searchPanel");
                    $popupContent.append($searchPanel);
                    var $searchBox_1 = this._$searchBox = $("<input/>");
                    $searchBox_1.attr("spellcheck", "false");
                    $searchBox_1.attr("autocomplete", "off");
                    $searchBox_1.keyup(function (e) {
                        listContainer.empty();
                        var items = self._filterController.filter(self._dataSource, self._displayExpr, $searchBox_1.val());
                        listContainer.append(self._listControl.getView(items));
                    });
                    $searchBox_1.addClass("flexWhale-lookupContent-searchTextBox");
                    $searchPanel.append($searchBox_1);
                }
                listContainer.append(this._listControl.getView(this._dataSource));
                $popupContent.append(listContainer);
                return $popupContent;
            };
            PopupContentControl.prototype.getListContainer = function () {
                var listContainer = $("<div/>");
                listContainer.addClass("flexWhale-listContainer");
                if (this._isVisibleSearchPanel)
                    listContainer.addClass("flexWhale-listContainer_withSearchPanel");
                else
                    listContainer.addClass("flexWhale-listContainer_withoutSearchPanel");
                return listContainer;
            };
            return PopupContentControl;
        }());
        Lookup.PopupContentControl = PopupContentControl;
    })(Lookup = FlexWhale.Lookup || (FlexWhale.Lookup = {}));
})(FlexWhale || (FlexWhale = {}));
/// <reference path="popupcontentcontrol.ts" />
var FlexWhale;
(function (FlexWhale) {
    var Lookup;
    (function (Lookup) {
        var LookupControl = (function () {
            function LookupControl(panel, options) {
                this._isInit = false;
                this._dataSource = new Array();
                this._selectedItems = new Array();
                if ("undefined" == typeof jQuery)
                    throw new Error("Lookup requires jQuery");
                this._$panel = $(panel);
                this._options = options;
                var self = this;
                if (this._options.dataSource)
                    this._dataSource = this._options.dataSource;
                if (this._options.selectedItems)
                    this._selectedItems = this._options.selectedItems;
                var listControl = this._listControl = new Lookup.ListControl(this._selectedItems, options.messages, options.displayExpr, options.grouped, options.groupExpr, options.multiSelection, options.itemTemplate, options.headerGroupTemplate);
                listControl.onSelectionChanged.on(function (selectedItems) {
                    self.onSelectionChanged(selectedItems);
                    if (self._popup.isVisible)
                        if (self._options.multiSelection === false)
                            self._popup.close();
                });
                this._popupContent = new Lookup.PopupContentControl(this._dataSource, options.displayExpr, listControl, options.isVisibleSearchPanel);
                this._popup = new Lookup.PopupControl(this._popupContent);
                this._popup.onClosedPopup.on(this.onClosedPopup.bind(this));
                this._popup.onOpenedPopup.on(this.onOpenedPopup.bind(this));
            }
            Object.defineProperty(LookupControl.prototype, "dataSource", {
                get: function () {
                    return this._dataSource;
                },
                set: function (newValue) {
                    if (this._isInit === false)
                        throw new Error("The flexWhaleLookup is not initialized");
                    this._dataSource = newValue;
                    this._popupContent.dataSource = this._dataSource;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LookupControl.prototype, "selectedItems", {
                get: function () {
                    return this._selectedItems;
                },
                set: function (newValue) {
                    if (this._isInit === false)
                        throw new Error("The flexWhaleLookup is not initialized");
                    this._selectedItems = newValue;
                    this._listControl.selectedItems = this._selectedItems;
                },
                enumerable: true,
                configurable: true
            });
            LookupControl.prototype.onOpenedPopup = function () {
                if (this._options.onOpenedPopup)
                    this._options.onOpenedPopup();
            };
            LookupControl.prototype.onClosedPopup = function () {
                if (this._options.onClosedPopup)
                    this._options.onClosedPopup();
            };
            LookupControl.prototype.onSelectionChanged = function (selectedItems) {
                this._selectedItems = selectedItems;
                this.drawField(selectedItems);
                if (this._options.onSelectionChanged)
                    this._options.onSelectionChanged(new Lookup.SelectedItemsArgs(selectedItems));
            };
            LookupControl.prototype.init = function () {
                if (this._isInit)
                    throw new Error("Lookup has already been initialized");
                this._isInit = true;
                var self = this;
                $(window)
                    .resize(function () {
                    if (self._popup.isVisible)
                        self._popup.close();
                });
                this.createLayout();
                this._$rootLayout.on("click", function (data) {
                    self.onClickRootLayout(data);
                });
                if (this._options.onInitialized)
                    this._options.onInitialized();
                if (this._options.selectedItems !== void 0)
                    this.onSelectionChanged(this._options.selectedItems);
                this._$panel.append(this._$rootLayout);
            };
            LookupControl.prototype.drawField = function (selectedItems) {
                this._$fieldLayout.empty();
                this._$fieldLayout.removeClass("flexWhale-fieldLayoutLookup_noSelectedItems");
                this._$fieldLayout.removeClass("flexWhale-customContentFieldLayoutLookup");
                if (selectedItems.length > 0) {
                    var contentFieldLayout = void 0;
                    if (this._options.fieldTemplate)
                        contentFieldLayout = this._options
                            .fieldTemplate(new Lookup.SelectedItemsArgs(selectedItems));
                    if (contentFieldLayout === void 0) {
                        if (this._options.multiSelection === false ||
                            (this._options.multiSelection && selectedItems.length === 1))
                            contentFieldLayout = selectedItems[0][this._options.displayExpr];
                        else
                            contentFieldLayout = (selectedItems
                                .length +
                                this._options.messages.prefixMultiSelectionField);
                    }
                    else
                        this._$fieldLayout.addClass("flexWhale-customContentFieldLayoutLookup");
                    this._$fieldLayout.append(contentFieldLayout);
                }
                else {
                    var placeholderMessageLabel = $("<span>" + this._options.messages.placeholderMessage + "</span>");
                    this._$fieldLayout.addClass("flexWhale-fieldLayoutLookup_noSelectedItems");
                    this._$fieldLayout.append(placeholderMessageLabel);
                }
            };
            LookupControl.prototype.onClickRootLayout = function (event) {
                //
                //  event.stopImmediatePropagation();
                if (this._popup.isVisible) {
                    this._popupContent.setFocus();
                    event.stopPropagation();
                    return;
                }
                var self = this;
                setTimeout(function () {
                    var rootLayoutOffset = self._$rootLayout.offset();
                    var heightRootLayout = self._$rootLayout.height();
                    var widthRootLayout = self._$rootLayout.outerWidth();
                    var widthPopup = self._options.widthPopup
                        ? self._options.widthPopup
                        : self._$rootLayout.outerWidth() + "px";
                    var heightPopup = self._options.heightPopup ? self._options.heightPopup : "200px";
                    var xPositionPopup = 0;
                    var yPositionPopup = rootLayoutOffset.top + heightRootLayout + 5;
                    if (self._options.startPositionPopup === "left")
                        xPositionPopup = rootLayoutOffset.left;
                    else if (self._options.startPositionPopup === "right")
                        xPositionPopup = rootLayoutOffset.left + widthRootLayout - Number(widthPopup.replace("px", ""));
                    self._popup.show(xPositionPopup, yPositionPopup, widthPopup, heightPopup);
                    self._popupContent.setFocus();
                }, 1);
            };
            LookupControl.prototype.createLayout = function () {
                this._$rootLayout = $("<div/>");
                ;
                this._$rootLayout.addClass("flexWhale-lookup-rootLayout");
                this._$fieldLayout = $("<div/>");
                this._$fieldLayout.addClass("flexWhale-fieldLayoutLookup");
                this._$rootLayout.append(this._$fieldLayout);
                var arrow = $("<div/>");
                arrow.addClass("flexWhale-lookup-arrow");
                var downArrow = $("<div/>");
                downArrow.addClass("flexWhale-imageLibary-downArrow");
                arrow.append(downArrow);
                this._$rootLayout.append(arrow);
            };
            return LookupControl;
        }());
        Lookup.LookupControl = LookupControl;
    })(Lookup = FlexWhale.Lookup || (FlexWhale.Lookup = {}));
})(FlexWhale || (FlexWhale = {}));
var FlexWhale;
(function (FlexWhale) {
    var Lookup;
    (function (Lookup) {
        var Messages = (function () {
            function Messages() {
                this.noDataMessage = "No data to display";
                this.placeholderMessage = "Select a value";
                this.prefixMultiSelectionField = " selected";
            }
            return Messages;
        }());
        Lookup.Messages = Messages;
        var SelectedItemsArgs = (function () {
            function SelectedItemsArgs(selectedItems) {
                this.selectedItems = selectedItems;
            }
            return SelectedItemsArgs;
        }());
        Lookup.SelectedItemsArgs = SelectedItemsArgs;
        var HeaderGroupTemplateArgs = (function () {
            function HeaderGroupTemplateArgs(itemsGroup, captionGroup) {
                this.itemsGroup = itemsGroup;
                this.captionGroup = captionGroup;
            }
            return HeaderGroupTemplateArgs;
        }());
        Lookup.HeaderGroupTemplateArgs = HeaderGroupTemplateArgs;
        var LookupControlOptions = (function () {
            function LookupControlOptions() {
                this.multiSelection = false;
                this.messages = new Messages();
                this.grouped = false;
                this.isVisibleSearchPanel = true;
            }
            return LookupControlOptions;
        }());
        Lookup.LookupControlOptions = LookupControlOptions;
    })(Lookup = FlexWhale.Lookup || (FlexWhale.Lookup = {}));
})(FlexWhale || (FlexWhale = {}));
var FlexWhale;
(function (FlexWhale) {
    var Lookup;
    (function (Lookup) {
        var PopupControl = (function () {
            function PopupControl(popupContent) {
                this._isVisible = false;
                this._onOpenedPopup = new Lookup.LiteEvent();
                this._onClosedPopup = new Lookup.LiteEvent();
                this._popupContent = popupContent;
            }
            Object.defineProperty(PopupControl.prototype, "isVisible", {
                get: function () {
                    return this._isVisible;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PopupControl.prototype, "onOpenedPopup", {
                get: function () { return this._onOpenedPopup; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PopupControl.prototype, "onClosedPopup", {
                get: function () { return this._onClosedPopup; },
                enumerable: true,
                configurable: true
            });
            //private _callbackClosePopup:()=>void;
            PopupControl.prototype.show = function (topOffset, leftOffset, width, height) {
                var popup = this._$popupWindow = $("<div/>");
                popup.addClass("flexWhale-lookup-popup");
                popup.append(this._popupContent.getView());
                popup.css("transform", "translate(" + topOffset + "px," + leftOffset + "px)");
                popup.css("width", width);
                popup.css("height", height);
                popup.on("click", function (event) {
                    event.stopPropagation();
                });
                this._callbackClosePopup = this.close.bind(this);
                $("html").one("click", this._callbackClosePopup);
                $("body").append(popup);
                this._isVisible = true;
                this._onOpenedPopup.trigger();
            };
            PopupControl.prototype.close = function () {
                this._isVisible = false;
                $("html").off("click", this._callbackClosePopup);
                this._$popupWindow.off("click");
                this._callbackClosePopup = null;
                this._$popupWindow.remove();
                this._onClosedPopup.trigger();
            };
            return PopupControl;
        }());
        Lookup.PopupControl = PopupControl;
    })(Lookup = FlexWhale.Lookup || (FlexWhale.Lookup = {}));
})(FlexWhale || (FlexWhale = {}));
/// <reference path="../definitelytyped/jquery.d.ts" />
"use strict";
if ("undefined" == typeof angular) {
}
else
    // ReSharper disable once InconsistentNaming
    (function (angular) {
        angular.module('flexWhaleLookup', [])
            .directive('flexwhaleLookup', function () {
            return {
                link: function ($scope, element, attrs) {
                    var defaultOptions = {
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
                    var defaultMessages = {
                        noDataMessage: "No data to display",
                        placeholderMessage: "Select a value",
                        prefixMultiSelectionField: " items"
                    };
                    var scopeOptions = $scope.lookupOptions;
                    var optionsLookup = $.extend({}, defaultOptions, scopeOptions);
                    optionsLookup.messages = $.extend({}, defaultMessages, scopeOptions.messages);
                    var lookupInstance = new FlexWhale.Lookup.LookupControl(element, optionsLookup);
                    lookupInstance.init();
                    $scope.$watch("lookupDataSource", function (value) {
                        if (value !== void 0) {
                            lookupInstance.dataSource = value;
                        }
                    });
                    $scope.$watch("lookupSelectedItems", function (value) {
                        if (value !== void 0)
                            lookupInstance.selectedItems = value;
                    }, true);
                },
                scope: {
                    "lookupOptions": "=",
                    "lookupSelectedItems": "=",
                    "lookupDataSource": "="
                }
            };
        });
    })(angular);
var FlexWhale;
(function (FlexWhale) {
    var Lookup;
    (function (Lookup) {
        var LiteEvent = (function () {
            function LiteEvent() {
                this._handlers = [];
            }
            LiteEvent.prototype.on = function (handler) {
                this._handlers.push(handler);
            };
            LiteEvent.prototype.off = function (handler) {
                this._handlers = this._handlers.filter(function (h) { return h !== handler; });
            };
            LiteEvent.prototype.trigger = function (data) {
                this._handlers.slice(0).forEach(function (h) { return h(data); });
            };
            return LiteEvent;
        }());
        Lookup.LiteEvent = LiteEvent;
    })(Lookup = FlexWhale.Lookup || (FlexWhale.Lookup = {}));
})(FlexWhale || (FlexWhale = {}));
(function ($) {
    $.flexWhaleLookup = function (el, options) {
        var base = this;
        base.$el = $(el);
        base.el = el;
        base.$el.data("flexWhaleLookup", base);
        base.init = function () {
            base.options = $.extend({}, $.flexWhaleLookup.defaultOptions, options);
            base.options.messages = $.extend({}, $.flexWhaleLookup.defaultMessages, options.messages);
            var lookupInstance = new FlexWhale.Lookup
                .LookupControl(el, base.options);
            lookupInstance.init();
            base.instance = lookupInstance;
        };
        Object.defineProperty(base, "dataSource", {
            get: function () {
                return base.instance.dataSource;
            },
            set: function (newValue) {
                base.instance.dataSource = newValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(base, "selectedItems", {
            get: function () {
                return base.instance.selectedItems;
            },
            set: function (newValue) {
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
    $.fn.flexWhaleLookup = function (options) {
        return this.each(function () {
            (new $.flexWhaleLookup(this, options));
        });
    };
})(jQuery);
