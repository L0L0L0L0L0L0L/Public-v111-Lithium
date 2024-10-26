/*
    Name:    Master Thief
    Map:     Unity Test
    Description:    610030500
*/

function start() {
	if (cm.getPlayer().getMap().getId() == 610030500) {
		cm.sendOk("Thieves are an intriguing and fascinating class. The effectiveness of your operations depends on your mastery of the thief profession. This includes many aspects, and you will grasp it as you gain knowledge and experience. So, to best illustrate this, please destroy all the watchful eyes in the thief specialization room and retrieve the #bOriginal Claw#k from the statue.");
		cm.dispose();
		return;
	}
	if (cm.getPlayer().getMap().getId() == 610030000) {
		cm.sendOk("Hanslaf, once known as the Shadow Prince, is one of the most famous thieves, adept with short daggers and long chains, possessing superhuman speed and deadly attacks, making him difficult for enemies to defend against. His birth and growth have always been a mystery, and no one knows his past.");
		cm.dispose();
		return;
	}
	var eim = cm.getPlayer().getEventInstance();
	if (cm.getPlayer().getMap().getId() == 610030530) {
		if (cm.getPlayer().getMap().getReactorByName("thief0").getState() > 0 && cm.getPlayer().getMap().getReactorByName("thief1").getState() > 0 && cm.getPlayer().getMap().getReactorByName("thief2").getState() > 0 && cm.getPlayer().getMap().getReactorByName("thief3").getState() > 0 && cm.getPlayer().getMap().getReactorByName("thief4").getState() > 0) {
			if (eim.getProperty("stage5_4") == null) { // Condition check
				if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
					cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough slots in the other item inventory."));
					cm.dispose();
					return;
				}
				cm.gainItem(4001256, 1);
				eim.setProperty("stage5_4", 1);
				cm.sendOk("Please take the symbol of agility weapon.");
				cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The main weapon of the thief specialization room has been retrieved."));
				cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
				cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
				cm.dispose();
				return;
			}
			cm.sendOk("The main weapon of the thief specialization room has already been taken.");
			cm.dispose();
			return;
		}
		cm.sendOk("The Original Claw, the main weapon of the thief specialization room, is only given to agile thieves. Please destroy #ball the watchful eyes#k in the room and then talk to me.");
	}
	cm.dispose();
}
