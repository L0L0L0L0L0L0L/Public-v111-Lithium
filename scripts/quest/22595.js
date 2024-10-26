/*
	名字:	第三個任務的結果
	地圖:	玩具城
	描述:	220000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 2) {
		qm.sendNext("Huh? I thought you were interested in knowing more about the #o9300390#? I thought you were a friend... aren't you?");
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
		qm.sendNext("Hi there. I'm a #m220000000# Guard and my name is #p2041004#. Is there something I can help you with? Huh? What, the #o9300390#?!");
		break;
	case 1:
		qm.sendAcceptDecline("Shhhhh! How do you know about the #o9300390#? I'm an undercover guard watching over the secret Safe, so that's how I know about it. Um... Well, ok, anyway, I can tell you about the #o9300390#. \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 23000 exp");
		break;
	case 2:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22595)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(22595).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(22595));
			qm.gainExp(5300);
			}
			qm.sendNext("The #o9300390# was broken into by someone some time ago, and broke as a result. #bNo one was watching the secret Safe at the time, and so a burglar came in and stole the treasure#k. No one knows what kind of a treasure it was, but...it's a big deal.");
			break;
	case 3:
		qm.sendPrev("Uh... why are you making such a scary face? Please remember, this issue must be kept a secret so please watch what you say!");
		break;
	case 4:
		qm.dispose();
}
}