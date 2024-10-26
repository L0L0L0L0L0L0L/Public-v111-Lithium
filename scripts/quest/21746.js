/*
	名字:	武公的測試
	地圖:	武陵道場後路
	描述:	925040000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 1) {
		qm.sendNext("If you object to my test, that must mean you don't have confidence in yourself. I can't tell anything about the Seal Stone to someone like that.");
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
		qm.sendNextS("Seal Stone... It's an item that has been protected in #m250000000# for a long time. And now, someone is after it.", 8);
		break;
	case 1:
		qm.sendNextPrevS("Please tell me everything you know about the Seal Stone.", 2);
		break;
	case 2:
		qm.sendAcceptDecline("I can't do that. How do I know that you're not as dangerous as #o9300351#? I must first test you. Do you want to take my #btest#k?");
		break;
	case 3:
		if (qm.getMap(925040001).getCharacters().size() < 1) {
			Packages.server.quest.MapleQuest.getInstance(21746).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.getMap(925040001).resetFully();
			qm.getPlayer().changeMap(qm.getMap(925040001), qm.getMap(925040001).getPortal(1));
			qm.dispose();
			return;
			}
			qm.sendNext("Hmm, someone is already using the special floor at the Mu Lung Dojo. Please wait.");
			qm.dispose();
}
}