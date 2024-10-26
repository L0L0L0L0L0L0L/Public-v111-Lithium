/*
	名字:	特力的藥
	地圖:	特力的研究室
	描述:	926120200
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 1) {
		qm.sendOk("There are really quite a lot of hazards in here. Please get out.");
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
		qm.sendNext("Whew... This research is not going anywhere... In fact, it's pretty much all over. I found out that it's practically impossible to transmute the human body with all the memories intact... However, I seem to have stumbled upon something even better.");
		break;
	case 1:
		qm.sendNextPrev("This medicine is for my daughter, Keeny. She has always been very weak, you see. I've discovered it's a genetic trait, one I can correct... with this!");
		break;
	case 2:
		qm.sendAcceptDecline("I'm quite proud of this breakthrough. I cannot change humans into machines, but I can give the weak strength. In the long run, this will be a greater benefit to the world, I think. Now that I have shared my breakthrough with you, I must ask you to leave. The lab is still in disarray and I do not need you breaking anything.");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(3354).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(261020401), qm.getMap(261020401).getPortal(0));
		qm.dispose();
}
}