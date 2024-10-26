/*
	名字:	小豬
	地圖:	茂盛的森林
	描述:	900020100
*/

function start() {
	if (cm.getPlayer().getMap().getId() == 900020100) {
		cm.sendOk("#b(You are too far from the Piglet. Go closer to grab it.)");
		cm.dispose();
		return;
		}
	if (Math.abs(cm.getPlayer().getPosition().y) < 264) {
		cm.sendOk("#b(You are too far from the Piglet. Go closer to grab it.)");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.dispose();
		return;
		}
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You have rescued the Piglet."));
		Packages.server.quest.MapleQuest.getInstance(22015).forceComplete(cm.getPlayer(), 0); //小豬消失
		cm.gainItem(4032449, 1);
		cm.dispose();
}