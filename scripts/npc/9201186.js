/*
	名字:	升降梯電腦
	地圖:	外星基地電梯
	描述:	610040300
*/

function start() {
	if (cm.getPlayer().itemQuantity(4033192))
		cm.sendNext("Arrived at Alien Matter-Cloner. You may get off now.");
	else
		cm.sendYesNo("Alein ID card is required to move to Alien Matter-Cloner Exit now?");
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getPlayer().itemQuantity(4033192)) {
			cm.gainItem(4033192, -1);
			cm.getPlayer().changeMap(cm.getMap(610040800), cm.getMap(610040800).getPortal(0));
			cm.dispose();
			return;
			}
			cm.getPlayer().changeMap(cm.getMap(610040230), cm.getMap(610040230).getPortal(2));
			}
			cm.dispose();
}