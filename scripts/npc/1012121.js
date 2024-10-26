var itemList = new Array();
var status;
var inventoryType;
var deleteSlot;
var deleteQuantity;
var maxQuantity;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    switch (mode) {
        case -1:
            cm.dispose();
            return;
        case 0:
            if (status < 3) {
                cm.dispose();
                return;
            }
            status--;
            break;
        case 1:
            status++;
            break;
    }

    switch (status) {
        case 0:
            var chat = "#e- Please select the type of item you want to recycle -#n#b";
            var options = ["Equip", "Use", "Set-up", "ETC", "Cash"];
            for (var i = 0; i < options.length; i++)
                chat += "\r\n#L" + i + "#" + options[i] + "#l";
            cm.sendSimple(chat);
            break;
        case 1:
            inventoryType = selection + 1;
            itemList = cm.getInventory(inventoryType).list().iterator();
            var text = "\t\t#e- Please select the item you want to recycle -#n#b\r\n";
            while (itemList.hasNext()) {
                var item = itemList.next();
                var quantity = item.getQuantity();
                var itemName = cm.getItemName(item.getItemId());
                text += "#L" + item.getPosition() + "##v" + item.getItemId() + "##l " + itemName + " x" + quantity + "\r\n";  // Include item name and quantity
            }
            cm.sendSimple(text);
            break;
        case 2:
            var item = cm.getInventory(inventoryType).getItem(selection);
            deleteSlot = selection;
            maxQuantity = item.getQuantity();
            if (maxQuantity > 1) {
                cm.sendGetNumber("#eEnter the quantity to recycle for #r#v" + item.getItemId() + "##z" + item.getItemId() + "# (Max: " + maxQuantity + ")#k:", 1, 1, maxQuantity);
            } else {
                deleteQuantity = 1;
                cm.sendYesNo("#eConfirm to recycle #r#v" + item.getItemId() + "##z" + item.getItemId() + "#? This action cannot be undone.#k");
            }
            break;
        case 3:
            if (maxQuantity > 1) {
                deleteQuantity = selection;
                cm.sendYesNo("#eConfirm to recycle #r#v" + cm.getInventory(inventoryType).getItem(deleteSlot).getItemId() + "##z" + cm.getInventory(inventoryType).getItem(deleteSlot).getItemId() + "# x" + deleteQuantity + "? This action cannot be undone.#k");
            } else {
                status = -1;
                cm.removeSlot(inventoryType, deleteSlot, deleteQuantity);
                cm.sendOk("Recycling successful, good luck on your adventures.");
                cm.dispose();
            }
            break;
        case 4:
            status = -1;
            cm.removeSlot(inventoryType, deleteSlot, deleteQuantity);
            cm.sendOk("Recycling successful, good luck on your adventures.");
            cm.dispose();
            break;
    }
}