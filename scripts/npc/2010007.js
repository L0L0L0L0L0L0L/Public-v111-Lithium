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
            cm.sendSimple("What would you like to do?\r\n#L0##bCreate a Guild#l\r\n#L1#Disband a Guild#l\r\n#L2#Increase Guild Capacity#l");
            break;

        case 1:
            if (selection == 0) {
                if (cm.getPlayer().getGuildId() > 0) {
                    cm.sendOk("You cannot create a guild while being in another guild. Please leave your current guild first.");
                    cm.dispose();
                    return;
                }
                cm.sendYesNo("Creating a guild requires a fee of #b1,500,000 mesos#k. Do you want to pay?");
            }
            if (selection == 1) {
                if (cm.getPlayer().getGuildId() < 1 || cm.getPlayer().getGuildRank() != 1) {
                    cm.sendOk("Only the Guild Master has permission to perform this operation.");
                    cm.dispose();
                    return;
                }
                cm.sendYesNo("Are you sure you want to disband your guild? This action is irreversible.");
            }
            if (selection == 2) {
                if (cm.getPlayer().getGuildId() < 1 || cm.getPlayer().getGuildRank() != 1) {
                    cm.sendOk("Only the Guild Master has permission to perform this operation.");
                    cm.dispose();
                    return;
                }
                cm.sendYesNo("Increasing guild capacity by #b5#k members will cost #b500,000 mesos#k. Do you want to proceed?");
            }
            select = selection;
            break;

        case 2:
            if (select == 0 && cm.getPlayer().getGuildId() < 1) {
                cm.genericGuildMessage(1);
                cm.dispose();
                return;
            }
            if (select == 1 && cm.getPlayer().getGuildId() > 0 && cm.getPlayer().getGuildRank() == 1) {
                cm.disbandGuild();
                cm.dispose();
                return;
            }
            if (select == 2 && cm.getPlayer().getGuildId() > 0 && cm.getPlayer().getGuildRank() == 1) {
                cm.increaseGuildCapacity(false); // 'true' would add capacity with 25,000 GP.
            }
            cm.dispose();
    }
}
