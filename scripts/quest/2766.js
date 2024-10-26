/*
	名字:	潘喜的測試1
	地圖:	巨大的樹木
	描述:	101030000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 0) {
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
		qm.sendNext("That's the spirit! Myou're ready to meowve on, nyever looking back! Meow, it is hard to talk like a humyan with this cat meowth. The teeth really get in the way. Wait a second, do myou smell fish?");
		break;
	case 1:
		qm.sendYesNo("Meow! Back to business! I want myou stronger, tougher, myore of a meownster! Ahem, go out and fight some #r#o9100015#s#k. I can tell myou, they will be WAY stronger than the #o2230100#s you fought before. I'd say about #r30#k of them should give myou a good work-meowt. I'll send myou there when myou're ready!");
		break;
	case 2:
		qm.sendNext("If myou want to get myout in the middle of the test, just talk to me. Good luck!");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(2766).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(910100110), qm.getMap(910100110).getPortal(0));
		qm.dispose();
}
}