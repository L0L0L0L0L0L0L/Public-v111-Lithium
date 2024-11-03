/*
    Name:    Linus
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
            var chat = "Welcome to the Orbis Hair Salon. I am Linus. With a membership card from our shop, you can enjoy our professional services. #b";
            chat += "\r\n#L0##v5150052##t5150052#";
            chat += "\r\n#L1##v5151035##t5151035#";
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
                cm.sendYesNo("Would you like to use #v5150052#? Your original appearance might transform into a random new look.");
            }
            if (selection > 0) {
                var color = parseInt(cm.getPlayer().getHair() / 10) * 10;
                hair = [];

                for (var i = 0; i < 8; i++)
                    hair[i] = color + i;
                cm.sendYesNo("Would you like to use #v5151035#? Your original appearance might transform into a random new look.");
            }
            select = selection;
            break;
        case 2:
            if ((select < 1 && cm.getPlayer().itemQuantity(5150052)) || (select > 0 && cm.getPlayer().itemQuantity(5151035))) {
                cm.gainItem(select < 1 ? 5150052 : 5151035, -1);
                cm.setHair(hair[Math.floor(Math.random() * hair.length)]);
                cm.sendOk("Your new hairstyle is done. Do you like it?");
                cm.dispose();
                return;
            }
            cm.sendOk("Sorry, without the required membership card, I'm unable to assist you.");
            cm.dispose();
    }
}
