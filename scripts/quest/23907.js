/*
	名字:	利琳的反應
	地圖:	裡恩
	描述:	140000000
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
		qm.sendAcceptDecline("Aran? What are you doing here in Rien? Shouldn't you be off somewhere training to defeat the Black Mage? What? You have new information about the Black Wings?");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23907)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(23907).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(23907));
			qm.gainExp(1200);
			}
			qm.sendNext("It does seem like the Black Wings have made that town their stronghold. I knew they weren't a small organization, but I had no idea they were that large...");
			break;
	case 2:
		qm.sendPrev("Hm, continue to watch them, but don't reveal who you are. And definitely don't initiate combat with them. Although you are a hero, I don't think you can handle all the Black Wings at once. No, gather information and we'll see what we can do down the line.");
		break;
	case 3:
		qm.dispose();
}
}