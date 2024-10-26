/*
	名字:	找回遺失的記憶
	地圖:	墮落城市酒吧
	描述:	103000003
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
		qm.sendNext("The way you moved without a trace...you must have exceptional talent. Long time no see, #h0#.");
		break;
	case 1:
		qm.sendNextPrev("Since when did you grow up to this point? You're no less inferior to any Dark Lord. You were just a greenhorn that couldn't even hide their presence...Hmph, well, it's been a while since then. Still, it feels weird to see you become so strong. I guess this is how it feels to be proud.");
		break;
	case 2:
		qm.sendNextPrev("But don't let your guard down. Know that there's still more progress to be made. As the one who has made you into a thief, I know you that you can be even stronger...!");
		break;
	case 3:
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(3526));
		Packages.server.quest.MapleQuest.getInstance(3526).forceStart(qm.getPlayer(), qm.getNpc(), null);
		Packages.server.quest.MapleQuest.getInstance(7081).forceStart(qm.getPlayer(), qm.getNpc(), 1);
		qm.dispose();
}
}