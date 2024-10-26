/*
	名字:	蓝花簇
	地圖:	第4階段
	描述:	910530101
*/

var item = Array(4020005, 4020006, 4020004, 4020001, 4020003, 4020000, 4020002);

function start() {
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "其它道具視窗的欄位不足"));
		cm.dispose();
		return;
		}
		cm.gainItem(4031026, cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2053)).getStatus() == 1 ? 20 : 0);
		cm.gainItem(item[parseInt(Math.random() * item.length)], 4);
		cm.getPlayer().changeMap(cm.getMap(105000000), cm.getMap(105000000).getPortal(0)); //奇幻村
		cm.dispose();
}