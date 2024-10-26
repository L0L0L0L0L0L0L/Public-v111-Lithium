/*
	名字:	閘門
	地圖:	大師的大廳
	描述:	610030010
*/

function start() {
	cm.getPlayer().changeMap(cm.getMap(610030020), cm.getMap(610030020).getPortal(3));
	cm.dispose();
}