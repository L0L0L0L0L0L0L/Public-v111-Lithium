/*
	名字:	依菲雅
	地圖:	第五座塔樓
	描述:	211061001
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3173)).getStatus() == 1 || cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3175)).getStatus() == 1) {
		cm.getPlayer().changeMap(cm.getMap(211070200), cm.getMap(211070200).getPortal(3));
		cm.dispose();
		return;
		}
		cm.sendOk("Ugh... Ugh... Ugh... Ugh...\n");
		cm.dispose();
}