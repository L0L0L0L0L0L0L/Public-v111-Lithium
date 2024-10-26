/*
	名字:	妖精羅雯的請求1
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
		if (status == 1 || status == 4) {
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
		qm.sendNext("I hear a #rkid with the Puppet#k appeared in the South Forest. I heard it from #p1032112#, so I'm certain of it. Apparently, the kid had a Dejected Green Mushroom Puppet before going into the dungeon, but it was gone when the kid left. I'm sure the Puppet will turn the #o1110100#s vicious again.");
		break;
	case 1:
		qm.sendYesNo("It would be great if we could catch the culprit, but #p1032112# says it'll be hard, because the culprit is so elusive. But we can't just leave the #o1110100#s! We must get the Puppet as soon as possible and change the South Forest back to the way it was. Will you help?");
		break;
	case 2:
		Packages.server.quest.MapleQuest.getInstance(21717).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendNext("Then, head over to the Secret Forest and eliminate the #o1110100#s. There is no way to tell which one has the Puppet. It could be with one of the #o1110100#s that has already become vicious, or it could be with a #o1110100# that has not yet changed.");
		break;
	case 3:
		qm.sendNextPrev("In the end, it doesn't matter. #rAny #o1110100##k will do as long as you defeat a total of #r100#k. They're all under the influence of the Puppet, so defeat as many as you can and retrieve the #bDejected Green Mushroom Puppet#k left by the kid.");
		break;
	case 4:
		qm.sendYesNo("Of course, I can send you to the Secret Forest with my magic. You want to go now, right?");
		break;
	case 5:
		qm.getPlayer().changeMap(qm.getMap(910100002), qm.getMap(910100002).getPortal(3));
		qm.dispose();
}
}