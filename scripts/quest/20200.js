/*
	名字:	修煉騎士的終結
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
		qm.sendNext("Hmmm... Do you feel like you still have missions to take care of as a trainee? I commend your level of patience, but this has gone too far. Cygnus Knights is in dire need of new, more powerful knights.");
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
		qm.sendAcceptDecline("#h0#? Wow, your level has skyrocketed since the last time I saw you. You also look like you've taken care of a number of missions as well. You seem much more ready to move on now than the last time I saw you. What do you think? Are you interested in taking the #bKnighthood Exam#k? It's time for you to grow out of the Knight-in-Training and become a bonafide Knight, right?");
		break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(20200).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(20200));
		qm.sendOk("If you wish to take the Knighthood Exam, please come to Ereve. Each Chief Knight will test your abilities, and if you meet their standards, then you will officially become a Knight.");
		break;
	case 2:
		qm.dispose();
}
}