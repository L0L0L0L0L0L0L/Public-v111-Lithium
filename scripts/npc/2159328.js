/*
	名字:	燒毀的殘骸1
	地圖:	惡魔的老家
	描述:	924020000
*/

function start() {
	cm.sendNextS("#bMother! Where are you?!", 16);
	Packages.server.quest.MapleQuest.getInstance(23201).forceStart(cm.getPlayer(), cm.getNpc(), null);
	Packages.server.quest.MapleQuest.getInstance(23200).forceComplete(cm.getPlayer(), cm.getNpc());
	cm.dispose();
}