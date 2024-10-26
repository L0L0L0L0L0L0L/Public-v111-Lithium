/*
	名字:	找回遺失的記憶
	地圖:	勇士聖殿
	描述:	102000003
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
		qm.sendNext("--Looking at you now, I can feel the kind of aura that only the greatest warriors emit. Your name is-- #h0#? Hahaha, actually, that name sounds familiar! I do remember that name. You were one of those kids a long time ago that came to me wanting to become a warrior.");
		break;
	case 1:
		qm.sendNextPrev("And now, look at you. You are a powerful warrior in your own right! Honestly, I think it'll be quite a battle between you and me, Dances with Balrog. This is incredible-- and I knew you'd grow up to be a great warrior on your own.");
		break;
	case 2:
		qm.sendNextPrev("What I can tell you is-- keep going. As the person responsible for making you a warrior, I have no doubt in my mind that you still have room to grow-- and that you will become an even more powerful force.");
		break;
	case 3:
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(3523));
		Packages.server.quest.MapleQuest.getInstance(3523).forceComplete(qm.getPlayer(), qm.getNpc());
		Packages.server.quest.MapleQuest.getInstance(7081).forceStart(qm.getPlayer(), qm.getNpc(), 1);
		qm.dispose();
}
}