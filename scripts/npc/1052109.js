/*
	名字:	地鐵垃圾桶
	地圖:	沿著軌道
	描述:	103020100
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20710)).getStatus() == 1) {
	if (cm.getPlayer().itemQuantity(4032136)) {
		cm.sendNext("You already have the Found Bubbling.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Etc item inventory is full."));
		cm.dispose();
		return;
		}
		cm.sendNext("Found Bubbling Doll inside the trash can.");
		cm.gainItem(4032136, 1);
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2857)).getStatus() == 1) {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2857)).getCustomData() == null) {
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2857)).setCustomData("0000");
		}
		var progress = cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2857)).getCustomData();
		var slot = cm.getNpc() - 1052109;
		var ch = progress[slot];
	if (ch == '0') {
		var nextProgress = progress.substr(0, slot) + '1' + progress.substr(slot + 1);
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2857)).setCustomData(nextProgress);
		cm.getPlayer().updateQuest(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2857)), true);
		}
		}
		cm.sendOk("It's a completely normal trash can. Probably full of roaches and other horrors. I'm not touching it.");
		cm.dispose();
}