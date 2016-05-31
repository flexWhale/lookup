/// <reference path="../definitelytyped/jquery.d.ts" />
"use strict";
declare var angular: any;
if ("undefined" == typeof angular) {
}
else
// ReSharper disable once InconsistentNaming
((angular) => {

    angular.module('flexWhaleLookup', [])
        .directive('flexwhaleLookup',
        () => {
            return {
                link: ($scope, element, attrs) => {
                
                    var defaultOptions = {
                        grouped: false,
                        selectedItems: [],
                        widthPopup: void 0,
                        heightPopup: void 0,
                        startPositionPopup: "left",
                        multiSelection: false,
                        dataSource: [],
                        displayExpr: "",
                        groupExpr: ""
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

                    $scope.$watch("lookupDataSource",
                        value => {
                            if (value !== void 0) {
                                lookupInstance.dataSource = value;
                            }
                        });

                    $scope.$watch("lookupSelectedItems",
                        value => {
                            if (value !== void 0) 
                                lookupInstance.selectedItems = value;
                           
                        },true);
                },
                scope: {
                    "lookupOptions": "=",
                    "lookupSelectedItems": "=",
                    "lookupDataSource":"="
                }

            }
        });

})(angular);