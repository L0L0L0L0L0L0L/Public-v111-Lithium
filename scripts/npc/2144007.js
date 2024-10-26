/*
	名字:	歐尼斯龍蛋
	地圖:	燃燒的神木村5
	描述:	272000500
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31173)).getStatus() != 1 || cm.getPlayer().itemQuantity(4033081)) {
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Please check and see if you have an empty slot available at your etc. inventory."));
		cm.dispose();
		return;
		}
		cm.sendNextS("The egg is safe. Please, take good care of it.", 4, 2144006);
		Packages.server.quest.MapleQuest.getInstance(31184).forceStart(cm.getPlayer(), cm.getNpc(), 1); //隱藏NPC效果
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You obtained the Last Onyx Dragon Egg."));
		cm.gainItem(4033081, 1);
		cm.dispose();
}