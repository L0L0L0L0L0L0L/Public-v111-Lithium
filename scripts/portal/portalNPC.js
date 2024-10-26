/*
	名字:	獅子王城
	地圖:	見面室前走道
	描述:	211070000
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getId() != 211070100) {
		pi.openNpc(2161005);
		return true;
		}
		pi.getPlayer().changeMap(pi.getMap(211060801), pi.getMap(211060801).getPortal(1)); //第五座塔樓
		return true;
}