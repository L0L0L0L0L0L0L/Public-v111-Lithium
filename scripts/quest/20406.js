/*
	名字:	消失的騎士
	地圖:	耶雷弗
	描述:	130000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 0) {
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
		qm.sendNext("Hmmm? What are you doing here? Aren't you supposed to be out there helping Dunamis? ...What? Dunamis's mission is complete? Only a note has been left behind saying that he has already gone back to Ereve? What are you talking about? #rDunamis never returned to Ereve#k.");
		break;
	case 1:
		qm.sendAcceptDecline("Something doesn't add up. The fact that Dunamis, who's ALWAYS on top of things, disappeared without leaving his contact information, was suspiscious enough for me to assign you to him, and now.... Hmmm... So you're saying that the last remnants of Dunamis is at the cave of Black Witch, right?");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(20406).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(20406));
		qm.sendOk("Please re-enter #bBlack Witch's cave#k, and search for any other types of evidence left behind by Dunamis. Who knows, you may have missed something. We, too, will do our best to find him.");
		break;
	case 3:
		qm.dispose();
}
}