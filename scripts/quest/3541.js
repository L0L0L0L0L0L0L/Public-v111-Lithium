/*
	名字:	尋找遺失的記憶
	地圖:	秘密廣場
	描述:	310010000
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
		qm.sendNext("Long time, no see, #h0#. I heard you left Edelstein to grow stronger... What brings you here?");
		break;
	case 1:
		qm.sendNextPrev("Memories? Are you talking about our past together? I can think of a few, but the one I remember most vividly is when you first came by the Underground Base, saying you wanted to become part of the Resistance. You were but a novice then... Look how strong you've become. Oh, how time flies!");
		break;
	case 2:
		qm.sendNextPrev("But, I don't think it's quite the time for us to sit back and reminisce. We're still in the middle of battle. Why don't we talk about our memories after the Black Wings are defeated and our town is recovered? Then, we can talk and laugh all night long...");
		break;
	case 3:
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(3541));
		Packages.server.quest.MapleQuest.getInstance(3541).forceComplete(qm.getPlayer(), qm.getNpc());
		Packages.server.quest.MapleQuest.getInstance(7081).forceStart(qm.getPlayer(), qm.getNpc(), 1);
		qm.dispose();
}
}