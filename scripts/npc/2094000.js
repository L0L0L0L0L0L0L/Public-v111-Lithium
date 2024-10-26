/*
    Name: Qiu Weng
    Map: Pirate Ship Area
    Description: 251010404
*/

function start() {
	var chat = "#e<Party Quest: Pirate Ship>#n \r\n\r\nI am a servant of the King of the Kikyos, Yu Yang. Have you seen the Kikyos in the herbal field? They have turned into violent monsters attacking innocent people. But that’s not the true nature of the Kikyos. It’s all because of the evil old pirate.\r\n\r\n Number of players: 2~6 \r\n Level range: 70~119 \r\n Time limit: 20 minutes\r\n#b";
	chat += "\r\n#L0#Enter the quest map";
	chat += "\r\n#L1#I want to know more details";
	cm.sendSimple(chat);
}

function action(mode, type, selection) {
	switch (selection) {
		case 0:
			if (cm.getPlayer().getParty() == null) {
				cm.sendOk("Sorry, the monsters inside are too dangerous. I cannot let you go on your own.");
				cm.dispose();
				return;
			}
			if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
				cm.sendOk("If you want to undertake this quest, please ask your party leader to talk to me.");
				cm.dispose();
				return;
			}
			var chat = "Sorry, your party does not meet the requirements for entry. Some members are not eligible for this quest or they are not in this map.\r\n\r\nNumber of players: 2~6 \r\nLevel range: 70~119 \r\n\r\n";
			var count = 0;
			var party = cm.getPlayer().getParty().getMembers();
			for (var i = 0; i < party.size(); i++) {
				if (party.get(i).getLevel() < 70 || party.get(i).getLevel() > 119 || party.get(i).getMapid() != 251010404 || party.size() < 2) {
					chat += "#bName: " + party.get(i).getName() + " / (Level: " + party.get(i).getLevel() + ") / Map: #m" + party.get(i).getMapid() + "#\r\n";
					count++;
				}
			}
			if (count != 0) {
				cm.sendOk(chat);
				cm.dispose();
				return;
			}
			var em = cm.getEventManager("Pirate");
			var prop = em.getProperty("state");
			if (prop == null || prop == 0) {
				em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
				cm.dispose();
				return;
			}
			cm.sendOk("The Pirate Ship quest is currently in progress. Please try another channel.");
			break;
		case 1:
			cm.sendOk("The old pirate has kidnapped the Kikyos' great king Yu Yang and is ruthlessly exploiting us. We Kikyos have to yield to its orders to ensure Yu Yang's safety. Please, you must rescue Yu Yang from the clutches of the evil old pirate. Only then can peace be restored to our Kikyos and the Elixir Realm. The pirate ship carrying the old pirate and Yu Yang is about to depart! Hurry and board the ship at the far eastern side!");
			break;
	}
	cm.dispose();
}
