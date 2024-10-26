/*
	名字:	冰雪峽谷
	地圖:	冰雪峽谷入口
	描述:	921120000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3122)).getStatus() == 1) {
		pi.getPlayer().changeMap(pi.getMap(921120705), pi.getMap(921120705).getPortal(2)); //冰雪峽谷1
		}
		return false;
}