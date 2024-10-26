/*
	名字:	再次取得卡帕萊特的披風
	地圖:	卡帕萊特協會
	描述:	261000020
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("If you don't want one, then fine. You are not banished from the Alcadno Society for not having a cape, but...no one will think of you as one, so you think about that.");
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
		qm.sendAcceptDecline("I have seen you before, which means you are already an alchemist of Alcadno. Why aren't you wearing one with you right now? I thought I already told you if you're a member of the Alcadno Society, then you must wear it with you at all times. What? You lost the cape? Are you implying that you do not wish to be an Alcadno any longer? Hmm... so that's not what you mean. I'll give you another one right now, so will you accept it?");
		break;
	case 1:
		qm.sendNext("The cape was given out to you for free when you first enrolled in Alcadno Society, but this time...you'll need to bring in the materials required to make the cape. I need #b10 Leathers#k and #b10,000 mesos#k as a service charge for the person responsible for making the cape. Don't forget to bring them to me.");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(3306).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}