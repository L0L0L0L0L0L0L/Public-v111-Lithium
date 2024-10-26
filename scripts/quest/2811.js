/*
	名字:	奇怪的禮物
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
		qm.sendYesNo("Want to see what's in the gift box? Let's open it together!");
		break;
	case 1:
		qm.sendNext("I wonder what could be inside?");
		break;
	case 2:
		if (qm.getMap(910220100).getCharacters().size() < 1) {
			Packages.server.quest.MapleQuest.getInstance(2811).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.getMap(910220100).resetFully();
			qm.getPlayer().changeMap(qm.getMap(910220100), qm.getMap(910220100).getPortal(0));
			qm.getPlayer().startMapTimeLimitTask(300, qm.getMap(102000003));
			qm.dispose();
			return;
			}
			qm.sendNext("Ah... please wait.");
			qm.dispose();
}
}

function end(mode, type, selection) {
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
		if (qm.getMap().getAllMonstersThreadsafe().size() > 0) {
			qm.sendOk("Eliminate all the Stump here. Even you should be able to handle this.");
			qm.dispose();
			return;
			}
			qm.sendNext("Your training really paid off! I assume this is the work of Blackbull. 10 Boogies isn't smart enough to--I mean, she's too kind and innocent to do such a thing. But Blackbull? Yeah.");
			break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(2811).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getPlayer().changeMap(qm.getMap(102000003), qm.getMap(102000003).getPortal(0));
		qm.gainExp(486);
		qm.dispose();
}
}