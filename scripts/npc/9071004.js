/*
	Name: Gatekeeper
	Map: Monster Park
	Description: 951000000
*/

var maps = Array(952000000, 952010000, 952020000, 952030000, 952040000, 953000000, 953010000, 953020000, 953030000, 953040000, 953050000, 954000000, 954010000, 954020000, 954030000, 954040000, 954050000);
var minLevel = Array(20, 45, 50, 55, 60, 70, 75, 85, 95, 100, 110, 120, 125, 130, 140, 150, 165);
var maxLevel = Array(30, 55, 60, 65, 70, 80, 85, 95, 105, 110, 120, 130, 135, 140, 150, 165, 200);

function start() {
	var chat = "#e<Party Quest: Monster Park>#n#b";
	var in00 = cm.getPlayer().getPosition().x < 405 ? 0 : cm.getPlayer().getPosition().x < 585 ? 5 : 11;
	var in01 = cm.getPlayer().getPosition().x < 405 ? 5 : cm.getPlayer().getPosition().x < 585 ? 11 : 17;
	for (var i = in00; i < in01; i++) {
		chat += "\r\n#L" + i + "##m" + maps[i] + "# (Monsters Lv." + minLevel[i] + " - " + maxLevel[i] + ")#l";
	}
	cm.sendSimple(chat);
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getPlayer().getParty() == null) {
			cm.sendOk("Sorry, the monsters inside are dangerous. I cannot allow you to go on your own.");
			cm.dispose();
			return;
		}
		if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendOk("If you want to proceed with this quest, please ask your party leader to talk to me.");
			cm.dispose();
			return;
		}
		var chat = "Sorry, your party's size does not meet the entry requirements, some members are not qualified for this quest or are not in this map.\r\n\r\nNumber of players: 2~6 \r\nLevel range: " + minLevel[selection] + "-" + maxLevel[selection] + "\r\n\r\n";
		var unqualified = 0;
		var party = cm.getPlayer().getParty().getMembers();
		for (var i = 0; i < party.size(); i++) {
			if (party.get(i).getLevel() < minLevel[selection] || party.get(i).getLevel() > maxLevel[selection] || party.get(i).getMapid() != 951000000 || party.size() < 1) {
				chat += "#bName: " + party.get(i).getName() + " / (Level: " + party.get(i).getLevel() + ") / Map: #m" + party.get(i).getMapid() + "#\r\n";
				unqualified++;
			}
		}
		if (unqualified != 0) {
			cm.sendOk(chat);
			cm.dispose();
			return;
		}
		var ticket = selection < 5 ? 4001514 : selection < 11 ? 4001516 : 4001522;
		if (!cm.havePartyItems(ticket, 1)) {
			cm.sendOk("Sorry, some party members do not have #b#t" + ticket + "##k.\r\n\r\n#r" + cm.NotPartyitem(ticket, 1) + " \r\n#k");
			cm.dispose();
			return;
		}
		var em = cm.getEventManager("MonsterPark");
		if (em == null || em.getInstance("MonsterPark" + maps[selection]) != null) {
			cm.sendOk("The quest for this area is currently ongoing. Please try again later.");
			cm.dispose();
			return;
		}
		cm.givePartyItems(ticket, -1);
		em.startInstance_Party("" + maps[selection], cm.getPlayer());
	}
	cm.dispose();
}
