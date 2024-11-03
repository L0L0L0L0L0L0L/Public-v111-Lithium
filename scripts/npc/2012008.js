/*
    Name:    Romi
    Map:     Orbis Skin Care Center
    Description: 200000203
*/

var skin = Array(0, 1, 2, 3, 4, 5);

var status;

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
            if (status < 2) {
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
            var chat = "Welcome to Orbis Skin Care Center. I am Romi. With a membership card from our shop, you can have the skin you've always wanted! #b";
            chat += "\r\n#L1##v5153015##t5153015#";
            cm.sendSimple(chat);
            break;
        case 1:
            cm.sendStyle("Using our specialized machine, you can preview your appearance after the treatment. What kind of skin care would you like?", skin);
            break;
        case 2:
            if (cm.getPlayer().itemQuantity(5153015)) {
                cm.gainItem(5153015, -1);
                cm.setSkin(selection);
                cm.sendOk("Your new skin color has been treated. Do you like it?");
                cm.dispose();
                return;
            }
            cm.sendOk("Sorry, you do not have the required skin care coupon. I'm afraid we cannot assist you.");
            cm.dispose();
    }
}
