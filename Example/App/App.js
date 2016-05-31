function getMessageSelectedItemChanged(data, prop) {
    var message = "";
    if (data.selectedItems.length > 0) {
        for (var indexSelectedItem = 0;
            indexSelectedItem < data.selectedItems.length;
            indexSelectedItem++) {
            if (indexSelectedItem !== 0) message += ",";
            message += " " + data.selectedItems[indexSelectedItem][prop];
        }
    } else {
        message = "No selection items";
    }

    return message;
}


function addMessageToSelectionLog(id, message) {
    $("#" + id).empty();
    $("#" + id).append(message);
}