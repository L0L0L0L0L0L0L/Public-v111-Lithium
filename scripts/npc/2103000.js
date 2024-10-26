/*
    Name: Court Oasis
    Map: Nashi Palace
    Description: 260000300
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3900)).getStatus() != 1) {
		cm.sendNext("The water from the Oasis seems to be clean.");
		cm.dispose();
		return;
	}
	cm.sendNext("You used two hands to drink the clean water of the Oasis. Delicious! It quenched your thirst right on the spot.");
	cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3900)).setCustomData(5);
	cm.getPlayer().updateQuest(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3900)), true);
	cm.dispose();
}