/*
	名字:	奇里督
	地圖:	奇里督王台
	描述:	130010220
*/

function start() {
	if (cm.getPlayer().itemQuantity(4220137)) {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20522)).getStatus() == 1 || cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20526)).getStatus() == 1) {
		cm.sendNext("If it is that difficult for you to take care of Mimiana until it hatches out of the egg, then there's only one thing we can do. Neinheart may not like it, but walking is not that bad of an alternative. For now, you should just forfeit the #bRaising Mimiana#k Quest, and then talk to me so I can take away your egg.");
		cm.dispose();
		return;
		}
		cm.sendNext("I know it's too bad, but it has come to this. If you wish to raise another one later, you're always welcome to see me.");
		cm.gainItem(4220137, -1);
		cm.dispose();
		return;
		}
		cm.sendOk("I don't understand what's you're saying.");
		cm.dispose();
}