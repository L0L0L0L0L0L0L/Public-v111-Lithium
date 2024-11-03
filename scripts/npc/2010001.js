/*
    Name:    Hairstylist Minu
    Map:     Orbis Hair Salon
    Description: 200000202
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
            var chat = "Welcome to the Orbis Hair Salon. I am Hairstylist Mino. With a membership card from our shop, you can enjoy our professional services. #b";
            chat += "\r\n#L0##v5150053##t5150053#";
            chat += "\r\n#L1##v5151036##t5151036#";
            cm.sendSimple(chat);
            break;
        case 1:
            if (selection < 1) {
                if (cm.getPlayer().getGender() < 1)
                    hair = [30200, 30210, 30220, 30230, 30240, 30250, 30260, 30270, 30280, 30290];
                else
                    hair = [31200, 31210, 31220, 31230, 31240, 31250, 31260, 31270, 31280, 31290];

                for (var i = 0; i < hair.length; i++)
                    hair[i] = hair[i] + parseInt(cm.getPlayer().getHair() % 10); // Keep current hair color
                cm.sendStyle("Using our specialized machine, you can preview your look after the haircut. Choose a style you like.", hair);
            }
            if (selection > 0) {
                var color = parseInt(cm.getPlayer().getHair() / 10) * 10;
                hair = [];

                for (var i = 0; i < 8; i++)
                    hair[i] = color + i;
                cm.sendStyle("Using our specialized machine, you can preview your look after dyeing. Choose a color you like.", hair);
            }
            select = selection;
            break;
        case 2:
            if ((select < 1 && cm.getPlayer().itemQuantity(5150053)) || (select > 0 && cm.getPlayer().itemQuantity(5151036))) {
                cm.gainItem(select < 1 ? 5150053 : 5151036, -1);
                cm.setHair(hair[selection]);
                cm.sendOk("Your new hairstyle is done. Do you like it?");
                cm.dispose();
                return;
            }
            cm.sendOk("Sorry, without the required membership card, I'm unable to assist you.");
            cm.dispose();
    }
}
