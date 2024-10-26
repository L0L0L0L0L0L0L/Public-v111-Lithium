/*
	名字:	選擇的歧路
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
		qm.sendAcceptDecline("Ahhh, you're back. I can see that you're at level 10 now. It looks like you're flashing a glimmer of hope towards becoming a Knight. The basic training has now ended, and it's time for you to make the decision.");
		break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(20100).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(20100));
		qm.sendOk("Now look to the left. The leaders of the Knights will be waiting for you. There will be 5 paths for you to choose from. All you need to do is choose one of them. All 5 of them will lead you to the path of a Knight, so... I suggest you pay attention to what each path offers, and select the one you'd most like to take.");
		break;
	case 2:
		qm.dispose();
}
}