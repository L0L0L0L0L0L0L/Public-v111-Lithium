/*
	名字:	南邊秘密的森林的綠菇菇
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
		if (status > 2) {
		qm.sendNext("If you don't go to the Secret Forest, you won't be able to find out why the #o1110100# have become so vicious.");
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
		qm.sendNext("I don't know how you knew, but you're right. The #o1110100#s in the South Forest have been becoming more and more vicious. It's so strange that they've become so evil.");
		break;
	case 1:
		qm.sendNextPrev("But according to the rumors, things like this are happening in other places, as well. So, I looked into it a little more and found out that it has to do with a puppet. Isn't that weird?");
		break;
	case 2:
		qm.sendNextPrev("I don't know if the rumors are true, but it may have to do with #o1110100#s this time, too. I know you're curious about why the #o1110100#s have become so vicious, so could you join me in the investigation?");
		break;
	case 3:
		qm.sendAcceptDecline("I need to find out if the reason the #o1110100#s have changed is because of a puppet. Please defeat #r25 #o1110130#s#k and find the #b#o1110130# puppet#k.");
		break;
	case 4:
		Packages.server.quest.MapleQuest.getInstance(21714).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendYesNo("Thank you. If I use my magic, I can send you to the Secret Forest, where the #o1110100#s live. Would you like to go there now?");
		break;
	case 5:
		qm.getPlayer().changeMap(qm.getMap(910100002), qm.getMap(910100002).getPortal(3));
		qm.dispose();
}
}