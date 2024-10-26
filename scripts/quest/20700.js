/*
	名字:	可以就這樣下去嗎？
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
		if (status < 2) {
		qm.sendNext("When will you realize how weak you are... When you get yourself in trouble in Victoria Island?");
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
		qm.sendNext("You have finally become a Knight-in-Training. I'd like to give you a mission right away, but you still look miles away from even being able to handle a task on your own. Are you sure you can even go to Victoria Island like this?");
		break;
	case 1:
		qm.sendAcceptDecline("It's up to you to head over to Victoria Island, but a Knight-in-Training that can't take care of one's self in battles is likely to cause harm to the Empress's impeccable reputation. As the Head Tactician of this island, I can't let that happen, period. I want you to keep training until the right time comes.");
		break;
	case 2:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20700)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(20700).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(20700));
			}
			qm.sendNext("Kiku, the Training Instructor, will help you train into a serviceable knight. Once you reach Level 13, I'll assign you a mission or two. So until then, keep training.");
			break;
	case 3:
		qm.sendPrev("Oh, and are you aware that if you strike a conversation with Shinsoo, she'll give you a blessing? The blessing will definitely help you on your journey.");
		break;
	case 4:
		qm.dispose();
}
}