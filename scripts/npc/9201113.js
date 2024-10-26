/*
    Name:    Jack
    Map:     Inner Chamber Hall
    Description:    610030020
*/

function start() {
	cm.sendSimple("#e<Adventure: Guardian Castle>#n\r\n\r\nThe Lord of the Twisted in Guardian Castle currently controls all areas of Guardian Mountain. To expand their territory, they have planned a massive attack on New Leaf City, which might happen in the next few days. Can you help me gather some information about entering the fortress?\r\n\r\n 5 Party Members, all level#r 120+ \r\n#L0##bEnter the quest map#l");
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getPlayer().getParty() == null) {
			cm.sendOk("Sorry, the monsters inside are very dangerous. I can't let you go alone.");
			cm.dispose();
			return;
		}
		if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendOk("If you want to undertake this mission, please ask your party leader to talk to me.");
			cm.dispose();
			return;
		}
		var chat = "Sorry, your party does not meet the entry requirements. Some members are not qualified for this mission or are not in this map.\r\n\r\nNumber of players: 5+ \r\nLevel range: 120+ \r\n\r\n";
		var invalidMembers = 0;
		var party = cm.getPlayer().getParty().getMembers();
		for (var i = 0; i < party.size(); i++) {
			if (party.get(i).getLevel() < 120 || party.get(i).getMapid() != 610030020 || party.size() < 2) {
				chat += "#bName: " + party.get(i).getName() + " / (Level: " + party.get(i).getLevel() + ") / Map: #m" + party.get(i).getMapid() + "#\r\n";
				invalidMembers++;
			}
		}
		if (invalidMembers != 0) {
			cm.sendOk(chat);
			cm.dispose();
			return;
		}
		var em = cm.getEventManager("CWKPQ");
		var prop = em.getProperty("state");
		if (prop == null || prop == 0) {
			em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
			cm.dispose();
			return;
		}
		cm.sendOk("The Guardian Castle quest is currently in progress. Please try other channels.");
	}
	cm.dispose();
}
