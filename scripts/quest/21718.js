/*
	名字:	妖精羅雯的請求2
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
		if (status == 1 || status == 3) {
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
		qm.sendNext("I hear that kid appeared in the South Forest again. This time, #p1032112# even tried to stop the kid, but I guess the little scamp threatened to break off all of its branches. After that, #p1032112# says the kid disappeared in the blink of an eye.");
		break;
	case 1:
		qm.sendYesNo("It would be great if we could catch the culprit, but #p1032112# says it'll be hard, because the culprit is so elusive. But we can't just leave the #o1110100#s! We must get the Puppet as soon as possible and change the South Forest back to the way it was. Will you help?");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(21718).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendNext("Please go back to the Secret Forest one more time... Defeat #rwhichever 100 #o1110100#s#k you can and retrieve the #bDejected Green Mushroom Puppet#k. You've done it before, so it shouldn't take you too long.");
		break;
	case 3:
		qm.sendYesNo("Of course, I can send you to the Secret Forest with my magic. You want to go now, right?");
		break;
	case 4:
		qm.getPlayer().changeMap(qm.getMap(910100002), qm.getMap(910100002).getPortal(3));
		qm.dispose();
}
}