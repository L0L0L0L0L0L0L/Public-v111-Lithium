/*
	名字:	水泥路
	地圖:	埃德爾斯坦公園2
	描述:	310020100
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23126)).getStatus() > 0 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23127)).getStatus() < 2) {
		pi.getPlayer().changeMap(pi.getMap(931000440), pi.getMap(931000440).getPortal(2)); //人煙稀少的公園
		}
		return false;
}