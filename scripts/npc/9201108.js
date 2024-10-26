/*
    Name:    Master Archer
    Map:     Unity Test
    Description:    610030500
*/

function start() {
	if (cm.getPlayer().getMap().getId() == 610030500) {
		cm.sendOk("Archers fight enemies from a distance and are masters of their environment. They skillfully use various terrains to control their enemies within their range. In the archer specialization room, a powerful creature is waiting for your arrival. Please eliminate all the monsters inside and retrieve the #bBow of Ancestors#k from the statue.");
		cm.dispose();
		return;
	}
	if (cm.getPlayer().getMap().getId() == 610030000) {
		cm.sendOk("Relic is the only known holy archer and one of the most famous heroes of the ancient Guardian Castle. It is said that he received a powerful blessing from a goddess, making him extremely accurate in long-range attacks. His enemies, in fear, could only keep their distance.");
		cm.dispose();
		return;
	}
	var eim = cm.getPlayer().getEventInstance();
	if (cm.getPlayer().getMap().getId() == 610030540) {
		if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() < 1) {
			if (eim.getProperty("stage5_3") == null) { // Condition check
				if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
					cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough slots in the other item inventory."));
					cm.dispose();
					return;
				}
				cm.gainItem(4001258, 1);
				eim.setProperty("stage5_3", 1);
				cm.sendOk("Please take the symbol of keen intelligence weapon.");
				cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The main weapon of the archer specialization room has been retrieved."));
				cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
				cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
				cm.dispose();
				return;
			}
			cm.sendOk("The weapon in the archer specialization room has already been found.");
			cm.dispose();
			return;
		}
		cm.sendOk("The Bow of Ancestors, the main weapon of the archer specialization room, is given only to keen hunters. Please eliminate all the #bmonsters#k in the room and then talk to me.");
	}
	cm.dispose();
}
