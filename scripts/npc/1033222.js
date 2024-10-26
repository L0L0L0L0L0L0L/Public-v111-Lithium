/*
	名字:	赫麗娜
	地圖:	受到攻擊的弓箭手村右側
	描述:	910080010
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
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
		cm.sendNext("What was that noise, Your Highness? Were you attacked?");
		break;
	case 1:
		cm.sendNextPrev("Who would do this inside of town? Let's go inside and discuss this.");
		break;
	case 2:
		cm.dispose();
		cm.getPlayer().changeMap(cm.getMap(100000201), cm.getMap(100000201).getPortal(0));
		Packages.server.quest.MapleQuest.getInstance(24095).forceStart(cm.getPlayer(), 0, 1);
}
}