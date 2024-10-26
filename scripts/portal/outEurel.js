/*
	名字:	精靈之林
	地圖:	櫻花處
	描述:	101050000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24040)).getStatus() == 1 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24093)).getStatus() != 1) {
		pi.openNpc(1033205);
		return true;
		}
		pi.getPlayer().changeMap(pi.getMap(101050100), pi.getMap(101050100).getPortal(2)); //發光的洞穴之路
		return true;
}