/*
	名字:	寶箱
	地圖:	地鐵車庫
	描述:	910360102
*/

var item = Array(4020000, 4020001, 4020002, 4020003, 4020004, 4020005);

function start() {
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "其它道具視窗的欄位不足"));
		cm.dispose();
		return;
		}
		cm.gainItem(4031040, cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2056)).getStatus() == 1 ? 1 : 0);
		cm.gainItem(item[parseInt(Math.random() * item.length)], 2);
		cm.getPlayer().changeMap(cm.getMap(103000000), cm.getMap(103000000).getPortal(0));
		cm.dispose();
}