/*
    Name:    Hero Amias
    Map:     Challenge Entrance
    Description:    670010100
*/

function start() {
	var chat = "#e<Party Quest: Amias Challenge>#n \r\n\r\nI am Amias, the host of the famous Amias Challenge. This challenge involves many team-based puzzles, and cooperation is key to solving them. Team up with other players and try to reach the reward stage, where you can gain many benefits upon completing the challenge. If a couple forms a team, they can receive better rewards in the additional bonus stage.\n\r\n\r 2 Party Members, all level#r 40 and level 200#b";
	chat += "\r\n#L0#Enter the quest map";
	chat += "\r\n#L1#Leave here";
	cm.sendSimple(chat);
}

function action(mode, type, selection) {
	switch (selection) {
		case 0:
			if (cm.getPlayer().getParty() == null) {
				cm.sendOk("Sorry, the monsters inside are very dangerous. I cannot let you venture alone.");
				cm.dispose();
				return;
			}
			if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
				cm.sendOk("If you want to proceed with this quest, please have your party leader talk to me.");
				cm.dispose();
				return;
			}
			var chat = "Sorry, your party does not meet the entry requirements. Some members are not eligible for this quest, or they are not in this map.\r\n\r\nNumber of players: 2~6 \r\nLevel range: 40~200 \r\n\r\n";
			var disqualified = 0;
			var party = cm.getPlayer().getParty().getMembers();
			for (var i = 0; i < party.size(); i++) {
				if (party.get(i).getLevel() < 40 || party.get(i).getLevel() > 200 || party.get(i).getMapid() != 670010100 || party.size() < 1) {
					chat += "#bName: " + party.get(i).getName() + " / (Level: " + party.get(i).getLevel() + ") / Map: #m" + party.get(i).getMapid() + "#\r\n";
					disqualified++;
				}
			}
			if (disqualified != 0) {
				cm.sendOk(chat);
				cm.dispose();
				return;
			}
			var em = cm.getEventManager("Amoria");
			var prop = em.getProperty("state");
			if (prop == null || prop == 0) {
				em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
				cm.dispose();
				return;
			}
			cm.sendOk("The Amias Challenge is currently in progress. Please try other channels.");
			break;
		case 1:
			cm.getPlayer().changeMap(cm.getMap(670010000), cm.getMap(670010000).getPortal(0));
			break;
	}
	cm.dispose();
}
