/*
	名字:	找回失去的回憶
	地圖:	鯨魚號碼頭
	描述:	120000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		qm.sendNext("Oh, it's been a while, #h #. I've heard you left the Nautilus and became more active. You're the best Cannoneer that I've ever found. Hahaha!");
		break;
	case 1:
		qm.sendNextPrev("Memories? Our memories... That must be when we first met. You were a useless rookie that cried about encountering a Balrog after drifting ashore on Coco Island... You've grown strong so fast.");
		break;
	case 2:
		qm.sendNextPrev("(Cutter smiles as he looked towards the distant skies while reminiscing... Tears began welling up in his eyes as he recalled these memories.)");
		break;
	case 3:
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(3542));
		Packages.server.quest.MapleQuest.getInstance(3542).forceStart(qm.getPlayer(), qm.getNpc(), null);
		Packages.server.quest.MapleQuest.getInstance(7081).forceStart(qm.getPlayer(), qm.getNpc(), 1);
		qm.dispose();
}
}