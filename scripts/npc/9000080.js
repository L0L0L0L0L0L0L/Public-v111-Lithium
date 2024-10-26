/*
    Name: Mani
    Map: Golden Temple
    Description: 950100000
*/

var maxp = 1;

function start() {
	var map = cm.getPlayer().getMap().getId();
	var chat = "Hello, welcome to the Monkey Temple entrance. You need a Golden Temple Ticket to enter. #b";
	chat += "\r\n#L0#Monkey Temple 1 - Wild Monkey (" + (map == 950100000 ? "250 HP/44 EXP" : "105000 HP/2910 EXP") + ") (" + cm.getMap(map + 100 + (0 * 100)).getCharacters().size() + "/" + maxp + ")";
	chat += "\r\n#L1#Monkey Temple 2 - Mama Monkey (" + (map == 950100000 ? "405 HP/62 EXP" : "89000 HP/2563 EXP") + ") (" + cm.getMap(map + 100 + (1 * 100)).getCharacters().size() + "/" + maxp + ")";
	chat += "\r\n#L2#Monkey Temple 3 - White Baby Monkey (" + (map == 950100000 ? "375 HP/59 EXP" : "73000 HP/2194 EXP") + ") (" + cm.getMap(map + 100 + (2 * 100)).getCharacters().size() + "/" + maxp + ")";
	chat += "\r\n#L3#Monkey Temple 4 - White Mama Monkey (" + (map == 950100000 ? "1300 HP/127 EXP" : "57000 HP/1800 EXP") + ") (" + cm.getMap(map + 100 + (3 * 100)).getCharacters().size() + "/" + maxp + ")";
	cm.sendSimple(chat);
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getPlayer().itemQuantity(4001431) || cm.getPlayer().itemQuantity(4001432)) {
			if (cm.getMap(map + 100 + (selection * 100)).getCharacters().size() > 0) {
				cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The Monkey Temple area is currently crowded, please try again later."));
				cm.dispose();
				return;
			}
			cm.gainItem(4001431, cm.getPlayer().itemQuantity(4001432) ? 0 : -1);
			cm.getPlayer().changeMap(cm.getMap(map + 100 + (selection * 100)), cm.getMap(map + 100 + (selection * 100)).getPortal(1));
			cm.dispose();
			return;
		}
		cm.sendOk("You need a #v4001431##b#t4001431##k to enter. Please purchase it from the tour guide.");
	}
	cm.dispose();
}
