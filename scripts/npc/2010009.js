var allianceCost = 2000000;
var increaseCost = 1000000;
var allianceLimit = 5;

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
            if (status < 4) {
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
            if (cm.getPlayer().getGuildId() < 1 || cm.getPlayer().getGuildRank() != 1) {
                cm.sendOk("Only the #bGuild Master#k is eligible to participate in alliance affairs.");
                cm.dispose();
                return;
            }
            cm.sendSimple("Hello, how may I assist you?\r\n#L0##bWhat is an Alliance?#l\r\n#L1#How to create an Alliance?#l\r\n#L2#Create an Alliance#l\r\n#L3#Increase Alliance capacity#l\r\n#L4#Disband the Alliance#l");
            break;

        case 1:
            if (selection == 0) {
                cm.sendOk("An alliance is a supergroup made up of multiple guilds. I am responsible for managing these alliances.");
                cm.dispose();
                return;
            }
            if (selection == 1) {
                cm.sendOk("To create an alliance, two guild masters without existing alliances must form a party in the same room on this channel. The party leader will become the alliance leader.");
                cm.dispose();
                return;
            }
            if (selection == 2) {
                if (!cm.getPlayer().getParty() || cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
                    cm.sendOk("If you wish to create an alliance, please have your party leader speak with me. They will become the alliance leader.");
                    cm.dispose();
                    return;
                }
                if (cm.getPlayer().getGuild().getAllianceId() > 0) {
                    cm.sendOk("Your guild is already part of another alliance.");
                    cm.dispose();
                    return;
                }
                cm.sendYesNo("Creating an alliance costs #b" + allianceCost + "#k mesos. Are you willing to pay?");
            }
            if (selection == 3) {
                if (!cm.getPlayer().getMGC()) {
                    cm.sendOk("You don't currently have an alliance.");
                    cm.dispose();
                    return;
                }
                var rank = cm.getPlayer().getMGC().getAllianceRank();
                if (rank != 1) {
                    cm.sendOk("Only the alliance leader can perform this action.");
                    cm.dispose();
                    return;
                }
                cm.sendYesNo("Increasing the alliance capacity costs #b" + increaseCost + "#k mesos. Do you want to proceed?");
            }
            if (selection == 4) {
                if (!cm.getPlayer().getMGC()) {
                    cm.sendOk("Only the alliance leader can perform this action.");
                    cm.dispose();
                    return;
                }
                var rank = cm.getPlayer().getMGC().getAllianceRank();
                if (rank != 1) {
                    cm.sendOk("Only the alliance leader can perform this action.");
                    cm.dispose();
                    return;
                }
                cm.sendYesNo("Are you sure you want to disband your alliance? This action is irreversible.");
            }
            select = selection;
            break;

        case 2:
            if (select == 2) {
                if (cm.getPlayer().getMeso() < allianceCost) {
                    cm.sendOk("Sorry, do you have #b" + allianceCost + "#k mesos?");
                    cm.dispose();
                    return;
                }
                cm.sendGetText("Please enter the name of the alliance (up to 6 Chinese characters or 12 characters).");
            }
            if (select == 3) {
                if (cm.getPlayer().getMeso() < increaseCost) {
                    cm.sendOk("Sorry, do you have #b" + increaseCost + "#k mesos?");
                    cm.dispose();
                    return;
                }
                if (cm.addCapacityToAlliance()) {
                    cm.sendOk("Alliance capacity increased successfully.");
                    cm.dispose();
                    return;
                }
                cm.sendOk("Sorry, the alliance has reached its capacity limit.");
                cm.dispose();
                return;
            }
            if (select == 4) {
                if (!cm.getPlayer().getGuild() || cm.getPlayer().getGuild().getAllianceId() < 1) {
                    cm.sendOk("Alliance name error. Please try again.");
                    cm.dispose();
                    return;
                }
                cm.disbandAlliance();
                cm.sendOk("The alliance has been disbanded.");
                cm.dispose();
            }
            break;

        case 3:
            guildName = cm.getText();
            cm.sendYesNo("Will '" + guildName + "' be the name of the alliance?");
            break;

        case 4:
            if (cm.getPlayer().getMeso() < allianceCost) {
                cm.sendOk("You don't have enough mesos to create the alliance.");
                cm.dispose();
                return;
            }
            if (!cm.createAlliance(guildName)) {
                cm.sendOk("Make sure the two guild masters are in the same party, in this room, on the same channel, and that neither guild is already registered in an alliance.");
                cm.dispose();
                return;
            }
            cm.gainMeso(-allianceCost);
            cm.sendOk("The '" + guildName + "' alliance has been successfully created.");
            cm.dispose();
    }
}
