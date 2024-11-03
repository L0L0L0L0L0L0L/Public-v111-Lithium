/*
    Name:    Cis
    Map:     Central Business District
    Description: 540000000
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
            var chat = "Hello, I'm Sixx. We have the beautiful look you've always desired! The first thing everyone notices about you is your eyes, and we can help you find the perfect contact lenses for you!#b";
            chat += "\r\n#L0##v5152039##t5152039#";
            chat += "\r\n#L1##v5152040##t5152040#";
            cm.sendSimple(chat);
            break;
        case 1:
            var teye = cm.getPlayer().getFace() % 100;
            var color = [];

            teye += cm.getPlayer().getGender() < 1 ? 20000 : 21000;
            for (var i = 0; i < 8; i++) {
                color[i] = teye + i * 100;
            }
            if (selection < 1) {
                cm.sendYesNo("Do you want to use #v5152039#? You will receive a random pair of contact lenses.");
            } else {
                cm.sendStyle("Use our specialized machine to preview yourself with the contact lenses. Choose the style you like.", color);
            }
            select = selection;
            break;
        case 2:
            if ((select < 1 && cm.getPlayer().itemQuantity(5152039)) || (select > 0 && cm.getPlayer().itemQuantity(5152040))) {
                cm.gainItem(select < 1 ? 5152039 : 5152040, -1);
                cm.setFace(select < 1 ? color[Math.floor(Math.random() * color.length)] : color[selection]);
                cm.sendOk("Your new lenses have been applied. Do you like them?");
                cm.dispose();
                return;
            }
            cm.sendOk("Sorry, you don't have the required membership card. I can't assist you.");
            cm.dispose();
    }
}
