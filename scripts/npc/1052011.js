/*
	名字:	出口
	地圖:	第1區域
	描述:	910360000
*/

function start() {
	cm.sendYesNo("This device is connected to outside. Are you going to give up and leave this place? You'll have to start from scratch the next time you come in...");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.getPlayer().changeMap(cm.getMap(103020000), cm.getMap(103020000).getPortal(2));
		cm.dispose();
}