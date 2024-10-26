/*
	名字:	燒毀的殘骸2
	地圖:	惡魔的老家
	描述:	924020000
*/

function start() {
	cm.sendNextS("Damien! Answer me!", 16);
	Packages.server.quest.MapleQuest.getInstance(23202).forceStart(cm.getPlayer(), cm.getNpc(), null);
	Packages.server.quest.MapleQuest.getInstance(23201).forceComplete(cm.getPlayer(), cm.getNpc());
	cm.dispose();
}