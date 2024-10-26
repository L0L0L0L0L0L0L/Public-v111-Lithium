/*
	名字:	乳牛
	地圖:	鯨魚號牛舍
	描述:	912000100
*/

function start() {
	if (cm.getPlayer().itemQuantity(4033048)) {
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2905)).getCustomData() == "11") {
		cm.sendNext("After you gave food to the Baby Cows, Mama Cow gave you Milk.");
		cm.gainItem(4033048, 1);
		cm.dispose();
		return;
		}
		cm.sendOk("Mama Cow is not hungry. Give Hay to the Baby Cow.");
		cm.dispose();
}