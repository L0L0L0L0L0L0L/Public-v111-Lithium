/*
	名字:	勇士之村派遣任務開始前
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
		if (status < 1) {
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
		qm.sendAcceptDecline("How's the leveling up so far? By this time, you might be able to participate in the Party Quest at #m103000000#. Leveling up is important, yes, but we need you now to take on a mission as a Cygnus Knight. We just received a new information that may help us.");
		break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(20720).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(20720));
		qm.sendOk("This mission is closely related to #m102000000#... Please stop by #bEreve#k first before heading off to #m102000000#. We need you to deliver an item related to this mission to an Agent in #m102000000#. See you soon at Ereve.");
		break;
	case 2:
		qm.dispose();
}
}