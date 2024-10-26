/*
	名字:	阿們
	地圖:	殘暴炎魔祭壇
	描述:	280030000
*/

function start() {
	cm.sendYesNo("Are you sure you want to exit? If you come back, you'll have to start all over.");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.getPlayer().changeMap(cm.getMap(211042300), cm.getMap(211042300).getPortal(0));
		cm.dispose();
}