/*
	名字:	伊培賀
	地圖:	青蛙嘴的家
	描述:	922030000
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22582)).getStatus() != 1) {
		cm.sendOk("You can't go there any time you want. It's special.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().itemQuantity(4000594) > 99) {
		cm.sendOk("It looks like you've collected all the materials.");
		cm.dispose();
		return;
		}
		cm.sendNext("You will be moved to Spirits' Playground.");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.getPlayer().changeMap(cm.getMap(922030002), cm.getMap(922030002).getPortal(1));
		cm.dispose();
}