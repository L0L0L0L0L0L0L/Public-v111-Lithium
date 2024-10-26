/*
	名字:	從遠海抓回的奇怪生物
	地圖:	上層走廊
	描述:	120000100
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 1) {
		qm.sendNext("We need to do this for the sake of the Pirates. We can't let something like this go without figuring out how to destroy it!");
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
		qm.sendNext("I just don't get it...");
		break;
	case 1:
		qm.sendNextPrev("A few days ago, I caught this Strange Creature in the ocean, but for the life of me, I can't figure out what it is. It makes these weird noises, and vanishes if you attack it. If it can't be hit, I'm out of ideas...");
		break;
	case 2:
		qm.sendAcceptDecline("Why don't you figure this out? You want to try?");
		break;
	case 3:
		qm.sendNext("All right. Approach it with caution, and do what you can. If you learn anything, let me know immediately.");
		break;
	case 4:
		qm.sendNextPrev("When you're ready, let me know, and I'll toss you in the room where the Strange Creature is. Don't worry...I'll let you back out.");
		break;
	case 5:
		cm.getPlayer().changeMap(cm.getMap(912040300), cm.getMap(912040300).getPortal(1));
		qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2925)).setStatus(1);
		qm.getPlayer().updateQuest(qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2925)), true);
		qm.dispose();
}
}