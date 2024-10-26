/*
	名字:	卡帕萊特研究所
	地圖:	研究所B-3區
	描述:	261020600
*/

function enter(pi) {
	var map = pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3309)).getStatus() == 1 ? 926120000 : 261020700; //熄火的研究室
	pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(1));
	return true;
}