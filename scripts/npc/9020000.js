/*
	Name: Lackris
	Map: First Companion <Waiting Room>
	Description: 910340700
*/

function start() {
	if (cm.getPlayer().getMap().getId() == 103000000) {
		cm.sendSimple("Traveler! Have you heard about the <First Companion> party quest? It’s a task full of puzzles and challenges, and you can invite your friends to join you.\r\n#L0##bEnter #m910340700##l");
	} else {
		cm.sendSimple("#e<Party Quest: First Companion>#n\r\n\r\nAre there any brave adventurers who want to participate in this event? Work together with your friends to complete all the challenges and defeat the Super Green Water Spirit for rich rewards! If you want to challenge this quest, please have your party leader talk to me.\r\n\r\nNumber of players: 2~6 \r\nLevel range: 20~69 \r\nTime limit: 20 minutes\r\n#L0##bEnter the quest map#l");
	}
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getPlayer().getMap().getId() == 103000000) {
			cm.getPlayer().saveLocation(Packages.server.maps.SavedLocationType.fromString("MULUNG_TC"));
			cm.getPlayer().changeMap(cm.getMap(910340700), cm.getMap(910340700).getPortal(1));
			cm.dispose();
			return;
		}
		if (cm.getPlayer().getParty() == null) {
			cm.sendOk("Sorry, the monsters inside are very dangerous, so I cannot let you go on an adventure alone.");
			cm.dispose();
			return;
		}
		if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendOk("If you want to undertake this quest, please have your party leader talk to me.");
			cm.dispose();
			return;
		}
		var chat = "Sorry, your party does not meet the entry requirements. Some members are either not qualified for this quest or are not on this map.\r\n\r\nNumber of players: 2~6 \r\nLevel range: 20~69 \r\n\r\n";
		var chenhui = 0;
		var party = cm.getPlayer().getParty().getMembers();
		for (var i = 0; i < party.size(); i++) {
			if (party.get(i).getLevel() < 20 || party.get(i).getLevel() > 69 || party.get(i).getMapid() != 910340700 || party.size() < 2) {
				chat += "#bName: " + party.get(i).getName() + " / (Level: " + party.get(i).getLevel() + ") / Map: #m" + party.get(i().getMapid() + "#\r\n")
				chenhui++;
			}
		}
		if (chenhui != 0) {
			cm.sendOk(chat);
			cm.dispose();
			return;
		}
		var em = cm.getEventManager("KerningPQ");
		var prop = em.getProperty("state");
		if (prop == null || prop == 0) {
			em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
			cm.dispose();
			return;
		}
		cm.sendOk("The First Companion quest is already in progress. Please try another channel.");
	}
	cm.dispose();
}
