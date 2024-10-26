/*
	名字:	埃德爾斯坦佈告欄
	地圖:	埃德爾斯坦
	描述:	310000000
*/

function start() {
	if (!cm.getPlayer().itemQuantity(4032783)) {
		cm.sendOk("It's a message board for Edelstein's Free Market. Supposedly, anyone can put up a poster, but the board is covered with propaganda about the Black Wings.");
		cm.dispose();
		return;
		}
		Packages.server.quest.MapleQuest.getInstance(23006).forceStart(cm.getPlayer(), 0, 1);
		cm.sendNext("You pin the poster to the message board.");
		cm.gainItem(4032783, -1);
		cm.dispose();
}