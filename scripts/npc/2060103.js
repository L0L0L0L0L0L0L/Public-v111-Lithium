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

	switch(cm.getPlayer().getMap().getId()) {
		case 923020000:
			if (status < 1) {
				if (cm.getPlayer().getParty() == null) {
					cm.sendOk("Sorry, the monsters inside are too dangerous. I can't let you go alone.");
					cm.dispose();
					return;
				}
				if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
					cm.sendOk("Sorry, entry to this area requires the party leader to lead the group.");
					cm.dispose();
					return;
				}
				var chat = "#e<Team Quest: Misty Sea Operation>#n\r\n\r\nThe Misty Sea Operation is a 2v2 competition. In this event, you need to work with your teammates to overcome various obstacles inside the ghost ship.\n\r\n\r\n－#eParty Members#n: 2-3\r\n－#elevel#n: 90 - 150 \r\n－#eSign up for Dual Raid#n#b";
				for (var i = 0; i < 5; i++)
					if (getCPQField(i) != "") {
						chat += "\r\n#L" + i + "# " + getCPQField(i) + "#l";
					}
				cm.sendSimple(chat);
			}
			if (status > 0) {
				var chat = "Sorry, your party does not meet the entry requirements. Some members may not qualify for this quest or they may not be in this map.\r\n\r\nNumber of players: " + (selection < 2 ? 2 : 3) + " \r\nLevel range: 90 - 150 \r\n\r\n";
				var chenhui = 0;
				var party = cm.getPlayer().getParty().getMembers();
				for (var i = 0; i < party.size(); i++)
					if (party.get(i).getLevel() < 90 || party.get(i).getLevel() > 150 || party.get(i).getMapid() != 923020000 || party.size() != (selection < 2 ? 2 : 3)) {
						chat += "#bName: " + party.get(i).getName() + " / (Level: " + party.get(i).getLevel() + ") / Map: #m" + party.get(i).getMapid() + "#\r\n";
						chenhui++;
					}
				if (chenhui != 0) {
					cm.sendOk(chat);
					cm.dispose();
					return;
				}
				if (cm.getEventManager("Ghost").getInstance("Ghost" + selection) == null) {
					cm.getEventManager("Ghost").startInstance("" + selection, cm.getPlayer());
					cm.dispose();
					return;
				}
				if (cm.getEventManager("Ghost").getInstance("Ghost" + selection).getPlayerCount() != cm.getPlayer().getParty().getMembers().size()) {
					cm.sendOk("Sorry, please ensure that both sides participating in the Misty Sea Operation have the same number of members.");
					cm.dispose();
					return;
				}
				var owner = cm.getChannelServer().getPlayerStorage().getCharacterByName(cm.getEventManager("Ghost").getInstance("Ghost" + selection).getPlayers().get(0).getParty().getLeader().getName());
				owner.addCarnivalRequest(cm.getCarnivalChallenge(cm.getChar()));
				cm.openNpc(owner.getClient(), 2060103);
				cm.sendOk("The application has been successfully sent.");
				cm.dispose();
			}
			break;
		case 923020100: case 923020200: case 923020300: case 923020400: case 923020500:
			if (status < 1) {
				request = cm.getNextCarnivalRequest();
				if (request == null) {
					cm.sendOk("Please wait patiently. If no suitable opponents join the competition within the specified time, the waiting room will close automatically.");
					cm.dispose();
					return;
				}
				cm.sendYesNo(request.getChallengeInfo() + "\r\nDo you want to join their Misty Sea Operation plan?");
			}
			if (status > 0) {
				cm.getChar().getEventInstance().registerCarnivalParty(request.getChallenger(), request.getChallenger().getMap(), 1);
				cm.dispose();
			}
			break;
		default:
			cm.sendOk("Welcome to the Misty Sea competition. As the judge of this event, I will be keeping an eye on you. Remember: respecting your opponents is respecting yourself. Never give up whenever you have the chance.");
			cm.dispose();
	}
}

function getCPQField(fieldnumber) {
	var status = "";
	if (cm.getEventManager("Ghost") != null) {
		var event = cm.getEventManager("Ghost").getInstance("Ghost" + fieldnumber);
		if (event == null && fieldnumber < 3) {
			status = "Carnival Field " + fieldnumber + "(2v2)";
		} else if (event == null) {
			status = "Dual Raid Field " + (fieldnumber + 1) + "(3v3)";
		} else if (event != null && (event.getProperty("started") == null || event.getProperty("started").equals("false"))) {
			var averagelevel = 0;
			for (var i = 0; i < event.getPlayerCount(); i++) {
				averagelevel += event.getPlayers().get(i).getLevel();
			}
			averagelevel /= event.getPlayerCount();
			status = event.getPlayers().get(0).getParty().getLeader().getName() + "/" + event.getPlayerCount() + " users/Avg. Level " + averagelevel;
		}
	}
	return status;
}
