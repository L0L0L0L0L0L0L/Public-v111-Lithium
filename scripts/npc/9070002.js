/*
	名字:	BP交換機
	地圖:	戰鬥廣場
	描述:	960000000
*/

function start() {
	var chat = "Currently there are #r" + cm.getPlayer().getBattlePoints() + "BP#b";
	chat += "\r\n#L0##v4310015##t4310015# x 1 (500BP)";
	chat += "\r\n#L1##v4310015##t4310015# x 4 (1500BP)";
	chat += "\r\n#L2##v4310015##t4310015# x 7 (2500BP)";
	cm.sendSimple(chat);
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getPlayer().getBattlePoints() < (selection < 1 ? 500 : selection < 2 ? 1500 : 2500)) {
			cm.sendOk("Check if you have the correct BP.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough space in your inventory."));
			cm.dispose();
			return;
			}
			cm.getPlayer().setBattlePoints(cm.getPlayer().getBattlePoints() - (selection < 1 ? 500 : selection < 2 ? 1500 : 2500));
			cm.gainItem(4310015, (selection < 1 ? 1 : selection < 2 ? 4 : 7));
			}
			cm.dispose();
}