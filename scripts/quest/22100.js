/*
	名字:	龍魔導士第1次轉職
	地圖:	龍魔導士第1次轉職
	描述:	龍魔導士第1次轉職
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
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
		qm.getPlayer().changeJob(2200);
		Packages.server.quest.MapleQuest.getInstance(22100).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(22100));
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.getEvanTutorial("UI/tutorial/evan/14/0"));
		break;
	case 1:
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The baby Dragon hatched from the egg inside the Incubator."));
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You have acquired 3 SP, which can be used to advance your Dragon's skill."));
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The number of slots in the Inventory has increased."));
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The baby Dragon appears to have something to tell you. Click the baby Dragon to start a conversation."));
		qm.dispose();
}
}