/*
	名字:	一口乾草
	地圖:	農場中心地
	描述:	100030300
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("Hm, you never know unless you try. That lizard is big enough to be on Maple's Believe It Or Not. It might eat hay.");
		qm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		qm.sendAcceptDecline("Wouldn't a lizard enjoy a #b#t4032452##k, like a cow? There are a lot of #bHaystacks#k nearby, so try feeding it that.");
		break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(22502).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.getEvanTutorial("UI/tutorial/evan/12/0"));
		qm.dispose();
}
}