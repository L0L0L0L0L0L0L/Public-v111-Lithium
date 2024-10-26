/*
	名字:	找回失去的回憶
	地圖:	精靈遊俠
	描述:	精靈遊俠
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
		qm.sendNextS("Memories...? From when? Perhaps when I battled the Black Mage with Aran, Freud, and the others? Or when we finally sealed the Black Mage? No...maybe before all that. When I became ruler of the Elves?", 16);
		break;
	case 1:
		qm.sendNextPrevS("It couldn't be when I awoke to find myself a helpless Level 10 monarch...could it? Memories can be so confusing...", 16);
		break;
	case 2:
		qm.sendNextPrevS("(You recalled your entire past, unsure of which memories to focus on. However, thinking over your life has filled you with warmth, and renewed your spirit.)", 16);
		break;
	case 3:
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(3543));
		Packages.server.quest.MapleQuest.getInstance(3543).forceComplete(qm.getPlayer(), qm.getNpc());
		Packages.server.quest.MapleQuest.getInstance(7081).forceStart(qm.getPlayer(), qm.getNpc(), 1);
		qm.dispose();
}
}