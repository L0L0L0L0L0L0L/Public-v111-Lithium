/*
    Name:    Assistant Liz
    Map:     Orbis Plastic Surgery
    Description: 200000201
*/

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
            var chat = "Welcome to Orbis Plastic Surgery. I am Assistant Riza. With a membership card from our shop, I can make a random change for you! #b";
            chat += "\r\n#L1##v5152056##t5152056#";
            cm.sendSimple(chat);
            break;
        case 1:
            cm.sendYesNo("Would you like to use #v5152056#? Your original appearance might transform into a new, random look.");
            break;
        case 2:
            if (cm.getPlayer().getGender() < 1)
                face = [20010, 20011, 20012, 20013, 20014, 20015, 20016, 20017, 20018, 20019];
            else
                face = [21010, 21011, 21012, 21013, 21014, 21015, 21016, 21017, 21018, 21019];

            if (cm.getPlayer().itemQuantity(5152056)) {
                cm.gainItem(5152056, -1);
                cm.setFace(face[Math.floor(Math.random() * face.length)]);
                cm.sendOk("Your new look has been applied. Are you satisfied?");
                cm.dispose();
                return;
            }
            cm.sendOk("Sorry, without the required membership card, I'm unable to assist you.");
            cm.dispose();
    }
}
