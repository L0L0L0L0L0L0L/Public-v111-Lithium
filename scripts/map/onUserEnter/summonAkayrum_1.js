/*
	名字:	黑暗時間神殿
	地圖:	黑魔法師的房前徊廊
	描述:	272010200
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case - 1:
		ms.dispose();
		return;
	case 0:
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31178)).getCustomData() == 1) {
			ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(8860001), new java.awt.Point(644, 71));
			ms.dispose();
			return;
			}
			ms.spawnNPCRequestController(2144019, 782, 8, 0);
			ms.sendNextS("(You hear a quiet incantation coming from nearby.)", 5, 2144019);
			break;
	case 1:
		ms.sendNextS("That chant! is #p2144019# already breaking the Black Mage's seal?!", 17);
		break;
	case 2:
		ms.sendNextPrevS("Hey. #p2144019# I won't let you get away with this!", 17);
		break;
	case 3:
		ms.sendNextPrevS("Agh! No interruptions! My spell was nearly complete and you ruined it!", 5, 2144019);
		break;
	case 4:
		ms.sendNextPrevS("l can't believe you had the nerve to disturb my work! You will spend the rest of eternity rotting here!", 5, 2144019);
		break;
	case 5:
		ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31178)).setCustomData(1);
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.removeNPCController(2144019));
		ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(8860001), new java.awt.Point(644, 71));
		ms.dispose();
}
}