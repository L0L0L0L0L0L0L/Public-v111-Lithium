function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3421)).getStatus() == 1) {
		var meteoriteId = cm.getNpc() - 2050014;

		var progress = cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3421)).getCustomData();
		if ((progress >> meteoriteId) % 2 == 0 || (progress == 63 && cm.getPlayer().itemQuantity(4031117) < 6)) {
			if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
				cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough slots in the Other Items inventory."));
				cm.dispose();
				return;
			}
			progress |= (1 << meteoriteId);

			cm.gainItem(4031117, 1);
			cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3421)).setCustomData(progress);
			cm.sendOk("Found a piece of meteorite #v4031117#.");
		}
	}
	cm.dispose();
}
