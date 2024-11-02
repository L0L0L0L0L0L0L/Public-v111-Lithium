/*
    Name: Adobis
    Map: Entrance to Zakum's Altar
    Description: 211042300
*/

var status;
var select;

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
            var chat = "Traveler, the path ahead is not easily accessible. The fearsome #bZakum#k resides there, and only warriors with the Eye of Fire may enter.";
            if (cm.getPlayer().getLevel() > 50) {
                chat += "\r\n#L0#Investigate the Mine (Stage 1)";
                chat += "\r\n#L1#Explore Zakum's Training Grounds (Stage 2)";
                chat += "\r\n#L2#Forge the Eye of Fire (Stage 3)";
            }
            chat += "\r\n#L3#Tell me about Zakum";
            chat += "\r\n#L4#Buy an Eye of Fire (10,000,000 mesos)";
            cm.sendSimple(chat);
            break;
        case 1:
            select = selection;
            if (selection == 0) {
                if (cm.getPlayer().getParty() == null) {
                    cm.sendOk("I'm sorry, the monsters inside are too dangerous. I can't let you go alone.");
                    cm.dispose();
                    return;
                }
                if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
                    cm.sendOk("If you want to take on this mission, please have your party leader speak to me.");
                    cm.dispose();
                    return;
                }
                var chat = "Sorry, but some members of your party do not meet the entry requirements. They either do not qualify or are not in this map.\r\n\r\nNumber of players: 2~6 \r\nLevel range: 50~200 \r\n\r\n";
                var disqualified = 0;
                var party = cm.getPlayer().getParty().getMembers();
                for (var i = 0; i < party.size(); i++) {
                    if (party.get(i).getLevel() < 50 || party.get(i).getLevel() > 200 || party.get(i).getMapid() != 211042300 || party.size() < 2) {
                        chat += "#bName: " + party.get(i).getName() + " / (Level: " + party.get(i).getLevel() + ") / Map: #m" + party.get(i).getMapid() + "#\r\n\r\n";
                        disqualified++;
                    }
                }
                if (disqualified != 0) {
                    cm.sendOk(chat);
                    cm.dispose();
                    return;
                }
                var em = cm.getEventManager("ZakumPQ");
                var prop = em.getProperty("state");
                if (prop == null || prop == 0) {
                    em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
                    cm.dispose();
                    return;
                }
                cm.sendOk("The Mine Task is currently in progress. Please try another channel.");
            } else if (selection == 1) {
                if (cm.getPlayer().itemQuantity(4031062) > 0) {
                    cm.sendNext("You already have an #b#v4031062##t4031062##k, so there's no need to attempt this stage.");
                    cm.dispose();
                    return;
                }
                if (!cm.getPlayer().itemQuantity(4031061)) {
                    cm.sendOk("Please complete #bInvestigate the Mine (Stage 1)#k before attempting this stage.");
                    cm.dispose();
                    return;
                }
                cm.sendYesNo("Oh! You've found the Fire Ore Shard, meaning you've passed the first trial. Next, I'll send you to a place full of traps where you might die, so be careful.");
            } else if (selection == 2) {
                if (!(cm.getPlayer().itemQuantity(4031061) && cm.getPlayer().itemQuantity(4031062))) {
                    cm.sendOk("To forge an #b#z4001017##k, you need both #b#z4031061##k and #b#z4031062##k.");
                    cm.dispose();
                    return;
                }
                if (cm.getPlayer().itemQuantity(4000051) < 30) {
                    cm.sendOk("You need 30 Wolf Tails as a processing fee for making the Eye of Fire. Please bring them to me.");
                    cm.dispose();
                    return;
                }
                cm.gainItem(4031061, -1);
                cm.gainItem(4031062, -1);
                cm.gainItem(4000051, -30);
                cm.gainItem(4001017, 5);
                cm.sendOk("Here's your Eye of Fire! You are now ready to challenge Zakum. Good luck!");
                cm.dispose();
            } else if (selection == 3) {
                cm.sendOk("Zakum is a fearsome spirit that gained a physical form over time. It embodies the dark and fiery desires of the people who lived in the Lava Land, where the villagers were corrupted by darkness.");
                cm.dispose();
            } else if (selection == 4) {
                if (cm.getPlayer().getMeso() >= 10000000) {
                    cm.gainMeso(-10000000);
                    cm.gainItem(4001017, 1);
                    cm.sendOk("Purchase successful! Here's your Eye of Fire. Good luck, warrior!");
                } else {
                    cm.sendOk("Sorry, you don't have enough mesos. You need 10,000,000 mesos to buy the Eye of Fire.");
                }
                cm.dispose();
            }
            break;
        case 2:
            if (select == 1) {
                if (cm.getMap(280020000).getCharacters().size() < 1) {
                    cm.getMap(280020000).resetFully();
                    cm.getPlayer().changeMap(cm.getMap(280020000), cm.getMap(280020000).getPortal(0));
                    cm.getPlayer().startMapTimeLimitTask(600, cm.getMap(211042300));
                    cm.dispose();
                    return;
                }
                cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The volcano's aura is too crowded. Please try again later."));
            }
            cm.dispose();
    }
}
