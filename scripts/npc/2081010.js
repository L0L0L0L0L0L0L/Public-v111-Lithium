/*
	Name: Moss
	Map: Path to Training Grounds
	Description: 924000000
*/

function start() {
	cm.sendSimple("Note: You must wear a shield from the start to the end of the training grounds, otherwise you will need to start over." + (cm.getPlayer().getMap().getId() == 924000000 ? "\r\n#L0##bReceive #t1092041##l\r\n#L1#Enter #m924000000#l\r\n#L2#Leave here#l" : "\r\n#L2##bLeave here#l"));
}

function action(mode, type, selection) {
	switch (selection) {
		case 0:
			if (cm.getPlayer().itemQuantity(1092041) || cm.getPlayer().hasEquipped(1092041)) {
				cm.sendOk("You have already received #t1092041#.");
				cm.dispose();
				return;
			}
			if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
				cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough slots in the equipment inventory."));
				cm.dispose();
				return;
			}
			cm.gainItem(1092041, 1);
			break;
		case 1:
			if (cm.getPlayer().hasEquipped(1092041)) {
				if (cm.getMap(924000001).getCharacters().size() < 1) {
					cm.getMap(924000001).resetFully();
					cm.getPlayer().changeMap(cm.getMap(924000001), cm.getMap(924000001).getPortal(0));
					cm.getPlayer().startMapTimeLimitTask(1200, cm.getMap(924000000));
					cm.dispose();
					return;
				}
				cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Moss's training grounds are currently crowded. Please try again later."));
				cm.dispose();
				return;
			}
			cm.sendOk("Please equip the shield for skill learning until the end of the training grounds, otherwise you will need to start over.");
			break;
		case 2:
			var map = cm.getPlayer().getMap().getId() == 924000001 ? 924000000 : 240010400;
			cm.getPlayer().changeMap(cm.getMap(map), cm.getMap(map).getPortal(0));
			break;
	}
	cm.dispose();
}
