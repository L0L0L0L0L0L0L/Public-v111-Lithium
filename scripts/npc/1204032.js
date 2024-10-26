/*
	名字:	赫利娜
	地圖:	面臨危險的弓箭手教育園
	描述:	910050000
*/

function start() {
	if (cm.getPlayer().itemQuantity(4032328) < 1) {
		cm.sendNext("The letter the Master of Disguise dropped... That's the letter I was holding on to so I can give it to you. Don't forget.");
		cm.dispose();
		return;
		}
		cm.sendNext("Aran, have you retrieved the letter? Ah, what a relief. I knew you'd pull through.");
}

function action(mode, type, selection) {
	if (mode > 0) {
		Packages.server.quest.MapleQuest.getInstance(21765).forceStart(cm.getPlayer(), 0, 2);
		cm.getPlayer().changeMap(cm.getMap(100000201), cm.getMap(100000201).getPortal(1));
		cm.gainItem(4032328, -1);
		}
		cm.dispose();
}