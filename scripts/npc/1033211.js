/*
	名字:	精靈豎琴
	地圖:	國王休息處
	描述:	101050010
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24010)).getStatus() > 0) {
		cm.getPlayer().changeMap(cm.getMap(910150100), cm.getMap(910150100).getPortal(1));
		}
		cm.dispose();
}