/*
	名字:	盲俠
	地圖:	上層走廊
	描述:	120000100
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2925)).getStatus() != 1) {
		cm.sendOk("Hey, this isn't a zoo! You got business in there?");
		cm.dispose();
		return;
		}
		cm.getPlayer().changeMap(cm.getMap(912040300), cm.getMap(912040300).getPortal(1));
		cm.dispose();
}