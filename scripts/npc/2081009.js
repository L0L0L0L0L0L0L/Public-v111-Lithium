/*
	Name: Moss
	Map: Forest Crossroads
	Description: 240010400
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(6180)).getStatus() != 1) {
		cm.sendOk("Do you want to learn the shield techniques? If you meet the conditions, you can train here.");
		cm.dispose();
		return;
	}
	cm.getPlayer().changeMap(cm.getMap(924000000), cm.getMap(924000000).getPortal(0));
	cm.dispose();
}
