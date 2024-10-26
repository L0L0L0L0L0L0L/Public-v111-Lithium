/*
	名字:	潘喜
	地圖:	潘喜的測試空間1
	描述:	910100110
*/

function start() {
	cm.sendYesNo("喵！喵！你打算從這裡出去了嗎？");
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendOk("快點！多打點怪物！喵！！@");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(101030000), cm.getMap(101030000).getPortal(0));
		}
		cm.dispose();
}