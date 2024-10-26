/*
	名字:	白花簇
	地圖:	第7階段
	描述:	910530202
*/

var item = Array(4020007, 4020008, 4010006);

function start() {
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "其它道具視窗的欄位不足"));
		cm.dispose();
		return;
		}
		cm.gainItem(4031028, cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2054)).getStatus() == 1 ? 30 : 0);
		cm.gainItem(item[parseInt(Math.random() * item.length)], 6);
		cm.getPlayer().changeMap(cm.getMap(105000000), cm.getMap(105000000).getPortal(0)); //奇幻村
		cm.dispose();
}