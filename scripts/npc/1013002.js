/*
	名字:	龍的巢穴
	地圖:	遺失的森林
	描述:	900020220
*/

function start() {
	Packages.server.quest.MapleQuest.getInstance(22011).forceComplete(cm.getPlayer(), 0);//打開技能欄龍蛋效果
	cm.getPlayer().changeMap(cm.getMap(900090103), cm.getMap(900090103).getPortal(0));
	cm.dispose();
}