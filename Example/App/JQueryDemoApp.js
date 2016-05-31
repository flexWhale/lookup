"use strict";

function getCameraItemTemplate(icon, name, colorPrice, price) {
    var template =
        "<div>" +
        "<div style='float:right; color:" +
            colorPrice +
            ";font-weight: bold;line-height: 30px; vertical-align: top;'>" +
            price +
            "</div>" +
            "<div style='width:38px;display: inline-block;'><img style='height: 26px; margin-right: 10px;' src='" +
            icon +
            "' /></div>" +
            "<div style='display: inline-block;font-size: 15px;line-height: 30px; vertical-align: top; overflow:hidden;'>" +
            name +
            "</div>" +

            "</div>";

    return template;
}

function getCameraFieldTemplate(icon, name) {
    var template = "<div style='overflow:hidden;'>" +
        "<img style='height: 25px; vertical-align: middle;' src='" +
        icon +
        "' />" +
        "<div style='display: inline-block;font-size: 14px;line-height: 30px;margin-left: 5px;vertical-align: middle;'>" +
        name +
        "</div>" +
        "</div>";

    return template;
}

$(document)
    .ready(function () {

        $("#cameraPanel1")
            .flexWhaleLookup({
                displayExpr: "name",
                grouped: true,
                groupExpr: "producer",
                startPositionPopup: "left",
                multiSelection: false,
                heightPopup: "300px",
                widthPopup: "345px",
                headerGroupTemplate: function (e) {
                    return e.captionGroup + " (" + e.itemsGroup.length + " models)";
                },
                itemTemplate: function (data) {
                    var max = 0;
                    var min = 5;

                    var value = Math.floor(Math.random() * (max - min + 1)) + min;
                    var arrayColors = ['#E91E63', '#4CAF50', '#9C27B0', '#2196F3', '#009688', '#03A9F4'];
                    var colorPrice = arrayColors[value];

                    return getCameraItemTemplate(data.icon, data.name, colorPrice, data.price);
                },
                fieldTemplate: function (e) {
                    return getCameraFieldTemplate(e.selectedItems[0].icon, e.selectedItems[0].name);
                },
                onClosedPopup: function (data) {

                },
                onSelectionChanged: function (data) {
                    addMessageToSelectionLog("cameraPanel1SelectionItems", getMessageSelectedItemChanged(data, "name"));
                },
                onInitialized: function () {

                },
                onOpenedPopup: function () {

                }
            });

        $("#cameraPanel1").data("flexWhaleLookup").dataSource = window.cameras;
        $("#cameraPanel1").data("flexWhaleLookup").selectedItems = [window.cameras[2]];

        $("#cameraPanel2")
            .flexWhaleLookup({
                dataSource: window.cameras,
                displayExpr: "name",
                selectedItems: [window.cameras[8]],
                grouped: true,
                groupExpr: "producer",
                headerGroupTemplate: function (e) {
                    return e.captionGroup + " (" + e.itemsGroup.length + " models)";
                },
                fieldTemplate: function (e) {
                    return getCameraFieldTemplate(e.selectedItems[0].icon, e.selectedItems[0].name);
                },
                onClosedPopup: function (data) {

                },
                onSelectionChanged: function (data) {
                    addMessageToSelectionLog("cameraPanel2SelectionItems", getMessageSelectedItemChanged(data, "name"));
                },
                onInitialized: function () {

                },
                onOpenedPopup: function () {

                }
            });

        $("#cameraPanel3")
            .flexWhaleLookup({
                dataSource: window.cameras,
                displayExpr: "name",
                messages: {
                    noDataMessage: "No cameras to display",
                    placeholderMessage: "Please, select a camera",
                    prefixMultiSelectionField: " cameras"
                },
                selectedItems: [window.cameras[0], window.cameras[2], window.cameras[3]],
                grouped: true,
                groupExpr: "producer",
                startPositionPopup: "right",
                widthPopup: "345px",
                heightPopup: "300px",
                multiSelection: true,
                headerGroupTemplate: function (e) {
                    return e.captionGroup + " (" + e.itemsGroup.length + " models)";
                },
                itemTemplate: function (data) {
                    var max = 0;
                    var min = 5;

                    var value = Math.floor(Math.random() * (max - min + 1)) + min;
                    var arrayColors = ['#E91E63', '#4CAF50', '#9C27B0', '#2196F3', '#009688', '#03A9F4'];
                    var colorPrice = arrayColors[value];

                    return getCameraItemTemplate(data.icon, data.name, colorPrice, data.price);
                },
                onClosedPopup: function (data) {

                },
                onSelectionChanged: function (data) {
                    addMessageToSelectionLog("cameraPanel3SelectionItems", getMessageSelectedItemChanged(data, "name"));
                },
                onInitialized: function () {

                },
                onOpenedPopup: function () {

                }
            });

        $("#cameraPanel4")
            .flexWhaleLookup({
                dataSource: window.cameras,
                displayExpr: "name",
                selectedItems: [],
                grouped: false,
                multiSelection: true,
                onClosedPopup: function (data) {

                },
                onSelectionChanged: function (data) {
                    addMessageToSelectionLog("cameraPanel4SelectionItems", getMessageSelectedItemChanged(data, "name"));
                },
                onInitialized: function () {

                },
                onOpenedPopup: function () {

                }
            });
    });