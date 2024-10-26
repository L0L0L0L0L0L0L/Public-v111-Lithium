/*
	名字:	士兵安德森
	地圖:	遺棄之塔&amp;lt;冒險的終結&gt;
	描述:	922010000
*/

var item = [4001022, 4001023];

function start() {
	if (cm.getPlayer().getMap().getId() == 922010000)
		cm.sendYesNo("你準備好離開#b#m" + cm.getPlayer().getMap().getId() + "##k了嗎？");
	else
		cm.sendYesNo("確定要離開#b#m" + cm.getPlayer().getMap().getId() + "##k嗎？");
}

function action(mode, type, selection) {
	if (mode > 0) {
		for (var i = 0; i < item.length; i++)
		cm.removeAll(item[i]);
		map = cm.getPlayer().getMap().getId() == 922010000 ? 221023300 : 922010000;
		cm.getPlayer().changeMap(cm.getMap(map), cm.getMap(map).getPortal(0));
		}
		cm.dispose();
}