/*
	名字:	說話的樹
	地圖:	詭異的黑斧木妖的出現地
	描述:	910100100
*/

function start() {
	cm.sendYesNo("我的朋友，你準備離開#b#m" + cm.getPlayer().getMap().getId() + "##k了嗎？");
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendOk("再幫我多消滅一些！");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(101010000), cm.getMap(101010000).getPortal(0));
		}
		cm.dispose();
}