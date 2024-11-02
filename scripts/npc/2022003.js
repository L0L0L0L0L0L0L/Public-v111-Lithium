/*
    Name: Zakum
    Map: Zakum's Solo Room
    Description: 211000002
*/

function start() {
    var chat = "#e<Party Quest: Resurrection of the Gnome King>#n\r\n\r\nThe Gnome King Rex is about to be resurrected. The power of the seal stone used to suppress it is weakening. It seems that we must go to its sealed location to prevent its revival. If needed, I can take you there, but you must ensure my safety.\r\n\r\n Number of players: 2~6 \r\n Level range: 120+ \r\n Time limit: 20 minutes#b";
    var item = ["Give me a Glacier Water using an Empty Bottle and take me to the Icewind Valley Entrance", "Enter the mission map", "Exchange for #z1032102#", "Exchange for #z1032103#", "Exchange for #z1032104#"];
    for (var i = 0; i < item.length; i++)
        chat += "\r\n#L" + i + "#" + item[i] + "#l";
    cm.sendSimple(chat);
}

function action(mode, type, selection) {
    switch (selection) {
        case 0:
            if (cm.getPlayer().itemQuantity(2022698)) {
                cm.sendOk("You already have Glacier Water, I can't give you more.");
                cm.dispose();
                return;
            }
            cm.gainItem(4032649, cm.getPlayer().itemQuantity(4032649) ? 0 : 1);
            cm.getPlayer().changeMap(cm.getMap(921120000), cm.getMap(921120000).getPortal(1));
            cm.sendOk("Take this bottle, and you can find the water source through the passage at the top right. Good luck.");
            break;
        case 1:
            if (cm.getPlayer().getParty() == null) {
                cm.sendOk("Sorry, the monsters inside are too dangerous. I can't let you venture alone.");
                cm.dispose();
                return;
            }
            if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
                cm.sendOk("If you want to take on this mission, please have your party leader speak to me.");
                cm.dispose();
                return;
            }
            var chat = "Sorry, some members of your party do not meet the entry requirements, or they are not on this map.\r\n\r\n Number of players: 2~6 \r\n Level range: 120+ \r\n\r\n";
            var disqualified = 0;
            var party = cm.getPlayer().getParty().getMembers();
            for (var i = 0; i < party.size(); i++)
                if (party.get(i).getLevel() < 120 || party.get(i).getMapid() != 211000002 || party.size() < 2) {
                    chat += "#bName: " + party.get(i).getName() + " / (Level: " + party.get(i).getLevel() + ") / Map: #m" + party.get(i).getMapid() + "#\r\n";
                    disqualified++;
                }
            if (disqualified != 0) {
                cm.sendOk(chat);
                cm.dispose();
                return;
            }
            var em = cm.getEventManager("Rex");
            var prop = em.getProperty("state");
            if (prop == null || prop == 0) {
                em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
                cm.dispose();
                return;
            }
            cm.sendOk("The Resurrection of the Gnome King quest is currently in progress. Please try another channel.");
            break;
        default:
            if (mode > 0) {
                if (!cm.getPlayer().itemQuantity(1032075 + selection) && cm.getPlayer().itemQuantity(4001530) < 20) {
                    cm.sendOk("To exchange for #b#z" + (1032100 + selection) + "##k, you need 1 #b#z" + (1032075 + selection) + "##k + #r20 #v4001530##b#t4001530##k.");
                    cm.dispose();
                    return;
                }
                if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
                    cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough space in your equipment inventory."));
                    cm.dispose();
                    return;
                }
                cm.gainItem(4001530, -20);
                cm.gainItem(1032075 + selection, -1);
                cm.gainItem(1032100 + selection, 1);
                cm.sendOk("Thank you. Please take your item.");
            }
    }
    cm.dispose();
}
