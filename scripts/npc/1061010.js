/*
	名字:	閃耀的水晶
	地圖:	異次元的世界
	描述:	910540500
*/

function start() {
	cm.sendYesNo("You can use the Sparking Crystal to go back to the real world. Are you sure you want to go back?");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.getPlayer().changeMap(cm.getMap(211040401), cm.getMap(211040401).getPortal(0));
		cm.dispose();
}