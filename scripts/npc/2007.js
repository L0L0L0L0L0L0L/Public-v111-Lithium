/*
	名字:	楓之島
	地圖:	小菇菇
	描述:	10000
*/

function start() {
	if (!cm.getPlayer().getMap().containsNPC(1057001)) {
		cm.getPlayer().getMap().spawnNpc(1057001, new java.awt.Point(-225, 485));
		}
		cm.dispose();
}