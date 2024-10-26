/*
	名字:	瑞恩島
	地圖:	鏡子洞窟
	描述:	140030000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21201)).getStatus() > 0 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21202)).getStatus() < 2) {
		pi.getPlayer().changeMap(pi.getMap(914021000), pi.getMap(914021000).getPortal(1)); //大將翁的鐵舖
		Packages.server.quest.MapleQuest.getInstance(21203).forceStart(pi.getPlayer(), 0, 0); //給予接取21202任務條件
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21302)).getStatus() > 0 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21303)).getStatus() < 2) {
		pi.getPlayer().changeMap(pi.getMap(914022100), pi.getMap(914022100).getPortal(1)); //像刀刃的絕壁
		Packages.server.quest.MapleQuest.getInstance(21203).forceStart(pi.getPlayer(), 0, 1); //給予接取21303任務條件
		}
		return false;
}