/*
	名字:	末日反抗軍的訓練生
	地圖:	秘密廣場
	描述:	310010000
*/

var status = -1;

function end(mode, type, selection) {
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23100)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(23100).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("We meet again. Congratulations on becoming a member of the Resistance! I've had my eye on you. I believe #p2151001# sensed potential in you when they sent you here.");
			break;
	case 1:
		qm.sendNextPrev("Well, since you're part of our group now, you should train and level up. I'll teach you what you need to know to be a contributing member of the Resistance.");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(23100).forceComplete(qm.getPlayer(), qm.getNpc());
		Packages.server.quest.MapleQuest.getInstance(23128).forceStart(qm.getPlayer(), qm.getNpc(), 1);
		qm.dispose();
}
}