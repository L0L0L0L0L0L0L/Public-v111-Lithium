/*
	名字:	易德的發明物品
	地圖:	魔法森林
	描述:	101000000
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
		qm.sendYesNo("Actually...before we talk about the dolls, I require a favor. Nothing comes free, after all...especially when evil is involved. Will you do what I ask in return for the information you want?");
		break;
	case 1:
		qm.sendNext("I take care of Summoned Pigmy in Ellinia for a living. If Summoned Pigmy eats a special grass called Pygmy Grass, it can lay better eggs.");
		break;
	case 2:
		qm.sendNextPrev("So, go feed my Summoned Pigmy that grass, and return. Lupins live there, so you'll have to be careful. Those Lupins will surely mess with my Summoned Pigmy. I hate those things.");
		break;
	case 3:
		qm.sendNextPrev("I'll send you and #bSummoned Pigmy#k to where the grass is. Once #bSummoned Pigmy#k finishes eating, you'll both automatically return to the village. It shouldn't take more than #r3 minutes#k, I think.");
		break;
	case 4:
		var em = qm.getEventManager("Protectflyingpigs");
		var prop = em.getProperty("state");
		if (prop == null || prop == 0) {
			em.startInstance(qm.getPlayer());
			Packages.server.quest.MapleQuest.getInstance(2778).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendNext("Ah... please wait. I think someone else is in there right now. Please come back in a bit.");
			qm.dispose();
}
}