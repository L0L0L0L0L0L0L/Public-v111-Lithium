/*
    Name:    Master Warrior
    Map:     Unity Test
    Description:    610030500
*/

function start() {
	if (cm.getPlayer().getMap().getId() == 610030500) {
		cm.sendOk("Warriors are the most valiant and battle-ready fighters, characterized by their tough and proud nature, with a burning desire for victory in their hearts. They always charge into the front lines of battle, and their unyielding will makes their opponents tremble with fear. Therefore, the warrior specialization room is a brutal place. Please defeat all the monsters inside, reach the warrior statue, and retrieve the #bSword of the Master#k.");
		cm.dispose();
		return;
	}
	if (cm.getPlayer().getMap().getId() == 610030000) {
		cm.sendOk("The Devlin family is a legendary hero family and the founders of the Storm Warriors. This family is unique because every son or daughter inherits all the combat skills of their ancestors. A warrior with extensive combat experience switches between various fighting styles, making them artists of war.");
		cm.dispose();
		return;
	}
	var eim = cm.getPlayer().getEventInstance();
	if (cm.getPlayer().getMap().getId() == 610030510) {
		if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() < 1) {
			if (eim.getProperty("stage5_1") == null) { // Condition check
				if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
					cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough slots in the other item inventory."));
					cm.dispose();
					return;
				}
				cm.gainItem(4001259, 1);
				eim.setProperty("stage5_1", 1);
				cm.sendOk("Please take the symbol of courage weapon.");
				cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The main weapon of the warrior specialization room has been retrieved."));
				cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
				cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
				cm.dispose();
				return;
			}
			cm.sendOk("The main weapon in the warrior specialization room has already been taken.");
			cm.dispose();
			return;
		}
		cm.sendOk("The Sword of the Master, the main weapon of the warrior specialization room, is given only to warriors with fearless courage. Please eliminate all the #bmonsters#k in the room and then talk to me.");
	}
	cm.dispose();
}
