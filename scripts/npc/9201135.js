/*
    Name:    Audrey
    Map:     Central Business District
    Description: 540000000
*/

var maps = [550000000, 551000000];
var cost = [20000, 30000];

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
            if (cm.getPlayer().getMap().getId() == 540000000)
                cm.sendSimple("Traveler, are you interested in sightseeing in Malaysia? There are bustling urban views, rural landscapes, and a dreamy theme park waiting for you.\r\n#L0##bUrban Trend Area#k (20,000 mesos)#l\r\n#L1##bKampung Village#k (30,000 mesos)#l");
            else
                cm.sendSimple("How is #m" + cm.getPlayer().getMap().getId() + "#? Interesting, right?\r\n#L2##bSightseeing: " + (cm.getPlayer().getMap().getId() == 550000000 ? "Kampung Village" : "Urban Trend Area") + "#l\r\n#L3#Return to: #m" + cm.getPlayer().getSavedLocation(Packages.server.maps.SavedLocationType.fromString("WORLDTOUR")) + "##l\r\n#L4#Continue sightseeing#l");
            break;
        case 1:
            if (selection < 2) {
                select = selection;
                cm.sendYesNo("Do you really want to go to #m" + maps[select] + "#? The fare is #b" + cost[select] + "#k mesos.");
            }
            if (selection == 2) {
                cm.sendYesNo("Would you like to continue to " + (cm.getPlayer().getMap().getId() == 550000000 ? "Kampung Village" : "Urban Trend Area") + "? That's great! I can give you a discount for only #b5000#k mesos.");
            }
            if (selection == 3) {
                cm.sendNext("Alright, I hope you enjoyed the trip. If you need to travel to another place, please let me know.");
            }
            if (selection == 4) {
                cm.sendOk("Feel free to look around some more. Let me know when you're ready to return.");
                cm.dispose();
            }
            select = selection;
            break;
        case 2:
            if (select < 3) {
                if (cm.getPlayer().getMeso() < (select < 2 ? cost[select] : 5000)) {
                    cm.sendOk("I'm sorry, it looks like you don't have enough mesos to cover the fare.");
                    cm.dispose();
                    return;
                }
                if (select < 2)
                    cm.getPlayer().saveLocation(Packages.server.maps.SavedLocationType.fromString("WORLDTOUR"));
                cm.gainMeso(-(select < 2 ? cost[select] : 5000));
                map = select < 2 ? maps[select] : cm.getPlayer().getMap().getId() == 550000000 ? 551000000 : 550000000;
                cm.getPlayer().changeMap(cm.getMap(map), cm.getMap(map).getPortal(0));
                cm.dispose();
                return;
            }
            if (select < 4) {
                var map = cm.getPlayer().getSavedLocation(Packages.server.maps.SavedLocationType.fromString("WORLDTOUR"));
                if (map < 0) map = 540000000;
                cm.getPlayer().changeMap(cm.getMap(map), cm.getMap(map).getPortal(0));
                cm.getPlayer().clearSavedLocation(Packages.server.maps.SavedLocationType.fromString("WORLDTOUR"));
            }
            cm.dispose();
    }
}
