/*
    Name:    Master Mage
    Map:     Unity Test
    Description:    610030500
*/

function start() {
	if (cm.getPlayer().getMap().getId() == 610030500) {
		cm.sendOk("Mages use mysterious spells to destroy their enemies. Although they employ powerful offensive magic, mages have relatively weak armor and low defense, making them particularly vulnerable to close-range attacks. A savvy mage will skillfully use spells to keep enemies at a distance or control their positioning. Therefore, the mage specialization room is a twisted chamber where you need to adeptly use your abilities to eliminate all monsters in the room and retrieve the #bStaff of Origins#k from the mage statue.");
		cm.dispose();
		return;
	}
	if (cm.getPlayer().getMap().getId() == 610030000) {
		cm.sendOk("Maganna is a name remembered forever for being an exceptionally successful mage. Her mastery of mind magic and telepathy has reached the pinnacle of skill. Besides that, she is one of the elite mages proficient in all forms of magic. It is said that the last time she was seen was on the battlefield defending against the invading Kragias army.");
		cm.dispose();
		return;
	}
	var eim = cm.getPlayer().getEventInstance();
	if (cm.getPlayer().getMap().getId() == 610030521) {
		if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() < 1) {
			if (eim.getProperty("stage5_2") == null) { // Condition check
				if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
					cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough slots in the other item inventory."));
					cm.dispose();
					return;
				}
				cm.gainItem(4001257, 1);
				eim.setProperty("stage5_2", 1);
				cm.sendOk("Please take the symbol of wisdom weapon.");
				cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The main weapon of the mage specialization room has been retrieved."));
				cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
				cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
				cm.dispose();
				return;
			}
			cm.sendOk("The main weapon of the mage specialization room has already been taken.");
			cm.dispose();
			return;
		}
		cm.sendOk("The Staff of Origins, the main weapon of the mage specialization room, is given only to wise mages. Please eliminate all the #bmonsters#k in the room and then talk to me.");
	}
	cm.dispose();
}
