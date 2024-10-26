/*
	Name: Dark Dragon King Milestone
	Map: Cave Entrance
	Description: 240050000
*/

var item = [4001087, 4001088, 4001089, 4001090, 4001091, 4001092, 4001093];

function start() {
	if (cm.getPlayer().getMap().getId() == 240050000)
		cm.sendSimple("#e<Party Quest: Judgment of the Dark Dragon King>#n \r\n\r\nSeveral hundred years ago, the Dark Dragon King was sealed in a hidden place by four heroes from Maple World using mysterious weapons. Now, after hundreds of years, the demon Dark Dragon, sealed underground in darkness, is awakening. It is angry and roaring.\r\n\r\nNumber of players: 2~6 \r\nLevel range: 100+ \r\nTime limit: 30 minutes\r\n#L0##bEnter the quest map#l");
	else
		cm.sendSimple("Please search the nearby area for " + (cm.getPlayer().getMap().getId() == 240050100 ? "#v4001087# to #v4001091#5 keys" : "all 6 #v4001093##z4001093# keys") + ".\r\n#L1##bI have collected all the keys#l");
}

function action(mode, type, selection) {
	switch (selection) {
		case 0:
			if (cm.getPlayer().getParty() == null) {
				cm.sendOk("Sorry, the monsters inside are too dangerous. I can't let you go alone.");
				cm.dispose();
				return;
			}
			if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
				cm.sendOk("If you want to proceed with this quest, please ask your party leader to talk to me.");
				cm.dispose();
				return;
			}
			var chat = "Sorry, your party size does not meet the entry requirements, or some members are not qualified or are not in this map.\r\n\r\nNumber of players: 2~6 \r\nLevel range: 70+ \r\n\r\n";
			var chenhui = 0;
			var party = cm.getPlayer().getParty().getMembers();
			for (var i = 0; i < party.size(); i++) {
				if (party.get(i).getLevel() < 70 || party.get(i).getMapid() != 240050000 || party.size() < 2) {
					chat += "#bName: " + party.get(i).getName() + " / (Level: " + party.get(i).getLevel() + ") / Map: #m" + party.get(i).getMapid() + "#\r\n";
					chenhui++;
				}
			}
			if (chenhui != 0) {
				cm.sendOk(chat);
				cm.dispose();
				return;
			}
			var em = cm.getEventManager("HontalePQ");
			var prop = em.getProperty("state");
			if (prop == null || prop == 0) {
				em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
				cm.dispose();
				return;
			}
			cm.sendOk("The Judgment of the Dark Dragon King quest is already in progress. Please try another channel.");
			break;
		case 1:
			if ((cm.getPlayer().itemQuantity(4001087) && cm.getPlayer().itemQuantity(4001088) && cm.getPlayer().itemQuantity(4001089) && cm.getPlayer().itemQuantity(4001090) && cm.getPlayer().itemQuantity(4001091)) || cm.getPlayer().itemQuantity(4001093) > 5) {
				for (var i = 0; i < item.length; i++)
					cm.removeAll(item[i]);
				cm.warpParty(cm.getPlayer().getMap().getId() == 240050100 ? 240050200 : 240050400);
				cm.dispose();
				return;
			}
			cm.sendOk("Please check if the keys you collected meet the requirements.");
	}
	cm.dispose();
}
