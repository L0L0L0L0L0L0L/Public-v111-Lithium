/*
	Name: Shenmu Village
	Map: Sky Passage
	Description: 240080000
*/

function start() {
	cm.sendSimple("#e<Party Quest: Dragon Demon>#n \r\n\r\nDo you want to uncover the true identity of the Dragon Demon? If you are interested, please gather a few reliable friends to solve this mystery together.\r\n\r\nNumber of players: 2~6 \r\nLevel range: 120+ \r\nSkill: Flying skill \r\nTime limit: 20 minutes\r\n\r\n#L0##bEnter the quest map#l");
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getPlayer().getParty() == null) {
			cm.sendOk("Sorry, the monsters inside are very dangerous. I cannot let you go on this adventure alone.");
			cm.dispose();
			return;
		}
		if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendOk("If you want to undertake this quest, please have your party leader talk to me.");
			cm.dispose();
			return;
		}
		var chat = "Sorry, your party size does not meet the requirements for entry, or some members do not qualify for this quest, or they are not in this map.\r\n\r\nNumber of players: 2~6 \r\nLevel range: 120+ \r\n\r\n";
		var disqualified = 0;
		var party = cm.getPlayer().getParty().getMembers();
		for (var i = 0; i < party.size(); i++)
			if (party.get(i).getLevel() < 120 || party.get(i).getMapid() != 240080000 || party.size() < 2) {
				chat += "#bName: " + party.get(i).getName() + " / (Level: " + party.get(i).getLevel() + ") / Map: #m" + party.get(i).getMapid() + "#\r\n";
				disqualified++;
			}
		if (disqualified != 0) {
			cm.sendOk(chat);
			cm.dispose();
			return;
		}
		var em = cm.getEventManager("Dragonica");
		var prop = em.getProperty("state");
		if (prop == null || prop == 0) {
			em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
			cm.dispose();
			return;
		}
		cm.sendOk("The Dragon Demon quest is currently ongoing. Please try another channel.");
	}
	cm.dispose();
}
