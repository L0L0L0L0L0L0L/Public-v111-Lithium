var currency = 4031203;
var items = [
    [1113218, 250],
    [1032259, 250],
    [1012554, 250],
    [1122330, 250],
    [1152193, 250],
    [1142754, 100],
    [1182190, 150],
    [1182191, 250],
    [3015689, 50],
    [3015688, 50],
    [3015346, 50],
    [1053093, 10],
    [1053094, 10],
    [1050248, 10],
];

function start() {
    var text = "Welcome to the Halloween Shop! #k#b\r\n"; // Purple for Halloween Vendor
    text += "Hope you stocked up on Candies, You can purchase with #r#v" + currency + "#:\r\n"; // Only showing item ID image

    for (var i = 0; i < items.length; i++) {
        text += "#L" + i + "# #z" + items[i][0] + "# - " + items[i][1] + "\r\n";


    }

    cm.sendSimple(text);
}

function action(m, t, s) {
    if (m > 0) {
        if (cm.haveItem(currency, items[s][1])) {
            if (cm.canHold(items[s][0])) {
                cm.gainItem(currency, -items[s][1]);
                cm.gainItem(items[s][0], 1);
                cm.sendOk("Happy Halloween! You've received #z" + items[s][0] + "#."); // Default color for confirmation
            } else {
                cm.sendOk("Please have one space available in your inventory.");
            }
        } else {
            cm.sendOk("Hey, you don't have enough #g#z" + currency + "#!"); // Green for item ID
        }
    }
    cm.dispose();
}
