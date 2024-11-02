/*
    Name: Anubis
    Map: Zakum Altar Entrance
    Description: 211042400
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
        map = cm.getPlayer().getMap().getId();
        em = cm.getEventManager(map == 211042400 ? "ZakumBattle" : "ChaosZakum");
        eventname = cm.getPlayer().getMap().getId() == 211042400 ? "ZAK" : "ChaosZak";

        var squadAvailability = cm.getSquadAvailability(eventname);
        var chat = "#e<Squad: Zakum>#n\r\n\r\nZakum was originally just a tree, but it grew by harnessing human power and eventually became stronger than humans. When Zakum's power became unrestrained, it controlled the lava region residents and built statues to be worshipped by them.\r\n";
        if (map == 211042400 || map == 211042401) {
            if (squadAvailability == -1) {
                chat += "\r\nNumber of players: 1~30";
                chat += "\r\nLevel range: 50~200";
                chat += "\r\nTime limit: 60 minutes";
                chat += "\r\n" + (map == 211042400 ? "#L0##v3994115#" : "#L10##v3994117#") + "";
            }
            if (squadAvailability == 1) {
                var type = cm.isSquadLeader(eventname);
                if (type == -1) {
                    cm.sendOk("The expedition has ended, please register again.");
                    cm.dispose();
                    return;
                }
                if (type == 0) {
                    var memberType = cm.isSquadMember(eventname);
                    if (memberType == 2) {
                        cm.sendOk("Sorry, you are on the restricted list and cannot participate in this expedition.");
                        cm.dispose();
                        return;
                    }
                    if (memberType == 0) {
                        chat += "\r\nAn expedition team has already been formed. If you wish to challenge Zakum, try joining them.";
                        chat += "\r\n#L1#View team information";
                        chat += "\r\n" + (cm.getChannelServer().getMapleSquad(eventname).getMembers().contains(cm.getPlayer().getName()) ? "#L3#Leave the expedition team" : "#L2#Register for the expedition team") + "";
                    }
                }
                if (type == 1) {
                    chat += "\r\n#L4#Adjust team members list";
                    chat += "\r\n#L5#Restrict team members list";
                    chat += "\r\n#L6#Enter expedition map";
                }
            }
            if (squadAvailability == 2) {
                chat += "\r\nThe expedition team has already started fighting Zakum, may God be with them.";
                chat += "\r\n#L1#View expedition team information";
            }
        }
        if (map == 211042200) {
            var chat = "\r\nTraveler, this corridor leads to areas of Zakum with different difficulties. Choose your path wisely.";
            chat += "\r\n#L7##v3994115#";
            chat += "#L8##v3994117#";
        }
        chat += "\r\n#L9#Wait a moment";
        cm.sendSimple(chat);
        break;
    case 1:
        if (selection == 0 || selection == 10) {
            if (cm.registerSquad(eventname, 5, "has become the leader of the <Zakum> expedition team. To participate in this expedition, please speak with me again.")) {
                cm.sendOk("You are now the leader of the <Zakum> expedition team. Please gather your team within 5 minutes, or your expedition will be automatically canceled.");
                cm.dispose();
                return;
            }
            cm.sendOk("An unknown error occurred, operation failed.");
        }
        if (selection == 1) {
            if (!cm.getSquadList(eventname, 0)) {
                cm.sendOk("An unknown error occurred, operation failed.");
            }
        }
        if (selection == 2) {
            var ba = cm.addMember(eventname, true);
            cm.sendOk(ba == 1 ? "Successfully joined the expedition team, prepare for the expedition." : ba == 2 ? "The expedition team already has 30 members, please try again later." : "You have already joined the expedition team, prepare for the expedition.");
        }
        if (selection == 3) {
            var baa = cm.addMember(eventname, false);
            cm.sendOk(baa == 1 ? "Successfully left the expedition team." : "You have already left the expedition team.");
        }
        if (selection == 4) {
            if (!cm.getSquadList(eventname, 1)) {
                cm.sendOk("An unknown error occurred, operation failed.");
                cm.dispose();
            }
        }
        if (selection == 5) {
            if (!cm.getSquadList(eventname, 2)) {
                cm.sendOk("An unknown error occurred, operation failed.");
                cm.dispose();
            }
        }
        if (selection == 6) {
            if (cm.getSquad(eventname) == null) {
                cm.sendOk("An unknown error occurred, operation failed.");
                cm.dispose();
                return;
            }
            dd = cm.getEventManager(map == 211042400 ? "ZakumBattle" : "ChaosZakum");
            dd.startInstance(cm.getSquad(eventname), cm.getPlayer().getMap());
            cm.dispose();
        }
        if (selection == 7) {
            cm.getPlayer().changeMap(cm.getMap(211042300), cm.getMap(211042300).getPortal(1));
            cm.dispose();
        }
        if (selection == 8) {
            cm.getPlayer().changeMap(cm.getMap(211042301), cm.getMap(211042301).getPortal(1));
            cm.dispose();
        }
        if (selection == 9) {
            cm.dispose();
        }
        select = selection;
        break;
    case 2:
        if (select == 4) {
            cm.banMember(eventname, selection);
            cm.dispose();
        }
        if (select == 5) {
            if (selection != -1) {
                cm.acceptMember(eventname, selection);
            }
        }
        cm.dispose();
    }
}
