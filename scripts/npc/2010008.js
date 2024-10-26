/*
    Name:    Leia
    Map:     Guild Headquarters <Hall of Heroes>
    Description: 200000301
*/

var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    switch (mode) {
        case -1:
            cm.dispose(); // End interaction.
            return;
        case 0:
            if (status < 2) {
                cm.dispose(); // If the user cancels or exits early, end interaction.
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
            // Offer guild emblem customization.
            cm.sendSimple("Hello, I'm Leia. How may I assist you?\r\n#L0##bModify Guild Emblem#l");
            break;

        case 1:
            // Only the Guild Master (rank 1) can modify the emblem.
            if (cm.getPlayer().getGuildRank() != 1) {
                cm.sendOk("Creating a new guild emblem requires the Guild Master. Please ask your #bGuild Master#k to come see me.");
                cm.dispose();
                return;
            }
            cm.sendYesNo("Modifying the guild emblem costs #b1,500,000 mesos#k. Do you want to proceed?");
            break;

        case 2:
            // Trigger the emblem customization process.
            cm.genericGuildMessage(18);
            cm.dispose(); // End interaction after the emblem is customized.
    }
}
