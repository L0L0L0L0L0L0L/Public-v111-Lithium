/*
	Name: Familiar-Looking Woman
	Map: Gloomy Forest
	Description: 922220000
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3647)).getCustomData() > 0) {
		cm.sendOk("I'm not going to deal with you. It's not fun at all.");
		cm.dispose();
		return;
	}
	if (!cm.getPlayer().itemQuantity(4031793)) {
		cm.sendOk("Hey... can you help me find the #b#v4031793##t4031793##k that I lost in the forest? I need it urgently.");
		cm.dispose();
		return;
	}
	cm.sendYesNo("Hey... can you help me find the #b#v4031793##t4031793##k that I lost in the forest? I need it urgently... if you find it, can you give it to me?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.sendOk("Thank you, this is your reward from me. It will be helpful to you.");
		cm.gainItem(4031793, -1);
		cm.getPlayer().setFame(cm.getPlayer().getFame() - 5);
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3647)).setCustomData(1);
	}
	cm.dispose();
}
