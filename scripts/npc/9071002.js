/*
	名字:	梅里
	地圖:	怪物公園
	描述:	951000000
*/

function start() {
	var chat = "Welcome to Monster Park. To enter the park to participate in activities, you need to redeem the corresponding tickets with me. #b";
    chat += "\r\n#L0# Exchange#z4001514#";
    chat += "\r\n#L1# Exchange#z4001516#";
    chat += "\r\n#L2# Exchange#z4001522#";
	cm.sendSimple(chat);
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getPlayer().itemQuantity(selection < 1 ? 4001513 : selection < 2 ? 4001515 : 4001521) < 10) {
			cm.sendOk("To redeem the admission ticket, you need 10 #b#z" + (selection < 1 ? 4001513 : selection < 2 ? 4001515 : 4001521) + "##k fragments.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough space in your inventory."));
			cm.dispose();
			return;
			}
			cm.gainItem((selection < 1 ? 4001514 : selection < 2 ? 4001516 : 4001522), 1);
			cm.gainItem((selection < 1 ? 4001513 : selection < 2 ? 4001515 : 4001521), -10);
			cm.sendOk("Please grab your tickets and look forward to your next visit.");
			}
			cm.dispose();
}