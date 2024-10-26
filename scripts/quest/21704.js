/*
	名字:	小小一步
	地圖:	瑞恩村
	描述:	140000000
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
		qm.sendNextS("How did the training go? The Penguin Teacher #p1202006# likes to exaggerate and it worried me knowing that he has bouts of Alzheimer's, but I'm sure he helped you. He's been studying the skills of heroes for a very long time.", 8);
		break;
	case 1:
		qm.sendAcceptDecline("More than that, #p1202006#'s training methods were so good, it probably reminded your body of its old abilities. Though you were weakened by your long time in the ice, I'm confident that #bmany more abilities will awaken within you as you continue your training#k! \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 500 exp");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(21704).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(21704));
		qm.gainExp(500);
		qm.dispose();
}
}