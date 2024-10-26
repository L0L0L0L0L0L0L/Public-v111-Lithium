/*
	名字:	日落之路
	地圖:	瑪迦提亞城
	描述:	261000000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(7072)).getStatus() < 1) {
		Packages.server.quest.MapleQuest.getInstance(7072).forceStart(pi.getPlayer(), 0, 1);
		}
		pi.getPlayer().changeMap(pi.getMap(926130000), pi.getMap(926130000).getPortal(2)); //猶利塔的研究室
		return true;
}