/*
	名字:	草藥叢
	地圖:	第5階段
	描述:	910130102
*/

var prizes = Array(4020007, 4020008, 4010006, 4020001, 4020002);

function start() {
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "其它道具視窗的欄位不足"));
		cm.dispose();
		return;
		}
		cm.gainItem(4031032, cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2051)).getStatus() == 1 ? 1 : 0);
		cm.gainItem(prizes[parseInt(Math.random() * prizes.length)], 2);
		cm.getPlayer().changeMap(cm.getMap(101000000), cm.getMap(101000000).getPortal(0));
		cm.dispose();
}