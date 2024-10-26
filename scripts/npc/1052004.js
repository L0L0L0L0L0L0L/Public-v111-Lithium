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
            var chat = "Welcome to the Cosmetic Clinic! I am Director Dema. As long as you have our membership card, you can enjoy our professional services. #b";
            chat += "\r\n#L0##v5152057##t5152057#";
            cm.sendSimple(chat);
            break;

        case 1:
            if (cm.getPlayer().getGender() < 1)
                face = [20000, 20001, 20002, 20003, 20004, 20005, 20006, 20007, 20008, 20009];
            else
                face = [21000, 21001, 21002, 21003, 21004, 21005, 21006, 21007, 21008, 21009];

            cm.sendStyle("Using our specialized machine, you can preview your new look. Choose the appearance you like.", face);
            break;

        case 2:
            if (cm.getPlayer().itemQuantity(5152057) > 0) {
                cm.gainItem(5152057, -1);
                cm.setFace(face[selection]);
                cm.sendOk("Your new face has been applied! Do you like it?");
                cm.dispose();
                return;
            }
            cm.sendOk("Sorry, without our specified membership card, I cannot provide the service.");
            cm.dispose();
            break;
    }
}
