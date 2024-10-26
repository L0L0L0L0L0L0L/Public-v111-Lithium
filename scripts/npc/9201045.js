/*
    Name:    Hero Amias
    Map:     Stage 4 - Ultimate Champion
    Description:    670010500
*/

function start() {
	eim = cm.getPlayer().getEventInstance();
	switch(cm.getPlayer().getMap().getId()) {
		case 670010500:
			if (eim.getProperty("stage3") == null) {
				if (cm.getPlayer().itemQuantity(4031597) < 50) {
					cm.sendOk("Welcome to Stage 4 - Ultimate Champion. At this stage, the entire party needs to collect 50 #b#z4031597# from the nearby monsters. Current: #c4031597#");
					cm.dispose();
					return;
				}
				cm.gainItem(4031597, -50);
				eim.setProperty("stage3", 1);
				cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("gate", 2));
				cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
				cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
				cm.sendOk("The portal to the next stage has been opened. Please proceed to the next stage.");
				cm.dispose();
				return;
			}
			cm.sendOk("The portal to the next stage has been opened. Please proceed to the next stage.");
			cm.dispose();
			break;

		case 670010600:
			if (eim.getProperty("stage4") == null) {
				cm.sendOk("That was easy, wasn't it? Anyway, you're the first to reach this stage. The task for this stage: Survival!");
				cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
				cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
				eim.setProperty("stage4", 0);
				cm.dispose();
				return;
			}
			if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
				cm.sendOk("Passing through this door will lead to the great mage Barlog. Please wait for the party leader's arrangement.");
				cm.dispose();
				return;
			}
			cm.sendYesNo("Passing through this door will lead to the great mage Barlog. Are you prepared?");
			break;

		case 670010700:
			cm.sendOk("Welcome to Stage 6 - Love Trauma. This is the final challenge. Defeat #bBarlog the Mage#k, and you'll enter the reward stage.");
			cm.dispose();
			break;
	}
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.warpParty(670010700, 13);
	cm.dispose();
}
