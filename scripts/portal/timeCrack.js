/*
	名字:	時間神殿
	地圖:	時間裂縫
	描述:	272000000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31178)).getStatus() > 1) {
		pi.getPlayer().changeMap(pi.getMap(272020000), pi.getMap(272020000).getPortal(2)); //扭曲時間神殿1
		return true;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31167)).getStatus() > 0) {
		pi.getPlayer().changeMap(pi.getMap(272000100), pi.getMap(272000100).getPortal(1)); //燃燒的神木村1
		}
		return false;
}