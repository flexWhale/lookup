"use strict";
var app = angular.module("angularDemoApplication", ["flexWhaleLookup"]);

app.controller("demoCtrl",
    function ($scope) {

        function getPhoneItemTemplate(image, caption, colorPrice, usd) {
            var template =
                "<div>" +
                 "<div style='float:right; color:" +
                    colorPrice +
                    ";font-weight: bold;line-height: 32px; vertical-align: top;'>" +
                    usd +
                    "</div>" +
                    "<div style='width:24px;display: inline-block;'><img style='height: 32px; margin-right: 5px;' src='" +
                    image +
                    "' /></div>" +
                    "<div style='display: inline-block;font-size: 15px;line-height: 32px; vertical-align: top; overflow:hidden;'>" +
                    caption +
                    "</div>" +

                    "</div>";

            return template;
        }

        function getPhoneFieldTempate(selectedItems) {
            var result = "<div style='overflow: hidden;'>";

            for (var indexPhone = 0; indexPhone < selectedItems.length; indexPhone++) {
                var phone = selectedItems[indexPhone];
                result += "<div title='" +
                    phone.company +
                    " " +
                    phone.caption +
                    "' style='display: inline-block; margin-left:3px;'><img style='height: 25px; vertical-align: middle; ' src='" +
                    phone.image +
                    "' /></div>";
            }

            result += "</div>";
            return result;
        }

        $scope.optionsPhones1 = {
            displayExpr: "caption",
            grouped: true,
            groupExpr: "company",
            multiSelection: false,
            startPositionPopup: "left",
            widthPopup: "315px",
            heightPopup: "300px",
            itemTemplate: function (data) {
                return getPhoneItemTemplate(data.image, data.caption, "black", data.usd);
            },
            onClosedPopup: function (data) {
            },
            onSelectionChanged: function (data) {
                addMessageToSelectionLog("phonePanel1SelectionItems", getMessageSelectedItemChanged(data, "caption"));
            },
            onInitialized: function () {
            },
            onOpenedPopup: function () {
            },
            headerGroupTemplate: function (data) {
                var template;
                if (data.captionGroup === "HTC") {
                    template = "<div class='imgPanel imgHtc'></div>";
                    return template;
                }
                if (data.captionGroup === "Apple") {
                    template = "<div><div class='imgPanel imgApple' style='margin-left:5px;'></div></div>";
                    return template;
                }

                return void 0;
            }
        };

        $scope.dataSource = window.phones;
        $scope.selectedPhones = [window.phones[1]];

        $scope.optionsPhones2 = {
            displayExpr: "caption",
            dataSource: window.phones,
            selectedItems: [window.phones[2]],
            grouped: true,
            groupExpr: "company",
            multiSelection: false,

            onClosedPopup: function (data) {
            },
            onSelectionChanged: function (data) {
                addMessageToSelectionLog("phonePanel2SelectionItems", getMessageSelectedItemChanged(data, "caption"));
            },
            onInitialized: function () {
            },
            onOpenedPopup: function () {
            }
        };

        $scope.optionsPhones3 = {
            dataSource: window.phones,
            displayExpr: "caption",
            messages: {
                noDataMessage: "No phones to display",
                placeholderMessage: "Please, select a phone...",
                prefixMultiSelectionField: " phones"
            },
            selectedItems: [window.phones[0], window.phones[2], window.phones[3]],
            grouped: true,
            groupExpr: "company",
            startPositionPopup: "right",
            widthPopup: "315px",
            heightPopup: "300px",
            multiSelection: true,
            headerGroupTemplate: function (e) {
                return e.captionGroup + " (" + e.itemsGroup.length + " phones)";
            },
            itemTemplate: function (data) {
                var max = 0;
                var min = 5;

                var value = Math.floor(Math.random() * (max - min + 1)) + min;
                var arrayColors = ['#E91E63', '#4CAF50', '#9C27B0', '#2196F3', '#009688', '#03A9F4'];
                var colorPrice = arrayColors[value];

                return getPhoneItemTemplate(data.image, data.caption, colorPrice, data.usd);
            },
            onClosedPopup: function (data) {

            },
            onSelectionChanged: function (data) {
                addMessageToSelectionLog("phonePanel3SelectionItems", getMessageSelectedItemChanged(data, "caption"));
            },
            onInitialized: function () {

            },
            onOpenedPopup: function () {

            }

        };

        $scope.optionsPhones4 = {
            dataSource: window.phones,
            selectedItems: [
                window.phones[0], window.phones[3], window.phones[5], window.phones[23], window.phones[25],
                window.phones[11], window.phones[13], window.phones[14], window.phones[17], window.phones[22]
            ],
            displayExpr: "caption",
            multiSelection: true,
            startPositionPopup: "right",
           
            heightPopup: "200px",
            fieldTemplate: function (e) {
                return getPhoneFieldTempate(e.selectedItems);
            },
            onSelectionChanged: function (data) {
                addMessageToSelectionLog("phonePanel4SelectionItems", getMessageSelectedItemChanged(data, "caption"));
            }
        };
    });