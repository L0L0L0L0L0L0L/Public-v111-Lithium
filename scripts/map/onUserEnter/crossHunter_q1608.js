/*
	名字:	隱藏地圖
	地圖:	奇怪的通道
	描述:	931050410
*/

function start() {
	if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1608)).getStatus() < 2) {
		ms.getPlayer().getMap().spawnNpc(9073000, new java.awt.Point(-600, 169));
		}
		ms.dispose();
}