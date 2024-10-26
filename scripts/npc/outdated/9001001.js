/*
	名字:	北极熊露露
	地圖:	新葉城-市區中心
	描述:	600000000
*/

function start() {
	cm.sendSimple("#b\r\n#L0#甜蜜蛋糕山丘 1#l\r\n#L1#甜蜜蛋糕山丘 2#l");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.getPlayer().changeMap(cm.getMap(683000000 + selection * 1000000), cm.getMap(683000000 + selection * 1000000).getPortal(3));
		cm.dispose();
}